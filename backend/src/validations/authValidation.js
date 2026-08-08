// backend/src/validations/authValidation.js
import { body } from 'express-validator';

export const registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .trim(),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('phone')
    .optional()
    .isMobilePhone().withMessage('Please enter a valid phone number'),
];

export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
];

export const resetPasswordValidation = [
  body('token')
    .notEmpty().withMessage('Reset token is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

export const verifyEmailValidation = [
  body('token')
    .notEmpty().withMessage('Verification token is required'),
];

export const updateProfileValidation = [
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

// ---- ALIASES FOR CONTROLLER (ADD THESE) ----
export const registerSchema = registerValidation;
export const loginSchema = loginValidation;
export const forgotPasswordSchema = forgotPasswordValidation;
export const resetPasswordSchema = resetPasswordValidation;
export const verifyEmailSchema = verifyEmailValidation;
export const updateProfileSchema = updateProfileValidation;