import type { Product } from "@/shared/catalog/types";
import type { CatalogFilters, CategoryCounts } from "../interfaces/catalog-filters";

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function matchesQuery(product: Product, query: string): boolean {
  const needle = normalize(query);
  return needle === "" || product.name.toLocaleLowerCase().includes(needle);
}

function matchesFormats(product: Product, formats: CatalogFilters["formats"]): boolean {
  return formats.length === 0 || formats.includes(product.format);
}

/** Applies name search, category and format filters (formats are OR-ed). */
export function filterProducts(products: Product[], { query, category, formats }: CatalogFilters): Product[] {
  return products.filter(
    (product) =>
      matchesQuery(product, query) &&
      (category === "all" || product.category === category) &&
      matchesFormats(product, formats),
  );
}

/** Per-category counts under the other active filters, so chips show what clicking would yield. */
export function countByCategory(
  products: Product[],
  { query, formats }: Pick<CatalogFilters, "query" | "formats">,
): CategoryCounts {
  const counts: CategoryCounts = { all: 0, clinica: 0, scuola: 0, lavoro: 0, formazione: 0 };
  for (const product of products) {
    if (!matchesQuery(product, query) || !matchesFormats(product, formats)) continue;
    counts.all += 1;
    counts[product.category] += 1;
  }
  return counts;
}
