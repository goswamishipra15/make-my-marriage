import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { redirectIfSignedIn } from "@/server/auth/page-guards";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  await redirectIfSignedIn();

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your wedding workspace.">
      <LoginForm />
    </AuthCard>
  );
}
