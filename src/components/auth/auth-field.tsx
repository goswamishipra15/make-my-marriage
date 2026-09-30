import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  /** Material Symbols glyph rendered inside the field's leading edge. */
  icon: string;
  hint?: string;
  error?: string;
  /** Rendered against the trailing edge, e.g. the password visibility toggle. */
  trailing?: ReactNode;
};

/**
 * Auth input styled per the "Royal Minimalist Matrimony" design system:
 * white fill, hairline rose-taupe border, wine focus ring (design MD
 * "Form Inputs"), with a leading icon as the Stitch auth screen specifies.
 */
export function AuthField({ label, icon, hint, error, trailing, className, ...props }: AuthFieldProps) {
  const inputId = useId();
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="font-label-md text-label-md font-semibold uppercase tracking-wider text-on-surface-variant"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <Icon name={icon} className="pointer-events-none absolute left-3.5 text-[20px] text-outline" />
        <input
          {...props}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          className={`w-full rounded-lg border bg-surface-container-lowest py-3 pl-11 ${
            trailing ? "pr-11" : "pr-4"
          } font-body-md text-body-md text-on-surface shadow-sm transition-all duration-150 outline-none placeholder:text-outline-variant focus:ring-[3px] focus:ring-primary-container/10 ${
            error ? "border-error focus:border-error" : "border-outline-variant focus:border-primary-container"
          } ${className ?? ""}`}
        />
        {trailing}
      </div>

      {hint ? (
        <span id={hintId} className="font-label-sm text-label-sm normal-case tracking-normal text-on-surface-variant">
          {hint}
        </span>
      ) : null}

      {error ? (
        <span id={errorId} className="font-label-sm text-label-sm normal-case tracking-normal text-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
