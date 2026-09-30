import { Icon } from "@/components/ui/icon";

/**
 * KPI tile from the dashboard design. `value` is intentionally nullable: the
 * Events/Tasks/Guests/Expenses/Vendors modules are not built yet, and an em
 * dash is honest where a fabricated number would not be.
 */
export function StatCard({
  label,
  icon,
  value,
  suffix,
  caption,
}: {
  label: string;
  icon: string;
  value: string | null;
  suffix?: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex items-center justify-between text-secondary">
        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">{label}</span>
        <Icon name={icon} className="text-base" />
      </div>
      <div className="mt-space-md">
        <span className="font-headline-md text-headline-md text-primary">
          {value ?? <span className="text-on-surface-variant/50">—</span>}
          {value && suffix ? (
            <span className="font-title-md text-title-md font-normal text-on-surface-variant">{suffix}</span>
          ) : null}
        </span>
        <p className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
          {value ? caption : "Not set up yet"}
        </p>
      </div>
    </div>
  );
}
