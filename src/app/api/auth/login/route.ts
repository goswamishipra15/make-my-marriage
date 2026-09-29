import { normalizeEmail } from "@/lib/email";
import { loginSchema } from "@/modules/auth/schemas";
import { login } from "@/modules/auth/service";
import { findMembership } from "@/server/auth/context";
import { startSession } from "@/server/auth/session";
import { withHandler } from "@/server/http/handler";
import { ok } from "@/server/http/responses";
import { parseJsonBody } from "@/server/http/validation";
import { clientIp, consumeRateLimit } from "@/server/security/rate-limit";
import { RATE_LIMITS } from "@/server/security/rate-limit-rules";

/** POST /api/auth/login (API_DESIGN §12) */
export const POST = withHandler(async (request) => {
  const input = await parseJsonBody(request, loginSchema);

  await consumeRateLimit(RATE_LIMITS.loginPerIp, clientIp(request));
  await consumeRateLimit(RATE_LIMITS.loginPerEmail, normalizeEmail(input.email));

  const { user, publicUser } = await login(input);
  await startSession(user._id);

  const membership = await findMembership(user._id);
  return ok({ user: publicUser, hasWedding: Boolean(membership) });
});
