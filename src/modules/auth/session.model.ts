import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model, type Types } from "mongoose";

/**
 * DATABASE_DESIGN §9–11. The raw token lives only in the browser cookie;
 * MongoDB stores its HMAC hash. Expired sessions are removed by TTL.
 */
const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    lastUsedAt: { type: Date, default: null },
  },
  { collection: "sessions", timestamps: { createdAt: true, updatedAt: false } },
);

sessionSchema.index({ tokenHash: 1 }, { unique: true });
sessionSchema.index({ userId: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type SessionDoc = InferSchemaType<typeof sessionSchema> & { _id: Types.ObjectId };

export const Session: Model<SessionDoc> =
  (mongoose.models.Session as Model<SessionDoc>) ??
  mongoose.model<SessionDoc>("Session", sessionSchema);
