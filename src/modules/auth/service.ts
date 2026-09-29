import "server-only";
import { mongo } from "mongoose";
import { normalizeEmail } from "@/lib/email";
import { User } from "@/modules/auth/user.model";
import type { LoginInput, SignupInput } from "@/modules/auth/schemas";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "@/server/auth/password";
import { AppError } from "@/server/http/errors";

export type PublicUser = { id: string; name: string; email: string };

function toPublicUser(user: { _id: { toString(): string }; name: string; email: string }): PublicUser {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

/** API_DESIGN §11. No email verification in V1 (DATABASE_DESIGN §8). */
export async function signup(input: SignupInput) {
  const emailNormalized = normalizeEmail(input.email);

  const existing = await User.exists({ emailNormalized });
  if (existing) {
    throw new AppError("EMAIL_ALREADY_EXISTS", "An account with this email already exists");
  }

  try {
    const user = await User.create({
      name: input.name,
      email: input.email.trim(),
      emailNormalized,
      passwordHash: await hashPassword(input.password),
    });
    return { user, publicUser: toPublicUser(user) };
  } catch (error) {
    // Concurrent signup with the same email lost the unique-index race.
    if (error instanceof mongo.MongoServerError && error.code === 11000) {
      throw new AppError("EMAIL_ALREADY_EXISTS", "An account with this email already exists");
    }
    throw error;
  }
}

/** API_DESIGN §12. Generic failure message; timing equalised for unknown emails. */
export async function login(input: LoginInput) {
  const user = await User.findOne({ emailNormalized: normalizeEmail(input.email) })
    .select("+passwordHash name email")
    .lean();

  if (!user) {
    await verifyAgainstDummy(input.password);
    throw new AppError("INVALID_CREDENTIALS", "Invalid email or password.");
  }

  const valid = await verifyPassword(user.passwordHash, input.password);
  if (!valid) throw new AppError("INVALID_CREDENTIALS", "Invalid email or password.");

  return { user, publicUser: toPublicUser(user) };
}
