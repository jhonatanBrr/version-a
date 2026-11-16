import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Container } from "@/design-system/components/Container";
import type { CatalogData } from "../interfaces/home-props";
import { CatalogBrowser } from "./CatalogBrowser";
import { CatalogWithSearch } from "./CatalogWithSearch";
import { CATALOG_ID } from "../utils/anchors";

export function CatalogSection({ products, categories }: CatalogData) {
  const t = useTranslations("home.catalog");

  return (
    <section id={CATALOG_ID} aria-labelledby={`${CATALOG_ID}-title`} className="scroll-mt-24 bg-bg py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <header className="ds-reveal flex flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-wider text-link">{t("eyebrow")}</span>
          <h2 id={`${CATALOG_ID}-title`} className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
        </header>
        {/* Fallback renders the unfiltered catalog if search params suspend. */}
        <Suspense fallback={<CatalogBrowser products={products} categories={categories} query="" />}>
          <CatalogWithSearch products={products} categories={categories} />
        </Suspense>
      </Container>
    </section>
  );
}
