const formatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: "always",
});

/**
 * Formats an amount in euros with Italian conventions: "1.250,00 €".
 * Grouping is forced so four-digit amounts also get the thousands separator.
 */
export function formatPrice(amount: number): string {
  return formatter.format(amount).replace(/ /g, " ");
}
