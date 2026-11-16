import { describe, expect, it } from "vitest";
import { getProductBySlug, getProducts, getRelatedProducts } from "./queries";

describe("catalog mock data", () => {
  it("has at least 8 products across at least 3 categories", async () => {
    const products = await getProducts();
    expect(products.length).toBeGreaterThanOrEqual(8);
    expect(new Set(products.map((p) => p.category)).size).toBeGreaterThanOrEqual(3);
  });

  it("uses unique slugs and discounted prices below the original", async () => {
    const products = await getProducts();
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    for (const product of products) {
      expect(product.salePrice).toBeLessThan(product.price);
      expect(product.editions[0].salePrice).toBe(product.salePrice);
    }
  });
});

describe("getProductBySlug", () => {
  it("finds a product by its slug", async () => {
    const product = await getProductBySlug("sca-2-screening-cognitivo-adulti");
    expect(product?.id).toBe("p02");
  });

  it("returns undefined for an unknown slug", async () => {
    expect(await getProductBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getRelatedProducts", () => {
  it("excludes the current product and prefers the same category", async () => {
    const product = (await getProductBySlug("bva-2-batteria-valutazione-attentiva"))!;
    const related = await getRelatedProducts(product, 3);
    expect(related).toHaveLength(3);
    expect(related.map((p) => p.id)).not.toContain(product.id);
    expect(related[0].category).toBe(product.category);
  });
});
