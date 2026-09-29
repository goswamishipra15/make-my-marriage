import "server-only";
import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { AppError, type ErrorDetails } from "@/server/http/errors";

/** Shared JSON body limit (API_DESIGN guest notes: 8 KiB). */
export const MAX_JSON_BYTES = 8 * 1024;

/** 24-hex ObjectId string. Validate before any Mongoose query (API_DESIGN §95). */
export const objectIdSchema = z
  .string()
  .refine((value) => /^[a-f\d]{24}$/i.test(value) && isValidObjectId(value), "Invalid ID");

export function zodDetails(error: z.ZodError): ErrorDetails {
  const details: ErrorDetails = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "_root";
    details[key] ??= issue.message;
  }
  return details;
}

function validationError(error: z.ZodError): AppError {
  return new AppError("VALIDATION_ERROR", "Invalid request data", zodDetails(error));
}

/** Reads a JSON body with a size limit and validates it with the given schema. */
export async function parseJsonBody<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new AppError("VALIDATION_ERROR", "Expected an application/json request body");
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_JSON_BYTES) {
    throw new AppError("VALIDATION_ERROR", "Request body is too large");
  }

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new AppError("VALIDATION_ERROR", "Request body is not valid JSON");
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) throw validationError(parsed.error);
  return parsed.data;
}

/** Validates URL search params (single values only) with the given schema. */
export function parseQuery<T extends z.ZodType>(request: Request, schema: T): z.infer<T> {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const parsed = schema.safeParse(params);
  if (!parsed.success) throw validationError(parsed.error);
  return parsed.data;
}

/** Validates a dynamic route parameter such as :eventId. */
export function parseObjectIdParam(value: string, name = "id"): string {
  const parsed = objectIdSchema.safeParse(value);
  if (!parsed.success) {
    throw new AppError("VALIDATION_ERROR", "Invalid request data", { [name]: "Invalid ID" });
  }
  return parsed.data;
}
