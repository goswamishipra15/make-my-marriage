"use client";

import { useState } from "react";

import { AuthField } from "@/components/auth/auth-field";
import { Icon } from "@/components/ui/icon";

type PasswordFieldProps = {
  label?: string;
  name?: string;
  autoComplete: "current-password" | "new-password";
  hint?: string;
  error?: string;
  minLength?: number;
  required?: boolean;
};

/** Password input with the reveal toggle from the Stitch auth screen. */
export function PasswordField({
  label = "Password",
  name = "password",
  autoComplete,
  hint,
  error,
  minLength,
  required,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      label={label}
      icon="lock_open"
      name={name}
      type={visible ? "text" : "password"}
      // Hides Edge's native reveal eye so only our toggle shows (see globals.css).
      data-reveal-toggle=""
      autoComplete={autoComplete}
      placeholder="••••••••"
      minLength={minLength}
      required={required}
      hint={hint}
      error={error}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-3 flex items-center justify-center rounded p-1 text-outline transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
        >
          <Icon name={visible ? "visibility_off" : "visibility"} className="text-[19px]" />
        </button>
      }
    />
  );
}
