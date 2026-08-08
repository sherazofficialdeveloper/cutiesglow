// frontend/src/utils/storage.js

import { STORAGE_KEYS } from '@/config/constants';

/**
 * Set item in localStorage
 * @param {string} key - The storage key
 * @param {any} value - The value to store (will be JSON stringified)
 */
export const setStorageItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
};

/**
 * Get item from localStorage
 * @param {string} key - The storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The stored value
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - The storage key
 */
export const removeStorageItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
  }
};

/**
 * Set session item in sessionStorage
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 */
export const setSessionItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`Error setting sessionStorage key "${key}":`, error);
  }
};

/**
 * Get session item from sessionStorage
 * @param {string} key - The storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The stored value
 */
export const getSessionItem = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error getting sessionStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove session item from sessionStorage
 * @param {string} key - The storage key
 */
export const removeSessionItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing sessionStorage key "${key}":`, error);
  }
};

/**
 * Clear all session items from sessionStorage
 */
export const clearSession = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.clear();
  } catch (error) {
    console.warn('Error clearing sessionStorage:', error);
  }
};

// ========== AUTH STORAGE HELPERS ==========

export const getAuthToken = () => getStorageItem(STORAGE_KEYS.TOKEN);
export const setAuthToken = (token) => setStorageItem(STORAGE_KEYS.TOKEN, token);
export const removeAuthToken = () => removeStorageItem(STORAGE_KEYS.TOKEN);

export const getUserData = () => getStorageItem(STORAGE_KEYS.USER);
export const setUserData = (user) => setStorageItem(STORAGE_KEYS.USER, user);
export const removeUserData = () => removeStorageItem(STORAGE_KEYS.USER);

export const clearAuthData = () => {
  removeAuthToken();
  removeUserData();
};

// ========== CART STORAGE HELPERS ==========

export const getCartItems = () => getStorageItem(STORAGE_KEYS.CART, []);
export const setCartItems = (items) => setStorageItem(STORAGE_KEYS.CART, items);

// ========== WISHLIST STORAGE HELPERS ==========

export const getWishlistItems = () => getStorageItem(STORAGE_KEYS.WISHLIST, []);
export const setWishlistItems = (items) => setStorageItem(STORAGE_KEYS.WISHLIST, items);

export default {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearStorage,
  setSessionItem,
  getSessionItem,
  removeSessionItem,
  clearSession,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserData,
  setUserData,
  removeUserData,
  clearAuthData,
  getCartItems,
  setCartItems,
  getWishlistItems,
  setWishlistItems,
};