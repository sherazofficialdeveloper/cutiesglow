// backend/src/routes/categoryRoutes.js

import express from 'express';
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '../controllers/categoryController.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { param, query } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/', getCategories);

router.get(
  '/slug/:slug',
  validate([param('slug').notEmpty().withMessage('Slug is required')]),
  getCategoryBySlug
);

router.get(
  '/:slug/products',
  validate([
    param('slug').notEmpty().withMessage('Slug is required'),
    commonValidations.page('page'),
    commonValidations.limit('limit'),
  ]),
  getProductsByCategory
);

export default router;