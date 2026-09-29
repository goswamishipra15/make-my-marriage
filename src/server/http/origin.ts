import "server-only";
import { getEnv } from "@/server/env";
import { AppError } from "@/server/http/errors";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * CSRF defence for cookie-authenticated mutations (API_DESIGN §100).
 *
 * State-changing requests must carry an Origin header matching the configured
 * application origin. The request Host header is never trusted.
 */
export function assertSameOrigin(request: Request): void {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return;

  const expected = new URL(getEnv().NEXT_PUBLIC_APP_URL).origin;
  const origin = request.headers.get("origin");

  if (!origin || origin !== expected) {
    throw new AppError("FORBIDDEN", "Request origin is not allowed");
  }
}
