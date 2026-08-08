// frontend/src/validations/userValidation.js

import { isValidEmail, isValidPhone, isValidNumber, isValidZip } from '@/utils/validators';
import { VALIDATION_MESSAGES } from './messages';

/**
 * Address validation schema
 */
export const addressSchema = {
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
    validator: (value) => isValidZip(value),
    message: VALIDATION_MESSAGES.INVALID_ZIP,
  },
  country: {
    required: true,
    validator: (value) => value && value.length >= 2,
    message: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
  },
  isDefault: {
    required: false,
    validator: (value) => typeof value === 'boolean',
    message: VALIDATION_MESSAGES.INVALID_BOOLEAN,
  },
};

/**
 * User profile update validation schema
 */
export const userProfileSchema = {
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
  avatar: {
    required: false,
    validator: (value) => !value || /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)/i.test(value),
    message: VALIDATION_MESSAGES.INVALID_AVATAR_URL,
  },
};

/**
 * Password change validation schema
 */
export const passwordChangeSchema = {
  currentPassword: {
    required: true,
    validator: (value) => value && value.length >= 6,
    message: VALIDATION_MESSAGES.CURRENT_PASSWORD_REQUIRED,
  },
  newPassword: {
    required: true,
    validator: (value) => {
      const result = validatePassword(value, {
        minLength: 6,
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
    validator: (value, formData) => value === formData?.newPassword,
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
  },
};

/**
 * Newsletter subscription validation
 */
export const newsletterSchema = {
  email: {
    required: true,
    validator: (value) => isValidEmail(value),
    message: VALIDATION_MESSAGES.INVALID_EMAIL,
  },
};

export default {
  addressSchema,
  userProfileSchema,
  passwordChangeSchema,
  newsletterSchema,
};