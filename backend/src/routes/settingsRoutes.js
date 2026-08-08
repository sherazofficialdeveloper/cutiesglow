// backend/src/routes/settingsRoutes.js

import express from 'express';
import {
  getSettings,
  updateSettings,
  getGeneralSettings,
} from '../controllers/settingsController.js';
import { admin } from '../middleware/admin.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/general', getGeneralSettings);

// Admin only routes
router.get('/', admin, getSettings);

router.put(
  '/',
  admin,
  validate([
    body('siteName').optional().isString(),
    body('contactEmail').optional().isEmail().withMessage('Valid email is required'),
    body('zelleEmail').optional().isEmail().withMessage('Valid email is required'),
    body('paypalMode').optional().isIn(['sandbox', 'live']).withMessage('Invalid PayPal mode'),
    commonValidations.number('freeShippingThreshold').optional(),
    commonValidations.number('standardShippingCost').optional(),
    commonValidations.number('expressShippingCost').optional(),
  ]),
  updateSettings
);

export default router;