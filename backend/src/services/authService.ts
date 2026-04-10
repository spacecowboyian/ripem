import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../db/client';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiry,
} from '../utils/jwt';
import {
  ConflictError,
  UnauthorizedError,
  ValidationError,
} from '../utils/errors';
import { User } from '../types';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface AuthResult {
  user_id: string;
  auth_token: string;
  refresh_token?: string;
  expires_in: number;
  is_new_user?: boolean;
}

// ─── Email / Password ─────────────────────────────────────────────────────────

export async function register(
  email: string,
  password: string,
  display_name?: string
): Promise<AuthResult> {
  // Check existing
  const existing = await db.query<User>(
    'SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL',
    [email.toLowerCase()]
  );
  if (existing.rows.length > 0) {
    throw new ConflictError('Email already registered');
  }

  const password_hash = await bcrypt.hash(password, 12);
  const userId = uuidv4();

  await db.withTransaction(async (client) => {
    await client.query(
      `INSERT INTO users (id, email, auth_type, password_hash, display_name)
       VALUES ($1, $2, 'email', $3, $4)`,
      [userId, email.toLowerCase(), password_hash, display_name || null]
    );

    // Auto-create a free subscription
    await client.query(
      `INSERT INTO subscriptions (id, user_id, subscription_type, status, platform)
       VALUES ($1, $2, 'free', 'active', 'ios')`,
      [uuidv4(), userId]
    );
  });

  const { auth_token, refresh_token } = await issueTokens(userId, email, 'email');

  return { user_id: userId, auth_token, refresh_token, expires_in: 3600 };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const result = await db.query<User>(
    `SELECT id, email, auth_type, password_hash FROM users
     WHERE email = $1 AND deleted_at IS NULL`,
    [email.toLowerCase()]
  );

  const user = result.rows[0];
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  if (user.auth_type !== 'email' || !user.password_hash) {
    throw new UnauthorizedError(`This account uses ${user.auth_type} sign-in`);
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const { auth_token, refresh_token } = await issueTokens(user.id, user.email, 'email');
  return { user_id: user.id, auth_token, refresh_token, expires_in: 3600 };
}

// ─── OAuth: Google ────────────────────────────────────────────────────────────

export async function googleOAuth(idToken: string): Promise<AuthResult> {
  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch {
    throw new ValidationError('Invalid Google ID token');
  }

  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new ValidationError('Google token missing email');
  }

  const { email, name, picture } = payload;

  // Upsert user
  const { userId, isNew } = await upsertOAuthUser(
    email,
    'google',
    name,
    picture
  );

  const { auth_token, refresh_token } = await issueTokens(userId, email, 'google');
  return { user_id: userId, auth_token, refresh_token, expires_in: 3600, is_new_user: isNew };
}

// ─── OAuth: Apple ─────────────────────────────────────────────────────────────

export async function appleOAuth(
  identityToken: string,
  userIdentifier: string
): Promise<AuthResult> {
  // Decode the Apple identity token (JWT) to extract email/sub
  // Apple tokens are signed by Apple's public key; verify using jwks-rsa
  const { JwksClient } = await import('jwks-rsa');
  const jwksClient = new JwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys',
  });

  const jwt = await import('jsonwebtoken');

  // Decode header to get kid
  const decoded = jwt.decode(identityToken, { complete: true });
  if (!decoded || typeof decoded === 'string') {
    throw new ValidationError('Invalid Apple identity token');
  }

  const kid = decoded.header.kid;
  const key = await jwksClient.getSigningKey(kid);
  const publicKey = key.getPublicKey();

  let applePayload: Record<string, unknown>;
  try {
    applePayload = jwt.verify(identityToken, publicKey, {
      algorithms: ['RS256'],
      issuer: 'https://appleid.apple.com',
      audience: process.env.APPLE_APP_ID,
    }) as Record<string, unknown>;
  } catch {
    throw new ValidationError('Apple identity token verification failed');
  }

  const email = (applePayload.email as string) || `${userIdentifier}@privaterelay.appleid.com`;
  const sub = applePayload.sub as string;

  if (!sub) {
    throw new ValidationError('Apple token missing subject');
  }

  const { userId, isNew } = await upsertOAuthUser(email, 'apple');
  const { auth_token, refresh_token } = await issueTokens(userId, email, 'apple');
  return { user_id: userId, auth_token, refresh_token, expires_in: 3600, is_new_user: isNew };
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refreshAccessToken(refreshToken: string): Promise<{ auth_token: string; expires_in: number }> {
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  const tokenHash = hashToken(refreshToken);
  const result = await db.query<{ id: string; user_id: string }>(
    `SELECT id, user_id FROM refresh_tokens
     WHERE token_hash = $1 AND user_id = $2
       AND revoked_at IS NULL AND expires_at > NOW()`,
    [tokenHash, payload.sub]
  );

  if (result.rows.length === 0) {
    throw new UnauthorizedError('Refresh token not found or revoked');
  }

  const user = await db.query<User>(
    'SELECT id, email, auth_type FROM users WHERE id = $1 AND deleted_at IS NULL',
    [payload.sub]
  );

  if (user.rows.length === 0) {
    throw new UnauthorizedError('User not found');
  }

  const u = user.rows[0];
  const auth_token = signAccessToken({
    sub: u.id,
    email: u.email,
    auth_type: u.auth_type,
  });

  return { auth_token, expires_in: 3600 };
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout(userId: string, refreshToken?: string): Promise<void> {
  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await db.query(
      `UPDATE refresh_tokens SET revoked_at = NOW()
       WHERE token_hash = $1 AND user_id = $2`,
      [tokenHash, userId]
    );
  } else {
    // Revoke all tokens for this user
    await db.query(
      `UPDATE refresh_tokens SET revoked_at = NOW()
       WHERE user_id = $1 AND revoked_at IS NULL`,
      [userId]
    );
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function issueTokens(
  userId: string,
  email: string,
  authType: string
): Promise<{ auth_token: string; refresh_token: string }> {
  const auth_token = signAccessToken({ sub: userId, email, auth_type: authType });
  const refresh_token = signRefreshToken(userId);
  const tokenHash = hashToken(refresh_token);
  const expiresAt = getRefreshExpiry();

  await db.query(
    `INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [uuidv4(), userId, tokenHash, expiresAt]
  );

  return { auth_token, refresh_token };
}

async function upsertOAuthUser(
  email: string,
  authType: 'google' | 'apple',
  displayName?: string,
  avatarUrl?: string
): Promise<{ userId: string; isNew: boolean }> {
  const existing = await db.query<User>(
    'SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL',
    [email.toLowerCase()]
  );

  if (existing.rows.length > 0) {
    return { userId: existing.rows[0].id, isNew: false };
  }

  const userId = uuidv4();
  await db.withTransaction(async (client) => {
    await client.query(
      `INSERT INTO users (id, email, auth_type, display_name, avatar_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, email.toLowerCase(), authType, displayName || null, avatarUrl || null]
    );

    await client.query(
      `INSERT INTO subscriptions (id, user_id, subscription_type, status, platform)
       VALUES ($1, $2, 'free', 'active', 'ios')`,
      [uuidv4(), userId]
    );
  });

  return { userId, isNew: true };
}
