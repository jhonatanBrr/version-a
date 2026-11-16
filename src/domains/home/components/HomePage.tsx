import type { CatalogData } from "../interfaces/home-props";
import { pickFeatured } from "../utils/pick-featured";
import { CatalogSection } from "./CatalogSection";
import { ContactSection } from "./ContactSection";
import { HomeHero } from "./HomeHero";

/** Home composition: hero, catalog and contact sections. */
export function HomePage({ products, categories }: CatalogData) {
  const featured = pickFeatured(products);

  return (
    <>
      {featured && <HomeHero featured={featured} productCount={products.length} />}
      <CatalogSection products={products} categories={categories} />
      <ContactSection />
    </>
  );
}
