import { describe, expect, it } from "vitest";
import { formatPaise, rupeesToPaise } from "@/lib/money";

describe("formatPaise", () => {
  it("uses Indian digit grouping", () => {
    expect(formatPaise(124500000)).toBe("₹12,45,000");
  });

  it("keeps paise when present", () => {
    expect(formatPaise(123450)).toBe("₹1,234.5");
  });
});

describe("rupeesToPaise", () => {
  it("parses whole and fractional rupees without floating-point error", () => {
    expect(rupeesToPaise("1,234.50")).toBe(123450);
    expect(rupeesToPaise("0.1")).toBe(10);
    expect(rupeesToPaise("₹ 17,42,500")).toBe(174250000);
  });

  it("rejects invalid input", () => {
    expect(rupeesToPaise("12.345")).toBeNull();
    expect(rupeesToPaise("-5")).toBeNull();
    expect(rupeesToPaise("abc")).toBeNull();
  });
});
