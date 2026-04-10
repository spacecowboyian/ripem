import rateLimit from 'express-rate-limit';

// Default: 100 req/hour for free tier (applies to all unauthenticated/general routes)
export const defaultRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'rate_limited',
    message: 'Too many requests, please try again later',
  },
});

// Stricter limiter for auth endpoints (prevent brute force)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'rate_limited',
    message: 'Too many auth attempts, please try again later',
  },
});
