import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Messages are split by domain (one JSON file per namespace) and merged here,
 * so each domain owns its own copy without touching the others.
 */
const NAMESPACES = ["common", "home", "product", "checkout"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../../../messages/${locale}/${ns}.json`);
      return [ns, mod.default] as const;
    }),
  );

  return { locale, messages: Object.fromEntries(entries) };
});
