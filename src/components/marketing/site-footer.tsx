import { Wordmark } from "@/components/marketing/wordmark";

const COLUMNS = [
  {
    heading: "Planning",
    links: [
      { label: "Events & Itinerary", href: "#features" },
      { label: "Guests & RSVP", href: "#features" },
      { label: "Expenses & Vendors", href: "#features" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "How it Works", href: "#how-it-works" },
      { label: "For the Family", href: "#family" },
      { label: "Stories", href: "#stories" },
    ],
  },
  {
    heading: "Legal & Privacy",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low shadow-[0_-1px_12px_rgba(91,19,43,0.03)]">
      <div className="mx-auto max-w-[1360px] px-margin-mobile py-space-xl md:px-margin">
        <div className="mb-space-xl grid grid-cols-1 gap-gutter md:grid-cols-4">
          <div className="space-y-space-sm md:col-span-1">
            <Wordmark href={null} size="sm" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              One shared workspace for the family planning an Indian wedding.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading} className="space-y-space-sm">
              <span className="block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                {column.heading}
              </span>
              <div className="flex flex-col space-y-space-xs">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body-md text-body-md text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-2 pt-space-lg font-label-md text-label-md text-on-surface-variant md:flex-row">
          <p>© {new Date().getFullYear()} Make My Marriage.</p>
          <p className="font-headline-sm text-headline-sm italic text-secondary">
            Delhi · Mumbai · Bengaluru · Dehradun
          </p>
        </div>
      </div>
    </footer>
  );
}
