'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - Fallback value if key doesn't exist
 * @returns {[any, function]} state and setter
 */
export const useLocalStorage = (key, initialValue) => {
  // Get stored value
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Update localStorage when state changes
  const setValue = (value) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" while server-side.`);
      return;
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      // Dispatch a custom event so other hooks can react
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen to changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', () => setStoredValue(readValue()));
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', () => setStoredValue(readValue()));
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;