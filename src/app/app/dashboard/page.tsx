import type { Metadata } from "next";
import { Types } from "mongoose";
import { EmptyState, Panel, PanelHeading } from "@/components/dashboard/panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { Icon } from "@/components/ui/icon";
import { daysUntil, formatWeddingDate } from "@/lib/dates";
import { getWedding } from "@/modules/weddings/service";
import { requireViewerWithWedding } from "@/server/auth/page-guards";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Wedding dashboard (PRD §9.3), built from the Stitch screen
 * "Make My Marriage - Wedding Dashboard" (projects/693186422638847542).
 *
 * The design's layout is implemented in full. Data is another matter: only the
 * wedding itself, its countdown and its digital-service flags exist today. The
 * Events, Tasks, Guests, Expenses and Vendors modules are still empty folders,
 * so their tiles and panels render honest empty states rather than the sample
 * figures from the mock. Swap each one out as its module lands — ideally behind
 * the aggregated GET /api/dashboard endpoint.
 */
export default async function DashboardPage() {
  const viewer = await requireViewerWithWedding();
  const wedding = await getWedding(new Types.ObjectId(viewer.wedding.id));
  const days = daysUntil(wedding.weddingDate, wedding.timeZone);

  const heading = wedding.title ?? `${wedding.brideName} & ${wedding.groomName}'s Wedding`;
  const place = wedding.location.city ?? wedding.location.formattedAddress ?? null;

  return (
    <div className="flex w-full flex-col space-y-space-xl">
      {/* ---- Command center ---- */}
      <section className="relative overflow-hidden rounded-lg bg-surface-container-lowest p-space-lg shadow-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-fixed/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-primary-fixed/25 blur-2xl"
        />

        <div className="relative flex flex-col justify-between gap-space-lg xl:flex-row xl:items-center">
          <div className="flex flex-col space-y-space-xs">
            <h1 className="font-headline-lg text-headline-lg-mobile tracking-tight text-primary md:text-headline-lg">
              {heading}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 font-body-md text-body-md text-on-surface-variant">
              <Icon name="location_on" className="text-sm text-secondary" />
              <span>
                {place ? `${place} · ` : ""}
                {formatWeddingDate(wedding.weddingDate)}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <Countdown days={days} />

            {/* Quick actions await the Tasks, Guests and Photos modules. */}
            {[
              { icon: "add_task", label: "New Task" },
              { icon: "person_add", label: "Add Guest" },
              { icon: "qr_code_2", label: "Guest QR" },
            ].map((action) => (
              <button
                key={action.label}
                type="button"
                disabled
                title={`${action.label} — available once this module ships`}
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-surface-container px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider text-on-surface-variant/60"
              >
                <Icon name={action.icon} className="text-sm" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- KPI grid ---- */}
      <section aria-label="Summary" className="grid grid-cols-2 gap-space-md md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Ceremonies" icon="celebration" value={null} />
        <StatCard label="Tasks" icon="check_circle" value={null} />
        <StatCard label="Guests" icon="group" value={null} />
        <StatCard label="RSVP" icon="mark_email_read" value={null} />
        {/* Labelled "Spent", not "Budget": expenses record money already spent
            or committed, never a budget ceiling (PRD §9.15). */}
        <StatCard label="Spent" icon="payments" value={null} />
        <StatCard label="Vendors" icon="verified" value={null} />
      </section>

      {/* ---- Main asymmetric grid ---- */}
      <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
        <div className="flex flex-col space-y-space-xl lg:col-span-8">
          <section className="flex flex-col space-y-space-md">
            <PanelHeading eyebrow="Sacred Sequence" title="Upcoming Ceremonies" />
            <EmptyState
              icon="calendar_month"
              title="No events yet"
              soon
              body="Add your Mehendi, Haldi, Sangeet, Pheras and Reception to build the multi-day itinerary."
            />
          </section>

          <section className="flex flex-col space-y-space-md">
            <PanelHeading eyebrow="Priority Tracker" title="Tasks Requiring Action" />
            <EmptyState
              icon="checklist"
              title="No tasks yet"
              soon
              body="Create tasks and assign them to the family members helping you plan."
            />
          </section>
        </div>

        <div className="flex flex-col space-y-space-xl lg:col-span-4">
          <Panel>
            <PanelHeading as="h3" eyebrow="Attendance" title="RSVP Breakdown" />
            <EmptyState
              icon="how_to_reg"
              title="No guests yet"
              soon
              body="Once you add guests and send invitations, attending, declined and pending counts appear here."
            />
          </Panel>

          <Panel>
            <PanelHeading as="h3" eyebrow="Treasury" title="Expenses" />
            <EmptyState
              icon="account_balance_wallet"
              title="Nothing recorded yet"
              soon
              body="Log what you spend as you spend it, grouped by category and ceremony."
            />
          </Panel>

          {/* Real data: these three flags live on the wedding document today. */}
          <Panel>
            <PanelHeading as="h3" eyebrow="Live Services" title="Digital Suite" />
            <ul className="space-y-space-sm">
              <ServiceRow
                icon="public"
                label="Wedding Website"
                status={wedding.website.isPublished ? "Published" : "Not published"}
                active={wedding.website.isPublished}
              />
              <ServiceRow
                icon="photo_camera"
                label="Photo Gallery"
                status={wedding.gallery.isEnabled ? "Enabled" : "Disabled"}
                active={wedding.gallery.isEnabled}
              />
              <ServiceRow
                icon="videocam"
                label="Live Stream"
                status={wedding.livestream.isEnabled ? "Enabled" : "Not configured"}
                active={wedding.livestream.isEnabled}
              />
            </ul>
          </Panel>
        </div>
      </div>

      {/* ---- Family committee ---- */}
      <section className="flex flex-col justify-between gap-space-md rounded-lg bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-space-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
            <Icon name="supervisor_account" />
          </div>
          <div>
            <p className="font-title-md text-title-md font-medium text-primary">Family &amp; Wedding Committee</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Invite the people helping you plan. Admins can add members and change their role.
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled
          title="Invite family member — available once member management ships"
          className="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 self-start rounded-lg bg-surface-container px-space-md py-1.5 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant/60 md:self-auto"
        >
          <Icon name="person_add" className="text-sm" />
          Invite Family Member
        </button>
      </section>
    </div>
  );
}

/** Days remaining, phrased for the day itself and for after the wedding. */
function Countdown({ days }: { days: number }) {
  const [value, caption] =
    days > 0
      ? [String(days), days === 1 ? "Day remaining" : "Days remaining"]
      : days === 0
        ? ["Today", "Is the day"]
        : ["Married", `${Math.abs(days)} days ago`];

  return (
    <div className="flex items-center gap-2 rounded-lg bg-surface-container-high px-space-md py-space-sm">
      <span className="font-headline-sm text-headline-sm text-primary">{value}</span>
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
        {caption}
      </span>
    </div>
  );
}

function ServiceRow({
  icon,
  label,
  status,
  active,
}: {
  icon: string;
  label: string;
  status: string;
  active: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-space-sm">
      <span className="flex items-center gap-space-sm">
        <span className="rounded bg-surface-container-lowest p-2 text-primary">
          <Icon name={icon} className="text-lg" />
        </span>
        <span className="font-title-md text-title-md font-medium text-primary">{label}</span>
      </span>
      <span
        className={`flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider ${
          active ? "text-secondary" : "text-on-surface-variant/70"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${active ? "bg-secondary" : "bg-outline-variant"}`}
        />
        {status}
      </span>
    </li>
  );
}
