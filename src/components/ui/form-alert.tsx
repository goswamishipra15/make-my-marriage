/** Form-level error message announced to screen readers. */
export function FormAlert({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-error/30 bg-error-container px-3 py-2 font-body-md text-body-md text-on-error-container"
    >
      {message}
    </p>
  );
}
