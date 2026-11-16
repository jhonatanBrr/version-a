import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/domains/home/components/HomePage";
import { getCategories, getProducts } from "@/shared/catalog/queries";
import type { AppLocale } from "@/shared/i18n/routing";

/** SSR on every request (the catalog would come from a live API). */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as AppLocale, namespace: "home.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return <HomePage products={products} categories={categories} />;
}
