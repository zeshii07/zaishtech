import express from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

const signToken = (id) => jwt.sign({ id }, env.jwtSecret, { expiresIn: env.jwtExpire });

// POST /api/auth/register — CREATE ADMIN (DISABLE AFTER FIRST USE)
router.post('/register', async (req, res) => {
  try {
    // 🔒 SECURITY: Only allow registration if no admin exists yet
    // Once you've created your first admin, this endpoint effectively blocks itself
    const adminExists = await User.findOne({});
    if (adminExists) {
      return res.status(403).json({
        success: false,
        message: 'Registration is closed. An admin account already exists.',
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters.',
      });
    }

    const user = await User.create({ name, email, password, role: 'admin' });
    const token = signToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated.' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);

    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;