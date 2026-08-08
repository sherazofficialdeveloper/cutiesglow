// frontend/src/validations/sanitizers.js

/**
 * Sanitize input strings (trim, remove extra spaces)
 * @param {string} value - The input to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeString = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitize email (trim, lowercase)
 * @param {string} email - The email to sanitize
 * @returns {string} Sanitized email
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
};

/**
 * Sanitize phone number (remove non-digit characters)
 * @param {string} phone - The phone number to sanitize
 * @returns {string} Sanitized phone number
 */
export const sanitizePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/\D/g, '');
};

/**
 * Sanitize slug (lowercase, only letters, numbers, hyphens)
 * @param {string} slug - The slug to sanitize
 * @returns {string} Sanitized slug
 */
export const sanitizeSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Sanitize HTML content (remove dangerous tags)
 * @param {string} html - The HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  // Simple sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/javascript:/gi, '');
};

/**
 * Sanitize URL (validate and clean)
 * @param {string} url - The URL to sanitize
 * @returns {string} Sanitized URL or empty string if invalid
 */
export const sanitizeUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    return parsed.toString();
  } catch {
    // If no protocol, try adding https://
    try {
      const parsed = new URL(`https://${trimmed}`);
      return parsed.toString();
    } catch {
      return '';
    }
  }
};

/**
 * Sanitize number (convert to number, clamp between min and max)
 * @param {any} value - The value to sanitize
 * @param {number} min - Minimum value (optional)
 * @param {number} max - Maximum value (optional)
 * @returns {number} Sanitized number
 */
export const sanitizeNumber = (value, min = undefined, max = undefined) => {
  const num = parseFloat(value);
  if (isNaN(num)) return 0;
  let result = num;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  return result;
};

/**
 * Sanitize array (ensure it's an array, remove empty values)
 * @param {any} value - The value to sanitize
 * @param {boolean} removeEmpty - Whether to remove empty values
 * @returns {Array} Sanitized array
 */
export const sanitizeArray = (value, removeEmpty = true) => {
  if (!Array.isArray(value)) return [];
  if (!removeEmpty) return [...value];
  return value.filter(item => item !== null && item !== undefined && item !== '');
};

/**
 * Sanitize object (remove keys with null/undefined/empty values)
 * @param {Object} obj - The object to sanitize
 * @param {Array} keepKeys - Keys to keep even if empty (optional)
 * @returns {Object} Sanitized object
 */
export const sanitizeObject = (obj, keepKeys = []) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (keepKeys.includes(key)) {
      result[key] = value;
      continue;
    }
    if (value !== null && value !== undefined && value !== '') {
      result[key] = typeof value === 'string' ? sanitizeString(value) : value;
    }
  }
  return result;
};

/**
 * Sanitize all inputs in an object
 * @param {Object} data - The data object to sanitize
 * @param {Object} rules - Sanitization rules for each field
 * @returns {Object} Sanitized data
 */
export const sanitizeData = (data, rules = {}) => {
  if (!data || typeof data !== 'object') return {};
  
  const result = { ...data };
  const defaultRules = {
    email: sanitizeEmail,
    phone: sanitizePhone,
    slug: sanitizeSlug,
    url: sanitizeUrl,
    html: sanitizeHtml,
    number: sanitizeNumber,
    string: sanitizeString,
  };

  for (const [field, value] of Object.entries(result)) {
    const rule = rules[field] || 'string';
    if (typeof rule === 'function') {
      result[field] = rule(value);
    } else if (defaultRules[rule]) {
      result[field] = defaultRules[rule](value);
    } else {
      result[field] = sanitizeString(value);
    }
  }

  return result;
};

export default {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeSlug,
  sanitizeHtml,
  sanitizeUrl,
  sanitizeNumber,
  sanitizeArray,
  sanitizeObject,
  sanitizeData,
};