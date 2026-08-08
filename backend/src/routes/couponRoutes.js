// backend/src/routes/couponRoutes.js

import express from 'express';
import { validateCoupon } from '../controllers/couponController.js';
import { validate } from '../middleware/validate.js';
import { param } from 'express-validator';

const router = express.Router();

// Public routes
router.get(
  '/validate/:code',
  validate([param('code').notEmpty().withMessage('Coupon code is required')]),
  validateCoupon
);

export default router;