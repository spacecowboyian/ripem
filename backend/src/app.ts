import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';

import { errorHandler } from './middleware/errorHandler';
import { defaultRateLimiter } from './middleware/rateLimiter';

import healthRouter from './routes/health';
import authRouter from './routes/auth';
import garageRouter from './routes/garage';
import aiRouter from './routes/ai';

export function createApp(): express.Application {
  const app = express();

  // ─── Sentry (must be first) ─────────────────────────────────────────────────
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 0.2,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }

  // ─── Security / Parsing ─────────────────────────────────────────────────────
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ─── Rate Limiting ──────────────────────────────────────────────────────────
  app.use(defaultRateLimiter);

  // ─── Routes ─────────────────────────────────────────────────────────────────
  const V1 = '/v1';

  app.use(`${V1}/health`, healthRouter);
  app.use(`${V1}/auth`, authRouter);
  app.use(`${V1}/garages`, garageRouter);
  app.use(`${V1}/ai`, aiRouter);

  // ─── 404 Handler ────────────────────────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({
      error: 'not_found',
      message: 'Endpoint not found',
    });
  });

  // ─── Sentry error handler (before custom error handler) ────────────────────
  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
  }

  // ─── Error Handler ──────────────────────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
