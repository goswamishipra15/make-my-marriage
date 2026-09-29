import "server-only";
import mongoose, { Schema, type InferSchemaType, type Model, type Types } from "mongoose";

export const WEBSITE_THEMES = ["CLASSIC", "MINIMAL", "MODERN"] as const;
export type WebsiteTheme = (typeof WEBSITE_THEMES)[number];

/**
 * DATABASE_DESIGN §13–22. Small 1:1 configuration (location, website,
 * gallery, livestream) is embedded; growing data lives in its own collections.
 *
 * gallery.token is a stable share secret stored raw (API_DESIGN §108) so the
 * gallery URL/QR can be shown again. It is excluded from default reads.
 */
const locationSchema = new Schema(
  {
    formattedAddress: { type: String, default: null, maxlength: 300 },
    city: { type: String, default: null, maxlength: 120 },
    state: { type: String, default: null, maxlength: 120 },
    country: { type: String, default: null, maxlength: 120 },
    latitude: { type: Number, default: null, min: -90, max: 90 },
    longitude: { type: Number, default: null, min: -180, max: 180 },
    googlePlaceId: { type: String, default: null, maxlength: 300 },
  },
  { _id: false },
);

const weddingSchema = new Schema(
  {
    brideName: { type: String, required: true, trim: true, maxlength: 80 },
    groomName: { type: String, required: true, trim: true, maxlength: 80 },
    title: { type: String, default: null, maxlength: 120 },
    description: { type: String, default: null, maxlength: 2000 },

    // Date-only YYYY-MM-DD to avoid timezone drift (DATABASE_DESIGN §14).
    weddingDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    timeZone: { type: String, required: true, default: "Asia/Kolkata" },

    coverImageObjectKey: { type: String, default: null },

    location: { type: locationSchema, required: true, default: () => ({}) },

    website: {
      slug: { type: String, required: true },
      theme: { type: String, enum: WEBSITE_THEMES, required: true, default: "CLASSIC" },
      isPublished: { type: Boolean, required: true, default: false },
      welcomeMessage: { type: String, default: null, maxlength: 2000 },
    },

    gallery: {
      token: { type: String, required: true, select: false },
      isEnabled: { type: Boolean, required: true, default: true },
      guestUploadsEnabled: { type: Boolean, required: true, default: true },
    },

    livestream: {
      youtubeUrl: { type: String, default: null },
      isEnabled: { type: Boolean, required: true, default: false },
    },

    createdByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date, default: null },
  },
  { collection: "weddings", timestamps: true },
);

weddingSchema.index({ "website.slug": 1 }, { unique: true });
weddingSchema.index({ "gallery.token": 1 }, { unique: true });
weddingSchema.index({ createdAt: 1 });

/**
 * Explicit document shape. Mongoose's inferred types mark nested objects as
 * optional even though the schema always populates them with defaults.
 */
export type WeddingLocation = {
  formattedAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
};

export type WeddingDoc = Omit<
  InferSchemaType<typeof weddingSchema>,
  "location" | "website" | "gallery" | "livestream"
> & {
  _id: Types.ObjectId;
  location: WeddingLocation;
  website: {
    slug: string;
    theme: WebsiteTheme;
    isPublished: boolean;
    welcomeMessage: string | null;
  };
  gallery: {
    token?: string; // select: false — absent unless explicitly projected
    isEnabled: boolean;
    guestUploadsEnabled: boolean;
  };
  livestream: {
    youtubeUrl: string | null;
    isEnabled: boolean;
  };
};

export const Wedding: Model<WeddingDoc> =
  (mongoose.models.Wedding as Model<WeddingDoc>) ??
  mongoose.model<WeddingDoc>("Wedding", weddingSchema);
