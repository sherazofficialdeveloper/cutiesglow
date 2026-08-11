
'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getMe,
} from '@/services/authService';

import { STORAGE_KEYS } from '@/config/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  /**
   * =========================================================
   * LOAD CURRENT USER
   * =========================================================
   *
   * Token localStorage mein hota hai.
   * getMe() backend se current user verify karta hai.
   */
  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (!token) {
        setUser(null);
        return;
      }

      const response = await getMe();

      /**
       * Backend response:
       *
       * {
       *   success: true,
       *   data: {
       *     user: {...}
       *   }
       * }
       *
       * Isliye user response.data.user mein hai.
       */
      const currentUser = response?.data?.user || response?.user || null;

      if (currentUser) {
        setUser(currentUser);

        // Keep localStorage user data synchronized
        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(currentUser)
        );
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);

      // Token is invalid/expired or user no longer exists
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * =========================================================
   * INITIAL AUTH CHECK
   * =========================================================
   */
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /**
   * =========================================================
   * ROUTE PROTECTION
   * =========================================================
   *
   * By default every route is PUBLIC.
   *
   * Only these route groups require authentication:
   *
   * /dashboard/*
   * /admin/*
   *
   * This means new public pages do not need to be added
   * anywhere in this file.
   */
  useEffect(() => {
    if (loading) return;

    const currentPath = pathname || '/';

    /**
     * Authentication pages
     */
    const isAuthPage =
      currentPath === '/login' ||
      currentPath === '/register';

    /**
     * User private routes
     */
    const isDashboardRoute =
      currentPath === '/dashboard' ||
      currentPath.startsWith('/dashboard/');

    /**
     * Admin private routes
     */
    const isAdminRoute =
      currentPath === '/admin' ||
      currentPath.startsWith('/admin/');

    /**
     * =======================================================
     * PUBLIC ROUTES
     * =======================================================
     *
     * Everything that is NOT dashboard/admin is public.
     *
     * We intentionally do not maintain a long public-path list.
     * This prevents new public pages from accidentally becoming
     * protected.
     */

    /**
     * Reset-password and other auth pages should never be
     * redirected by private-route logic.
     */
    if (
      currentPath === '/forgot-password' ||
      currentPath.startsWith('/forgot-password/') ||
      currentPath === '/reset-password' ||
      currentPath.startsWith('/reset-password/') ||
      currentPath === '/verify-email' ||
      currentPath.startsWith('/verify-email/')
    ) {
      return;
    }

    /**
     * =======================================================
     * LOGGED-IN USER ON LOGIN / REGISTER
     * =======================================================
     */
    if (user && isAuthPage) {
      router.replace('/dashboard');
      return;
    }

    /**
     * =======================================================
     * DASHBOARD PROTECTION
     * =======================================================
     */
    if (isDashboardRoute && !user) {
      router.replace('/login');
      return;
    }

    /**
     * =======================================================
     * ADMIN PROTECTION
     * =======================================================
     */
    if (isAdminRoute) {
      /**
       * Not logged in
       */
      if (!user) {
        router.replace('/login');
        return;
      }

      /**
       * Logged in but not admin
       */
      if (user.role !== 'admin') {
        router.replace('/dashboard');
        return;
      }
    }

    /**
     * =======================================================
     * PUBLIC ROUTES
     * =======================================================
     *
     * No redirect.
     */
  }, [user, loading, pathname, router]);

  /**
   * =========================================================
   * LOGIN
   * =========================================================
   */
  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);

      /**
       * authService.login() returns response.data
       *
       * Backend:
       * {
       *   success: true,
       *   data: {
       *     user,
       *     token
       *   }
       * }
       */
      const token = response?.data?.token;
      const loggedInUser = response?.data?.user;

      if (!token || !loggedInUser) {
        throw new Error('Invalid login response from server.');
      }

      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  };

  /**
   * =========================================================
   * REGISTER
   * =========================================================
   */
  const register = async (name, email, password) => {
    try {
      const response = await apiRegister(
        name,
        email,
        password
      );

      /**
       * Register response has the same structure:
       *
       * response.data.token
       * response.data.user
       */
      const token = response?.data?.token;
      const registeredUser = response?.data?.user;

      if (token && registeredUser) {
        localStorage.setItem(
          STORAGE_KEYS.TOKEN,
          token
        );

        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(registeredUser)
        );

        setUser(registeredUser);
      }

      return response;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  };

  /**
   * =========================================================
   * LOGOUT
   * =========================================================
   */
  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      /**
       * Backend logout failure should not prevent local logout.
       */
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      setUser(null);

      /**
       * If user is currently inside a private route,
       * send them to login.
       */
      if (
        pathname === '/dashboard' ||
        pathname.startsWith('/dashboard/') ||
        pathname === '/admin' ||
        pathname.startsWith('/admin/')
      ) {
        router.replace('/login');
      }
    }
  };

  /**
   * =========================================================
   * AUTH STATUS
   * =========================================================
   */
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

