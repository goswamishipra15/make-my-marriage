import type { Metadata } from "next";
import { daysUntil } from "@/lib/dates";
import { getWedding } from "@/modules/weddings/service";
import { requireViewerWithWedding } from "@/server/auth/page-guards";
import { Types } from "mongoose";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Dashboard shell (PRD §9.3). Summary cards are placeholders until the
 * Events, Tasks, Guests, Expenses and Vendors modules exist; the
 * aggregated GET /api/dashboard endpoint will replace them.
 */
const SUMMARY_CARDS = ["Events", "Tasks", "Guests", "RSVPs", "Expenses", "Vendors"];

export default async function DashboardPage() {
  const viewer = await requireViewerWithWedding();
  const wedding = await getWedding(new Types.ObjectId(viewer.wedding.id));
  const days = daysUntil(wedding.weddingDate, wedding.timeZone);

  const countdown =
    days > 1 ? `${days} days to go` : days === 1 ? "1 day to go" : days === 0 ? "Today is the day" : "Just married";

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-brand p-6 text-brand-foreground">
        <p className="text-sm opacity-80">{wedding.title ?? "Wedding countdown"}</p>
        <p className="mt-1 text-3xl font-semibold">{countdown}</p>
        {wedding.location.formattedAddress ? (
          <p className="mt-2 text-sm opacity-80">{wedding.location.formattedAddress}</p>
        ) : null}
      </section>

      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="mb-3 text-lg font-semibold">
          Summary
        </h2>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {SUMMARY_CARDS.map((label) => (
            <li key={label} className="rounded-xl border border-border bg-white p-4">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold">—</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-white p-4">
          <h2 className="font-semibold">Upcoming events</h2>
          <p className="mt-2 text-sm text-muted-foreground">Events will appear here once you add them.</p>
        </section>
        <section className="rounded-xl border border-border bg-white p-4">
          <h2 className="font-semibold">Upcoming tasks</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tasks will appear here once you add them.</p>
        </section>
      </div>
    </div>
  );
}
