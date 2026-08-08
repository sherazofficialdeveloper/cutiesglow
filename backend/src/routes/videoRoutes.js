// backend/src/routes/videoRoutes.js

import express from 'express';
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getHomepageVideo,
} from '../controllers/videoController.js';
import { admin } from '../middleware/admin.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/homepage', getHomepageVideo);

// Admin only routes
router.get('/', admin, getVideos);
router.get('/:id', admin, validate([commonValidations.id('id')]), getVideoById);

router.post(
  '/',
  admin,
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('url').isURL().withMessage('Valid video URL is required'),
    body('type').isIn(['homepage', 'product']).withMessage('Invalid video type'),
  ]),
  createVideo
);

router.put(
  '/:id',
  admin,
  validate([
    commonValidations.id('id'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('url').optional().isURL().withMessage('Valid video URL is required'),
    body('type').optional().isIn(['homepage', 'product']).withMessage('Invalid video type'),
  ]),
  updateVideo
);

router.delete(
  '/:id',
  admin,
  validate([commonValidations.id('id')]),
  deleteVideo
);

export default router;