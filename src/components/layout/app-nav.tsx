"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Main navigation (PRD §10). Modules not yet built are shown as "Soon"
 * so the shell reflects the full product without linking to missing pages.
 */
type NavItem = { label: string; href: string; ready: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", ready: true },
  { label: "Events", href: "/app/events", ready: false },
  { label: "Tasks", href: "/app/tasks", ready: false },
  { label: "Guests", href: "/app/guests", ready: false },
  { label: "Expenses", href: "/app/expenses", ready: false },
  { label: "Vendors", href: "/app/vendors", ready: false },
  { label: "Wedding Website", href: "/app/website", ready: false },
  { label: "Photos", href: "/app/photos", ready: false },
  { label: "Live Stream", href: "/app/livestream", ready: false },
  { label: "Settings", href: "/app/settings", ready: false },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex gap-1 overflow-x-auto md:flex-col">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          if (!item.ready) {
            return (
              <li key={item.href}>
                <span
                  aria-disabled="true"
                  className="flex min-h-10 items-center justify-between gap-2 whitespace-nowrap rounded-lg px-3 text-sm text-muted-foreground/70"
                >
                  {item.label}
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide">Soon</span>
                </span>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium ${
                  active ? "bg-brand text-brand-foreground" : "hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
