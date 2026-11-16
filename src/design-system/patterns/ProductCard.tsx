import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { productImageUrl } from "@/shared/catalog/queries";
import type { Product, ProductFormat } from "@/shared/catalog/types";
import type { AppLocale } from "@/shared/i18n/routing";
import { Link } from "@/shared/i18n/navigation";
import { Badge } from "../components/Badge";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "../components/icons";
import { Price } from "../components/Price";
import { cn } from "../utils/cn";

/** Dot colors distinguish formats; the label carries the meaning too. */
export const FORMAT_DOT: Record<ProductFormat, string> = {
  cartaceo: "var(--brand-primary)",
  digitale: "var(--brand-accent)",
  "corso-online": "#7dd3fc",
  "in-presenza": "var(--brand-text)",
};

export interface ProductCardProps {
  product: Product;
  categoryLabel: string;
  /** Slot for the card action (e.g. add-to-cart button), rendered next to the details link. */
  action?: React.ReactNode;
  detailsLabel: string;
  className?: string;
  priority?: boolean;
}

/** Catalog card shared by the home grid and the related-products rail. */
export function ProductCard({ product, categoryLabel, action, detailsLabel, className, priority }: ProductCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("common");
  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  const isTest = product.kind === "test";

  const meta = isTest
    ? {
        label: t("product.age"),
        value: product.ageRange.max
          ? t("product.ageRange", { min: product.ageRange.min, max: product.ageRange.max })
          : t("product.ageFrom", { min: product.ageRange.min }),
      }
    : {
        label: t("product.start"),
        value: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
          new Date(`${product.startDate}T00:00:00`),
        ),
      };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-ds border border-line bg-surface transition-[transform,box-shadow,border-color] duration-200",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-24px_rgb(var(--ds-shadow)/0.35)]",
        "focus-within:border-link motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-soft">
        <Image
          src={productImageUrl(product.image.photoId)}
          alt={product.image.alt[locale]}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none [[data-theme=dark]_&]:brightness-[.85] [[data-theme=dark]_&]:saturate-[.7]"
        />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <Badge dotColor={FORMAT_DOT[product.format]}>{t(`formats.${product.format}`)}</Badge>
          <Badge tone="inverse" className="tabular-nums">-{discount}%</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-link">
          {t(`kinds.${product.kind}`)} · {categoryLabel}
        </span>
        <h3 className="text-lg leading-snug tracking-tight">
          {/* The stretched link makes the whole card clickable with one tab stop. */}
          <Link href={`/prodotti/${product.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
          <dt className="flex items-center gap-1.5 text-muted">
            <UserIcon size={15} />
            {isTest ? t("product.authors") : t("product.teacher")}
          </dt>
          <dd className="text-right font-medium">{product.people.join(", ")}</dd>
          <dt className="flex items-center gap-1.5 text-muted">
            <CalendarIcon size={15} />
            {meta.label}
          </dt>
          <dd className="text-right font-medium">{meta.value}</dd>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div className="flex flex-col">
            <Price
              amount={product.salePrice}
              originalAmount={product.price}
              labels={{ current: t("a11y.currentPrice"), original: t("a11y.originalPrice") }}
            />
            <span className="text-xs text-muted">{t("product.vatIncluded")}</span>
          </div>
          <div className="relative z-10 flex items-center gap-1">
            <span aria-hidden="true" className="hidden items-center gap-1 text-sm font-bold text-link sm:inline-flex">
              {detailsLabel}
              <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
            {action}
          </div>
        </div>
      </div>
    </article>
  );
}
