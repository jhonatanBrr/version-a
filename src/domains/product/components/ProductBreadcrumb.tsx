import { useTranslations } from "next-intl";
import { ChevronLeftIcon } from "@/design-system/components/icons";
import { Link } from "@/shared/i18n/navigation";

export interface ProductBreadcrumbProps {
  kind: "test" | "course";
  categoryLabel: string;
  current: string;
}

export function ProductBreadcrumb({ kind, categoryLabel, current }: ProductBreadcrumbProps) {
  const t = useTranslations("product.breadcrumb");
  const separator = <ChevronLeftIcon size={14} aria-hidden="true" className="rotate-180 text-muted" />;

  return (
    <nav aria-label={t("label")} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        <li>
          <Link href="/" className="hover:text-link hover:underline">
            {t("home")}
          </Link>
        </li>
        <li aria-hidden="true">{separator}</li>
        <li>
          <Link href="/#catalogo" className="hover:text-link hover:underline">
            {t(kind)}
          </Link>
        </li>
        <li aria-hidden="true">{separator}</li>
        <li>{categoryLabel}</li>
        <li aria-hidden="true">{separator}</li>
        <li>
          <span aria-current="page" className="font-bold text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
