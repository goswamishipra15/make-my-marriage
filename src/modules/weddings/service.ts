import "server-only";
import mongoose, { mongo, type Types } from "mongoose";
import { WeddingMembership } from "@/modules/members/membership.model";
import { Wedding, type WeddingDoc } from "@/modules/weddings/wedding.model";
import type { CreateWeddingInput } from "@/modules/weddings/schemas";
import { baseWeddingSlug, slugCandidate } from "@/modules/weddings/slug";
import { AppError, notFound } from "@/server/http/errors";
import { generateToken } from "@/server/security/tokens";

const MAX_SLUG_ATTEMPTS = 20;

function isDuplicateKey(error: unknown, field?: string): boolean {
  if (!(error instanceof mongo.MongoServerError) || error.code !== 11000) return false;
  return field ? JSON.stringify(error.keyPattern ?? {}).includes(field) : true;
}

/**
 * Creates the wedding and its first ADMIN membership atomically
 * (DATABASE_DESIGN §85). Requires a replica set (MongoDB Atlas provides one).
 */
export async function createWedding(userId: Types.ObjectId, input: CreateWeddingInput) {
  if (await WeddingMembership.exists({ userId })) {
    throw new AppError("ALREADY_HAS_WEDDING", "You already belong to a wedding");
  }

  const baseSlug = baseWeddingSlug(input.brideName, input.groomName, input.weddingDate);

  for (let attempt = 1; attempt <= MAX_SLUG_ATTEMPTS; attempt += 1) {
    const slug = slugCandidate(baseSlug, attempt);
    if (await Wedding.exists({ "website.slug": slug })) continue;

    const session = await mongoose.startSession();
    try {
      let weddingId: Types.ObjectId | undefined;

      await session.withTransaction(async () => {
        const [wedding] = await Wedding.create(
          [
            {
              brideName: input.brideName,
              groomName: input.groomName,
              title: input.title || null,
              description: input.description || null,
              weddingDate: input.weddingDate,
              timeZone: input.timeZone,
              location: input.location,
              website: { slug },
              gallery: { token: generateToken() },
              createdByUserId: userId,
            },
          ],
          { session },
        );
        if (!wedding) throw new Error("Wedding creation returned no document");

        await WeddingMembership.create(
          [{ userId, weddingId: wedding._id, role: "ADMIN", joinedAt: new Date() }],
          { session },
        );

        weddingId = wedding._id;
      });

      return getWedding(weddingId!);
    } catch (error) {
      if (isDuplicateKey(error, "website.slug")) continue; // raced for this slug
      if (isDuplicateKey(error, "userId")) {
        throw new AppError("ALREADY_HAS_WEDDING", "You already belong to a wedding");
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }

  throw new AppError("CONFLICT", "Could not generate a unique wedding address. Please try again.");
}

/** Loads a non-deleted wedding by the ID derived from the caller's membership. */
export async function getWedding(weddingId: Types.ObjectId) {
  const wedding = await Wedding.findOne({ _id: weddingId, deletedAt: null }).lean();
  if (!wedding) throw notFound("Wedding not found");
  return toWeddingDto(wedding);
}

/** API_DESIGN §18. Secret tokens are never included. */
export function toWeddingDto(wedding: WeddingDoc) {
  return {
    id: wedding._id.toString(),
    brideName: wedding.brideName,
    groomName: wedding.groomName,
    title: wedding.title ?? null,
    description: wedding.description ?? null,
    weddingDate: wedding.weddingDate,
    timeZone: wedding.timeZone,
    location: wedding.location,
    website: {
      slug: wedding.website.slug,
      theme: wedding.website.theme,
      isPublished: wedding.website.isPublished,
      welcomeMessage: wedding.website.welcomeMessage ?? null,
    },
    gallery: {
      isEnabled: wedding.gallery.isEnabled,
      guestUploadsEnabled: wedding.gallery.guestUploadsEnabled,
    },
    livestream: {
      youtubeUrl: wedding.livestream.youtubeUrl ?? null,
      isEnabled: wedding.livestream.isEnabled,
    },
  };
}

export type WeddingDto = ReturnType<typeof toWeddingDto>;
