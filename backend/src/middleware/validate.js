// backend/src/middleware/validate.js

import { validationResult, body, param, query } from 'express-validator';

/**
 * Validate request using express-validator
 * @param {Array} validations - Array of validation chains
 * @returns {Function} Middleware function
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
      value: err.value,
    }));

    // ✅ Send 400 with detailed errors
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  };
};

/**
 * Common validation rules
 */
export const commonValidations = {
  id: (field = 'id') => param(field)
    .isMongoId()
    .withMessage('Invalid ID format'),

  email: (field = 'email') => body(field)
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  password: (field = 'password') => body(field)
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  phone: (field = 'phone') => body(field)
    .optional()
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),

  name: (field = 'name') => body(field)
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .trim(),

  url: (field = 'url') => body(field)
    .optional()
    .isURL()
    .withMessage('Please enter a valid URL'),

  number: (field = 'number') => body(field)
    .isNumeric()
    .withMessage('Must be a number'),

  boolean: (field = 'boolean') => body(field)
    .isBoolean()
    .withMessage('Must be a boolean value'),

  page: (field = 'page') => query(field)
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),

  limit: (field = 'limit') => query(field)
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
    .toInt(),
};

export default validate;