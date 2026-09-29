import { getMe } from "@/modules/auth/me";
import { requireUser } from "@/server/auth/context";
import { withHandler } from "@/server/http/handler";
import { ok } from "@/server/http/responses";

/** GET /api/auth/me (API_DESIGN §14) */
export const GET = withHandler(async () => {
  const user = await requireUser();
  return ok(await getMe(user));
});
