import { signupSchema } from "@/modules/auth/schemas";
import { signup } from "@/modules/auth/service";
import { startSession } from "@/server/auth/session";
import { withHandler } from "@/server/http/handler";
import { created } from "@/server/http/responses";
import { parseJsonBody } from "@/server/http/validation";
import { clientIp, consumeRateLimit } from "@/server/security/rate-limit";
import { RATE_LIMITS } from "@/server/security/rate-limit-rules";

/** POST /api/auth/signup (API_DESIGN §11) */
export const POST = withHandler(async (request) => {
  const input = await parseJsonBody(request, signupSchema);
  await consumeRateLimit(RATE_LIMITS.signupPerIp, clientIp(request));

  const { user, publicUser } = await signup(input);
  await startSession(user._id);

  return created({ user: publicUser, hasWedding: false });
});
