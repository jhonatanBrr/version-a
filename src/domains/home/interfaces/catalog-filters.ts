import type { CategoryId, ProductFormat } from "@/shared/catalog/types";

/** Category filter value; "all" is the "Tutti" chip. */
export type CategoryFilter = CategoryId | "all";

export interface CatalogFilters {
  /** Free-text name search (from the `q` URL param). */
  query: string;
  category: CategoryFilter;
  /** Selected formats; empty means every format. */
  formats: readonly ProductFormat[];
}

export type CategoryCounts = Record<CategoryFilter, number>;
