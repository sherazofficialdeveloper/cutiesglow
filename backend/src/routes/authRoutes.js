// backend/src/routes/authRoutes.js

import express from 'express';
import { body } from 'express-validator';
import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { AppError, catchAsync } from '../utils/error.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import logger from '../utils/logger.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../config/email.js';

const router = express.Router();

// -------- Validation Rules --------
const registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
    .trim(),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

const verifyEmailValidation = [
  body('token').notEmpty().withMessage('Verification token is required'),
];

// -------- Routes --------

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validate(registerValidation), catchAsync(async (req, res, next) => {
  console.log('🟢 [authRoutes] Register STARTED');
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('❌ User already exists:', email);
    return next(new AppError('User already exists with this email', 400));
  }

  // Create user
  const user = await User.create({ name, email, password });
  console.log(`✅ User saved: ${user.email}`);

  // Send welcome email (non-blocking)
  console.log(`📧 [authRoutes] Attempting to send welcome email to: ${user.email}`);
  sendWelcomeEmail(user)
    .then(() => {
      console.log(`✅ [authRoutes] Welcome email sent successfully to: ${user.email}`);
    })
    .catch((err) => {
      console.error(`❌ [authRoutes] Welcome email failed for ${user.email}:`, err.message);
    });

  // Generate token
  const token = generateToken({ id: user._id });

  // Remove password from response
  const userData = user.toObject();
  delete userData.password;

  logger.info(`User registered: ${email}`);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: userData,
    token,
  });
  console.log(`✅ [authRoutes] Registration response sent for: ${email}`);
}));

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validate(loginValidation), catchAsync(async (req, res, next) => {
  console.log('🔵 [authRoutes] Login STARTED');
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (!user.isActive) {
    return next(new AppError('Account has been deactivated. Please contact support.', 403));
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = generateToken({ id: user._id });

  const userData = user.toObject();
  delete userData.password;

  logger.info(`User logged in: ${email}`);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: userData,
    token,
  });
  console.log(`✅ [authRoutes] Login successful for: ${email}`);
}));

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth, catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
}));

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', validate(forgotPasswordValidation), catchAsync(async (req, res, next) => {
  console.log('🔑 [authRoutes] Forgot password STARTED');
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('No user found with this email', 404));
  }

  // Generate reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send password reset email (non-blocking)
  console.log(`📧 [forgot-password] Sending reset email to: ${email}`);
  sendPasswordResetEmail(user, resetToken)
    .then(() => {
      console.log(`✅ [forgot-password] Reset email sent to: ${email}`);
    })
    .catch((err) => {
      console.error(`❌ [forgot-password] Reset email failed for ${email}:`, err.message);
    });

  logger.info(`Password reset token generated for ${email}`);

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to your email',
    // Only in development – never in production
    resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
  });
}));

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', validate(resetPasswordValidation), catchAsync(async (req, res, next) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Invalid or expired reset token', 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  logger.info(`Password reset successful for: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password reset successful. You can now log in.',
  });
}));

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify email address
 * @access  Public
 */
router.post('/verify-email', validate(verifyEmailValidation), catchAsync(async (req, res, next) => {
  const { token } = req.body;

  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    return next(new AppError('Invalid verification token', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  logger.info(`Email verified for: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
  });
}));

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client side token removal)
 * @access  Private
 */
router.post('/logout', auth, catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}));

export default router;