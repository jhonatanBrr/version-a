import type { Product, ProductEdition } from "@/shared/catalog/types";
import type { AppLocale } from "@/shared/i18n/routing";
import type { DeliveryKind, EditionTotals, SpecPart } from "../interfaces/product-page";

export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 20;

/** Ordered spec fragments: tests by audience and use, courses by schedule. */
export function getSpecParts(product: Product): SpecPart[] {
  if (product.kind === "test") {
    const { min, max } = product.ageRange;
    return [
      max === undefined ? { key: "ageFrom", values: { min } } : { key: "ageRange", values: { min, max } },
      { key: "duration", values: { ...product.durationMinutes } },
      { key: "administration", values: { mode: product.administration } },
      { key: "qualification", values: { level: product.qualification } },
    ];
  }
  const parts: SpecPart[] = [
    { key: "start", values: { date: product.startDate } },
    { key: "hours", values: { hours: product.hours } },
  ];
  if (product.ecmCredits !== undefined) parts.push({ key: "ecm", values: { credits: product.ecmCredits } });
  if (product.location) parts.push({ key: "location", values: { place: product.location } });
  return parts;
}

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return QUANTITY_MIN;
  return Math.min(QUANTITY_MAX, Math.max(QUANTITY_MIN, Math.round(value)));
}

/** Requested edition, or the default (first) one when the id is unknown. */
export function resolveEdition<E extends Pick<ProductEdition, "id">>(product: { editions: E[] }, editionId: string): E {
  return product.editions.find((edition) => edition.id === editionId) ?? product.editions[0];
}

const toCents = (amount: number) => Math.round(amount * 100);

export function editionTotals(edition: Pick<ProductEdition, "price" | "salePrice">, quantity: number): EditionTotals {
  const total = toCents(edition.salePrice) * quantity;
  const listTotal = toCents(edition.price) * quantity;
  const savings = Math.max(0, listTotal - total);
  return {
    total: total / 100,
    listTotal: listTotal / 100,
    savings: savings / 100,
    discountPercent: listTotal > 0 ? Math.round((savings / listTotal) * 100) : 0,
  };
}

export function deliveryKind(product: Product): DeliveryKind {
  if (product.kind === "course") return "course";
  return product.format === "cartaceo" ? "paper" : "digital";
}

/** Acronym before " · " for the breadcrumb, or the whole name. */
export function shortName(product: Pick<Product, "name">): string {
  return product.name.split(" · ")[0];
}

/** schema.org Product structured data for search engines. */
export function buildProductJsonLd(product: Product, locale: AppLocale, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary[locale],
    image: imageUrl,
    sku: product.id,
    brand: { "@type": "Brand", name: "Giunti Psychometrics" },
    offers: {
      "@type": "Offer",
      price: product.salePrice.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}
