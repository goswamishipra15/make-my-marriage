import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model, type Types } from "mongoose";

export const MEMBER_ROLES = ["ADMIN", "MANAGER"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

/** DATABASE_DESIGN §23–27. */
const membershipSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weddingId: { type: Schema.Types.ObjectId, ref: "Wedding", required: true },
    role: { type: String, enum: MEMBER_ROLES, required: true },
    joinedAt: { type: Date, required: true, default: () => new Date() },
  },
  { collection: "wedding_memberships", timestamps: true },
);

// V1 rule: one user belongs to exactly one wedding.
membershipSchema.index({ userId: 1 }, { unique: true });
membershipSchema.index({ weddingId: 1, userId: 1 }, { unique: true });
membershipSchema.index({ weddingId: 1, role: 1 });

export type MembershipDoc = InferSchemaType<typeof membershipSchema> & {
  _id: Types.ObjectId;
  role: MemberRole;
};

export const WeddingMembership: Model<MembershipDoc> =
  (mongoose.models.WeddingMembership as Model<MembershipDoc>) ??
  mongoose.model<MembershipDoc>("WeddingMembership", membershipSchema);
