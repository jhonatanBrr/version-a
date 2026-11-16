import { describe, expect, it } from "vitest";
import { createOrderNumber } from "./order-number";

describe("createOrderNumber", () => {
  it("builds GP-<year>-<5 digits> from the timestamp", () => {
    const at = new Date(2026, 10, 16, 10, 0, 0).getTime();
    expect(createOrderNumber(at)).toMatch(/^GP-2026-\d{5}$/);
  });

  it("is deterministic for the same timestamp", () => {
    expect(createOrderNumber(1_763_290_000_123)).toBe(createOrderNumber(1_763_290_000_123));
  });
});
