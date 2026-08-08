// backend/src/utils/validators.js

/**
 * Check if a string is a valid email
 * @param {string} email - Email to check
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a string is a valid phone number
 * @param {string} phone - Phone to check
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Check if a string is a valid URL
 * @param {string} url - URL to check
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a string is a valid MongoDB ObjectId
 * @param {string} id - ID to check
 * @returns {boolean} True if valid
 */
export const isValidObjectId = (id) => {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Check if a value is a valid number
 * @param {*} value - Value to check
 * @param {Object} options - Options { min, max }
 * @returns {boolean} True if valid
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
 * Check if a value is a valid date
 * @param {*} value - Value to check
 * @returns {boolean} True if valid
 */
export const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export default {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidObjectId,
  isValidNumber,
  isValidDate,
};