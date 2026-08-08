// frontend/src/validations/adminValidation.js

import { isValidEmail, isValidNumber, isValidUrl } from '@/utils/validators';
import { CATEGORIES, ORDER_STATUS } from '@/config/constants';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Category validation schema
 */
export const categorySchema = {
  name: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 50,
    message: VALIDATION_MESSAGES.CATEGORY_NAME,
  },
  slug: {
    required: false,
    validator: (value) => !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value),
    message: VALIDATION_MESSAGES.INVALID_SLUG,
  },
  description: {
    required: false,
    validator: (value) => !value || value.length <= 500,
    message: VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG,
  },
  image: {
    required: false,
    validator: (value) => !value || isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
};

/**
 * Banner validation schema
 */
export const bannerSchema = {
  title: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 100,
    message: VALIDATION_MESSAGES.BANNER_TITLE,
  },
  image: {
    required: true,
    validator: (value) => isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
  link: {
    required: false,
    validator: (value) => !value || isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_URL,
  },
  type: {
    required: true,
    validator: (value) => ['hero', 'promo', 'instagram'].includes(value),
    message: VALIDATION_MESSAGES.INVALID_BANNER_TYPE,
  },
  isActive: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
};

/**
 * Before/After validation schema
 */
export const beforeAfterSchema = {
  beforeImage: {
    required: true,
    validator: (value) => isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
  afterImage: {
    required: true,
    validator: (value) => isValidUrl(value),
    message: VALIDATION_MESSAGES.INVALID_IMAGE_URL,
  },
  description: {
    required: true,
    validator: (value) => value && value.length >= 5 && value.length <= 200,
    message: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
  },
};

/**
 * Video validation schema
 */
export const videoSchema = {
  title: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 100,
    message: VALIDATION_MESSAGES.VIDEO_TITLE,
  },
  url: {
    required: true,
    validator: (value) => isValidUrl(value) && value.includes('youtube.com') || value.includes('youtu.be') || value.includes('vimeo.com'),
    message: VALIDATION_MESSAGES.INVALID_VIDEO_URL,
  },
  type: {
    required: true,
    validator: (value) => ['homepage', 'product'].includes(value),
    message: VALIDATION_MESSAGES.INVALID_VIDEO_TYPE,
  },
};

/**
 * Coupon validation schema
 */
export const couponSchema = {
  code: {
    required: true,
    validator: (value) => value && value.length >= 3 && value.length <= 20,
    message: VALIDATION_MESSAGES.COUPON_CODE,
  },
  type: {
    required: true,
    validator: (value) => ['percentage', 'fixed'].includes(value),
    message: VALIDATION_MESSAGES.INVALID_COUPON_TYPE,
  },
  value: {
    required: true,
    validator: (value) => isValidNumber(value, { min: 0 }),
    message: VALIDATION_MESSAGES.INVALID_COUPON_VALUE,
  },
  maxUses: {
    required: false,
    validator: (value) => !value || isValidNumber(value, { min: 1 }),
    message: VALIDATION_MESSAGES.INVALID_MAX_USES,
  },
  expiresAt: {
    required: false,
    validator: (value) => !value || !isNaN(Date.parse(value)),
    message: VALIDATION_MESSAGES.INVALID_DATE,
  },
  isActive: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
};

/**
 * Settings validation schema
 */
export const settingsSchema = {
  siteName: {
    required: true,
    validator: (value) => value && value.length >= 2 && value.length <= 50,
    message: VALIDATION_MESSAGES.SITE_NAME,
  },
  tagline: {
    required: false,
    validator: (value) => !value || value.length <= 100,
    message: VALIDATION_MESSAGES.TAGLINE_TOO_LONG,
  },
  contactEmail: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  contactPhone: {
    required: false,
    validator: (value) => !value || isValidPhone(value),
    message: VALIDATION_MESSAGES.INVALID_PHONE,
  },
  address: {
    required: false,
    validator: (value) => !value || value.length <= 200,
    message: VALIDATION_MESSAGES.ADDRESS_TOO_LONG,
  },
  zelleEmail: {
    required: false,
    validator: (value) => !value || isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
  zellePhone: {
    required: false,
    validator: (value) => !value || isValidPhone(value),
    message: VALIDATION_MESSAGES.INVALID_PHONE,
  },
  paypalClientId: {
    required: false,
    validator: (value) => !value || value.length >= 10,
    message: VALIDATION_MESSAGES.INVALID_PAYPAL_CLIENT_ID,
  },
  paypalMode: {
    required: false,
    validator: (value) => !value || ['sandbox', 'live'].includes(value),
    message: VALIDATION_MESSAGES.INVALID_PAYPAL_MODE,
  },
};

export default {
  categorySchema,
  bannerSchema,
  beforeAfterSchema,
  videoSchema,
  couponSchema,
  settingsSchema,
};