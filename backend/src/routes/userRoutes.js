// backend/src/routes/userRoutes.js

import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  changePassword,
  getUserStats,
} from '../controllers/userController.js';
import { validate, commonValidations } from '../middleware/validate.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Address routes
router.get('/addresses', getAddresses);

router.post(
  '/addresses',
  validate([
    body('label').notEmpty().withMessage('Label is required'),
    body('street').notEmpty().withMessage('Street is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('zip').notEmpty().withMessage('ZIP code is required'),
    body('country').notEmpty().withMessage('Country is required'),
  ]),
  addAddress
);

router.put(
  '/addresses/:addressId',
  validate([
    commonValidations.id('addressId'),
    body('label').notEmpty().withMessage('Label is required'),
    body('street').notEmpty().withMessage('Street is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('zip').notEmpty().withMessage('ZIP code is required'),
    body('country').notEmpty().withMessage('Country is required'),
  ]),
  updateAddress
);

router.delete(
  '/addresses/:addressId',
  validate([commonValidations.id('addressId')]),
  deleteAddress
);

router.put(
  '/addresses/:addressId/default',
  validate([commonValidations.id('addressId')]),
  setDefaultAddress
);

// Password change
router.put(
  '/change-password',
  validate([
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    commonValidations.password('newPassword'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage('Passwords do not match'),
  ]),
  changePassword
);

// User stats
router.get('/stats', getUserStats);

export default router;