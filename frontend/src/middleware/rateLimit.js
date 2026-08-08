/**
 * Rate Limiting Middleware (Simple in-memory implementation)
 * For production, consider using Redis or external service.
 */

const rateLimit = new Map();

/**
 * Simple rate limiter middleware
 * @param {Request} request - The incoming request
 * @param {Object} options - Options: { windowMs, max }
 * @returns {NextResponse|void} 429 response if rate limit exceeded
 */
export function rateLimitMiddleware(request, options = {}) {
  const { windowMs = 60000, max = 100 } = options; // 1 minute, 100 requests
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const key = `${ip}`;

  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean old entries
  if (rateLimit.has(key)) {
    const entry = rateLimit.get(key);
    if (entry.timestamp < windowStart) {
      rateLimit.set(key, { count: 1, timestamp: now });
      return NextResponse.next();
    }
    if (entry.count >= max) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
    rateLimit.set(key, { count: entry.count + 1, timestamp: now });
  } else {
    rateLimit.set(key, { count: 1, timestamp: now });
  }

  return NextResponse.next();
}

export default rateLimitMiddleware;