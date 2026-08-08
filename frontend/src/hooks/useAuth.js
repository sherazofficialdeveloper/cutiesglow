'use client';

import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';

/**
 * Custom hook to access authentication state and methods
 * @returns {Object} { user, loading, isAuthenticated, login, register, logout, updateProfile, isAdmin }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;