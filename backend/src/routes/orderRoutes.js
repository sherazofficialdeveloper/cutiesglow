// backend/src/routes/orderRoutes.js

import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  submitZelleProof,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param, query } from 'express-validator';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

// Protected routes (require authentication)
router.get(
  '/',
  validate([
    commonValidations.page('page'),
    commonValidations.limit('limit'),
    query('status').optional().isString(),
  ]),
  getOrders
);

router.post(
  '/',
  validate([
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('shippingAddress.name').notEmpty().withMessage('Shipping name is required'),
    body('shippingAddress.street').notEmpty().withMessage('Street is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.zip').notEmpty().withMessage('ZIP code is required'),
    body('paymentMethod').isIn(['paypal', 'zelle', 'stripe', 'cod']).withMessage('Invalid payment method'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').notEmpty().withMessage('Name is required'),
  ]),
  createOrder
);

router.post(
  '/zelle-proof',
  uploadSingle('proof'),
  validate([
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('transactionId').notEmpty().withMessage('Transaction ID is required'),
  ]),
  submitZelleProof
);

router.get(
  '/:id',
  validate([commonValidations.id('id')]),
  getOrder
);

router.put(
  '/:id/status',
  validate([
    commonValidations.id('id'),
    body('status').isIn(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
  ]),
  updateOrderStatus
);

router.put(
  '/:id/cancel',
  validate([commonValidations.id('id')]),
  cancelOrder
);

export default router;