// frontend/src/validations/orderValidation.js

import { isValidEmail, isValidPhone, isValidNumber } from '@/utils/validators';
import { PAYMENT_METHODS, ORDER_STATUS } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Order creation validation schema
 */
export const orderSchema = {
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
  country: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
  },
  paymentMethod: {
    required: true,
    validator: (value) => Object.values(PAYMENT_METHODS).includes(value),
    message: VALIDATION_MESSAGES.INVALID_PAYMENT_METHOD,
  },
  items: {
    required: true,
    validator: (value) => Array.isArray(value) && value.length > 0,
    message: VALIDATION_MESSAGES.EMPTY_CART,
  },
  coupon: {
    required: false,
    validator: (value) => !value || typeof value === 'string',
    message: VALIDATION_MESSAGES.INVALID_COUPON,
  },
  notes: {
    required: false,
    validator: (value) => !value || value.length <= 500,
    message: VALIDATION_MESSAGES.NOTES_TOO_LONG,
  },
};

/**
 * Order status update validation schema
 */
export const orderStatusSchema = {
  status: {
    required: true,
    validator: (value) => Object.values(ORDER_STATUS).includes(value),
    message: VALIDATION_MESSAGES.INVALID_STATUS,
  },
};

/**
 * Order filtering validation schema
 */
export const orderFilterSchema = {
  page: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 1 }),
    message: VALIDATION_MESSAGES.INVALID_PAGE,
  },
  limit: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 1, max: 50 }),
    message: VALIDATION_MESSAGES.INVALID_LIMIT,
  },
  status: {
    required: false,
    validator: (value) => !value || Object.values(ORDER_STATUS).includes(value),
    message: VALIDATION_MESSAGES.INVALID_STATUS,
  },
  dateFrom: {
    required: false,
    validator: (value) => !value || !isNaN(Date.parse(value)),
    message: VALIDATION_MESSAGES.INVALID_DATE,
  },
  dateTo: {
    required: false,
    validator: (value) => !value || !isNaN(Date.parse(value)),
    message: VALIDATION_MESSAGES.INVALID_DATE,
  },
};

/**
 * Zelle payment verification schema
 */
export const zelleVerificationSchema = {
  orderId: {
    required: true,
  },
  transactionId: {
    required: true,
    validator: (value) => value && value.length >= 4,
    message: VALIDATION_MESSAGES.TRANSACTION_ID_REQUIRED,
  },
  proof: {
    required: true,
    validator: (value) => value instanceof File || value instanceof Blob || typeof value === 'string',
    message: VALIDATION_MESSAGES.PROOF_REQUIRED,
  },
};

export default {
  orderSchema,
  orderStatusSchema,
  orderFilterSchema,
  zelleVerificationSchema,
};