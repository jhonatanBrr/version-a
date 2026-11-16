/**
 * Sections that are linked from the layout but are out of scope for the
 * technical test. They all lead to the "in arrivo" (coming soon) page.
 */
export const COMING_SOON_SECTIONS = [
  "corporate",
  "help",
  "platform",
  "login",
  "resources",
  "about",
  "privacy",
  "social",
] as const;

export type ComingSoonSection = (typeof COMING_SOON_SECTIONS)[number];

export const COMING_SOON_PATH = "/in-arrivo";
export const COMING_SOON_PARAM = "sezione";

/** Locale-aware href for next-intl's <Link>. */
export function comingSoonHref(section: ComingSoonSection) {
  return { pathname: COMING_SOON_PATH, query: { [COMING_SOON_PARAM]: section } };
}

export function isComingSoonSection(value: unknown): value is ComingSoonSection {
  return typeof value === "string" && (COMING_SOON_SECTIONS as readonly string[]).includes(value);
}
