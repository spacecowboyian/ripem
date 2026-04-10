import * as dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { getPool } from './db/client';

const PORT = parseInt(process.env.PORT || '3000', 10);

async function main() {
  // Verify DB connection on startup
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    console.log('[db] PostgreSQL connected');
  } catch (err) {
    console.error('[db] Failed to connect to PostgreSQL:', err);
    process.exit(1);
  }

  const app = createApp();

  const server = app.listen(PORT, () => {
    console.log(`[api] RipEm API running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    console.log(`[api] Base URL: ${process.env.API_BASE_URL || `http://localhost:${PORT}/v1`}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('[api] SIGTERM received, shutting down...');
    server.close(async () => {
      const pool = getPool();
      await pool.end();
      console.log('[api] Shutdown complete');
      process.exit(0);
    });
  });
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
