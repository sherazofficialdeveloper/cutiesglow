/**
 * Admin Authorization Middleware
 * Checks if user is authenticated and has admin role.
 */

import { NextResponse } from 'next/server';
import { STORAGE_KEYS, USER_ROLES } from '@/config/constants';
import { authMiddleware } from './auth';

/**
 * Middleware to protect admin routes
 * @param {Request} request - The incoming request
 * @param {Object} options - Options (redirectTo, etc.)
 * @returns {NextResponse|void}
 */
export function adminMiddleware(request, options = {}) {
  const { redirectTo = '/dashboard' } = options;

  // First, check authentication
  const authResult = authMiddleware(request);
  if (authResult) return authResult; // redirect if not authenticated

  // Check if user has admin role
  // In Next.js middleware, we can get user data from session/cookie
  // For simplicity, we assume user data is stored in cookie or we can decode JWT
  const userCookie = request.cookies.get(STORAGE_KEYS.USER)?.value;
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      if (user.role === USER_ROLES.ADMIN) {
        return NextResponse.next();
      }
    } catch {
      // parsing error
    }
  }

  // Not admin, redirect
  const url = new URL(redirectTo, request.url);
  return NextResponse.redirect(url);
}

/**
 * Higher-order function for client-side admin protection
 */
export function withAdmin(page) {
  return function AdminPage(props) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      if (!token || !userData) {
        window.location.href = '/login';
        return null;
      }
      try {
        const user = JSON.parse(userData);
        if (user.role !== USER_ROLES.ADMIN) {
          window.location.href = '/dashboard';
          return null;
        }
      } catch {
        window.location.href = '/login';
        return null;
      }
    }
    return page(props);
  };
}

export default adminMiddleware;