import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/design-system/components/Badge";
import { buttonClasses } from "@/design-system/components/Button";
import { Container } from "@/design-system/components/Container";
import { ArrowRightIcon, CheckIcon } from "@/design-system/components/icons";
import { Price } from "@/design-system/components/Price";
import { productImageUrl } from "@/shared/catalog/queries";
import { Link } from "@/shared/i18n/navigation";
import type { AppLocale } from "@/shared/i18n/routing";
import type { HomeHeroProps } from "../interfaces/home-props";
import { CATALOG_ID, CONTACT_ID } from "../utils/anchors";

/** Hero with a soft gradient background and the featured (new) product. */
export function HomeHero({ featured, productCount }: HomeHeroProps) {
  const t = useTranslations("home.hero");
  const common = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const stats = [t("stats.products", { count: productCount }), t("stats.shipping"), t("stats.support")];

  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-linear-to-br from-soft via-soft to-surface">
      <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-bold uppercase tracking-wider text-link">{t("eyebrow")}</span>
          <h1
            id="hero-title"
            className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[56px]"
          >
            {t("title")}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-[21px]">{t("subtitle")}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`#${CATALOG_ID}`} className={buttonClasses({ size: "lg" })}>
              {t("primaryCta")}
              <ArrowRightIcon size={18} />
            </a>
            <a href={`#${CONTACT_ID}`} className={buttonClasses({ size: "lg", variant: "outline" })}>
              {t("secondaryCta")}
            </a>
          </div>
          <ul aria-label={t("stats.label")} className="flex flex-col gap-2 pt-2 text-sm font-medium text-ink sm:flex-row sm:flex-wrap sm:gap-x-6">
            {stats.map((stat) => (
              <li key={stat} className="flex items-center gap-2">
                <CheckIcon size={16} className="text-link" />
                {stat}
              </li>
            ))}
          </ul>
        </div>

        <article
          aria-label={t("featuredLabel")}
          className="group relative flex flex-col overflow-hidden rounded-ds border border-line bg-surface shadow-[0_30px_60px_-30px_rgb(var(--ds-shadow)/0.45)]"
        >
          <div className="relative aspect-[4/3] bg-paper">
            <Image
              src={productImageUrl(featured.image.photoId)}
              alt={featured.image.alt[locale]}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover [[data-theme=dark]_&]:brightness-[.85] [[data-theme=dark]_&]:saturate-[.7]"
            />
            {featured.isNew && (
              <Badge tone="solid" className="absolute left-4 top-4 text-sm">
                {t("newTag")}
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-3 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-link">
              {common(`kinds.${featured.kind}`)} · {common(`formats.${featured.format}`)}
            </span>
            <h2 className="font-display text-2xl leading-snug tracking-tight">
              <Link
                href={`/prodotti/${featured.slug}`}
                aria-label={t("featuredCta", { name: featured.name })}
                className="after:absolute after:inset-0 hover:text-link"
              >
                {featured.name}
              </Link>
            </h2>
            <p className="text-muted">{featured.summary[locale]}</p>
            <Price
              amount={featured.salePrice}
              originalAmount={featured.price}
              labels={{ current: common("a11y.currentPrice"), original: common("a11y.originalPrice") }}
            />
          </div>
        </article>
      </Container>
    </section>
  );
}
