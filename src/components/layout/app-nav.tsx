"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

/**
 * Main navigation (PRD §10), styled as the design system's sidebar rail.
 *
 * Modules that do not exist yet are rendered as disabled with a "Soon" chip so
 * the shell reflects the whole product without linking to missing routes. The
 * design mock showed live counts on these items; those stay off until the
 * corresponding modules can supply real numbers.
 */
type NavItem = { label: string; href: string; icon: string; ready: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app/dashboard", icon: "dashboard", ready: true },
  { label: "Events", href: "/app/events", icon: "calendar_month", ready: false },
  { label: "Tasks", href: "/app/tasks", icon: "check_circle", ready: false },
  { label: "Guests", href: "/app/guests", icon: "group", ready: false },
  { label: "Expenses", href: "/app/expenses", icon: "account_balance_wallet", ready: false },
  { label: "Vendors", href: "/app/vendors", icon: "storefront", ready: false },
  { label: "Wedding Website", href: "/app/website", icon: "language", ready: false },
  { label: "Photos", href: "/app/photos", icon: "photo_library", ready: false },
  { label: "Live Stream", href: "/app/livestream", icon: "live_tv", ready: false },
  { label: "Settings", href: "/app/settings", icon: "settings", ready: false },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex-1 lg:overflow-y-auto">
      <ul className="flex gap-1 overflow-x-auto px-space-sm lg:flex-col lg:space-y-1 lg:overflow-x-visible">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          if (!item.ready) {
            return (
              <li key={item.href}>
                <span
                  aria-disabled="true"
                  className="flex min-h-10 items-center justify-between gap-space-sm whitespace-nowrap rounded-lg px-space-md py-space-sm text-on-surface-variant/60"
                >
                  <span className="flex items-center gap-space-sm">
                    <Icon name={item.icon} className="text-base" />
                    <span className="font-body-md text-body-md">{item.label}</span>
                  </span>
                  <span className="rounded-full bg-surface-container px-2 py-0.5 font-label-sm text-[10px] uppercase tracking-wide">
                    Soon
                  </span>
                </span>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 items-center justify-between gap-space-sm whitespace-nowrap rounded-lg px-space-md py-space-sm transition-all ${
                  active
                    ? "bg-primary-container font-title-md text-surface-container-lowest"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="flex items-center gap-space-sm">
                  <Icon name={item.icon} className="text-base" />
                  <span className="font-body-md text-body-md">{item.label}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
