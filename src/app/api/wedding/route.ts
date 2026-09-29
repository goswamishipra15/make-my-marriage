import { createWeddingSchema } from "@/modules/weddings/schemas";
import { createWedding, getWedding } from "@/modules/weddings/service";
import { requireMember, requireUser } from "@/server/auth/context";
import { withHandler } from "@/server/http/handler";
import { created, ok } from "@/server/http/responses";
import { parseJsonBody } from "@/server/http/validation";

/** POST /api/wedding (API_DESIGN §17): only for users without a membership. */
export const POST = withHandler(async (request) => {
  const user = await requireUser();
  const input = await parseJsonBody(request, createWeddingSchema);
  return created(await createWedding(user.id, input));
});

/** GET /api/wedding (API_DESIGN §18): the caller's wedding. */
export const GET = withHandler(async () => {
  const { weddingId } = await requireMember();
  return ok(await getWedding(weddingId));
});
