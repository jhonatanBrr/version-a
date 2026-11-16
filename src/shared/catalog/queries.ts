import { CATEGORIES, PRODUCTS } from "./products";
import type { Category, Product, ProductFormat } from "./types";

/**
 * Data access layer. Async on purpose: swapping the mock for a real API
 * (Magento, headless CMS…) only changes these functions.
 */
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Same-category products first, then the rest, excluding the current one. */
export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.category === product.category);
  const rest = others.filter((item) => item.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export const FORMATS: ProductFormat[] = ["cartaceo", "digitale", "corso-online", "in-presenza"];

/** Builds an Unsplash CDN URL; next/image adds the width parameter. */
export function productImageUrl(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=75`;
}
