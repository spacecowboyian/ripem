import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as authService from '../services/authService';
import { authenticate } from '../middleware/authenticate';
import { authRateLimiter } from '../middleware/rateLimiter';
import { AuthenticatedRequest } from '../types';
import { ValidationError } from '../utils/errors';

const router = Router();

// ─── Validation schemas ───────────────────────────────────────────────────────

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  display_name: z.string().max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const googleOAuthSchema = z.object({
  id_token: z.string().min(1),
});

const appleOAuthSchema = z.object({
  identity_token: z.string().min(1),
  user_identifier: z.string().min(1),
});

const refreshSchema = z.object({
  refresh_token: z.string().min(1),
});

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /auth/register
 * Register with email + password
 */
router.post(
  '/register',
  authRateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = registerSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Invalid request body', body.error.flatten().fieldErrors as Record<string, unknown>);
      }

      const result = await authService.register(
        body.data.email,
        body.data.password,
        body.data.display_name
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/login
 */
router.post(
  '/login',
  authRateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = loginSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Invalid request body', body.error.flatten().fieldErrors as Record<string, unknown>);
      }

      const result = await authService.login(body.data.email, body.data.password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/oauth/google
 */
router.post(
  '/oauth/google',
  authRateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = googleOAuthSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Missing id_token');
      }

      const result = await authService.googleOAuth(body.data.id_token);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/oauth/apple
 */
router.post(
  '/oauth/apple',
  authRateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = appleOAuthSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Missing identity_token or user_identifier');
      }

      const result = await authService.appleOAuth(
        body.data.identity_token,
        body.data.user_identifier
      );
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/refresh
 */
router.post(
  '/refresh',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = refreshSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Missing refresh_token');
      }

      const result = await authService.refreshAccessToken(body.data.refresh_token);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/logout
 */
router.post(
  '/logout',
  authenticate,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { refresh_token } = req.body;
      await authService.logout(req.user!.id, refresh_token);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
