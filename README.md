# Version A — Giunti Psychometrics catalog (Next.js)

🌐 **English** · [Español](README.es.md) · [Italiano](README.it.md)

Catalog landing for Giunti Psychometrics Italia built with **Next.js 16 (App Router) · Tailwind CSS 4 · strict TypeScript**, in Italian (default) and Spanish.

## Installation

1. Install **Node.js 20.9 or later**.
2. Clone the repository and enter this version's folder:

   ```bash
   git clone <repository-url>
   cd <repository>/version-a
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Development commands

```bash
npm run dev
```

Open <http://localhost:3000> (redirects to `/it`; the Spanish version is at `/es`).

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | Lint (ESLint) |
| `npm run typecheck` | TypeScript type check |

## Production build

```bash
npm run build
npm run start   # serves the build at http://localhost:3000
```

## Versions used

| Tool | Version |
|------|---------|
| Node.js | 22.13.1 (minimum 20.9) |
| npm | 10.9.2 |

## Assumptions and proposed improvements

### Assumptions

- Products are fictional (no real test names) but consistent with the sector: age range, administration time, qualification level, kits and refills.
- Images are generic Unsplash photos matching each product; internet access is needed to see them.
- No payment gateway: checkout validates the form and simulates the order. No card data is requested.
- Home and product pages use per-request SSR; checkout renders on the client and the cart is stored in `localStorage`.
- Links outside the test scope (Accedi, Corporate, Privacy…) lead to a "coming soon" page.
- The palette is centralized in `src/design-system/tokens/palette.css`: changing the four brand colors updates the whole site.

### Proposed improvements

- Migrate next-intl's deprecated `requestLocale` to `next/root-params` once it is stable.
- Cart drawer and server-side cart/session; real payment provider integration.
- Component tests (React Testing Library) and end-to-end tests (Playwright) for filters and checkout.
- Localized slugs and `hreflang` alternates for SEO.
