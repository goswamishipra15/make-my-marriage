import { endSession } from "@/server/auth/session";
import { withHandler } from "@/server/http/handler";
import { success } from "@/server/http/responses";

/** POST /api/auth/logout (API_DESIGN §13). Idempotent: always clears the cookie. */
export const POST = withHandler(async () => {
  await endSession();
  return success();
});
