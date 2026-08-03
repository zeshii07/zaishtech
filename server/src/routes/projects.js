import express from 'express';
import { body, param } from 'express-validator';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects/featured — Public: featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/projects — Admin: all projects
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/projects — Admin: create
router.post(
  '/',
  protect,
  [body('title').notEmpty(), body('client').notEmpty(), body('description').notEmpty(), body('service').notEmpty()],
  validate,
  async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// PATCH /api/projects/:id — Admin: update
router.patch('/:id', protect, [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/projects/:id — Admin: delete
router.delete('/:id', protect, [param('id').isMongoId()], validate, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;