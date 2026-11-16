import { useTranslations } from "next-intl";
import { Container } from "@/design-system/components/Container";
import { CheckIcon } from "@/design-system/components/icons";
import { ContactForm } from "./ContactForm";
import { CONTACT_ID } from "../utils/anchors";

const POINTS = ["advice", "training", "orders"] as const;

export function ContactSection() {
  const t = useTranslations("home.contact");

  return (
    <section id={CONTACT_ID} aria-labelledby={`${CONTACT_ID}-title`} className="scroll-mt-24 border-t border-line bg-soft py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold uppercase tracking-wider text-link">{t("eyebrow")}</span>
          <h2 id={`${CONTACT_ID}-title`} className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-muted">{t("text")}</p>
          <ul className="flex flex-col gap-3 pt-2">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 font-medium">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-surface text-link">
                  <CheckIcon size={16} />
                </span>
                {t(`points.${point}`)}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
