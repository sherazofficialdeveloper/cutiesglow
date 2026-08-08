/**
 * Authentication Middleware
 * Checks if user is authenticated, redirects to login if not.
 * Can be used in layouts, pages, or API routes.
 */

import { NextResponse } from 'next/server';
import { STORAGE_KEYS } from '@/config/constants';

/**
 * Middleware to protect routes requiring authentication
 * @param {Request} request - The incoming request
 * @param {Object} options - Options (e.g., redirectTo)
 * @returns {NextResponse|void} Redirect response or void to continue
 */
export function authMiddleware(request, options = {}) {
  const { redirectTo = '/login' } = options;

  // For client-side, we use cookies or localStorage, but in middleware we check cookies
  const token = request.cookies.get(STORAGE_KEYS.TOKEN)?.value;

  if (!token) {
    // If no token, redirect to login
    const url = new URL(redirectTo, request.url);
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If token exists, we could verify it with backend here (optional)
  // For now, just allow
  return NextResponse.next();
}

/**
 * Higher-order function to wrap getServerSideProps or page components for client-side protection.
 * @param {function} page - The page component
 * @returns {function} Wrapped page with auth check
 */
export function withAuth(page) {
  return function AuthPage(props) {
    // Client-side check using localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (!token) {
        window.location.href = '/login';
        return null;
      }
    }
    return page(props);
  };
}

export default authMiddleware;