'use client';

import { useContext } from 'react';
import ToastContext from '@/contexts/ToastContext';

/**
 * Custom hook to access toast notification methods
 * @returns {Object} { showToast, showSuccess, showError, showWarning, showInfo }
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default useToast;