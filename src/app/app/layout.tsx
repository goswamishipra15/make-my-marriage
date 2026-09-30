import type { ReactNode } from "react";
import { AppNav } from "@/components/layout/app-nav";
import { LogoutButton } from "@/components/layout/logout-button";
import { Wordmark } from "@/components/marketing/wordmark";
import { formatWeddingDate } from "@/lib/dates";
import { requireViewerWithWedding } from "@/server/auth/page-guards";

/**
 * Private wedding workspace shell, built from the Stitch screen
 * "Make My Marriage - Wedding Dashboard" (projects/693186422638847542).
 *
 * The design is a fixed 18rem sidebar plus a fixed top bar. Below `lg` the rail
 * collapses into a stacked header with a horizontally scrollable nav so the
 * shell stays usable on a phone without needing a client-side drawer.
 *
 * Every page under /app requires a Wedding Member and shows the couple identity
 * (PRD §12.1 "Wedding First").
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const { user, wedding, membership } = await requireViewerWithWedding();

  const coupleNames = `${wedding.brideName} & ${wedding.groomName}`;
  const roleLabel = membership.role === "ADMIN" ? "Admin" : "Manager";
  const initials = user.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex min-h-full flex-1 flex-col lg:block">
      {/* ---- Sidebar rail ---- */}
      <aside className="flex flex-col gap-space-md border-b border-outline-variant/30 bg-surface-container-low pt-space-md pb-space-sm lg:fixed lg:top-0 lg:left-0 lg:z-50 lg:h-full lg:w-72 lg:gap-0 lg:border-b-0 lg:pb-space-lg lg:shadow-[1px_0_12px_rgba(91,19,43,0.03)]">
        <div className="px-space-lg lg:pb-space-md">
          <Wordmark href="/app/dashboard" size="sm" />
        </div>

        {/* Wedding context. PRD Rule 1 gives a user exactly one wedding, so this
            is a label rather than the switcher shown in the mock. */}
        <div className="hidden px-space-md lg:my-space-xs lg:block">
          <div className="rounded-lg bg-surface-container p-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
              Your Wedding
            </span>
            <span className="block truncate font-title-md text-title-md font-semibold text-primary">
              {coupleNames}
            </span>
          </div>
        </div>

        <AppNav />

        {/* Signed-in member */}
        <div className="hidden px-space-md pt-space-sm lg:block">
          <div className="rounded-lg bg-surface-container-lowest p-space-sm shadow-[0_2px_12px_rgba(91,19,43,0.04)]">
            <div className="flex items-center gap-space-sm">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md font-semibold text-surface-container-lowest"
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-title-md text-title-md font-medium leading-tight text-primary">
                  {user.name}
                </span>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                  {roleLabel}
                </span>
              </div>
            </div>
            <div className="mt-space-sm">
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Content column ---- */}
      <div className="flex flex-1 flex-col lg:pl-72">
        <header className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30 bg-surface/85 px-space-md py-space-sm backdrop-blur-xl lg:fixed lg:top-0 lg:right-0 lg:left-72 lg:z-40 lg:h-20 lg:flex-nowrap lg:border-b-0 lg:px-space-lg lg:py-0 lg:shadow-[0_1px_8px_rgba(91,19,43,0.03)]">
          <div className="flex flex-wrap items-center gap-space-sm lg:gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary">{coupleNames}</span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                · {formatWeddingDate(wedding.weddingDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm lg:hidden">
            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
              {roleLabel}
            </span>
            <LogoutButton />
          </div>
        </header>

        <main className="min-w-0 flex-1 px-space-md py-space-lg lg:px-space-lg lg:pt-24">{children}</main>
      </div>
    </div>
  );
}
