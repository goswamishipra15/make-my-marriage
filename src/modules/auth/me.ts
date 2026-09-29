import "server-only";
import { Wedding } from "@/modules/weddings/wedding.model";
import { findMembership, type AuthUser } from "@/server/auth/context";

/** GET /api/auth/me payload (API_DESIGN §14). */
export async function getMe(user: AuthUser) {
  const publicUser = { id: user.id.toString(), name: user.name, email: user.email };
  const membership = await findMembership(user.id);

  const wedding = membership
    ? await Wedding.findOne({ _id: membership.weddingId, deletedAt: null })
        .select("brideName groomName weddingDate")
        .lean()
    : null;

  if (!membership || !wedding) {
    return { user: publicUser, membership: null, wedding: null };
  }

  return {
    user: publicUser,
    membership: { role: membership.role },
    wedding: {
      id: wedding._id.toString(),
      brideName: wedding.brideName,
      groomName: wedding.groomName,
      weddingDate: wedding.weddingDate,
    },
  };
}

export type MeDto = Awaited<ReturnType<typeof getMe>>;
