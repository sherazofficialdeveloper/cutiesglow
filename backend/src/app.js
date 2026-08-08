// backend/src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import corsConfig from './config/cors.js';
import connectDB from './config/database.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { generalLimiter } from './config/rateLimit.js';
import logger from './utils/logger.js';

const app = express();

// ============ MIDDLEWARE ============

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Security headers
app.use(helmet());

// CORS
app.use(cors(corsConfig));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Rate limiting
app.use('/api', generalLimiter);

// Passport initialization
app.use(passport.initialize());
import './config/passport.js';

// ============ DATABASE ============
connectDB();

// ============ ROUTES ============
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============ ERROR HANDLING ============
app.use(errorHandler);

export default app;