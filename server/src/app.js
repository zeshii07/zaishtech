import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import inquiryRoutes from './routes/inquiries.js';
import subscriberRoutes from './routes/subscribers.js';
import projectRoutes from './routes/projects.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

if (env.nodeEnv === 'development') app.use(morgan('dev'));

app.use('/api', apiLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'NexaFlow API running',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/projects', projectRoutes);

// 404
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use(errorHandler);

export default app;