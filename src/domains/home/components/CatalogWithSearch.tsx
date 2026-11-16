"use client";

import { useSearchParams } from "next/navigation";
import { SEARCH_PARAM } from "@/design-system/layout/HeaderSearch";
import { useRouter } from "@/shared/i18n/navigation";
import type { CatalogData } from "../interfaces/home-props";
import { CatalogBrowser } from "./CatalogBrowser";

/** Reads the header search (`q`) from the URL; must render inside <Suspense>. */
export function CatalogWithSearch({ products, categories }: CatalogData) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get(SEARCH_PARAM) ?? "";

  return (
    <CatalogBrowser
      products={products}
      categories={categories}
      query={query}
      onClearQuery={() => router.replace("/", { scroll: false })}
    />
  );
}
