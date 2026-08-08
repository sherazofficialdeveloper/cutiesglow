// frontend/src/validations/schemas.js

import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidNumber,
  validatePassword,
} from '@/utils/validators';
import { VALIDATION, CATEGORIES, PAYMENT_METHODS } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Create a validation function that returns an object with errors
 * This mimics Yup-style validation without the dependency
 */
export const createValidator = (schema) => {
  return (data) => {
    const errors = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];
      
      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = rules.message || 'This field is required';
        continue;
      }

      if (rules.validator && value !== undefined && value !== null && value !== '') {
        if (!rules.validator(value, data)) {
          errors[field] = rules.message || 'Invalid value';
        }
      }
    }

    return errors;
  };
};

/**
 * Login validation schema (Yup-style)
 */
export const loginValidator = createValidator({
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
});

/**
 * Register validation schema (Yup-style)
 */
export const registerValidator = createValidator({
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
    validator: (value, data) => value === data.password,
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
  },
});

/**
 * Product validation (Yup-style)
 */
export const productValidator = createValidator({
  name: {
    required: true,
    validator: (value) => value && value.length >= 3 && value.length <= 100,
    message: VALIDATION_MESSAGES.PRODUCT_NAME,
  },
  price: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_PRICE,
  },
  category: {
    required: true,
    validator: (value) => CATEGORIES.includes(value),
    message: VALIDATION_MESSAGES.INVALID_CATEGORY,
  },
  stock: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_STOCK,
  },
  image: {
    required: true,
    validator: (value) => isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
});

/**
 * Order validation (Yup-style)
 */
export const orderValidator = createValidator({
  name: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.NAME_MIN,
  },
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  phone: {
    required: true,
    validator: (value) => isValidPhone(value),
    message: VALIDATION_MESSAGES.INVALID_PHONE,
  },
  address: {
    required: true,
    validator: (value) => value && value.length >= 5,
    message: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
  },
  city: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.CITY_REQUIRED,
  },
  state: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.STATE_REQUIRED,
  },
  zip: {
    required: true,
    validator: (value) => value && value.length >= 3,
    message: VALIDATION_MESSAGES.ZIP_REQUIRED,
  },
  paymentMethod: {
    required: true,
    validator: (value) => Object.values(PAYMENT_METHODS).includes(value),
    message: VALIDATION_MESSAGES.INVALID_PAYMENT_METHOD,
  },
});

/**
 * Address validation (Yup-style)
 */
export const addressValidator = createValidator({
  label: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 20,
    message: VALIDATION_MESSAGES.LABEL_REQUIRED,
  },
  street: {
    required: true,
    validator: (value) => value && value.length >= 5,
    message: VALIDATION_MESSAGES.STREET_REQUIRED,
  },
  city: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.CITY_REQUIRED,
  },
  state: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.STATE_REQUIRED,
  },
  zip: {
    required: true,
    validator: (value) => value && value.length >= 3,
    message: VALIDATION_MESSAGES.ZIP_REQUIRED,
  },
});

export default {
  loginValidator,
  registerValidator,
  productValidator,
  orderValidator,
  addressValidator,
  createValidator,
};