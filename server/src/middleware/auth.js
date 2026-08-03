import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please log in.',
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalid or expired.',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission.',
      });
    }
    next();
  };
};