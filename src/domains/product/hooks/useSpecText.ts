import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/shared/i18n/routing";
import type { SpecPart } from "../interfaces/product-page";

/** Turns a spec fragment into localized text (works in server and client components). */
export function useSpecText(): (part: SpecPart) => string {
  const t = useTranslations("product.spec");
  const locale = useLocale() as AppLocale;

  return (part) => {
    switch (part.key) {
      case "administration":
        return t(`administration.${part.values.mode}`);
      case "start": {
        const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
          new Date(`${part.values.date}T00:00:00`),
        );
        return t("start", { date });
      }
      default:
        return t(part.key, part.values);
    }
  };
}
