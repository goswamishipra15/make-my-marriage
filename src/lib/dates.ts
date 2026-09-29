/**
 * Date helpers. The primary wedding date is date-only (YYYY-MM-DD);
 * "today" is evaluated in the wedding's time zone (DATABASE_DESIGN §14–15).
 */
export function todayInTimeZone(timeZone: string, now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Whole days from today (in the wedding time zone) to the wedding date. */
export function daysUntil(weddingDate: string, timeZone: string, now = new Date()): number {
  const today = Date.parse(`${todayInTimeZone(timeZone, now)}T00:00:00Z`);
  const target = Date.parse(`${weddingDate}T00:00:00Z`);
  return Math.round((target - today) / 86_400_000);
}

/** "2027-02-14" → "14 February 2027" */
export function formatWeddingDate(weddingDate: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${weddingDate}T00:00:00Z`));
}
