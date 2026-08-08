// frontend/src/utils/helpers.js

/**
 * Debounce a function call
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * Throttle a function call
 * @param {Function} fn - The function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone an object or array
 * @param {any} obj - The object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  const clonedObj = {};
  for (const key of Object.keys(obj)) {
    clonedObj[key] = deepClone(obj[key]);
  }
  return clonedObj;
};

/**
 * Generate a random ID
 * @param {number} length - Length of the ID (default: 8)
 * @param {string} prefix - Prefix to add (default: '')
 * @returns {string} Random ID
 */
export const generateId = (length = 8, prefix = '') => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + result;
};

/**
 * Sleep for a given time
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after the timeout
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get the difference between two objects
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {Object} Object with differences
 */
export const objectDiff = (obj1, obj2) => {
  const diff = {};
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
  for (const key of allKeys) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = {
        from: obj1[key],
        to: obj2[key],
      };
    }
  }
  return diff;
};

/**
 * Check if an object is empty
 * @param {Object} obj - The object to check
 * @returns {boolean} True if object is empty
 */
export const isObjectEmpty = (obj) => {
  if (!obj || typeof obj !== 'object') return true;
  return Object.keys(obj).length === 0;
};

/**
 * Get the value from a nested object using dot notation
 * @param {Object} obj - The object to traverse
 * @param {string} path - Dot notation path (e.g., 'user.profile.name')
 * @param {any} defaultValue - Default value if path doesn't exist
 * @returns {any} The value at the path
 */
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  if (!obj || typeof obj !== 'object') return defaultValue;
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  return result;
};

/**
 * Set a value in a nested object using dot notation
 * @param {Object} obj - The object to modify
 * @param {string} path - Dot notation path
 * @param {any} value - The value to set
 * @returns {Object} Modified object (creates a new copy)
 */
export const setNestedValue = (obj, path, value) => {
  const result = { ...obj };
  const keys = path.split('.');
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return result;
};

/**
 * Convert an object to query string
 * @param {Object} params - Object with parameters
 * @returns {string} Query string
 */
export const toQueryString = (params) => {
  if (!params || typeof params !== 'object') return '';
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

/**
 * Parse query string to object
 * @param {string} query - Query string
 * @returns {Object} Parsed parameters
 */
export const parseQueryString = (query) => {
  if (!query) return {};
  const params = {};
  const searchParams = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
};

/**
 * Get browser / device info
 * @returns {Object} Device info
 */
export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }
  const width = window.innerWidth;
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    width,
    height: window.innerHeight,
  };
};

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
  if (!navigator?.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export default {
  debounce,
  throttle,
  deepClone,
  generateId,
  sleep,
  objectDiff,
  isObjectEmpty,
  getNestedValue,
  setNestedValue,
  toQueryString,
  parseQueryString,
  getDeviceInfo,
  copyToClipboard,
};