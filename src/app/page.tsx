import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">Make My Marriage</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold sm:text-5xl">
        Plan your Indian wedding together, in one place.
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Events, tasks, guests, RSVPs, expenses, vendors, your wedding website and photos, shared with the family
        members helping you plan.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/signup"
          className="inline-flex min-h-11 items-center rounded-lg bg-brand px-5 text-sm font-medium text-brand-foreground hover:opacity-90"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="inline-flex min-h-11 items-center rounded-lg border border-border bg-white px-5 text-sm font-medium hover:bg-muted"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
