import { NextResponse } from "next/server";
import type { ErrorCode, ErrorDetails } from "@/server/http/errors";

/**
 * Response helpers matching API_DESIGN §6–7.
 * Private API responses are never cacheable.
 */
const NO_STORE = { "Cache-Control": "no-store" } as const;

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status, headers: NO_STORE });
}

export function created<T>(data: T) {
  return ok(data, 201);
}

export function success() {
  return NextResponse.json({ success: true }, { status: 200, headers: NO_STORE });
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export function paginated<T>(data: T[], pagination: Pagination) {
  return NextResponse.json({ data, pagination }, { status: 200, headers: NO_STORE });
}

export function errorResponse(
  status: number,
  code: ErrorCode,
  message: string,
  details?: ErrorDetails,
) {
  return NextResponse.json(
    { error: { code, message, ...(details ? { details } : {}) } },
    { status, headers: NO_STORE },
  );
}
