// backend/src/services/authService.js

import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { AppError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const { name, email, password, phone } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
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

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
      token,
    };
  } catch (error) {
    logger.error('Register service error:', error);
    throw error;
  }
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  try {
    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AppError('Account has been deactivated. Please contact support.', 403);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken({ id: user._id, email: user.email });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
      token,
    };
  } catch (error) {
    logger.error('Login service error:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  } catch (error) {
    logger.error('Get user service error:', error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { name, phone, avatar } = updateData;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
    };
  } catch (error) {
    logger.error('Update profile service error:', error);
    throw error;
  }
};

/**
 * Change password
 */
export const changeUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError('Current password is incorrect', 401);
    }

    // Update password
    user.password = await hashPassword(newPassword);
    await user.save();

    return true;
  } catch (error) {
    logger.error('Change password service error:', error);
    throw error;
  }
};

/**
 * Forgot password - generate reset token
 */
export const generateResetToken = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError('No user found with this email', 404);
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    return {
      user,
      resetToken,
    };
  } catch (error) {
    logger.error('Generate reset token service error:', error);
    throw error;
  }
};

/**
 * Reset password with token
 */
export const resetUserPassword = async (token, newPassword) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  } catch (error) {
    logger.error('Reset password service error:', error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  changeUserPassword,
  generateResetToken,
  resetUserPassword,
};