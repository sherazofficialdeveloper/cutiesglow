// frontend/src/validations/authValidation.js

import { 
  isValidEmail, 
  isValidPhone, 
  validatePassword,
  isValidUrl 
} from '@/utils/validators';
import { VALIDATION } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Login validation schema
 */
export const loginSchema = {
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  password: {
    required: true,
    validator: (value) => value && value.length >= VALIDATION.PASSWORD_MIN,
    message: VALIDATION_MESSAGES.PASSWORD_MIN,
  },
};

/**
 * Register validation schema
 */
export const registerSchema = {
  name: {
    required: true,
    validator: (value) => value && value.length >= VALIDATION.NAME_MIN,
    message: VALIDATION_MESSAGES.NAME_MIN,
  },
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  password: {
    required: true,
    validator: (value) => {
      const result = validatePassword(value, {
        minLength: VALIDATION.PASSWORD_MIN,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
      });
      return result.isValid;
    },
    message: VALIDATION_MESSAGES.PASSWORD_STRONG,
  },
  confirmPassword: {
    required: true,
    validator: (value, formData) => value === formData?.password,
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
  },
  phone: {
    required: false,
    validator: (value) => !value || isValidPhone(value),
    message: VALIDATION_MESSAGES.INVALID_PHONE,
  },
};

/**
 * Forgot password validation schema
 */
export const forgotPasswordSchema = {
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
};

/**
 * Reset password validation schema
 */
export const resetPasswordSchema = {
  token: {
    required: true,
  },
  password: {
    required: true,
    validator: (value) => {
      const result = validatePassword(value, {
        minLength: VALIDATION.PASSWORD_MIN,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
      });
      return result.isValid;
    },
    message: VALIDATION_MESSAGES.PASSWORD_STRONG,
  },
  confirmPassword: {
    required: true,
    validator: (value, formData) => value === formData?.password,
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
  },
};

/**
 * Verify email validation schema
 */
export const verifyEmailSchema = {
  token: {
    required: true,
  },
};

/**
 * Update profile validation schema
 */
export const updateProfileSchema = {
  name: {
    required: true,
    validator: (value) => value && value.length >= VALIDATION.NAME_MIN,
    message: VALIDATION_MESSAGES.NAME_MIN,
  },
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  phone: {
    required: false,
    validator: (value) => !value || isValidPhone(value),
    message: VALIDATION_MESSAGES.INVALID_PHONE,
  },
  avatar: {
    required: false,
    validator: (value) => !value || isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_URL,
  },
};

export default {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
};