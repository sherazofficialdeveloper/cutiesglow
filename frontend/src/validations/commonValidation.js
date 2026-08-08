// frontend/src/validations/commonValidation.js

import { isValidEmail, isValidPhone, isValidNumber } from '@/utils/validators';
import { VALIDATION } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Common validation rules that can be reused across schemas
 */
export const commonRules = {
  required: {
    required: true,
    message: VALIDATION_MESSAGES.REQUIRED,
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
  url: {
    required: false,
    validator: (value) => !value || /^https?:\/\/[^\s]+$/.test(value),
    message: VALIDATION_MESSAGES.INVALID_URL,
  },
  name: {
    required: true,
    validator: (value) => value && value.length >= VALIDATION.NAME_MIN && value.length <= VALIDATION.NAME_MAX,
    message: VALIDATION_MESSAGES.NAME_MIN,
  },
  positiveNumber: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_NUMBER,
  },
  positiveInteger: {
    required: true,
    validator: (value) => Number.isInteger(Number(value)) && value >= 0,
    message: VALIDATION_MESSAGES.INVALID_INTEGER,
  },
  boolean: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
};

/**
 * Contact form validation schema
 */
export const contactSchema = {
  name: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 50,
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
  subject: {
    required: true,
    validator: (value) => value && value.length >= 3 && value.length <= 100,
    message: VALIDATION_MESSAGES.SUBJECT_REQUIRED,
  },
  message: {
    required: true,
    validator: (value) => value && value.length >= 10 && value.length <= 2000,
    message: VALIDATION_MESSAGES.MESSAGE_REQUIRED,
  },
};

/**
 * FAQ validation schema
 */
export const faqSchema = {
  question: {
    required: true,
    validator: (value) => value && value.length >= 5 && value.length <= 200,
    message: VALIDATION_MESSAGES.QUESTION_REQUIRED,
  },
  answer: {
    required: true,
    validator: (value) => value && value.length >= 10 && value.length <= 2000,
    message: VALIDATION_MESSAGES.ANSWER_REQUIRED,
  },
  isActive: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
};

export default {
  commonRules,
  contactSchema,
  faqSchema,
};