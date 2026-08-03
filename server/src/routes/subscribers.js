import express from 'express';
import { body, query, param } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

// POST /api/subscribers — Public: subscribe
router.post(
  '/',
  [body('email').isEmail().withMessage('Valid email required')],
  validate,
  async (req, res) => {
    try {
      await Subscriber.findOneAndUpdate(
        { email: req.body.email },
        { email: req.body.email, isActive: true },
        { upsert: true, new: true }
      );
      res.json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ success: true, message: 'Already subscribed!' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/subscribers — Admin: list
router.get(
  '/',
  protect,
  [query('page').optional().isInt({ min: 1 }), query('limit').optional().isInt({ min: 1, max: 100 })],
  validate,
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const [subscribers, total] = await Promise.all([
        Subscriber.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
        Subscriber.countDocuments(),
      ]);

      res.json({
        success: true,
        data: subscribers,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// DELETE /api/subscribers/:id — Admin: remove
router.delete('/:id', protect, [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;