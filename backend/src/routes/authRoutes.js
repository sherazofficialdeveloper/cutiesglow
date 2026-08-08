// backend/src/routes/authRoutes.js

import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateProfile,
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.post(
  '/register',
  validate([
    commonValidations.name('name'),
    commonValidations.email('email'),
    commonValidations.password('password'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ]),
  register
);

router.post(
  '/login',
  validate([
    commonValidations.email('email'),
    commonValidations.password('password'),
  ]),
  login
);

router.post(
  '/forgot-password',
  validate([commonValidations.email('email')]),
  forgotPassword
);

router.post(
  '/reset-password',
  validate([
    body('token').notEmpty().withMessage('Token is required'),
    commonValidations.password('password'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
  ]),
  resetPassword
);

router.post(
  '/verify-email',
  validate([body('token').notEmpty().withMessage('Token is required')]),
  verifyEmail
);

// Protected routes
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);

router.put(
  '/profile',
  auth,
  validate([
    commonValidations.name('name'),
    commonValidations.email('email').optional(),
    commonValidations.phone('phone').optional(),
  ]),
  updateProfile
);

export default router;