// backend/src/routes/pageRoutes.js

import express from 'express';
import {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  getPageBySlug,
} from '../controllers/pageController.js';
import { admin } from '../middleware/admin.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/slug/:slug', getPageBySlug);

// Admin only routes
router.get('/', admin, getPages);
router.get('/:id', admin, validate([commonValidations.id('id')]), getPageById);

router.post(
  '/',
  admin,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
  ]),
  createPage
);

router.put(
  '/:id',
  admin,
  validate([
    commonValidations.id('id'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('slug').optional().notEmpty().withMessage('Slug cannot be empty'),
  ]),
  updatePage
);

router.delete(
  '/:id',
  admin,
  validate([commonValidations.id('id')]),
  deletePage
);

export default router;