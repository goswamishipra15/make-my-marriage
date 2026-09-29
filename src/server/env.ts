import "server-only";
import { z } from "zod";

/**
 * Server-side environment configuration.
 *
 * Validated lazily on first use so `next build` does not require secrets.
 * Never import this module from client components.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  // Used as the HMAC key for session, reset, and member-invitation token hashes.
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),

  // Canonical public origin, e.g. https://makemymarriage.com. Never derived from Host.
  NEXT_PUBLIC_APP_URL: z.url(),

  // Protects /api/internal/* (Vercel Cron). Optional until the email worker exists.
  CRON_SECRET: z.string().min(32).optional(),

  // Later phases. Optional so Phase 1 runs without them.
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
  GOOGLE_PLACES_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

export function getEnv(): Env {
  if (cached) return cached;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const problems = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${problems}`);
  }

  cached = parsed.data;
  return cached;
}

export function isProduction(): boolean {
  return getEnv().NODE_ENV === "production";
}
