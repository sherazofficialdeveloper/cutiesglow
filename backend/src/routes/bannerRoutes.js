// backend/src/routes/bannerRoutes.js

import express from 'express';
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/bannerController.js';
import { admin } from '../middleware/admin.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Admin only routes
router.get('/', admin, getBanners);
router.get('/:id', admin, validate([commonValidations.id('id')]), getBannerById);

router.post(
  '/',
  admin,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('image').isURL().withMessage('Valid image URL is required'),
    body('type').isIn(['hero', 'promo', 'instagram']).withMessage('Invalid banner type'),
  ]),
  createBanner
);

router.put(
  '/:id',
  admin,
  validate([
    commonValidations.id('id'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('image').optional().isURL().withMessage('Valid image URL is required'),
    body('type').optional().isIn(['hero', 'promo', 'instagram']).withMessage('Invalid banner type'),
  ]),
  updateBanner
);

router.delete(
  '/:id',
  admin,
  validate([commonValidations.id('id')]),
  deleteBanner
);

export default router;