import type { ReactNode } from "react";
import { AppNav } from "@/components/layout/app-nav";
import { LogoutButton } from "@/components/layout/logout-button";
import { formatWeddingDate } from "@/lib/dates";
import { requireViewerWithWedding } from "@/server/auth/page-guards";

/**
 * Private dashboard shell. Every page under /app requires a Wedding Member
 * and shows the couple identity (PRD §12.1 "Wedding First").
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const { user, wedding, membership } = await requireViewerWithWedding();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-lg font-semibold text-brand">
              {wedding.brideName} &amp; {wedding.groomName}
            </p>
            <p className="text-xs text-muted-foreground">{formatWeddingDate(wedding.weddingDate)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.name} · {membership.role === "ADMIN" ? "Admin" : "Manager"}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row">
        <aside className="md:w-56 md:shrink-0">
          <AppNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
