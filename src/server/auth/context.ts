import "server-only";
import type { Types } from "mongoose";
import { User } from "@/modules/auth/user.model";
import { WeddingMembership, type MemberRole } from "@/modules/members/membership.model";
import { AppError, forbidden, unauthenticated } from "@/server/http/errors";
import { readSession } from "@/server/auth/session";

/**
 * Request authorization context (SYSTEM_DESIGN §15, API_DESIGN §2.3).
 *
 * The wedding is always derived from Session → User → Membership.
 * Never accept a weddingId from the client as proof of access.
 */
export type AuthUser = {
  id: Types.ObjectId;
  name: string;
  email: string;
};

export type MemberContext = {
  user: AuthUser;
  membershipId: Types.ObjectId;
  weddingId: Types.ObjectId;
  role: MemberRole;
};

/** Current user, or null when signed out. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await readSession();
  if (!session) return null;

  const user = await User.findById(session.userId).select("name email").lean();
  if (!user) return null;

  return { id: user._id, name: user.name, email: user.email };
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) throw unauthenticated();
  return user;
}

/** Membership for a user, or null if they have not created/joined a wedding. */
export async function findMembership(userId: Types.ObjectId) {
  return WeddingMembership.findOne({ userId }).lean();
}

/** Any Wedding Member (ADMIN or MANAGER). */
export async function requireMember(): Promise<MemberContext> {
  const user = await requireUser();
  const membership = await findMembership(user.id);
  if (!membership) {
    throw new AppError("NO_WEDDING", "Create or join a wedding to continue");
  }

  return {
    user,
    membershipId: membership._id,
    weddingId: membership.weddingId,
    role: membership.role,
  };
}

/** ADMIN only: member-management operations (API_DESIGN §97). */
export async function requireAdmin(): Promise<MemberContext> {
  const context = await requireMember();
  if (context.role !== "ADMIN") throw forbidden("Only Admins can manage Wedding Members");
  return context;
}
