import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("uses Italian thousands and decimal separators", () => {
    expect(formatPrice(1250)).toBe("1.250,00 €");
  });

  it("keeps two decimals for amounts below one thousand", () => {
    expect(formatPrice(157.25)).toBe("157,25 €");
  });

  it("groups large amounts", () => {
    expect(formatPrice(12500.5)).toBe("12.500,50 €");
  });
});
