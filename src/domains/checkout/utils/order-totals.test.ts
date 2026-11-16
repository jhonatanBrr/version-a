import { describe, expect, it } from "vitest";
import { installmentAmount, orderTotals } from "./order-totals";

describe("orderTotals", () => {
  it("computes subtotal at list price, discount and total", () => {
    const totals = orderTotals([
      { lineTotal: 850, lineListTotal: 1000 },
      { lineTotal: 212.5, lineListTotal: 250 },
    ]);
    expect(totals).toEqual({ subtotal: 1250, discount: 187.5, shipping: 0, total: 1062.5 });
  });

  it("returns zeros for an empty order", () => {
    expect(orderTotals([])).toEqual({ subtotal: 0, discount: 0, shipping: 0, total: 0 });
  });

  it("avoids floating point noise", () => {
    expect(orderTotals([{ lineTotal: 0.1, lineListTotal: 0.1 }, { lineTotal: 0.2, lineListTotal: 0.2 }]).total).toBe(0.3);
  });
});

describe("installmentAmount", () => {
  it("splits the total in 3 rounding up to the cent", () => {
    expect(installmentAmount(1062.5)).toBe(354.17);
  });

  it("keeps exact splits unchanged", () => {
    expect(installmentAmount(300)).toBe(100);
  });
});
