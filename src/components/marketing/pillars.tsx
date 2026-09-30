import { Icon } from "@/components/ui/icon";

/** Six product pillars, mapped to the PRD feature set (§9.5–§9.24). */
const PILLARS = [
  {
    icon: "event_available",
    title: "Multi-Event Ceremony Itinerary",
    body: "Seamless scheduling from Roka and Haldi to the Vedic Pheras. Dress codes, directions and muhurat timings for every ritual.",
    footLabel: "Multi-Day Flow",
    footIcon: "schedule",
  },
  {
    icon: "how_to_reg",
    title: "Frictionless Guest RSVPs",
    body: "Share unique invite links over email or WhatsApp. Guests never download an app or remember a password. Set per-family headcount caps.",
    footLabel: "Zero App Install",
    footIcon: "send_to_mobile",
  },
  {
    icon: "currency_rupee",
    title: "Transparent Expense Tracking",
    body: "Record payments, advances and balances in rupees without accounting sheets. Stay ahead of vendor milestone dues.",
    footLabel: "Financial Clarity",
    footIcon: "pie_chart",
  },
  {
    icon: "qr_code_2",
    title: "Private Event-Tagged Gallery",
    body: "Print elegant QR table tents. Guests scan to view the professional edits and upload their candids into the right album.",
    footLabel: "Original High-Res",
    footIcon: "photo_library",
  },
  {
    icon: "verified_user",
    title: "Discover Local Vendors",
    body: "Browse photographers, mehendi artists, decorators and caterers near your venue, then add them to your vendor list in one click.",
    footLabel: "Curated Nearby",
    footIcon: "handshake",
  },
  {
    icon: "live_tv",
    title: "Wedding Website & Live Stream",
    body: "Publish a styled wedding website in minutes and connect a YouTube Live feed so loved ones abroad can attend the rituals.",
    footLabel: "Global Family Access",
    footIcon: "language",
  },
];

export function Pillars() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-[1360px] scroll-mt-20 px-margin-mobile py-24 md:px-margin"
    >
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            Designed for Grand Nuptials
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            Every Ritual Orchestrated to Perfection
          </h2>
        </div>
        <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
          Crafted for the nuances of multi-day South Asian ceremonies, custom traditions and sprawling guest
          lists.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <article
            key={pillar.title}
            className="group flex flex-col justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary transition-colors group-hover:bg-primary group-hover:text-surface-container-lowest">
                <Icon name={pillar.icon} className="text-2xl" />
              </div>
              <h3 className="mb-3 font-title-lg text-title-lg text-primary">{pillar.title}</h3>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{pillar.body}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-outline-variant/20 pt-6 text-secondary">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">{pillar.footLabel}</span>
              <Icon name={pillar.footIcon} className="text-sm" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
