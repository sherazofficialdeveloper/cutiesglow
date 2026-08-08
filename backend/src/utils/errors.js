// backend/src/utils/error.js

/**
 * Custom application error class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'UNKNOWN_ERROR', data = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
    this.timestamp = new Date().toISOString();
    this.isAppError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error class
 */
export class ValidationError extends AppError {
  constructor(message, errors = {}) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

/**
 * Authentication error class
 */
export class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTH_ERROR');
  }
}

/**
 * Authorization error class
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * Not found error class
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

/**
 * Conflict error class (duplicate, etc.)
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
  }
}

/**
 * Format error for response
 * @param {Error} error - Error to format
 * @param {Object} options - Options
 * @returns {Object} Formatted error
 */
export const formatError = (error, options = {}) => {
  const { includeStack = false, includeCode = true } = options;

  const result = {
    message: error?.message || 'An unexpected error occurred',
  };

  if (includeCode && error?.code) {
    result.code = error.code;
  }

  if (error?.statusCode) {
    result.statusCode = error.statusCode;
  }

  if (error?.errors) {
    result.errors = error.errors;
  }

  if (includeStack && error?.stack) {
    result.stack = error.stack;
  }

  return result;
};

/**
 * Check if error is an AppError
 * @param {Error} error - Error to check
 * @returns {boolean} True if AppError
 */
export const isAppError = (error) => {
  return error?.isAppError === true;
};

/**
 * Check if error is a validation error
 * @param {Error} error - Error to check
 * @returns {boolean} True if validation error
 */
export const isValidationError = (error) => {
  return error?.name === 'ValidationError' || error?.statusCode === 400;
};

/**
 * Check if error is a duplicate key error (MongoDB)
 * @param {Error} error - Error to check
 * @returns {boolean} True if duplicate key error
 */
export const isDuplicateKeyError = (error) => {
  return error?.code === 11000;
};

export default {
  AppError,
  ValidationError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  formatError,
  isAppError,
  isValidationError,
  isDuplicateKeyError,
};