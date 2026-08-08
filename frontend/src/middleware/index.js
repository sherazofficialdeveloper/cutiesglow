export { default as authMiddleware, withAuth } from './auth';
export { default as adminMiddleware, withAdmin } from './admin';
export { default as rateLimitMiddleware } from './rateLimit';

// Helper to combine middleware functions (compose)
export function composeMiddleware(...middlewares) {
  return (request, options) => {
    for (const middleware of middlewares) {
      const result = middleware(request, options);
      if (result) return result; // if any middleware returns a response, stop chain
    }
    return NextResponse.next();
  };
}