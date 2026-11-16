import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/shared/catalog/products";
import { countByCategory, filterProducts } from "./filter-products";

const ALL = { query: "", category: "all", formats: [] } as const;

describe("filterProducts", () => {
  it('shows every product for "Tutti" with no other filter', () => {
    expect(filterProducts(PRODUCTS, ALL)).toEqual(PRODUCTS);
  });

  it("matches the name case-insensitively by substring", () => {
    const result = filterProducts(PRODUCTS, { ...ALL, query: "  screening COGNITIVO " });
    expect(result.map((p) => p.slug)).toEqual(["sca-2-screening-cognitivo-adulti"]);
  });

  it("filters by category", () => {
    const result = filterProducts(PRODUCTS, { ...ALL, category: "formazione" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "formazione")).toBe(true);
    expect(result).toHaveLength(PRODUCTS.filter((p) => p.category === "formazione").length);
  });

  it("keeps products matching any of several selected formats", () => {
    const result = filterProducts(PRODUCTS, { ...ALL, formats: ["cartaceo", "digitale"] });
    const expected = PRODUCTS.filter((p) => p.format === "cartaceo" || p.format === "digitale");
    expect(result).toEqual(expected);
  });

  it("combines query, category and formats", () => {
    const result = filterProducts(PRODUCTS, { query: "scala", category: "lavoro", formats: ["digitale", "cartaceo"] });
    // "scala" also matches SCA-2 (clinica), which the category excludes.
    expect(result.map((p) => p.slug)).toEqual(["sbl-scala-benessere-lavorativo"]);
  });
});

describe("countByCategory", () => {
  it("counts per category and in total, respecting query and formats but not the category", () => {
    const counts = countByCategory(PRODUCTS, { query: "", formats: ["corso-online"] });
    const online = PRODUCTS.filter((p) => p.format === "corso-online");
    expect(counts.all).toBe(online.length);
    expect(counts.formazione).toBe(online.filter((p) => p.category === "formazione").length);
    expect(counts.clinica).toBe(online.filter((p) => p.category === "clinica").length);
  });
});
