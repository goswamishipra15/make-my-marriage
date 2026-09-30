"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmit } from "@/components/auth/auth-submit";
import { PasswordField } from "@/components/auth/password-field";
import { FormAlert } from "@/components/ui/form-alert";
import { ApiError, apiRequest } from "@/lib/api-client";

export function LoginForm() {
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
      // API_DESIGN §12: returns the user plus whether they already have a wedding.
      const result = await apiRequest<{ hasWedding: boolean }>("POST", "/api/auth/login", {
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      });
      router.replace(result.hasWedding ? "/app/dashboard" : "/onboarding");
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
        label="Email address"
        icon="mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        error={fieldErrors.email}
      />

      <PasswordField autoComplete="current-password" required error={fieldErrors.password} />

      <AuthSubmit pending={pending}>Sign in to your workspace</AuthSubmit>
    </form>
  );
}
