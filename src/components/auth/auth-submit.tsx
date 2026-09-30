import { Icon } from "@/components/ui/icon";

/** Primary auth call to action: solid wine pill with the Stitch arrow affordance. */
export function AuthSubmit({ pending, children }: { pending: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending || undefined}
      className="group mt-2 inline-flex w-full items-center justify-center gap-space-xs rounded-xl bg-primary-container px-space-lg py-3 font-title-md text-title-md tracking-wide text-on-primary shadow-md transition-all duration-200 hover:bg-tertiary-container active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
    >
      <span>{pending ? "Please wait…" : children}</span>
      <Icon
        name="arrow_forward"
        className="text-[19px] transition-transform duration-200 group-hover:translate-x-1"
      />
    </button>
  );
}
