import { getTranslations } from "next-intl/server";
import { Link } from "@/shared/i18n/navigation";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "../components/icons";
import { Logo } from "../components/Logo";

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "YouTube", Icon: YoutubeIcon },
  { label: "Facebook", Icon: FacebookIcon },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("common.footer");
  const nav = await getTranslations("common.header.nav");

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo height={44} className="self-start" />
            <p className="text-sm leading-relaxed text-muted">{t("tagline")}</p>
          </div>

          <nav aria-label={t("navLabel")} className="flex flex-wrap gap-14 text-[15px]">
            <div className="flex flex-col gap-3">
              <span className="font-bold">{t("products")}</span>
              <Link href="/#catalogo" className="text-muted hover:text-ink">{nav("test")}</Link>
              <Link href="/#catalogo" className="text-muted hover:text-ink">{nav("training")}</Link>
              <Link href="/#catalogo" className="text-muted hover:text-ink">{nav("resources")}</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold">{t("company")}</span>
              <Link href="/" className="text-muted hover:text-ink">{t("about")}</Link>
              <Link href="/#contatti" className="text-muted hover:text-ink">{nav("contacts")}</Link>
              <Link href="/" className="text-muted hover:text-ink">{t("privacy")}</Link>
            </div>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-bold">{t("follow")}</span>
            <ul className="flex gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-ds border border-line text-ink hover:bg-soft"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="border-t border-line pt-6 text-[13px] text-muted">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
