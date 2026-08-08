// backend/src/config/index.js
import dotenv from 'dotenv';
import database from './database.js';
import jwt from './jwt.js';
import passport from './passport.js';
import multer from './multer.js';
import email from './email.js';
import payment from './payment.js';
import cors from './cors.js';
import rateLimit from './rateLimit.js';

dotenv.config();

export default {
  database,
  jwt,
  passport,
  multer,
  email,
  payment,
  cors,
  rateLimit,
  env: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
  },
};

export { database, jwt, passport, multer, email, payment, cors, rateLimit };