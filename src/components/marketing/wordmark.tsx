import Link from "next/link";

/**
 * Brand lockup. Stands in for the Stitch emblem bitmap with a vector monogram
 * so the mark stays crisp at any size and ships no external image dependency.
 */
export function Wordmark({ href = "/", size = "md" }: { href?: string | null; size?: "sm" | "md" }) {
  const glyph = size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-[13px]";
  const text = size === "sm" ? "text-title-lg" : "text-headline-sm";

  const inner = (
    <span className="flex items-center gap-space-sm">
      <span
        aria-hidden="true"
        className={`${glyph} flex shrink-0 items-center justify-center rounded-full bg-primary-container font-headline font-semibold text-surface-container-lowest ring-1 ring-secondary/40`}
      >
        M
      </span>
      <span className={`font-headline-sm ${text} tracking-tight text-primary`}>Make My Marriage</span>
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="rounded transition-opacity hover:opacity-80">
      {inner}
    </Link>
  );
}
