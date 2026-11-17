import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter_Tight, Noto_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { themeInitScript } from "@/design-system/hooks/useTheme";
import { SiteFooter } from "@/design-system/layout/SiteFooter";
import { SiteHeader } from "@/design-system/layout/SiteHeader";
import { ThemeSync } from "@/design-system/components/ThemeSync";
import { CartProvider } from "@/shared/cart/CartProvider";
import { routing } from "@/shared/i18n/routing";
import "../globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common.meta" });
  return {
    title: { default: t("defaultTitle"), template: `%s · ${t("siteName")}` },
    description: t("defaultDescription"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("common.a11y");

  return (
    <html lang={locale} className={`${notoSans.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh">
        {/* Applies the saved theme before hydration (no light flash in dark mode). */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeSync />
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-ds focus:bg-primary focus:px-4 focus:py-3 focus:text-on-primary"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <CartProvider>
            <SiteHeader />
            <main id="contenuto">{children}</main>
            <SiteFooter />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
