/**
 * Application error codes (API_DESIGN §8) and their HTTP status mapping.
 */
export const ERROR_STATUS = {
  VALIDATION_ERROR: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_TOKEN: 400,
  TOKEN_EXPIRED: 400,
  RATE_LIMITED: 429,
  UPLOAD_ERROR: 400,
  EXTERNAL_SERVICE_ERROR: 503,
  INTERNAL_ERROR: 500,

  // Business-specific codes.
  EMAIL_ALREADY_EXISTS: 409,
  INVALID_CREDENTIALS: 401,
  ALREADY_HAS_WEDDING: 409,
  NO_WEDDING: 403,
  LAST_ADMIN: 409,
  GUEST_LIMIT_EXCEEDED: 400,
  INVITATION_ALREADY_ACCEPTED: 409,
  INVITATION_EMAIL_MISMATCH: 403,
} as const;

export type ErrorCode = keyof typeof ERROR_STATUS;

export type ErrorDetails = Record<string, string>;

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: ErrorDetails;

  constructor(code: ErrorCode, message: string, details?: ErrorDetails) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = ERROR_STATUS[code];
    this.details = details;
  }
}

export const notFound = (message = "Resource not found") => new AppError("NOT_FOUND", message);

export const forbidden = (message = "You do not have permission to do this") =>
  new AppError("FORBIDDEN", message);

export const unauthenticated = (message = "Please sign in to continue") =>
  new AppError("UNAUTHENTICATED", message);

export const conflict = (message: string) => new AppError("CONFLICT", message);
