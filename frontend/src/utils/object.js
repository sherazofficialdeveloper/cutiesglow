// frontend/src/utils/object.js

/**
 * Pick specific keys from an object
 * @param {Object} obj - The source object
 * @param {Array} keys - Keys to pick
 * @returns {Object} New object with picked keys
 */
export const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Omit specific keys from an object
 * @param {Object} obj - The source object
 * @param {Array} keys - Keys to omit
 * @returns {Object} New object without omitted keys
 */
export const omit = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

/**
 * Merge two objects deeply
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export const deepMerge = (target, source) => {
  if (!target || typeof target !== 'object') return source;
  if (!source || typeof source !== 'object') return target;
  
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];
    
    if (Array.isArray(sourceVal)) {
      result[key] = [...sourceVal];
    } else if (sourceVal && typeof sourceVal === 'object') {
      result[key] = deepMerge(
        targetVal && typeof targetVal === 'object' ? targetVal : {},
        sourceVal
      );
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
};

/**
 * Check if two objects are equal (deep equality)
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {boolean} True if objects are equal
 */
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  return true;
};

/**
 * Transform object keys to camelCase
 * @param {Object} obj - The object to transform
 * @returns {Object} New object with camelCase keys
 */
export const keysToCamel = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(keysToCamel);
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    result[camelKey] = typeof value === 'object' ? keysToCamel(value) : value;
  }
  return result;
};

/**
 * Transform object keys to snake_case
 * @param {Object} obj - The object to transform
 * @returns {Object} New object with snake_case keys
 */
export const keysToSnake = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(keysToSnake);
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/([A-Z])/g, (_, char) => `_${char.toLowerCase()}`);
    result[snakeKey] = typeof value === 'object' ? keysToSnake(value) : value;
  }
  return result;
};

/**
 * Invert object keys and values
 * @param {Object} obj - The object to invert
 * @returns {Object} Inverted object
 */
export const invert = (obj) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }
  return result;
};

/**
 * Get object keys as array
 * @param {Object} obj - The object
 * @returns {Array} Array of keys
 */
export const keys = (obj) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.keys(obj);
};

/**
 * Get object values as array
 * @param {Object} obj - The object
 * @returns {Array} Array of values
 */
export const values = (obj) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.values(obj);
};

/**
 * Get object entries as array of [key, value] pairs
 * @param {Object} obj - The object
 * @returns {Array} Array of [key, value] pairs
 */
export const entries = (obj) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj);
};

/**
 * Map over an object
 * @param {Object} obj - The object to map over
 * @param {Function} fn - Mapping function (key, value) => newValue
 * @returns {Object} New object with mapped values
 */
export const mapValues = (obj, fn) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key, obj);
  }
  return result;
};

/**
 * Filter an object by a predicate
 * @param {Object} obj - The object to filter
 * @param {Function} predicate - Filter function (key, value) => boolean
 * @returns {Object} Filtered object
 */
export const filterKeys = (obj, predicate) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value, key, obj)) {
      result[key] = value;
    }
  }
  return result;
};

export default {
  pick,
  omit,
  deepMerge,
  deepEqual,
  keysToCamel,
  keysToSnake,
  invert,
  keys,
  values,
  entries,
  mapValues,
  filterKeys,
};