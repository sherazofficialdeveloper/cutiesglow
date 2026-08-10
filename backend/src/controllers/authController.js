// backend/src/controllers/authController.js

console.log('🔥🔥🔥 authController.js LOADED - Version 3 🔥🔥🔥');

import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { sendWelcomeEmail } from '../config/email.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
} from '../validations/authValidation.js';
import { validate } from '../middleware/validate.js';
import { comparePassword, hashPassword } from '../utils/password.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  console.log('🟢 [1] Register function STARTED');
  
  try {
    // Validate input
    const errors = validate(registerSchema, req.body);
    if (errors.length > 0) {
      console.log('❌ Validation errors:', errors);
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { name, email, password, phone } = req.body;
    console.log(`🟢 [2] Registering user: ${email}`);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`❌ User already exists: ${email}`);
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
    });

    await user.save();
    console.log(`🟢 [3] User saved: ${user.email}`);

    // ✅ Send welcome email WITHOUT awaiting – non-blocking
    console.log(`📧 [4] ATTEMPTING to send welcome email to: ${user.email}`);
    
    // Call the email function and log result
    sendWelcomeEmail(user)
      .then((result) => {
        console.log(`✅ [5] Welcome email SENT successfully to: ${user.email}`);
        console.log('📨 Message ID:', result.messageId);
      })
      .catch((err) => {
        console.error(`❌ [5] Welcome email FAILED for ${user.email}:`, err.message);
        console.error('Full error:', err);
      });

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });
    console.log(`🟢 [6] Token generated for: ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
    console.log(`🟢 [7] Registration response sent for: ${user.email}`);
    
  } catch (error) {
    console.error('❌ Register CATCH error:', error);
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  console.log('🔵 Login function called');
  try {
    const errors = validate(loginSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({ id: user._id, email: user.email });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('addresses');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
};

/**
 * Forgot password - send reset email
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const errors = validate(forgotPasswordSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email',
      });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    res.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const errors = validate(resetPasswordSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify email
 * POST /api/auth/verify-email
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      emailVerificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update profile
 * PUT /api/auth/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, phone, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};