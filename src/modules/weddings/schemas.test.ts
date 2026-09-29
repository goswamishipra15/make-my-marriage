import { describe, expect, it } from "vitest";
import { createWeddingSchema } from "@/modules/weddings/schemas";

const valid = {
  brideName: "Princi",
  groomName: "Akshay",
  weddingDate: "2027-02-14",
  location: { city: "Dehradun" },
};

describe("createWeddingSchema", () => {
  it("accepts the required fields and defaults the time zone", () => {
    const parsed = createWeddingSchema.parse(valid);
    expect(parsed.timeZone).toBe("Asia/Kolkata");
  });

  it("rejects impossible dates", () => {
    expect(createWeddingSchema.safeParse({ ...valid, weddingDate: "2027-02-30" }).success).toBe(false);
  });

  it("requires a city or address", () => {
    expect(createWeddingSchema.safeParse({ ...valid, location: {} }).success).toBe(false);
  });

  it("rejects unknown fields such as a client-supplied weddingId", () => {
    expect(createWeddingSchema.safeParse({ ...valid, weddingId: "abc" }).success).toBe(false);
  });
});
