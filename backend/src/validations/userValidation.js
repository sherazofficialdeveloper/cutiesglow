// backend/src/validations/userValidation.js
import { body, param } from 'express-validator';

export const addressValidation = [
  body('label')
    .notEmpty().withMessage('Address label is required')
    .isIn(['Home', 'Work', 'Other']).withMessage('Invalid address label'),
  body('street')
    .notEmpty().withMessage('Street address is required')
    .trim(),
  body('city')
    .notEmpty().withMessage('City is required')
    .trim(),
  body('state')
    .notEmpty().withMessage('State is required')
    .trim(),
  body('zip')
    .notEmpty().withMessage('ZIP code is required')
    .trim(),
  body('country')
    .notEmpty().withMessage('Country is required')
    .trim(),
];

export const addressIdValidation = [
  param('addressId')
    .isMongoId().withMessage('Invalid address ID'),
];

export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Passwords do not match'),
];

// ----- ADD: User profile update validation (for userProfileSchema) -----
export const userProfileValidation = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .trim(),
  body('phone')
    .optional()
    .isMobilePhone().withMessage('Please enter a valid phone number'),
  body('avatar')
    .optional()
    .isURL().withMessage('Please enter a valid image URL'),
];

// ----- ALIASES FOR CONTROLLERS -----
export const addressSchema = addressValidation;
export const passwordChangeSchema = changePasswordValidation;
export const userProfileSchema = userProfileValidation;