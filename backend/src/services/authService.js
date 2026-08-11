// backend/src/services/authService.js

import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { AppError } from '../utils/error.js';
import logger from '../utils/logger.js';
import { sendEmail } from '../utils/email.js';

// ============================================================
// ORIGINAL AUTH SERVICE FUNCTIONS (UNCHANGED)
// ============================================================

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  try {
    const { name, email, password, phone } = userData;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
    });

    await user.save();

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
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account has been deactivated. Please contact support.', 403);
    }

    user.lastLogin = new Date();
    await user.save();

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

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError('Current password is incorrect', 401);
    }

    // Set plain password; pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    return true;
  } catch (error) {
    logger.error('Change password service error:', error);
    throw error;
  }
};

/**
 * Forgot password - generate reset token (Legacy)
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
 * Reset password with token (Legacy)
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

    // Set plain password; pre-save hook will hash it
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  } catch (error) {
    logger.error('Reset password service error:', error);
    throw error;
  }
};

// ============================================================
// ✅ OTP-BASED PASSWORD RESET FUNCTIONS
// ============================================================

/**
 * Send OTP email helper
 */
export const sendOTPEmail = async (user, otp) => {
  const subject = 'Password Reset OTP 🔐';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #E2712E; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px dashed #E2712E; }
        .otp { font-size: 32px; font-weight: bold; color: #E2712E; letter-spacing: 4px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset OTP</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>You requested to reset your password. Use the OTP below to set a new password:</p>
          <div class="otp-box">
            <p style="margin: 0; font-size: 14px; color: #666;">Your OTP code is:</p>
            <p class="otp">${otp}</p>
          </div>
          <p>This OTP will expire in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Generate and send OTP for password reset
 */
export const sendPasswordResetOTP = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError('No user found with this email', 404);
    }

    // Check cooldown (prevent spam)
    if (user.resetPasswordOTPCooldown && user.resetPasswordOTPCooldown > Date.now()) {
      throw new AppError('Please wait before requesting another OTP', 429);
    }

    // Generate OTP
    const otp = user.generateResetPasswordOTP();
    user.resetPasswordOTPCooldown = Date.now() + 60000; // 1 minute cooldown
    await user.save();

    // Send OTP via email
    await sendOTPEmail(user, otp);

    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    logger.error('Send OTP service error:', error);
    throw error;
  }
};

/**
 * ✅ FIXED: Verify OTP and reset password
 * - Prevents reusing old password
 * - All other functionality unchanged
 */
export const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
  try {
    console.log('🔐 Resetting password for:', email);

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      console.log('❌ User not found:', email);
      throw new AppError('User not found', 404);
    }

    if (!user.isResetPasswordOTPValid(otp)) {
      console.log('❌ Invalid or expired OTP for:', email);
      throw new AppError('Invalid or expired OTP', 400);
    }

    // ✅ Check if new password is same as old password
    const isSame = await comparePassword(newPassword, user.password);
    if (isSame) {
      throw new AppError('New password cannot be the same as the old password', 400);
    }

    // ✅ Set plain password — pre-save hook will hash it
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    user.resetPasswordOTPCooldown = undefined;

    await user.save();
    console.log('✅ Password updated successfully for:', email);

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error('❌ Verify OTP service error:', error);
    logger.error('Verify OTP service error:', error);
    throw error;
  }
};

/**
 * Resend OTP
 */
export const resendPasswordResetOTP = async (email) => {
  return sendPasswordResetOTP(email);
};

// ============================================================
// EXPORTS
// ============================================================

export default {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  changeUserPassword,
  generateResetToken,
  resetUserPassword,
  sendPasswordResetOTP,
  verifyOTPAndResetPassword,
  resendPasswordResetOTP,
};