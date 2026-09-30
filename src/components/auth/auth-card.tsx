import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

export type AuthMode = "signin" | "signup";

const TABS: { mode: AuthMode; href: string; icon: string; label: string }[] = [
  { mode: "signin", href: "/login", icon: "login", label: "Sign in" },
  { mode: "signup", href: "/signup", icon: "person_add", label: "Sign up" },
];

/**
 * Editorial auth card from the Stitch "Sign In & Sign Up" screen: gold hairline
 * accent, brand crest, ceremonial titles, and a segmented switcher between the
 * two routes.
 *
 * Omit `mode` for account screens that are not sign in / sign up (onboarding):
 * the switcher and the guest notice are then left out.
 */
export function AuthCard({
  mode,
  title,
  subtitle,
  children,
}: {
  mode?: AuthMode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative z-10 flex w-full max-w-[480px] flex-col gap-space-lg rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-space-lg shadow-xl sm:p-space-xl">
      {/* Architectural gold accent rule */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-8 left-8 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
      />

      <header className="flex flex-col items-center text-center">
        <BrandCrest />
        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Make My Marriage
        </span>
        <h1 className="mt-1 font-headline-md text-headline-md font-semibold text-primary">{title}</h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
      </header>

      {mode ? (
        <nav aria-label="Account" className="grid grid-cols-2 gap-1 rounded-xl bg-surface-container p-1 shadow-inner">
          {TABS.map((tab) => {
            const active = tab.mode === mode;
            return (
              <Link
                key={tab.mode}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-space-sm py-space-xs font-title-md text-title-md transition-all duration-200 ${
                  active
                    ? "bg-primary-container text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Icon name={tab.icon} className="text-[18px]" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      ) : null}

      {children}

      {/* Guests never hold accounts (PRD §5 roles), so point them away from auth. */}
      {mode ? (
        <p className="flex items-start gap-2 rounded-lg bg-surface-container-low p-space-sm font-body-md text-body-md text-on-surface-variant">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
          <span>
            Invited as a guest? You don&apos;t need an account. Open the invitation link the family shared
            with you to RSVP.
          </span>
        </p>
      ) : null}
    </div>
  );
}

/** Mandap arch emblem from the Stitch design. */
function BrandCrest() {
  return (
    <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-container text-secondary-fixed shadow-md">
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V9a7 7 0 0 1 14 0v12" />
        <path d="M9 21V12a3 3 0 0 1 6 0v9" />
        <circle cx="12" cy="5" r="1.5" />
      </svg>
    </span>
  );
}
