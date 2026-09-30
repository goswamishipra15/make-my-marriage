import Link from "next/link";
import { Wordmark } from "@/components/marketing/wordmark";

const SECTION_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "For the Family", href: "#family" },
  { label: "Stories", href: "#stories" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/90 shadow-[0_1px_8px_rgba(91,19,43,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-margin-mobile md:px-margin">
        <Wordmark />

        <nav aria-label="Sections" className="hidden items-center gap-space-lg lg:flex">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <Link
            href="/login"
            className="rounded px-space-sm py-space-xs font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary-container px-space-lg py-space-sm font-label-md text-label-md uppercase tracking-widest text-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(91,19,43,0.12)] transition-all hover:bg-primary"
          >
            Plan Your Wedding
          </Link>
        </div>
      </div>
    </header>
  );
}
