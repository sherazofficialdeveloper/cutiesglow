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
  // ✅ OTP Controllers
  sendOTP,
  verifyOTPAndReset,
  resendOTP,
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  verifyEmailValidation,
  updateProfileValidation,
} from '../validations/authValidation.js';

const router = express.Router();

// ============================================================
// PUBLIC ROUTES
// ============================================================

// ✅ Authentication
router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

// ✅ Legacy Token-based Password Reset (Keep for compatibility)
router.post('/forgot-password', validate(forgotPasswordValidation), forgotPassword);
router.post('/reset-password', validate(resetPasswordValidation), resetPassword);

// ✅ Email Verification
router.post('/verify-email', validate(verifyEmailValidation), verifyEmail);

// ============================================================
// ✅ NEW OTP-BASED PASSWORD RESET ROUTES
// ============================================================

router.post('/forgot-password-otp', sendOTP);
router.post('/reset-password-otp', verifyOTPAndReset);
router.post('/resend-otp', resendOTP);

// ============================================================
// PROTECTED ROUTES (Require Authentication)
// ============================================================

router.get('/me', auth, getMe);
router.post('/logout', auth, logout);
router.put('/profile', auth, validate(updateProfileValidation), updateProfile);

export default router;