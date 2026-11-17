"use client";

import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/design-system/components/Button";
import { FilterChip } from "@/design-system/components/FilterChip";
import { FORMAT_DOT, ProductCard } from "@/design-system/patterns/ProductCard";
import { FORMATS } from "@/shared/catalog/queries";
import type { AppLocale } from "@/shared/i18n/routing";
import { useCatalogFilters } from "../hooks/useCatalogFilters";
import type { CatalogData } from "../interfaces/home-props";
import { AddToCartButton } from "./AddToCartButton";

export interface CatalogBrowserProps extends CatalogData {
  /** Name search coming from the header (`q` URL param). */
  query: string;
  /** Clears the URL query; called together with the local filter reset. */
  onClearQuery?: () => void;
}

/** Filter bar, live result count and product grid. Filtering is client-side. */
export function CatalogBrowser({ products, categories, query, onClearQuery }: CatalogBrowserProps) {
  const t = useTranslations("home.catalog");
  const common = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const filters = useCatalogFilters(products, query);
  const trimmedQuery = query.trim();
  const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label[locale] ?? id;

  const resetAll = () => {
    filters.resetLocalFilters();
    if (trimmedQuery) onClearQuery?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div role="group" aria-label={t("categoriesLabel")} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip
            active={filters.category === "all"}
            count={filters.counts.all}
            onClick={() => filters.selectCategory("all")}
          >
            {t("all")}
          </FilterChip>
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              active={filters.category === category.id}
              count={filters.counts[category.id]}
              onClick={() => filters.selectCategory(category.id)}
            >
              {category.label[locale]}
            </FilterChip>
          ))}
        </div>
        <div role="group" aria-label={t("formatsLabel")} className="flex flex-wrap gap-2">
          {FORMATS.map((format) => (
            <FilterChip
              key={format}
              appearance="soft"
              dotColor={FORMAT_DOT[format]}
              active={filters.formats.includes(format)}
              onClick={() => filters.toggleFormat(format)}
            >
              {common(`formats.${format}`)}
            </FilterChip>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="text-sm font-medium text-muted">
        {t("results", { count: filters.results.length })}
        {trimmedQuery && ` ${t("searchingFor", { query: trimmedQuery })}`}
      </p>

      {filters.results.length > 0 ? (
        // Re-keyed when category or formats change so the cards replay their staggered entrance.
        // The search query is left out on purpose: typing must not remount the grid on every
        // keystroke; cards that appear while searching animate in on their own.
        <ul
          key={`${filters.category}|${filters.formats.join(",")}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filters.results.map((product, index) => (
            <li key={product.id} className="ds-reveal flex">
              <div
                className="ds-enter flex w-full"
                style={{ "--ds-delay": `${Math.min(index, 8) * 60}ms` } as CSSProperties}
              >
                <ProductCard
                  product={product}
                  categoryLabel={categoryLabel(product.category)}
                  detailsLabel={t("details")}
                  priority={index < 3}
                  className="w-full"
                  action={<AddToCartButton product={product} />}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-ds border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
          <h3 className="font-display text-xl">{t("emptyTitle")}</h3>
          <p className="max-w-md text-muted">{t("emptyText")}</p>
          {(filters.hasLocalFilters || trimmedQuery) && (
            <Button variant="outline" onClick={resetAll} className="mt-2">
              {t("reset")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
