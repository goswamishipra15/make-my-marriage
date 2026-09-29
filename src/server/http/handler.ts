import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { connectToDatabase } from "@/server/db/mongoose";
import { AppError } from "@/server/http/errors";
import { assertSameOrigin } from "@/server/http/origin";
import { errorResponse } from "@/server/http/responses";
import { zodDetails } from "@/server/http/validation";
import { logger } from "@/server/logger";

/**
 * Next.js 16 route handler context: dynamic params are a Promise.
 */
export type RouteContext<P extends Record<string, string> = Record<string, string>> = {
  params: Promise<P>;
};

type Handler<P extends Record<string, string>> = (
  request: Request,
  context: RouteContext<P>,
) => Promise<Response>;

type HandlerOptions = {
  /** Skip the Origin check (e.g. internal cron endpoints using a bearer secret). */
  skipOriginCheck?: boolean;
};

/**
 * Wraps every API route handler:
 * - connects to MongoDB
 * - enforces same-origin for mutations
 * - maps AppError / ZodError to the standard error format
 * - hides unexpected errors behind INTERNAL_ERROR
 *
 * Route handlers stay thin: authenticate, validate, call a service, respond.
 */
export function withHandler<P extends Record<string, string> = Record<string, string>>(
  handler: Handler<P>,
  options: HandlerOptions = {},
) {
  return async (request: Request, context: RouteContext<P>): Promise<Response> => {
    const requestId = randomUUID();
    const started = Date.now();

    try {
      if (!options.skipOriginCheck) assertSameOrigin(request);
      await connectToDatabase();
      return await handler(request, context);
    } catch (error) {
      if (error instanceof AppError) {
        return errorResponse(error.status, error.code, error.message, error.details);
      }

      if (error instanceof z.ZodError) {
        return errorResponse(400, "VALIDATION_ERROR", "Invalid request data", zodDetails(error));
      }

      // Route pathname only: token-bearing public paths must not reach logs.
      logger.error("Unhandled API error", {
        requestId,
        method: request.method,
        route: new URL(request.url).pathname.replace(/\/public\/.*/, "/public/[redacted]"),
        durationMs: Date.now() - started,
        error,
      });

      return errorResponse(500, "INTERNAL_ERROR", "Something went wrong. Please try again.");
    }
  };
}
