# Version A — Giunti Psychometrics catalog (Next.js)

Italian product-catalog landing for Giunti Psychometrics: psychological tests and training courses, with a product page and a client-side checkout. Built with **Next.js 16 (App Router) · Tailwind CSS 4 · strict TypeScript**, translated to Italian (default) and Spanish, with light and dark themes.

## Quick path

```bash
cd version-a
npm install
npm run dev        # http://localhost:3000 → redirects to /it
```

| Goal | Command |
|------|---------|
| Development server | `npm run dev` |
| Production build | `npm run build` |
| Serve the build | `npm run start` |
| Unit tests (Vitest) | `npm test` |
| Lint (ESLint flat config) | `npm run lint` |
| Type check | `npm run typecheck` |

## Versions used

| Tool | Version |
|------|---------|
| Node.js | 22.13.1 |
| npm | 10.9.2 |
| Next.js | 16.4.6 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| next-intl | 4.15.1 |
| PHP / Composer | Not used in Version A (see `version-b`) |

## Routes and rendering

| Route | Domain | Rendering |
|-------|--------|-----------|
| `/[locale]` | Home: hero, catalog, contact form | SSR on every request (`dynamic = "force-dynamic"`); filters run on the client |
| `/[locale]/prodotti/[slug]` | Product page | SSR on every request, `notFound()` for unknown slugs, per-product metadata and JSON-LD |
| `/[locale]/checkout` | Checkout | Static shell + client rendering (cart lives in `localStorage`) |

Locales: `it` (default) and `es`. `src/proxy.ts` (Next 16's replacement for `middleware.ts`) redirects `/` to `/it`.

## Architecture

```text
src/
├── app/[locale]/          # Routes only: compose domains, load data, set metadata
├── design-system/         # Everything global and reusable
│   ├── tokens/            # palette.css (colors) + theme.css (Tailwind mapping)
│   ├── components/        # Button, Badge, Price, FilterChip, Field, ThemeToggle…
│   ├── patterns/          # ProductCard (used by Home and Product)
│   ├── layout/            # SiteHeader (search, language, theme, cart), SiteFooter
│   ├── hooks/             # useTheme (dark mode + circular reveal)
│   └── utils/             # cn, formatPrice
├── domains/               # One folder per page, only domain-specific code
│   ├── home/              # components · interfaces · hooks · utils
│   ├── product/
│   └── checkout/
└── shared/                # Non-UI code used by several domains
    ├── catalog/           # Typed mock data + async queries
    ├── cart/              # Cart reducer + provider
    └── i18n/              # next-intl routing, navigation, request config
messages/{it,es}/          # One JSON file per namespace: common, home, product, checkout
```

Rule of thumb: if only one page uses it, it lives in `domains/<page>`; if it is UI shared across pages, it lives in `design-system`; shared non-UI logic (data, cart, i18n) lives in `shared`.

## Changing the colors

All colors live in **one file**: `src/design-system/tokens/palette.css`.

1. Edit the four brand colors (`--brand-primary`, `--brand-text`, `--brand-accent`, `--brand-background`) to rebrand the whole site.
2. Adjust semantic tokens (`--ds-surface`, `--ds-ink`, `--ds-line`…) per theme if needed.
3. Components only use semantic utilities (`bg-surface`, `text-ink`, `border-line`, `bg-primary`), so nothing else changes.

## Features checklist

- [x] Header: logo, navigation (Test, Formazione, Risorse, Contatti), “Accedi” button, product search filtering the grid by name
- [x] Hero with gradient/image background and “Esplora il catalogo” CTA
- [x] Product cards: image, name, author/teacher, age range or start date, original + discounted price (`1.250,00 €`), format badge, action button
- [x] Grid: 3 columns desktop, 2 tablet, 1 mobile
- [x] Client-side category filter with “Tutti” (plus format filter)
- [x] Contact form with validation, visible errors and success state
- [x] Footer: logo, links, social placeholders, copyright
- [x] Light/dark theme with circular reveal transition; IT/ES language switch

## Assumptions

- Product data is mock and fictional (no real test names), but follows how assessment products are sold: age range, administration time, qualification level, kits and refills.
- Product images are generic Unsplash photos chosen to match each item.
- No payment gateway: checkout validates the form and simulates a confirmed order. No card data is requested.
- `cacheComponents` (Next 16) is disabled to keep classic, explicit per-request SSR for Home and Product.
- The header search filters the catalog live through the `?q=` query param; from other pages it takes you to the filtered catalog.

## Proposed improvements

- Migrate next-intl's deprecated `requestLocale` to `next/root-params` once it is stable.
- Real cart drawer and server-side cart/session; real payment provider integration (hosted fields).
- Component tests (React Testing Library) and end-to-end tests (Playwright) for filters and checkout.
- Localized slugs and `hreflang` alternates for SEO.
