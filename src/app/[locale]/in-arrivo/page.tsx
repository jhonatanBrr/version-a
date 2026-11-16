import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/design-system/components/Button";
import { Container } from "@/design-system/components/Container";
import { ComingSoonIllustration } from "@/design-system/illustrations/ComingSoonIllustration";
import { COMING_SOON_PARAM, isComingSoonSection } from "@/design-system/utils/coming-soon";

export async function generateMetadata({ params }: PageProps<"/[locale]/in-arrivo">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.comingSoon" });
  return { title: t("metaTitle"), robots: { index: false, follow: false } };
}

/** Placeholder for links that are out of scope for the technical test. */
export default async function ComingSoonPage({ params, searchParams }: PageProps<"/[locale]/in-arrivo">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common.comingSoon");

  const requested = (await searchParams)[COMING_SOON_PARAM];
  const section = isComingSoonSection(requested) ? requested : null;

  return (
    <section className="bg-linear-to-b from-soft to-bg">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-ds bg-surface px-3 py-1.5 text-sm font-bold text-link shadow-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {t("eyebrow")}
          </span>
          <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl">
            {section ? t("titleSection", { section: t(`sections.${section}`) }) : t("title")}
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted">{t("text")}</p>
          <ul className="flex flex-col gap-2 text-[15px]">
            {(["catalog", "product", "checkout"] as const).map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-link">✓</span>
                {t(`available.${key}`)}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href="/#catalogo" size="lg">
              {t("toCatalog")}
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">
              {t("toHome")}
            </ButtonLink>
          </div>
        </div>
        <ComingSoonIllustration title={t("illustration")} className="mx-auto max-w-[520px]" />
      </Container>
    </section>
  );
}
