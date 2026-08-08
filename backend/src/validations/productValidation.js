// backend/src/validations/productValidation.js

import { body, param, query } from 'express-validator';

export const productValidation = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Product name must be between 3 and 100 characters')
    .trim(),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters')
    .trim(),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Soap', 'Serum', 'Cream', 'Scrub', 'Bundle', 'Gummies', 'Mask', 'Toner'])
    .withMessage('Invalid category'),
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  body('images')
    .optional()
    .isArray().withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isURL().withMessage('Invalid image URL'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),
];

export const productIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
];

export const productSlugValidation = [
  param('slug')
    .notEmpty().withMessage('Product slug is required')
    .trim(),
];

export const productFilterValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
    .toInt(),
  query('sort')
    .optional()
    .isString().withMessage('Sort must be a string'),
  query('category')
    .optional()
    .isString().withMessage('Category must be a string'),
  query('search')
    .optional()
    .isString().withMessage('Search query must be a string'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
];

export const reviewValidation = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('text')
    .notEmpty().withMessage('Review text is required')
    .isLength({ min: 5, max: 1000 }).withMessage('Review must be between 5 and 1000 characters')
    .trim(),
];
// ---- ALIASES FOR CONTROLLER ----
export const productSchema = productValidation;
export const productIdSchema = productIdValidation;
export const productSlugSchema = productSlugValidation;
export const productFilterSchema = productFilterValidation;
export const reviewSchema = reviewValidation;