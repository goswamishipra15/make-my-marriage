import "server-only";
import { hash, verify } from "@node-rs/argon2";

/**
 * Password hashing with Argon2id via an established library
 * (SYSTEM_DESIGN §9: never hand-roll crypto).
 */
const ARGON2_OPTIONS = {
  memoryCost: 19_456, // 19 MiB, OWASP minimum recommendation for argon2id
  timeCost: 2,
  parallelism: 1,
} as const;

export function hashPassword(plain: string): Promise<string> {
  return hash(plain, ARGON2_OPTIONS);
}

export async function verifyPassword(passwordHash: string, plain: string): Promise<boolean> {
  try {
    return await verify(passwordHash, plain);
  } catch {
    return false;
  }
}

/**
 * A precomputed hash used to spend comparable time when the email is unknown,
 * so login timing does not reveal which accounts exist.
 */
let dummyHash: Promise<string> | undefined;

export async function verifyAgainstDummy(plain: string): Promise<void> {
  dummyHash ??= hashPassword("dummy-password-for-timing-equalisation");
  await verifyPassword(await dummyHash, plain);
}
