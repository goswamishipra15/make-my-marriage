import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/server/env";

/**
 * Secret token helpers (DATABASE_DESIGN §98–99, API_DESIGN §44/§108).
 *
 * - Sessions, password resets, member invitations: store only hashToken(raw).
 * - Guest invitation and gallery tokens: stable share secrets stored raw
 *   (select: false), still generated here with 32 random bytes.
 */
const TOKEN_BYTES = 32;

/** 32 cryptographically random bytes, base64url encoded (43 chars). */
export function generateToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/** Shape check before any lookup, so malformed tokens never hit the database. */
export function isWellFormedToken(value: string): boolean {
  return /^[A-Za-z0-9_-]{43}$/.test(value);
}

/** HMAC-SHA-256 keyed with SESSION_SECRET, hex encoded. */
export function hashToken(raw: string): string {
  return createHmac("sha256", getEnv().SESSION_SECRET).update(raw).digest("hex");
}

/** Constant-time comparison for secrets such as the cron bearer token. */
export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
