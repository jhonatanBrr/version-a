import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/design-system/components/Button";
import { Container } from "@/design-system/components/Container";

export default async function NotFound() {
  const t = await getTranslations("common.notFound");
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <h1 className="text-4xl tracking-tight">{t("title")}</h1>
      <p className="text-lg text-muted">{t("text")}</p>
      <ButtonLink href="/">{t("back")}</ButtonLink>
    </Container>
  );
}
