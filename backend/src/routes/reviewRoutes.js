// backend/src/routes/reviewRoutes.js

import express from 'express';
import {
  getReviews,
  createReview,
} from '../controllers/reviewController.js';
import { auth } from '../middleware/auth.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { query, body } from 'express-validator';

const router = express.Router();

// Public routes
router.get(
  '/',
  validate([
    query('productId').optional().isMongoId().withMessage('Invalid product ID'),
    commonValidations.page('page'),
    commonValidations.limit('limit'),
  ]),
  getReviews
);

// Protected routes
router.post(
  '/',
  auth,
  validate([
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('text').isLength({ min: 5, max: 1000 }).withMessage('Review must be between 5 and 1000 characters'),
  ]),
  createReview
);

export default router;