/** Demo order id "GP-<year>-<5 digits>" derived from a submit timestamp. */
export function createOrderNumber(timestamp: number): string {
  const year = new Date(timestamp).getFullYear();
  const digits = String(Math.floor(timestamp) % 100_000).padStart(5, "0");
  return `GP-${year}-${digits}`;
}
