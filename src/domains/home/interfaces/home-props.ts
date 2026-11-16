import type { Category, Product } from "@/shared/catalog/types";

export interface CatalogData {
  products: Product[];
  categories: Category[];
}

export interface HomeHeroProps {
  featured: Product;
  productCount: number;
}
