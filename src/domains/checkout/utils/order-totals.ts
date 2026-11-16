import type { OrderTotals, PricedLine } from "../interfaces/checkout";

const toCents = (amount: number) => Math.round(amount * 100);

/** Subtotal at list price, discount, free shipping and final total. */
export function orderTotals(lines: PricedLine[]): OrderTotals {
  const subtotalCents = lines.reduce((sum, line) => sum + toCents(line.lineListTotal), 0);
  const totalCents = lines.reduce((sum, line) => sum + toCents(line.lineTotal), 0);
  return {
    subtotal: subtotalCents / 100,
    discount: (subtotalCents - totalCents) / 100,
    shipping: 0,
    total: totalCents / 100,
  };
}

export const INSTALLMENTS = 3;

/** Amount of each interest-free installment, rounded up to the cent. */
export function installmentAmount(total: number, installments = INSTALLMENTS): number {
  return Math.ceil(toCents(total) / installments) / 100;
}
