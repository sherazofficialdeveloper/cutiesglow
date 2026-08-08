// backend/src/routes/adminRoutes.js

import express from 'express';
import {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController.js';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  getOrders,
  getOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import {
  getReviews,
  approveReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { admin } from '../middleware/admin.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// ============ USER MANAGEMENT ============
router.get('/users', admin, getUsers);
router.get('/users/:id', admin, validate([commonValidations.id('id')]), getUserById);

router.put(
  '/users/:id/role',
  admin,
  validate([
    commonValidations.id('id'),
    body('role').isIn(['admin', 'customer']).withMessage('Invalid role'),
  ]),
  updateUserRole
);

router.delete('/users/:id', admin, validate([commonValidations.id('id')]), deleteUser);

// ============ PRODUCT MANAGEMENT ============
// These are already defined in productRoutes.js, but we need admin versions
// Actually we can reuse the same controllers with admin middleware
router.get('/products', admin, getProducts);
router.post('/products', admin, createProduct);
router.put('/products/:id', admin, validate([commonValidations.id('id')]), updateProduct);
router.delete('/products/:id', admin, validate([commonValidations.id('id')]), deleteProduct);

// ============ ORDER MANAGEMENT ============
router.get('/orders', admin, getOrders);
router.get('/orders/:id', admin, validate([commonValidations.id('id')]), getOrder);

router.put(
  '/orders/:id/status',
  admin,
  validate([
    commonValidations.id('id'),
    body('status').isIn(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status'),
  ]),
  updateOrderStatus
);

// ============ CATEGORY MANAGEMENT ============
router.get('/categories', admin, getCategories);
router.post('/categories', admin, createCategory);
router.put('/categories/:id', admin, validate([commonValidations.id('id')]), updateCategory);
router.delete('/categories/:id', admin, validate([commonValidations.id('id')]), deleteCategory);

// ============ REVIEW MANAGEMENT ============
router.get('/reviews', admin, getReviews);
router.put('/reviews/:id/approve', admin, validate([commonValidations.id('id')]), approveReview);
router.delete('/reviews/:id', admin, validate([commonValidations.id('id')]), deleteReview);

export default router;