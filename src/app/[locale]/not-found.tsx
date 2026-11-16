import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/design-system/components/Button";
import { Container } from "@/design-system/components/Container";
import { NotFoundIllustration } from "@/design-system/illustrations/NotFoundIllustration";

export default async function NotFound() {
  const t = await getTranslations("common.notFound");

  return (
    <section className="bg-linear-to-b from-soft to-bg">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
        <div className="flex flex-col items-start gap-5 md:order-1">
          <span className="text-sm font-bold uppercase tracking-wider text-link">{t("eyebrow")}</span>
          <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl">{t("title")}</h1>
          <p className="max-w-md text-lg leading-relaxed text-muted">{t("text")}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <ButtonLink href="/#catalogo" size="lg">
              {t("back")}
            </ButtonLink>
            <ButtonLink href="/#contatti" variant="outline" size="lg">
              {t("contact")}
            </ButtonLink>
          </div>
        </div>
        <NotFoundIllustration title={t("illustration")} className="mx-auto max-w-[520px]" />
      </Container>
    </section>
  );
}
