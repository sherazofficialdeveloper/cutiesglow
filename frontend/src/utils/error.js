// frontend/src/utils/error.js

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
  }
}

/**
 * Api error class
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500, response = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * Authentication error class
 */
export class AuthError extends Error {
  constructor(message = 'Authentication failed', statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

/**
 * Not found error
 */
export class NotFoundError extends Error {
  constructor(resource = 'Resource') {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

/**
 * Format an error for display
 * @param {Error} error - The error to format
 * @param {Object} options - Options
 * @returns {Object} Formatted error
 */
export const formatError = (error, options = {}) => {
  const { includeStack = false, includeCode = true } = options;
  
  const result = {
    message: error?.message || 'An unexpected error occurred',
    name: error?.name || 'Error',
  };

  if (includeCode && error?.code) {
    result.code = error.code;
  }

  if (error?.statusCode) {
    result.statusCode = error.statusCode;
  }

  if (includeStack && error?.stack) {
    result.stack = error.stack;
  }

  if (error?.data) {
    result.data = error.data;
  }

  return result;
};

/**
 * Get a user-friendly error message
 * @param {Error} error - The error
 * @param {Object} messages - Custom error messages mapping
 * @returns {string} User-friendly message
 */
export const getUserFriendlyError = (error, messages = {}) => {
  const defaultMessages = {
    'auth/invalid-email': 'Invalid email address. Please try again.',
    'auth/user-not-found': 'User not found. Please check your email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'This email is already registered. Please login.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'network-error': 'Network error. Please check your connection.',
    'server-error': 'Server error. Please try again later.',
    'validation-error': 'Please check your input and try again.',
    'not-found': 'The requested resource was not found.',
    'unauthorized': 'You are not authorized to perform this action.',
    'default': 'Something went wrong. Please try again.',
  };

  const allMessages = { ...defaultMessages, ...messages };

  const errorCode = error?.code || error?.response?.data?.code || '';
  const errorMessage = error?.message || '';

  for (const [key, msg] of Object.entries(allMessages)) {
    if (errorCode.includes(key) || errorMessage.includes(key)) {
      return msg;
    }
  }

  // Try to extract a meaningful message from response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    // Return a clean version of the error message
    return error.message.replace(/^Error:\s*/, '');
  }

  return allMessages.default;
};

/**
 * Log an error to console with additional context
 * @param {Error} error - The error to log
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
  console.error('=== ERROR ===');
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error(`Name: ${error.name}`);
  console.error(`Message: ${error.message}`);
  if (error.stack) console.error(`Stack: ${error.stack}`);
  if (error.statusCode) console.error(`Status: ${error.statusCode}`);
  if (error.code) console.error(`Code: ${error.code}`);
  if (Object.keys(context).length) {
    console.error('Context:', context);
  }
  console.error('=== END ERROR ===');
};

/**
 * Safely handle an async function
 * @param {Function} fn - Async function to handle
 * @param {Object} options - Options
 * @returns {Promise} [error, result] tuple
 */
export const safeAsync = async (fn, options = {}) => {
  const { silent = false, onError = null } = options;
  try {
    const result = await fn();
    return [null, result];
  } catch (error) {
    if (!silent) {
      logError(error);
    }
    if (onError) onError(error);
    return [error, null];
  }
};

/**
 * Check if an error is a network error
 * @param {Error} error - The error to check
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.request && !error.code;
};

/**
 * Check if an error is a 404
 * @param {Error} error - The error to check
 * @returns {boolean} True if 404
 */
export const isNotFound = (error) => {
  return error?.response?.status === 404 || error?.statusCode === 404;
};

/**
 * Check if an error is a 401 (Unauthorized)
 * @param {Error} error - The error to check
 * @returns {boolean} True if 401
 */
export const isUnauthorized = (error) => {
  return error?.response?.status === 401 || error?.statusCode === 401;
};

/**
 * Check if an error is a 403 (Forbidden)
 * @param {Error} error - The error to check
 * @returns {boolean} True if 403
 */
export const isForbidden = (error) => {
  return error?.response?.status === 403 || error?.statusCode === 403;
};

/**
 * Check if an error is a validation error (400)
 * @param {Error} error - The error to check
 * @returns {boolean} True if validation error
 */
export const isValidationError = (error) => {
  return error?.response?.status === 400 || error?.statusCode === 400;
};

export default {
  AppError,
  ApiError,
  ValidationError,
  AuthError,
  NotFoundError,
  formatError,
  getUserFriendlyError,
  logError,
  safeAsync,
  isNetworkError,
  isNotFound,
  isUnauthorized,
  isForbidden,
  isValidationError,
};