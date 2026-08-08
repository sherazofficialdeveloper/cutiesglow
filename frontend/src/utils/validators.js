// frontend/src/utils/validators.js

/**
 * Check if a value is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a value is a valid phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if valid phone number
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Check if a value is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid URL
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a value is a valid ZIP/Postal code
 * @param {string} zip - The ZIP code to validate
 * @param {string} country - Country code (default: 'US')
 * @returns {boolean} True if valid ZIP code
 */
export const isValidZip = (zip, country = 'US') => {
  if (!zip) return false;
  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/,
    UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
    PK: /^\d{5}$/,
  };
  const pattern = patterns[country] || patterns.US;
  return pattern.test(zip);
};

/**
 * Check if a password is strong enough
 * @param {string} password - The password to validate
 * @param {Object} options - Options: minLength, requireUppercase, requireLowercase, requireNumber, requireSpecial
 * @returns {Object} { isValid, errors: [] }
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = false,
    requireLowercase = false,
    requireNumber = false,
    requireSpecial = false,
  } = options;

  const errors = [];

  if (!password || password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Check if a value is a valid credit card number (Luhn algorithm)
 * @param {string} cardNumber - The credit card number to validate
 * @returns {boolean} True if valid credit card number
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber) return false;
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  // Luhn algorithm
  let sum = 0;
  let double = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
};

/**
 * Get credit card type from number
 * @param {string} cardNumber - The credit card number
 * @returns {string|null} Card type or null if unknown
 */
export const getCardType = (cardNumber) => {
  if (!cardNumber) return null;
  const cleaned = cardNumber.replace(/\D/g, '');
  const patterns = {
    visa: /^4\d{12}(\d{3})?$/,
    mastercard: /^(5[1-5]\d{14}|2(2[2-9][1-9]|[3-6]\d\d)\d{12})$/,
    amex: /^3[47]\d{13}$/,
    discover: /^6(?:011|5\d{2})\d{12}$/,
    diners: /^3(?:0[0-5]|[68]\d)\d{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) return type;
  }
  return null;
};

/**
 * Check if a value is a valid UUID
 * @param {string} uuid - The UUID to validate
 * @returns {boolean} True if valid UUID
 */
export const isValidUuid = (uuid) => {
  if (!uuid) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - The value to check
 * @returns {boolean} True if value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if a value is a valid number
 * @param {any} value - The value to check
 * @param {Object} options - Options: min, max
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value, options = {}) => {
  const { min, max } = options;
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

/**
 * Sanitize a string (remove special characters, trim)
 * @param {string} value - The string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (value) => {
  if (!value) return '';
  return value
    .trim()
    .replace(/[<>{}]/g, '')
    .replace(/\s+/g, ' ');
};

export default {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidZip,
  validatePassword,
  isValidCreditCard,
  getCardType,
  isValidUuid,
  isEmpty,
  isValidNumber,
  sanitizeString,
};