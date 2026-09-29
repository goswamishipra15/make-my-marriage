"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { TextField } from "@/components/ui/text-field";
import { ApiError, apiRequest } from "@/lib/api-client";

function text(form: FormData, key: string): string | undefined {
  const value = String(form.get(key) ?? "").trim();
  return value || undefined;
}

export function CreateWeddingForm() {
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

    const city = text(form, "city");
    const state = text(form, "state");

    try {
      await apiRequest("POST", "/api/wedding", {
        brideName: text(form, "brideName") ?? "",
        groomName: text(form, "groomName") ?? "",
        weddingDate: text(form, "weddingDate") ?? "",
        timeZone: "Asia/Kolkata",
        title: text(form, "title"),
        location: {
          city,
          state,
          country: "India",
          formattedAddress: [city, state, "India"].filter(Boolean).join(", ") || undefined,
        },
      });
      router.replace("/app/dashboard");
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
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormAlert message={formError} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Bride's name" name="brideName" required error={fieldErrors.brideName} />
        <TextField label="Groom's name" name="groomName" required error={fieldErrors.groomName} />
      </div>
      <TextField label="Wedding date" name="weddingDate" type="date" required error={fieldErrors.weddingDate} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="City"
          name="city"
          required
          placeholder="Dehradun"
          error={fieldErrors["location.city"] ?? fieldErrors.location}
        />
        <TextField label="State" name="state" placeholder="Uttarakhand" error={fieldErrors["location.state"]} />
      </div>
      <TextField
        label="Wedding title"
        name="title"
        placeholder="Akshay ❤️ Princi"
        hint="Optional. You can change this later."
        error={fieldErrors.title}
      />
      <Button type="submit" loading={pending}>
        Create wedding
      </Button>
    </form>
  );
}
