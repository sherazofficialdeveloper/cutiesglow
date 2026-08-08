// backend/src/routes/productRoutes.js

import express from 'express';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  createReview,
} from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param, query } from 'express-validator';

const router = express.Router();

// Public routes
router.get(
  '/',
  validate([
    commonValidations.page('page'),
    commonValidations.limit('limit'),
    query('sort').optional().isString(),
    query('category').optional().isString(),
    query('search').optional().isString(),
    commonValidations.number('minPrice').optional(),
    commonValidations.number('maxPrice').optional(),
    commonValidations.number('rating').optional(),
  ]),
  getProducts
);

router.get(
  '/featured',
  validate([query('limit').optional().isInt({ min: 1, max: 20 })]),
  getFeaturedProducts
);

router.get(
  '/slug/:slug',
  validate([param('slug').notEmpty().withMessage('Slug is required')]),
  getProductBySlug
);

router.get(
  '/:id/related',
  validate([
    commonValidations.id('id'),
    query('limit').optional().isInt({ min: 1, max: 10 }),
  ]),
  getRelatedProducts
);

router.get(
  '/:id',
  validate([commonValidations.id('id')]),
  getProductById
);

// Protected routes (add review)
router.post(
  '/:id/reviews',
  auth,
  validate([
    commonValidations.id('id'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('text').isLength({ min: 5, max: 1000 }).withMessage('Review must be between 5 and 1000 characters'),
  ]),
  createReview
);

export default router;