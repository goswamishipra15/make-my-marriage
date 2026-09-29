import { describe, expect, it } from "vitest";
import { daysUntil, formatWeddingDate, todayInTimeZone } from "@/lib/dates";

describe("todayInTimeZone", () => {
  it("evaluates the calendar day in the wedding time zone", () => {
    // 20:00 UTC on 13 Feb is already 14 Feb in India (UTC+5:30).
    const now = new Date("2027-02-13T20:00:00Z");
    expect(todayInTimeZone("Asia/Kolkata", now)).toBe("2027-02-14");
    expect(todayInTimeZone("UTC", now)).toBe("2027-02-13");
  });
});

describe("daysUntil", () => {
  it("counts whole days to the wedding date", () => {
    const now = new Date("2027-01-03T06:00:00Z");
    expect(daysUntil("2027-02-14", "Asia/Kolkata", now)).toBe(42);
    expect(daysUntil("2027-01-03", "Asia/Kolkata", now)).toBe(0);
  });
});

describe("formatWeddingDate", () => {
  it("formats date-only values without timezone drift", () => {
    expect(formatWeddingDate("2027-02-14")).toBe("14 February 2027");
  });
});
