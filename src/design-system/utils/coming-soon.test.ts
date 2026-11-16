import { describe, expect, it } from "vitest";
import { comingSoonHref, isComingSoonSection } from "./coming-soon";

describe("comingSoonHref", () => {
  it("points to the coming-soon page with the section in the query", () => {
    expect(comingSoonHref("login")).toEqual({ pathname: "/in-arrivo", query: { sezione: "login" } });
  });
});

describe("isComingSoonSection", () => {
  it("accepts known sections", () => {
    expect(isComingSoonSection("privacy")).toBe(true);
  });

  it("rejects unknown or missing values", () => {
    expect(isComingSoonSection("admin")).toBe(false);
    expect(isComingSoonSection(undefined)).toBe(false);
    expect(isComingSoonSection(["login"])).toBe(false);
  });
});
