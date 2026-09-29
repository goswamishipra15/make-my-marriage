import "server-only";
import { cookies } from "next/headers";
import type { Types } from "mongoose";
import { Session } from "@/modules/auth/session.model";
import { isProduction } from "@/server/env";
import { generateToken, hashToken, isWellFormedToken } from "@/server/security/tokens";

/**
 * Server-side sessions (SYSTEM_DESIGN §10, API_DESIGN §10).
 * The cookie holds a random token; MongoDB stores only its HMAC hash.
 */
export const SESSION_COOKIE = "mmm_session";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const TOUCH_INTERVAL_MS = 60 * 60 * 1000; // refresh lastUsedAt at most hourly

function cookieOptions(expires: Date) {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax" as const,
    path: "/",
    expires,
  };
}

/** Creates a session for the user and sets the session cookie. */
export async function startSession(userId: Types.ObjectId): Promise<void> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await Session.create({ userId, tokenHash: hashToken(token), expiresAt });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, cookieOptions(expiresAt));
}

/** Returns the active session for the current request cookie, or null. */
export async function readSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token || !isWellFormedToken(token)) return null;

  const session = await Session.findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  }).lean();
  if (!session) return null;

  const lastUsed = session.lastUsedAt?.getTime() ?? 0;
  if (Date.now() - lastUsed > TOUCH_INTERVAL_MS) {
    await Session.updateOne({ _id: session._id }, { $set: { lastUsedAt: new Date() } });
  }

  return session;
}

/** Deletes the current session (if any) and clears the cookie. */
export async function endSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;

  if (token && isWellFormedToken(token)) {
    await Session.deleteOne({ tokenHash: hashToken(token) });
  }

  jar.delete(SESSION_COOKIE);
}

/** Revokes every session for a user (e.g. after password reset). */
export async function endAllSessionsForUser(userId: Types.ObjectId): Promise<void> {
  await Session.deleteMany({ userId });
}
