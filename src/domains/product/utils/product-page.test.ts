import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/shared/catalog/products";
import type { CourseProduct, Product, TestProduct } from "@/shared/catalog/types";
import {
  QUANTITY_MAX,
  QUANTITY_MIN,
  buildProductJsonLd,
  clampQuantity,
  deliveryKind,
  editionTotals,
  getSpecParts,
  resolveEdition,
  shortName,
} from "./product-page";

const test = PRODUCTS.find((p): p is TestProduct => p.slug === "bva-2-batteria-valutazione-attentiva")!;
const digitalTest = PRODUCTS.find((p): p is TestProduct => p.slug === "sca-2-screening-cognitivo-adulti")!;
const openAgeTest = PRODUCTS.find((p): p is TestProduct => p.slug === "ict-inventario-competenze-trasversali")!;
const onlineCourse = PRODUCTS.find((p): p is CourseProduct => p.slug === "corso-valutazione-neuropsicologica-eta-evolutiva")!;
const onsiteCourse = PRODUCTS.find((p): p is CourseProduct => p.slug === "corso-somministrazione-scoring-test-personalita")!;

describe("getSpecParts", () => {
  it("describes a test by age range, duration, administration and qualification", () => {
    expect(getSpecParts(test)).toEqual([
      { key: "ageRange", values: { min: 6, max: 16 } },
      { key: "duration", values: { min: 30, max: 40 } },
      { key: "administration", values: { mode: "individual" } },
      { key: "qualification", values: { level: "B" } },
    ]);
  });

  it("uses an open-ended age part when the test has no maximum age", () => {
    expect(getSpecParts(openAgeTest)[0]).toEqual({ key: "ageFrom", values: { min: 18 } });
  });

  it("describes a course by start date, hours, ECM credits and location when present", () => {
    expect(getSpecParts(onsiteCourse)).toEqual([
      { key: "start", values: { date: "2027-02-06" } },
      { key: "hours", values: { hours: 14 } },
      { key: "ecm", values: { credits: 18 } },
      { key: "location", values: { place: "Milano" } },
    ]);
  });

  it("omits the location for an online course", () => {
    expect(getSpecParts(onlineCourse).map((part) => part.key)).toEqual(["start", "hours", "ecm"]);
  });
});

describe("clampQuantity", () => {
  it("keeps the quantity between 1 and 20", () => {
    expect([QUANTITY_MIN, QUANTITY_MAX]).toEqual([1, 20]);
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-4)).toBe(1);
    expect(clampQuantity(21)).toBe(20);
    expect(clampQuantity(7)).toBe(7);
  });

  it("rounds fractional values and falls back to 1 for non-numbers", () => {
    expect(clampQuantity(2.6)).toBe(3);
    expect(clampQuantity(Number.NaN)).toBe(1);
  });
});

describe("resolveEdition", () => {
  it("returns the requested edition", () => {
    expect(resolveEdition(test, "refill").id).toBe("refill");
  });

  it("falls back to the first edition for an unknown id", () => {
    expect(resolveEdition(test, "missing").id).toBe("kit");
  });
});

describe("editionTotals", () => {
  it("multiplies sale and list price by quantity and reports savings and discount", () => {
    const edition = resolveEdition(test, "kit"); // 320 -> 272
    expect(editionTotals(edition, 3)).toEqual({ total: 816, listTotal: 960, savings: 144, discountPercent: 15 });
  });

  it("avoids floating point noise on cents", () => {
    const edition = resolveEdition(test, "refill"); // 95 -> 80.75
    expect(editionTotals(edition, 3)).toEqual({ total: 242.25, listTotal: 285, savings: 42.75, discountPercent: 15 });
  });

  it("reports no discount when the sale price equals the list price", () => {
    const edition = { id: "x", label: { it: "", es: "" }, detail: { it: "", es: "" }, price: 50, salePrice: 50 };
    expect(editionTotals(edition, 2)).toEqual({ total: 100, listTotal: 100, savings: 0, discountPercent: 0 });
  });
});

describe("deliveryKind", () => {
  it("ships paper tests, activates digital tests online and emails course access", () => {
    expect(deliveryKind(test)).toBe("paper");
    expect(deliveryKind(digitalTest)).toBe("digital");
    expect(deliveryKind(onlineCourse)).toBe("course");
    expect(deliveryKind(onsiteCourse)).toBe("course");
  });
});

describe("shortName", () => {
  it("keeps the acronym before the separator, or the full name otherwise", () => {
    expect(shortName(test)).toBe("BVA-2");
    expect(shortName(onlineCourse)).toBe(onlineCourse.name);
  });
});

describe("buildProductJsonLd", () => {
  it("builds schema.org Product data with the sale price in EUR", () => {
    const data = buildProductJsonLd(test as Product, "it", "https://example.test/img.jpg");
    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "Product",
      name: test.name,
      description: test.summary.it,
      image: "https://example.test/img.jpg",
      sku: test.id,
      brand: { "@type": "Brand", name: "Giunti Psychometrics" },
      offers: {
        "@type": "Offer",
        price: "272.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    });
  });

  it("localizes the description", () => {
    expect(buildProductJsonLd(test, "es", "x").description).toBe(test.summary.es);
  });
});
