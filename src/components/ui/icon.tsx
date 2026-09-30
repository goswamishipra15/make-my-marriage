/**
 * Material Symbols glyph. Decorative by default so screen readers skip it;
 * pass a `label` when the icon is the only carrier of meaning.
 */
export function Icon({
  name,
  className,
  label,
  filled = false,
}: {
  name: string;
  className?: string;
  label?: string;
  filled?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ""}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {name}
    </span>
  );
}
