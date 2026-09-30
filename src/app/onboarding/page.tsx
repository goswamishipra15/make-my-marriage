import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { CreateWeddingForm } from "@/components/weddings/create-wedding-form";
import { requireViewerWithoutWedding } from "@/server/auth/page-guards";

export const metadata: Metadata = { title: "Create your wedding" };

export default async function OnboardingPage() {
  const viewer = await requireViewerWithoutWedding();

  return (
    <AuthShell>
      <AuthCard
        title={`Welcome, ${viewer.user.name.split(" ")[0]}`}
        subtitle="Tell us about your wedding. You'll be its first Admin."
      >
        <CreateWeddingForm />
      </AuthCard>
    </AuthShell>
  );
}
