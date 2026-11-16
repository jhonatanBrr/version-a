import { useLocale, useTranslations } from "next-intl";
import { CheckIcon } from "@/design-system/components/icons";
import type { AppLocale } from "@/shared/i18n/routing";
import { useSpecText } from "../hooks/useSpecText";
import type { ProductPageSectionProps } from "../interfaces/product-page";
import { getSpecParts } from "../utils/product-page";

export interface ProductSummaryProps extends ProductPageSectionProps {
  categoryLabel: string;
}

/** Name, people, spec line, description and highlights, kept together for scanning. */
export function ProductSummary({ product, categoryLabel }: ProductSummaryProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("product");
  const common = useTranslations("common");
  const specText = useSpecText();
  const isTest = product.kind === "test";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold uppercase tracking-wider text-link">
        {product.isNew && <>{t("isNew")} · </>}
        {common(`kinds.${product.kind}`)} · {categoryLabel}
      </p>
      <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">{product.name}</h1>
      <p className="text-sm">
        <span className="text-muted">{isTest ? common("product.authors") : common("product.teacher")}: </span>
        <span className="font-medium">{product.people.join(", ")}</span>
      </p>
      <p className="text-sm text-muted">
        <span className="sr-only">{t("spec.label")}: </span>
        {getSpecParts(product).map(specText).join(" · ")}
      </p>
      <p className="leading-relaxed">{product.description[locale]}</p>
      <div>
        <h2 className="sr-only">{t("highlights")}</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {product.highlights[locale].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckIcon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-link" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
