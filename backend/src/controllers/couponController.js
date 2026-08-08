// backend/src/controllers/couponController.js

import Coupon from '../models/Coupon.js';
import { couponSchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';

/**
 * Validate coupon code
 * GET /api/coupons/validate/:code
 */
export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code',
      });
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Coupon has expired',
      });
    }

    // Check usage limit
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit reached',
      });
    }

    res.json({
      success: true,
      message: 'Coupon is valid',
      data: {
        coupon: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};