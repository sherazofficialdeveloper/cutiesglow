// backend/src/routes/paymentRoutes.js

import express from 'express';
import {
  createPayPalOrder,
  capturePayPalOrder,
  submitZellePayment,
  getZelleInfo,
  getPendingVerifications,
  getVerificationById,
  verifyPayment,
} from '../controllers/paymentController.js';
import { auth, admin } from '../middleware/index.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { uploadSingle } from '../middleware/upload.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Public routes
router.get('/zelle/info', getZelleInfo);

// Protected routes (require authentication)
router.post(
  '/paypal/create',
  auth,
  validate([body('orderId').notEmpty().withMessage('Order ID is required')]),
  createPayPalOrder
);

router.post(
  '/paypal/capture/:orderId',
  auth,
  validate([commonValidations.id('orderId')]),
  capturePayPalOrder
);

router.post(
  '/zelle/submit',
  auth,
  uploadSingle('proof'),
  validate([
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('transactionId').notEmpty().withMessage('Transaction ID is required'),
  ]),
  submitZellePayment
);

// Admin only routes
router.get('/admin/pending', auth, admin, getPendingVerifications);
router.get('/admin/:id', auth, admin, validate([commonValidations.id('id')]), getVerificationById);

router.put(
  '/admin/:id/verify',
  auth,
  admin,
  validate([
    commonValidations.id('id'),
    body('status').isIn(['verified', 'rejected']).withMessage('Status must be verified or rejected'),
  ]),
  verifyPayment
);

export default router;