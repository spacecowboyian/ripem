import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import * as Sentry from '@sentry/node';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.errorCode,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
    return;
  }

  // Unexpected errors — capture in Sentry and return 500
  Sentry.captureException(err);
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'internal_server_error',
    message: 'An unexpected error occurred',
  });
}
