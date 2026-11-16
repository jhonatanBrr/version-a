import type { Product } from "@/shared/catalog/types";

/** The hero highlights the first product flagged as new, else the first product. */
export function pickFeatured(products: Product[]): Product | undefined {
  return products.find((product) => product.isNew) ?? products[0];
}
