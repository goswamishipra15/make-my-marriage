import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getMe } from "@/modules/auth/me";
import { getCurrentUser } from "@/server/auth/context";
import { connectToDatabase } from "@/server/db/mongoose";

/**
 * Guards for Server Component pages. These are the real checks;
 * src/proxy.ts only performs a fast cookie-presence redirect.
 */
async function loadViewer() {
  // Per-request page: never prerender at build time (it reads cookies and the DB).
  await connection();
  await connectToDatabase();
  const user = await getCurrentUser();
  return user ? getMe(user) : null;
}

/** For /login and /signup: send signed-in users onward. */
export async function redirectIfSignedIn(): Promise<void> {
  const viewer = await loadViewer();
  if (viewer) redirect(viewer.wedding ? "/app/dashboard" : "/onboarding");
}

/** For /onboarding: signed in, but no wedding yet. */
export async function requireViewerWithoutWedding() {
  const viewer = await loadViewer();
  if (!viewer) redirect("/login");
  if (viewer.wedding) redirect("/app/dashboard");
  return viewer;
}

/** For /app/*: signed in with a wedding membership. */
export async function requireViewerWithWedding() {
  const viewer = await loadViewer();
  if (!viewer) redirect("/login");
  if (!viewer.wedding || !viewer.membership) redirect("/onboarding");
  return { ...viewer, wedding: viewer.wedding, membership: viewer.membership };
}
