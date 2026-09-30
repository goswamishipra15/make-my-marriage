import { Icon } from "@/components/ui/icon";

const FRAGMENTED = [
  "**14 WhatsApp groups** with cousins, in-laws and uncles losing crucial ceremony timings in endless chatter.",
  "**5 conflicting spreadsheets** of RSVPs where nobody knows the real headcount or dietary preferences.",
  "**Forgotten guest counts** leading to last-minute catering shortfalls and uncoordinated expenses.",
  "**Misplaced vendor contracts** and cash advance notes scrawled on paper envelopes.",
];

const SERENE = [
  "**One unified source of truth** where bride, groom, parents and cousins coordinate without friction.",
  "**Link-based RSVPs with no app install** so even tech-hesitant elders confirm in a single tap.",
  "**Live rupee expense tracking** by ceremony, so you always know what has actually been spent.",
  "**One QR for guest photos**, uploaded straight into the right ritual album.",
];

/** Renders `**bold**` segments without pulling in a markdown dependency. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Comparison() {
  return (
    <section
      id="how-it-works"
      className="w-full scroll-mt-20 border-y border-outline-variant/30 bg-surface-container-low py-20"
    >
      <div className="mx-auto max-w-[1360px] px-margin-mobile md:px-margin">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            The Modern Transformation
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            From Fragmented to Harmonious
          </h2>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Indian weddings are vibrant unions of big extended families. Your planning tool should bring them
            closer, not drown them in spreadsheets.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6 rounded-xl border border-outline-variant/40 bg-surface-container-lowest/70 p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-container/60 text-on-error-container">
                <Icon name="close" className="text-xl" />
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">The Fragmented Way</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Scattered, stressful, overwhelming
                </p>
              </div>
            </div>
            <ul className="space-y-4 pt-2">
              {FRAGMENTED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="remove_circle_outline" className="mt-0.5 text-lg text-error" />
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    <RichText text={item} />
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative space-y-6 rounded-xl border-2 border-secondary/40 bg-surface-container-lowest p-8 shadow-[0_12px_30px_-6px_rgba(91,19,43,0.06)]">
            <span className="absolute top-4 right-5 rounded-full bg-secondary-fixed px-2.5 py-1 font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-secondary-fixed">
              Make My Marriage
            </span>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                <Icon name="done_all" className="text-xl" />
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-primary">The Serene Standard</h3>
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                  One family command center
                </p>
              </div>
            </div>
            <ul className="space-y-4 pt-2">
              {SERENE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="verified" className="mt-0.5 text-lg text-secondary" />
                  <p className="font-body-md text-body-md text-on-surface">
                    <RichText text={item} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
