import express from 'express';
import { body, query, param } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import Inquiry from '../models/Inquiry.js';
import { sendNewInquiryNotification, sendInquiryConfirmation } from '../utils/email.js';

const router = express.Router();

// POST /api/inquiries — Public: submit inquiry
router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('service').notEmpty().withMessage('Service is required'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
    body('budget').optional(),
    body('phone').optional().trim(),
    body('company').optional().trim(),
  ],
  validate,
  async (req, res) => {
    try {
      // 1. Save inquiry to database (this ALWAYS succeeds)
      const inquiry = await Inquiry.create(req.body);

      // 2. Try to send emails (these may fail but don't break the response)
      // Run emails in background — don't await them
      Promise.all([
        sendNewInquiryNotification(inquiry),
        sendInquiryConfirmation(inquiry),
      ]).catch((err) => {
        console.error('📧 Email background task error:', err.message);
      });

      // 3. Return success immediately — inquiry is saved regardless of email status
      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully! We\'ll respond within 24 hours.',
        data: inquiry,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/inquiries — Admin: list all
router.get(
  '/',
  protect,
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('status').optional(),
    query('service').optional(),
  ],
  validate,
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.status) filter.status = req.query.status;
      if (req.query.service) filter.service = req.query.service;

      const [inquiries, total] = await Promise.all([
        Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('assignedTo', 'name email'),
        Inquiry.countDocuments(filter),
      ]);

      res.json({
        success: true,
        data: inquiries,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/inquiries/stats — Admin: stats
router.get('/stats', protect, async (req, res) => {
  try {
    const [total, byStatus, byService, recent] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Inquiry.aggregate([{ $group: { _id: '$service', count: { $sum: 1 } } }]),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).select('name email service status createdAt'),
    ]);

    const statusMap = {};
    byStatus.forEach((item) => { statusMap[item._id] = item.count; });

    const serviceMap = {};
    byService.forEach((item) => { serviceMap[item._id] = item.count; });

    res.json({
      success: true,
      data: { total, byStatus: statusMap, byService: serviceMap, recent },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/inquiries/:id — Admin: update
router.patch('/:id', protect, [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });

    const { status, notes, assignedTo } = req.body;
    if (status) inquiry.status = status;
    if (assignedTo) inquiry.assignedTo = assignedTo;
    if (notes) inquiry.notes.push({ text: notes, addedBy: req.user.name });

    await inquiry.save();
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/inquiries/:id — Admin: delete
router.delete('/:id', protect, [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;