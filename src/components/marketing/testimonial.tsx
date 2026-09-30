import { Icon } from "@/components/ui/icon";

/**
 * PLACEHOLDER CONTENT.
 *
 * The quote, rating and attribution below are sample copy carried over from the
 * design mock. Replace with a real, consented customer story before launch, or
 * remove the section entirely — shipping invented testimonials is misleading
 * and, for a paid product, a consumer-protection risk.
 */
const STORY = {
  quote:
    "Our parents coordinated airport pick-ups for guests arriving from four continents without a single panic call. What would have been two months of chaos turned into sheer celebration.",
  couple: "Shipra & Himanshu",
  meta: "Married December 2026 · Delhi & Udaipur",
  scale: "Udaipur nuptials · 500+ guests",
  initials: "S&H",
  rating: 5,
};

export function Testimonial() {
  return (
    <section
      id="stories"
      className="mx-auto w-full max-w-[1360px] scroll-mt-20 px-margin-mobile py-24 md:px-margin"
    >
      <figure className="relative mx-auto max-w-4xl rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm md:p-14">
        <Icon name="format_quote" className="absolute top-8 right-10 text-6xl text-secondary/20" />

        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div
            aria-hidden="true"
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-surface-container to-secondary-fixed/50 font-headline text-2xl text-primary ring-2 ring-secondary/30 md:h-36 md:w-36"
          >
            {STORY.initials}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1 text-secondary">
              <span className="flex" role="img" aria-label={`${STORY.rating} out of 5 stars`}>
                {Array.from({ length: STORY.rating }).map((_, i) => (
                  <Icon key={i} name="star" className="text-lg" filled />
                ))}
              </span>
              <span className="ml-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {STORY.scale}
              </span>
            </div>

            <blockquote className="font-headline-sm text-headline-sm font-normal leading-relaxed italic text-primary">
              &ldquo;{STORY.quote}&rdquo;
            </blockquote>

            <figcaption className="pt-2">
              <p className="font-title-lg text-title-lg text-primary">{STORY.couple}</p>
              <p className="font-label-md text-label-md text-on-surface-variant">{STORY.meta}</p>
            </figcaption>
          </div>
        </div>
      </figure>
    </section>
  );
}
