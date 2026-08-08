// frontend/src/utils/string.js

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize all words in a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized words
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Convert a string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} Kebab-case string
 */
export const toKebabCase = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Convert a string to snake_case
 * @param {string} str - The string to convert
 * @returns {string} Snake-case string
 */
export const toSnakeCase = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s_]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_');
};

/**
 * Convert a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} CamelCase string
 */
export const toCamelCase = (str) => {
  if (!str) return '';
  const words = str.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
  return words
    .map((word, index) => 
      index === 0 ? word : capitalize(word)
    )
    .join('');
};

/**
 * Convert a string to PascalCase
 * @param {string} str - The string to convert
 * @returns {string} PascalCase string
 */
export const toPascalCase = (str) => {
  if (!str) return '';
  const words = str.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
  return words.map(capitalize).join('');
};

/**
 * Slugify a string (for URLs)
 * @param {string} str - The string to slugify
 * @returns {string} Slugified string
 */
export const slugify = (str) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Truncate a string at word boundary
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
export const truncateAtWord = (str, maxLength = 50, suffix = '...') => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  const truncated = str.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + suffix;
};

/**
 * Count words in a string
 * @param {string} str - The string to count words in
 * @returns {number} Word count
 */
export const wordCount = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

/**
 * Count characters in a string (excluding spaces)
 * @param {string} str - The string to count characters in
 * @returns {number} Character count
 */
export const charCount = (str) => {
  if (!str) return 0;
  return str.replace(/\s/g, '').length;
};

/**
 * Check if a string is a valid slug
 * @param {string} str - The string to check
 * @returns {boolean} True if valid slug
 */
export const isValidSlug = (str) => {
  if (!str) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
};

/**
 * Extract domain from URL
 * @param {string} url - The URL to extract domain from
 * @returns {string} Domain
 */
export const extractDomain = (url) => {
  if (!url) return '';
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Mask a string (e.g., for sensitive data)
 * @param {string} str - The string to mask
 * @param {number} visibleStart - Number of visible characters at start
 * @param {number} visibleEnd - Number of visible characters at end
 * @param {string} maskChar - Mask character (default: '*')
 * @returns {string} Masked string
 */
export const maskString = (str, visibleStart = 2, visibleEnd = 2, maskChar = '*') => {
  if (!str || str.length <= visibleStart + visibleEnd) return str;
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const middle = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return start + middle + end;
};

export default {
  capitalize,
  capitalizeWords,
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  slugify,
  truncateAtWord,
  wordCount,
  charCount,
  isValidSlug,
  extractDomain,
  maskString,
};