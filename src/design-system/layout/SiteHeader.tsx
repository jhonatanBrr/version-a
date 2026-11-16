"use client";

import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import { useCart } from "@/shared/cart/CartProvider";
import { Link } from "@/shared/i18n/navigation";
import { ButtonLink } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { CartIcon, ChevronDownIcon, CloseIcon, MenuIcon, TruckIcon } from "../components/icons";
import { LanguageSwitch } from "../components/LanguageSwitch";
import { Logo } from "../components/Logo";
import { ThemeToggle } from "../components/ThemeToggle";
import { cn } from "../utils/cn";
import { HeaderSearch } from "./HeaderSearch";

const NAV = [
  { key: "test", href: "/#catalogo" },
  { key: "training", href: "/#catalogo" },
  { key: "resources", href: "/#catalogo" },
  { key: "contacts", href: "/#contatti" },
] as const;

export function SiteHeader() {
  const t = useTranslations("common.header");
  const top = useTranslations("common.topBar");
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const languageSwitch = (compact: boolean) => (
    <Suspense fallback={null}>
      <LanguageSwitch label={t("language")} names={{ it: t("languages.it"), es: t("languages.es") }} compact={compact} />
    </Suspense>
  );

  return (
    <>
      {/* Utility bar */}
      <div className="border-b border-line bg-surface text-[13px] sm:text-sm">
        <div className="mx-auto flex h-10 max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-11 sm:px-6 lg:px-10">
          <span className="flex items-center gap-2">
            <TruckIcon size={16} className="text-link" />
            {top("shipping")}
          </span>
          <nav aria-label={top("corporate")} className="hidden items-center gap-7 md:flex">
            <Link href="/" className="hover:text-link hover:underline">{top("corporate")}</Link>
            <Link href="/#contatti" className="hover:text-link hover:underline">{top("help")}</Link>
            <Link href="/" className="inline-flex items-center gap-1 hover:text-link hover:underline">
              {top("platform")}
              <ChevronDownIcon size={14} />
            </Link>
          </nav>
          <div className="md:hidden">{languageSwitch(true)}</div>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:h-[88px] lg:gap-10 lg:px-10">
          <Link href="/" aria-label={t("homeLabel")} className="shrink-0 rounded-ds">
            <Logo alt="" height={44} priority className="max-lg:!h-9" />
          </Link>

          <nav aria-label={t("mainNav")} className="hidden gap-8 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="border-b-2 border-transparent py-2 text-[17px] hover:border-link hover:text-link"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:gap-3">
            <Suspense fallback={null}>
              <HeaderSearch id="search-desktop" label={t("searchLabel")} placeholder={t("searchPlaceholder")} className="hidden w-60 md:block" />
            </Suspense>
            <div className="hidden md:block">{languageSwitch(false)}</div>
            <ThemeToggle labels={{ toDark: t("themeToDark"), toLight: t("themeToLight") }} />
            <ButtonLink href="/" variant="soft" className="hidden lg:inline-flex">
              {t("login")}
            </ButtonLink>
            <Link
              href="/checkout"
              aria-label={t("cart", { count })}
              className="relative inline-flex size-11 items-center justify-center rounded-ds text-ink transition-colors hover:bg-soft"
            >
              <CartIcon size={22} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-ds bg-primary px-1 text-[11px] font-bold tabular-nums text-on-primary"
                >
                  {count}
                </span>
              )}
            </Link>
            <IconButton
              label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="xl:hidden"
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </IconButton>
          </div>
        </div>

        {/* Mobile search (catalog filtering must work on phones too) */}
        <div className="px-4 pb-3 md:hidden">
          <Suspense fallback={null}>
            <HeaderSearch id="search-mobile" label={t("searchLabel")} placeholder={t("searchPlaceholder")} />
          </Suspense>
        </div>

        <nav
          id="mobile-menu"
          aria-label={t("mainNav")}
          className={cn("border-t border-line px-4 pb-4 sm:px-6 xl:hidden", !menuOpen && "hidden")}
        >
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[52px] items-center border-b border-line text-lg"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <ButtonLink href="/" variant="soft" fullWidth className="mt-3 lg:hidden">
            {t("login")}
          </ButtonLink>
        </nav>
      </header>
    </>
  );
}
