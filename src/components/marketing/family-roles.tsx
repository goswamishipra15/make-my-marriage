import Image from "next/image";

import { Icon } from "@/components/ui/icon";

export function FamilyRoles() {
  return (
    <section
      id="family"
      className="w-full scroll-mt-20 border-y border-outline-variant/30 bg-surface-container-low py-20"
    >
      <div className="mx-auto max-w-[1360px] px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Visual column */}
          <div className="relative lg:col-span-6">
            <div className="relative h-[440px] overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest shadow-xl">
              <Image
                src="/marketing/family-planning.jpg"
                alt="Three generations of an Indian family sitting together on cushioned seating in a marigold-draped courtyard, reviewing their wedding plan on a tablet"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 flex items-center gap-4 rounded-lg border border-secondary/30 bg-surface-container-lowest p-5 shadow-lg md:right-8">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container font-headline text-xl text-surface-container-lowest"
              >
                S&amp;H
              </span>
              <div>
                <p className="font-title-md text-title-md text-primary">Role-Based Simplicity</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Simple for elders, robust for organisers
                </p>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="space-y-6 pt-10 lg:col-span-6 lg:pt-0">
            <span className="block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
              Built for the Whole Family
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
              Simple enough for parents.
              <br />
              Powerful for the couple.
            </h2>
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              An Indian wedding is a communal milestone. Make My Marriage uses high readability, large touch
              targets and clear roles so parents can track arrivals without wrestling with project management
              software.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
                <span className="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                  Admins
                </span>
                <p className="mt-1 font-title-md text-title-md text-primary">Full workspace access</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Everything a Manager can do, plus inviting family members, changing their role and removing
                  them.
                </p>
              </div>
              <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4">
                <span className="block font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                  Managers
                </span>
                <p className="mt-1 font-title-md text-title-md text-primary">Day-to-day planning</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Events, tasks, guests, expenses and vendors. Parents and siblings tick off welcome kits and
                  airport pickups from their phone.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <p className="inline-flex items-start gap-2 font-title-md text-sm text-primary">
                <Icon name="visibility" className="shrink-0 text-secondary" />
                <span>
                  Everyone helping plan sees the same wedding. One shared truth, no hidden tasks or split
                  spreadsheets.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
