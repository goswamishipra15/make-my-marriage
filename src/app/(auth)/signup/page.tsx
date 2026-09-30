import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";
import { redirectIfSignedIn } from "@/server/auth/page-guards";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage() {
  await redirectIfSignedIn();

  return (
    <AuthCard
      mode="signup"
      title="Create account"
      subtitle="Start planning your wedding with your family."
    >
      <SignupForm />
    </AuthCard>
  );
}
