// frontend/src/utils/array.js

/**
 * Group an array by a key
 * @param {Array} arr - The array to group
 * @param {string|Function} key - The key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (arr, key) => {
  if (!Array.isArray(arr) || !arr.length) return {};
  
  const getKey = typeof key === 'function' ? key : (item) => item[key];
  
  return arr.reduce((groups, item) => {
    const groupKey = getKey(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Chunk an array into smaller arrays
 * @param {Array} arr - The array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
export const chunk = (arr, size) => {
  if (!Array.isArray(arr) || size < 1) return [];
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * @param {Array} arr - The array to shuffle
 * @returns {Array} Shuffled array (new array)
 */
export const shuffle = (arr) => {
  if (!Array.isArray(arr)) return [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Sort an array by a key
 * @param {Array} arr - The array to sort
 * @param {string|Function} key - The key to sort by
 * @param {string} order - 'asc' or 'desc' (default: 'asc')
 * @returns {Array} Sorted array (new array)
 */
export const sortBy = (arr, key, order = 'asc') => {
  if (!Array.isArray(arr)) return [];
  
  const getValue = typeof key === 'function' ? key : (item) => item[key];
  
  return [...arr].sort((a, b) => {
    const aVal = getValue(a);
    const bVal = getValue(b);
    
    if (aVal === bVal) return 0;
    if (order === 'asc') {
      return aVal < bVal ? -1 : 1;
    }
    return aVal < bVal ? 1 : -1;
  });
};

/**
 * Filter duplicate items from an array
 * @param {Array} arr - The array to deduplicate
 * @param {string|Function} key - The key to compare (optional)
 * @returns {Array} Deduplicated array
 */
export const unique = (arr, key = null) => {
  if (!Array.isArray(arr)) return [];
  
  if (!key) {
    return [...new Set(arr)];
  }
  
  const getKey = typeof key === 'function' ? key : (item) => item[key];
  const seen = new Set();
  return arr.filter((item) => {
    const value = getKey(item);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Intersection of two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @param {string|Function} key - The key to compare (optional)
 * @returns {Array} Intersection
 */
export const intersection = (arr1, arr2, key = null) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  
  const getKey = typeof key === 'function' ? key : (item) => (key ? item[key] : item);
  const set2 = new Set(arr2.map(getKey));
  
  return arr1.filter(item => set2.has(getKey(item)));
};

/**
 * Difference of two arrays (items in arr1 not in arr2)
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @param {string|Function} key - The key to compare (optional)
 * @returns {Array} Difference
 */
export const difference = (arr1, arr2, key = null) => {
  if (!Array.isArray(arr1)) return [];
  if (!Array.isArray(arr2)) return [...arr1];
  
  const getKey = typeof key === 'function' ? key : (item) => (key ? item[key] : item);
  const set2 = new Set(arr2.map(getKey));
  
  return arr1.filter(item => !set2.has(getKey(item)));
};

/**
 * Pick random items from an array
 * @param {Array} arr - The array
 * @param {number} count - Number of items to pick (default: 1)
 * @returns {Array} Random items
 */
export const randomPick = (arr, count = 1) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (count >= arr.length) return shuffle(arr);
  
  const shuffled = shuffle(arr);
  return shuffled.slice(0, count);
};

/**
 * Sum all values in an array
 * @param {Array} arr - The array
 * @param {string|Function} key - The key to sum (optional)
 * @returns {number} Sum
 */
export const sum = (arr, key = null) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  
  if (!key) {
    return arr.reduce((total, val) => total + (Number(val) || 0), 0);
  }
  
  const getValue = typeof key === 'function' ? key : (item) => item[key];
  return arr.reduce((total, item) => total + (Number(getValue(item)) || 0), 0);
};

/**
 * Average of values in an array
 * @param {Array} arr - The array
 * @param {string|Function} key - The key to average (optional)
 * @returns {number} Average
 */
export const average = (arr, key = null) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const total = sum(arr, key);
  return total / arr.length;
};

/**
 * Flatten a nested array
 * @param {Array} arr - The array to flatten
 * @param {number} depth - Depth to flatten (default: Infinity)
 * @returns {Array} Flattened array
 */
export const flatten = (arr, depth = Infinity) => {
  if (!Array.isArray(arr)) return [];
  return arr.flat(depth);
};

/**
 * Move an item in an array from one index to another
 * @param {Array} arr - The array
 * @param {number} from - Start index
 * @param {number} to - Target index
 * @returns {Array} New array with moved item
 */
export const moveItem = (arr, from, to) => {
  if (!Array.isArray(arr) || from < 0 || to < 0 || from >= arr.length || to >= arr.length) {
    return arr;
  }
  const result = [...arr];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
};

export default {
  groupBy,
  chunk,
  shuffle,
  sortBy,
  unique,
  intersection,
  difference,
  randomPick,
  sum,
  average,
  flatten,
  moveItem,
};