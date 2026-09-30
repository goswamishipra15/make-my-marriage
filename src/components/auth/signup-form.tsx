"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmit } from "@/components/auth/auth-submit";
import { PasswordField } from "@/components/auth/password-field";
import { FormAlert } from "@/components/ui/form-alert";
import { ApiError, apiRequest } from "@/lib/api-client";

export function SignupForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setFormError(null);
    setFieldErrors({});

    try {
      // API_DESIGN §11: signup creates the account and the session in one call,
      // so a new user always lands on onboarding to create their wedding.
      await apiRequest("POST", "/api/auth/signup", {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      });
      router.replace("/onboarding");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
        setFieldErrors(error.details ?? {});
      } else {
        setFormError("Something went wrong. Please try again.");
      }
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-space-md">
      <FormAlert message={formError} />

      <AuthField
        label="Your full name"
        icon="badge"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="e.g. Priya Sharma"
        maxLength={120}
        required
        error={fieldErrors.name}
      />

      <AuthField
        label="Email address"
        icon="mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        error={fieldErrors.email}
      />

      {/* Hint mirrors passwordSchema in src/modules/auth/schemas.ts. */}
      <PasswordField
        autoComplete="new-password"
        minLength={8}
        required
        hint="At least 8 characters"
        error={fieldErrors.password}
      />

      <AuthSubmit pending={pending}>Create your workspace</AuthSubmit>
    </form>
  );
}
