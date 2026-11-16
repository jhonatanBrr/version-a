import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "@/design-system/patterns/ProductCard";
import type { Category, Product } from "@/shared/catalog/types";
import type { AppLocale } from "@/shared/i18n/routing";

export interface RelatedProductsProps {
  products: Product[];
  categories: Category[];
}

export function RelatedProducts({ products, categories }: RelatedProductsProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("product.related");
  if (products.length === 0) return null;
  const labelOf = (product: Product) => categories.find((c) => c.id === product.category)?.label[locale] ?? "";

  return (
    <section aria-labelledby="related-title" className="flex flex-col gap-6">
      <h2 id="related-title" className="font-display text-2xl tracking-tight">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categoryLabel={labelOf(product)} detailsLabel={t("details")} />
        ))}
      </div>
    </section>
  );
}
