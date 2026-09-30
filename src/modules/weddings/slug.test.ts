import { describe, expect, it } from "vitest";
import { baseWeddingSlug, slugCandidate } from "@/modules/weddings/slug";

describe("baseWeddingSlug", () => {
  it("uses bride-groom-DDMMYYYY", () => {
    expect(baseWeddingSlug("Shipra", "Himanshu", "2027-02-14")).toBe("shipra-himanshu-14022027");
  });

  it("normalizes spaces, punctuation and accents", () => {
    expect(baseWeddingSlug("  Anaïs Marie ", "O'Brien", "2027-12-01")).toBe("anais-marie-o-brien-01122027");
  });

  it("falls back when names contain no Latin characters", () => {
    expect(baseWeddingSlug("शिप्रा", "हिमांशु", "2027-02-14")).toBe("wedding-14022027");
  });
});

describe("slugCandidate", () => {
  it("adds a numeric suffix after the first attempt", () => {
    expect(slugCandidate("a-b-14022027", 1)).toBe("a-b-14022027");
    expect(slugCandidate("a-b-14022027", 2)).toBe("a-b-14022027-2");
  });
});
