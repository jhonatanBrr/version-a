import type { Administration, Product, Qualification } from "@/shared/catalog/types";

/** One fragment of the muted spec line; the component translates it by key. */
export type SpecPart =
  | { key: "ageRange"; values: { min: number; max: number } }
  | { key: "ageFrom"; values: { min: number } }
  | { key: "duration"; values: { min: number; max: number } }
  | { key: "administration"; values: { mode: Administration } }
  | { key: "qualification"; values: { level: Qualification } }
  | { key: "start"; values: { date: string } }
  | { key: "hours"; values: { hours: number } }
  | { key: "ecm"; values: { credits: number } }
  | { key: "location"; values: { place: string } };

export type DeliveryKind = "paper" | "digital" | "course";

export interface EditionTotals {
  total: number;
  listTotal: number;
  savings: number;
  discountPercent: number;
}

/** Edition data the client buy box needs, already localized on the server. */
export interface BuyBoxEdition {
  id: string;
  label: string;
  detail: string;
  price: number;
  salePrice: number;
}

export interface BuyBoxProps {
  productId: string;
  editions: BuyBoxEdition[];
}

export interface ProductPageSectionProps {
  product: Product;
}
