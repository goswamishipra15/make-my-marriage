import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model, type Types } from "mongoose";

/** DATABASE_DESIGN §7. Guests never appear here. */
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 254 },
    emailNormalized: { type: String, required: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
  },
  { collection: "users", timestamps: true },
);

userSchema.index({ emailNormalized: 1 }, { unique: true });

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };

export const User: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc>) ?? mongoose.model<UserDoc>("User", userSchema);
