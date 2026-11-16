import type { AppLocale } from "@/shared/i18n/routing";

export type Localized<T = string> = Record<AppLocale, T>;

export type CategoryId = "clinica" | "scuola" | "lavoro" | "formazione";
export type ProductFormat = "cartaceo" | "digitale" | "corso-online" | "in-presenza";
export type ProductKind = "test" | "course";
export type Qualification = "A" | "B" | "C";
export type Administration = "individual" | "group" | "individual-or-group";

export interface ProductImage {
  /** Unsplash photo id (images.unsplash.com/photo-{id}). */
  photoId: string;
  alt: Localized;
}

/** Purchasable configuration of a product (e.g. full kit vs. refill). */
export interface ProductEdition {
  id: string;
  label: Localized;
  detail: Localized;
  price: number;
  salePrice: number;
}

interface ProductBase {
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  category: CategoryId;
  format: ProductFormat;
  /** Authors for tests, teachers for courses. */
  people: string[];
  summary: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  image: ProductImage;
  /** Price of the default edition, used on cards. */
  price: number;
  salePrice: number;
  editions: ProductEdition[];
  isNew?: boolean;
}

export interface TestProduct extends ProductBase {
  kind: "test";
  ageRange: { min: number; max?: number };
  durationMinutes: { min: number; max: number };
  administration: Administration;
  qualification: Qualification;
  includes: Localized<string[]>;
}

export interface CourseProduct extends ProductBase {
  kind: "course";
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  hours: number;
  ecmCredits?: number;
  location?: string;
}

export type Product = TestProduct | CourseProduct;

export interface Category {
  id: CategoryId;
  label: Localized;
}
