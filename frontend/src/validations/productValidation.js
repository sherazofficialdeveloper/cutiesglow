// frontend/src/validations/productValidation.js

import { isValidUrl, isValidNumber } from '@/utils/validators';
import { CATEGORIES } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Product creation/update validation schema
 */
export const productSchema = {
  name: {
    required: true,
    validator: (value) => value && value.length >= 3 && value.length <= 100,
    message: VALIDATION_MESSAGES.PRODUCT_NAME,
  },
  slug: {
    required: false,
    validator: (value) => !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
    message: VALIDATION_MESSAGES.INVALID_SLUG,
  },
  description: {
    required: true,
    validator: (value) => value && value.length >= 20,
    message: VALIDATION_MESSAGES.PRODUCT_DESCRIPTION,
  },
  price: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_PRICE,
  },
  originalPrice: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 0 }),
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
  images: {
    required: false,
    validator: (value) => !value || (Array.isArray(value) && value.every(isValidUrl)),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
  isActive: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
  isFeatured: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
  tags: {
    required: false,
    validator: (value) => !value || Array.isArray(value),
    message: VALIDATION_MESSAGES.INVALID_ARRAY,
  },
  variants: {
    required: false,
    validator: (value) => !value || Array.isArray(value),
    message: VALIDATION_MESSAGES.INVALID_ARRAY,
  },
  rating: {
    required: false,
    validator: (value) => !value || (isValidNumber(value, { min: 0, max: 5 })),
    message: VALIDATION_MESSAGES.INVALID_RATING,
  },
};

/**
 * Product filtering validation schema
 */
export const productFilterSchema = {
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
  sort: {
    required: false,
    validator: (value) => !value || ['featured', 'newest', 'price-low', 'price-high', 'rating', 'popularity'].includes(value),
    message: VALIDATION_MESSAGES.INVALID_SORT,
  },
  category: {
    required: false,
    validator: (value) => !value || CATEGORIES.includes(value),
    message: VALIDATION_MESSAGES.INVALID_CATEGORY,
  },
  minPrice: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_PRICE,
  },
  maxPrice: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_PRICE,
  },
  rating: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 0, max: 5 }),
    message: VALIDATION_MESSAGES.INVALID_RATING,
  },
  search: {
    required: false,
    validator: (value) => !value || typeof value === 'string',
    message: VALIDATION_MESSAGES.INVALID_SEARCH,
  },
};

/**
 * Review validation schema
 */
export const reviewSchema = {
  productId: {
    required: true,
  },
  rating: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 1, max: 5 }),
    message: VALIDATION_MESSAGES.INVALID_RATING,
  },
  text: {
    required: true,
    validator: (value) => value && value.length >= 5 && value.length <= 1000,
    message: VALIDATION_MESSAGES.REVIEW_TEXT,
  },
  name: {
    required: false,
    validator: (value) => !value || value.length >= 2,
    message: VALIDATION_MESSAGES.NAME_MIN,
  },
  email: {
    required: false,
    validator: (value) => !value || isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
};

export default {
  productSchema,
  productFilterSchema,
  reviewSchema,
};