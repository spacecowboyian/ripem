import { Router, Request, Response } from 'express';
import { getPool } from '../db/client';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    // Check database connectivity
    const pool = getPool();
    await pool.query('SELECT 1');

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    });
  } catch {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
