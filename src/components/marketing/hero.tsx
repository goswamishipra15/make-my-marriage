import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/**
 * Sample ceremony strip for the marketing workspace preview. This is
 * illustrative copy for the landing page, not live product data.
 */
const PREVIEW_EVENTS = [
  { date: "DEC 18 · 10:00 AM", name: "Ganesh Sthapana", venue: "Family Sanctuary" },
  { date: "DEC 19 · 04:00 PM", name: "Haldi & Mehendi", venue: "Courtyard Gardens" },
  { date: "DEC 20 · 07:30 PM", name: "Sangeet", venue: "Royal Ballroom" },
  { date: "DEC 21 · 06:00 PM", name: "Pheras", venue: "Lakeside Mandap", featured: true },
  { date: "DEC 22 · 08:00 PM", name: "Grand Reception", venue: "The Amber Lawns" },
];

export function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-[1360px] overflow-hidden px-margin-mobile pt-12 pb-24 md:px-margin md:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[110px]"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center space-y-space-md text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-outline-variant/30 bg-surface-container px-4 py-1.5 shadow-sm">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="font-label-sm text-label-sm uppercase tracking-[0.14em] text-primary">
            The Central Workspace for Modern Indian Families
          </span>
        </div>

        <h1 className="max-w-3xl pt-2 font-display-hero text-display-hero-mobile tracking-tight text-primary md:text-display-hero">
          Plan the wedding of your dreams.{" "}
          <span className="font-normal italic text-secondary">Without the chaos.</span>
        </h1>

        <p className="max-w-2xl pt-1 font-body-lg text-body-lg text-on-surface-variant">
          Say goodbye to scattered WhatsApp groups, fragmented spreadsheets, and lost vendor notes. One
          graceful workspace for events, RSVPs, expenses, tasks, and private photo sharing.
        </p>

        <div className="flex flex-col items-center gap-space-md pt-4 sm:flex-row">
          <Link
            href="/signup"
            className="group inline-flex w-full items-center justify-center rounded-lg bg-primary-container px-8 py-3.5 font-label-md text-label-md uppercase tracking-widest text-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(91,19,43,0.18)] transition-all hover:bg-primary sm:w-auto"
          >
            Start Planning Your Wedding
            <Icon name="arrow_forward" className="ml-2 text-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            className="inline-flex w-full items-center justify-center rounded-lg border border-primary/20 bg-surface-container-lowest px-8 py-3.5 font-label-md text-label-md uppercase tracking-widest text-primary transition-all hover:bg-surface-container-low sm:w-auto"
          >
            <Icon name="play_circle" className="mr-2 text-[18px] text-secondary" />
            See How It Works
          </a>
        </div>

        <p className="pt-4 font-label-md text-label-md tracking-normal text-on-surface-variant">
          Built for multi-day celebrations across{" "}
          <strong className="font-semibold text-primary">Delhi, Mumbai, Bengaluru &amp; Dehradun</strong>
        </p>
      </div>

      <WorkspacePreview />
    </section>
  );
}

/** Stylised product shot used as the hero visual. All values are sample copy. */
function WorkspacePreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0_20px_50px_-12px_rgba(91,19,43,0.09)]">
        {/* Faux browser chrome */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-low px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
            </div>
            <span className="font-label-md text-[12px] uppercase tracking-wider text-on-surface-variant/70">
              makemymarriage.com / shipra-himanshu
            </span>
          </div>
        </div>

        <div className="space-y-6 bg-surface-bright/40 p-6 md:p-8">
          {/* Couple banner */}
          <div className="flex flex-col justify-between gap-4 border-b border-outline-variant/30 pb-6 md:flex-row md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-primary">Shipra &amp; Himanshu</h2>
                <span aria-hidden="true" className="text-lg text-secondary">
                  ❤️
                </span>
                <span className="rounded-full bg-secondary-fixed/50 px-2.5 py-0.5 font-label-sm text-label-sm uppercase text-on-secondary-fixed-variant">
                  Udaipur Palace
                </span>
              </div>
              <p className="mt-0.5 font-body-md text-body-md text-on-surface-variant">
                December 18–22, 2027 · Grand Heritage Pavilion
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-outline-variant/30 bg-surface-container px-5 py-2.5">
              <Icon name="hourglass_top" className="text-2xl text-secondary" />
              <div>
                <span className="block font-headline-sm text-headline-sm leading-tight text-primary">42 Days</span>
                <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  To the Pheras
                </span>
              </div>
            </div>
          </div>

          {/* Itinerary strip */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Multi-Day Ceremonies (6 Events)
              </span>
              <span className="font-label-md text-label-md text-primary">View Master Schedule →</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {PREVIEW_EVENTS.map((event) => (
                <div
                  key={event.name}
                  className={
                    event.featured
                      ? "rounded-lg bg-primary-container p-3.5 text-surface-container-lowest shadow-md"
                      : "rounded-lg border border-outline-variant/30 bg-surface-container-low p-3.5"
                  }
                >
                  <span
                    className={`block font-label-sm text-label-sm ${
                      event.featured ? "text-secondary-fixed" : "text-secondary"
                    }`}
                  >
                    {event.date}
                  </span>
                  <p
                    className={`mt-1 font-title-md text-title-md ${
                      event.featured ? "text-surface-container-lowest" : "text-primary"
                    }`}
                  >
                    {event.name}
                  </p>
                  <span
                    className={`mt-1 block text-xs ${
                      event.featured ? "text-surface-container-lowest/80" : "text-on-surface-variant"
                    }`}
                  >
                    {event.venue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Micro metrics */}
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3">
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  RSVP Attendance
                </span>
                <span className="font-title-md text-title-md font-bold text-primary">482 / 520</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full rounded-full bg-primary-container" style={{ width: "92%" }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-on-surface-variant">
                <span>389 Attending All Events</span>
                <span className="font-medium text-secondary">92% Responded</span>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Committed Expenses
                </span>
                <span className="font-title-md text-title-md font-bold text-primary">₹ 68,40,000</span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full bg-secondary" style={{ width: "65%" }} />
                <div className="h-full bg-primary/40" style={{ width: "20%" }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-on-surface-variant">
                <span>18 Vendors Booked</span>
                <span className="font-medium text-secondary">85% Paid</span>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Family Action Items
                </span>
                <span className="font-label-sm text-label-sm font-semibold uppercase text-secondary">Today</span>
              </div>
              <div className="space-y-1.5 text-xs text-on-surface">
                <div className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-[16px] text-secondary" />
                  <span className="text-on-surface-variant/70 line-through">Finalise Sangeet dhol players</span>
                </div>
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="inline-block h-4 w-4 rounded-full border border-primary/40" />
                  <span>Uncle Rajesh: airport fleet roster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
