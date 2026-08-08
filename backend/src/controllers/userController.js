// backend/src/controllers/userController.js

import User from '../models/User.js';
import { addressSchema, userProfileSchema, passwordChangeSchema } from '../validations/userValidation.js';
import { validate } from '../middleware/validate.js';
import { comparePassword, hashPassword } from '../utils/password.js';

/**
 * Get user addresses
 * GET /api/users/addresses
 */
export const getAddresses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('addresses');
    res.json({
      success: true,
      data: { addresses: user.addresses || [] },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add address
 * POST /api/users/addresses
 */
export const addAddress = async (req, res, next) => {
  try {
    const errors = validate(addressSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { label, street, city, state, zip, country, isDefault } = req.body;

    // If this is default, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({ label, street, city, state, zip, country, isDefault });
    await user.save();

    const newAddress = user.addresses[user.addresses.length - 1];

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: { address: newAddress },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update address
 * PUT /api/users/addresses/:addressId
 */
export const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const errors = validate(addressSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    const { label, street, city, state, zip, country, isDefault } = req.body;

    // If this is default, unset other defaults
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      label,
      street,
      city,
      state,
      zip,
      country,
      isDefault,
    };

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: { address: user.addresses[addressIndex] },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete address
 * DELETE /api/users/addresses/:addressId
 */
export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Set default address
 * PUT /api/users/addresses/:addressId/default
 */
export const setDefaultAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    user.addresses.forEach(addr => addr.isDefault = false);
    user.addresses[addressIndex].isDefault = true;
    await user.save();

    res.json({
      success: true,
      message: 'Default address set successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 * PUT /api/users/change-password
 */
export const changePassword = async (req, res, next) => {
  try {
    const errors = validate(passwordChangeSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = await hashPassword(newPassword);
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user statistics
 * GET /api/users/stats
 */
export const getUserStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get order count and total spent
    const orderStats = await Order.aggregate([
      { $match: { userId } },
      { $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: '$total' },
      } },
    ]);

    // Get review count
    const reviewCount = await Review.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        totalOrders: orderStats[0]?.totalOrders || 0,
        totalSpent: orderStats[0]?.totalSpent || 0,
        reviewCount: reviewCount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};