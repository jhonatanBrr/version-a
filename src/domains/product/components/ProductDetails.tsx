import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/design-system/components/icons";
import type { AppLocale } from "@/shared/i18n/routing";
import { useSpecText } from "../hooks/useSpecText";
import type { ProductPageSectionProps } from "../interfaces/product-page";
import { getSpecParts } from "../utils/product-page";

export interface ProductDetailsProps extends ProductPageSectionProps {
  categoryLabel: string;
}

function Accordion({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-bold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon size={18} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
      </summary>
      <div className="pb-4 text-sm">{children}</div>
    </details>
  );
}

/** Technical sheet and contents as native disclosure widgets. */
export function ProductDetails({ product, categoryLabel }: ProductDetailsProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("product.details");
  const common = useTranslations("common");
  const specText = useSpecText();
  const contents = product.kind === "test" ? product.includes[locale] : product.highlights[locale];

  const rows: Array<[string, string]> = [
    [t("labels.format"), common(`formats.${product.format}`)],
    [t("labels.category"), categoryLabel],
    ...getSpecParts(product).map((part): [string, string] => [t(`labels.${part.key}`), specText(part)]),
  ];

  return (
    <div className="border-t border-line">
      <Accordion title={t("technical")} open>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Accordion>
      <Accordion title={product.kind === "test" ? t("contents") : t("program")}>
        <ul className="list-disc space-y-1 pl-5">
          {contents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}
