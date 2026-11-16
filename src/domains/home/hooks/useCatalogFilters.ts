"use client";

import { useMemo, useState } from "react";
import type { Product, ProductFormat } from "@/shared/catalog/types";
import type { CategoryCounts, CategoryFilter } from "../interfaces/catalog-filters";
import { countByCategory, filterProducts } from "../utils/filter-products";

export interface CatalogFiltersState {
  category: CategoryFilter;
  formats: ProductFormat[];
  results: Product[];
  counts: CategoryCounts;
  /** True when a category or format is selected (the query lives in the URL). */
  hasLocalFilters: boolean;
  selectCategory: (category: CategoryFilter) => void;
  toggleFormat: (format: ProductFormat) => void;
  resetLocalFilters: () => void;
}

/** Category and format selections in local state; the name query comes from the URL. */
export function useCatalogFilters(products: Product[], query: string): CatalogFiltersState {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [formats, setFormats] = useState<ProductFormat[]>([]);

  const results = useMemo(
    () => filterProducts(products, { query, category, formats }),
    [products, query, category, formats],
  );
  const counts = useMemo(() => countByCategory(products, { query, formats }), [products, query, formats]);

  return {
    category,
    formats,
    results,
    counts,
    hasLocalFilters: category !== "all" || formats.length > 0,
    selectCategory: setCategory,
    toggleFormat: (format) =>
      setFormats((current) =>
        current.includes(format) ? current.filter((item) => item !== format) : [...current, format],
      ),
    resetLocalFilters: () => {
      setCategory("all");
      setFormats([]);
    },
  };
}
