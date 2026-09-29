import { z } from "zod";

/** A real calendar date in YYYY-MM-DD form. */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
  }, "Enter a valid date");

export const timeZoneSchema = z.string().refine((value) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}, "Unknown time zone");

const optionalText = (max: number) => z.string().trim().max(max).optional();

export const locationSchema = z.strictObject({
  formattedAddress: optionalText(300),
  city: optionalText(120),
  state: optionalText(120),
  country: optionalText(120),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  googlePlaceId: optionalText(300),
});

/** POST /api/wedding (API_DESIGN §17). Required fields per PRD §9.2. */
export const createWeddingSchema = z.strictObject({
  brideName: z.string().trim().min(1, "Bride name is required").max(80),
  groomName: z.string().trim().min(1, "Groom name is required").max(80),
  weddingDate: isoDateSchema,
  timeZone: timeZoneSchema.default("Asia/Kolkata"),
  location: locationSchema.refine(
    (location) => Boolean(location.city || location.formattedAddress),
    { message: "Wedding city or location is required", path: ["city"] },
  ),
  title: optionalText(120),
  description: optionalText(2000),
});

export type CreateWeddingInput = z.infer<typeof createWeddingSchema>;
