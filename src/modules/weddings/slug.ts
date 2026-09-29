/**
 * Wedding website slug (SYSTEM_DESIGN §27): brideName-groomName-DDMMYYYY.
 * Generated once at creation and never changed automatically afterwards.
 */
function slugifyName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** "2027-02-14" → "14022027" */
function compactDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}${month}${year}`;
}

export function baseWeddingSlug(brideName: string, groomName: string, weddingDate: string): string {
  const parts = [slugifyName(brideName), slugifyName(groomName)].filter(Boolean);
  // Names in non-Latin scripts can slugify to nothing; fall back to a generic prefix.
  const names = parts.length > 0 ? parts.join("-") : "wedding";
  return `${names}-${compactDate(weddingDate)}`;
}

/** Collision suffix: base, base-2, base-3, ... */
export function slugCandidate(base: string, attempt: number): string {
  return attempt <= 1 ? base : `${base}-${attempt}`;
}
