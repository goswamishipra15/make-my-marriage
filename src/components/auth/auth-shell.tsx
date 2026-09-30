import type { ReactNode } from "react";

import { Wordmark } from "@/components/marketing/wordmark";

/**
 * Centred page shell for the account screens (sign in, sign up, onboarding).
 * Mirrors the Stitch auth screen: an editorial card floating over two ambient
 * ceremonial glows on the parchment canvas.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-margin-mobile py-space-xl md:px-margin">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-36 h-[420px] w-[420px] rounded-full bg-primary-container/10 blur-3xl"
      />

      <div className="relative z-10 mb-space-lg">
        <Wordmark size="sm" />
      </div>

      {children}
    </main>
  );
}
