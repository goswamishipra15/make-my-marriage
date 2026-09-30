import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

/** Section header with the design system's eyebrow + serif title pairing. */
export function PanelHeading({
  eyebrow,
  title,
  aside,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div className="flex items-center justify-between gap-space-sm">
      <div className="flex flex-col">
        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
          {eyebrow}
        </span>
        <Tag className="font-headline-sm text-headline-sm text-primary">{title}</Tag>
      </div>
      {aside}
    </div>
  );
}

/** Card surface used by the right-hand analytics column. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`flex flex-col space-y-space-md rounded-lg bg-surface-container-lowest p-space-md shadow-sm${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </section>
  );
}

/**
 * Placeholder shown where a module has no data yet. Used instead of the sample
 * figures in the design mock, which would read as real numbers in the product.
 */
export function EmptyState({
  icon,
  title,
  body,
  soon = false,
}: {
  icon: string;
  title: string;
  body: string;
  soon?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-space-sm rounded-lg border border-dashed border-outline-variant/60 bg-surface-container-low/60 px-space-md py-space-lg text-center">
      <Icon name={icon} className="text-2xl text-secondary/70" />
      <div>
        <p className="font-title-md text-title-md text-primary">
          {title}
          {soon ? (
            <span className="ml-2 rounded-full bg-surface-container px-2 py-0.5 align-middle font-label-sm text-[10px] uppercase tracking-wide text-on-surface-variant">
              Soon
            </span>
          ) : null}
        </p>
        <p className="mt-1 max-w-sm font-body-md text-body-md text-on-surface-variant">{body}</p>
      </div>
    </div>
  );
}
