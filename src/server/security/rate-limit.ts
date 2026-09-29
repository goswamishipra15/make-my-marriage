import "server-only";
import mongoose, { Schema, type Model } from "mongoose";
import { AppError } from "@/server/http/errors";
import { hashToken } from "@/server/security/tokens";

/**
 * Fixed-window rate limiting backed by MongoDB (SYSTEM_DESIGN §67).
 *
 * Counter IDs are HMAC-derived so raw emails, IPs, or tokens are never stored.
 * Expired windows are removed by a TTL index.
 */
type RateLimitCounter = {
  _id: string;
  count: number;
  expiresAt: Date;
};

const rateLimitSchema = new Schema<RateLimitCounter>(
  {
    _id: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { collection: "rate_limits", versionKey: false },
);

rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit: Model<RateLimitCounter> =
  (mongoose.models.RateLimit as Model<RateLimitCounter>) ??
  mongoose.model<RateLimitCounter>("RateLimit", rateLimitSchema);

export type RateLimitRule = {
  /** Logical bucket, e.g. "auth:login:email". */
  name: string;
  limit: number;
  windowMs: number;
};

/**
 * Consumes one unit for `key` under `rule`. Throws RATE_LIMITED when exceeded.
 */
export async function consumeRateLimit(rule: RateLimitRule, key: string): Promise<void> {
  const windowStart = Math.floor(Date.now() / rule.windowMs) * rule.windowMs;
  const id = hashToken(`${rule.name}:${key}:${windowStart}`);

  const counter = await RateLimit.findOneAndUpdate(
    { _id: id },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date(windowStart + rule.windowMs) },
    },
    { upsert: true, returnDocument: "after" },
  ).lean();

  if (counter && counter.count > rule.limit) {
    throw new AppError("RATE_LIMITED", "Too many attempts. Please wait and try again.");
  }
}

/** Best-effort client IP from Vercel/proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
