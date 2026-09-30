/**
 * Closing call to action.
 *
 * The design mock carried a "Free for up to 100 guest RSVPs" pricing promise.
 * The PRD defines no pricing or plan limits for V1, so that claim is omitted
 * rather than shipped unbacked. Add it back once billing tiers actually exist.
 *
 * The form is a plain GET to /signup so it works without JavaScript; the
 * wedding name arrives as a query param the signup flow can prefill from.
 */
export function Cta() {
  return (
    <section
      id="create"
      className="relative w-full overflow-hidden bg-primary-container py-20 text-surface-container-lowest"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-secondary/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-secondary/20"
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-margin-mobile text-center md:px-margin">
        <div className="mx-auto max-w-3xl space-y-6">
          <span className="block font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed">
            One Workspace, One Wedding
          </span>
          <h2 className="font-display-hero text-display-hero-mobile tracking-tight text-surface-container-lowest md:text-display-hero">
            Begin your wedding chapter in serene elegance.
          </h2>
          <p className="mx-auto max-w-xl font-body-lg text-body-lg text-surface-container-lowest/80">
            Create your private family workspace in under two minutes and invite the people helping you plan.
          </p>

          <div className="mx-auto max-w-lg pt-4">
            <form
              action="/signup"
              method="get"
              className="flex flex-col gap-3 rounded-lg border border-secondary/30 bg-surface-container-lowest/10 p-2 backdrop-blur-md sm:flex-row"
            >
              <label htmlFor="wedding-name" className="sr-only">
                Your wedding name
              </label>
              <input
                id="wedding-name"
                name="wedding"
                type="text"
                required
                placeholder="e.g. Shipra &amp; Himanshu's Wedding"
                className="w-full rounded-lg bg-surface-container-lowest px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-secondary px-6 py-3 font-label-md text-label-md font-semibold uppercase tracking-wider text-surface-container-lowest transition-all hover:bg-secondary-fixed hover:text-on-secondary-fixed"
              >
                Get Started
              </button>
            </form>
            <p className="mt-3 font-label-sm text-xs tracking-wider text-surface-container-lowest/60">
              Private by default · Only the family members you invite can see your wedding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
