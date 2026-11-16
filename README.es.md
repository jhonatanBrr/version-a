# Versión A — Catálogo Giunti Psychometrics (Next.js)

🌐 [English](README.md) · **Español** · [Italiano](README.it.md)

Landing de catálogo para Giunti Psychometrics Italia: tests psicológicos y cursos de formación, con página de producto y checkout de demostración. Construida con **Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript estricto**, en italiano (por defecto) y español, con tema claro y oscuro.

## Instalación rápida

> Requisito: **Node.js 20.9 o superior** (probado con Node 22.13.1 y npm 10.9.2).

```bash
git clone <url-del-repositorio>
cd <repositorio>/version-a
npm install
npm run dev
```

Abre <http://localhost:3000>: redirige automáticamente a `/it`. La versión en español está en `/es` o en el selector **IT / ES** del header.

## Comandos

| Objetivo | Comando |
|----------|---------|
| Servidor de desarrollo | `npm run dev` |
| Build de producción | `npm run build` |
| Servir el build | `npm run start` |
| Tests unitarios (Vitest) | `npm test` |
| Lint (ESLint) | `npm run lint` |
| Chequeo de tipos | `npm run typecheck` |

### Probar el build de producción

```bash
npm run build
npm run start      # http://localhost:3000
```

## Versiones utilizadas

| Herramienta | Versión |
|-------------|---------|
| Node.js | 22.13.1 (mínimo 20.9) |
| npm | 10.9.2 |
| Next.js | 16.4.6 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| next-intl | 4.15.1 |
| PHP / Composer | No se usan en la Versión A (ver `version-b`) |

## Páginas y renderizado

| Ruta | Qué contiene | Renderizado |
|------|--------------|-------------|
| `/[locale]` | Home: hero, catálogo con búsqueda y filtros, formulario de contacto | SSR en cada request; los filtros funcionan en el cliente |
| `/[locale]/prodotti/[slug]` | Página de producto | SSR en cada request, 404 si el slug no existe, metadatos y JSON-LD |
| `/[locale]/checkout` | Checkout | Renderizado en el cliente (el carrito vive en `localStorage`) |
| `/[locale]/in-arrivo` | Secciones fuera del alcance de la prueba (Accedi, Corporate…) | SSR |
| Cualquier otra ruta | Página 404 ilustrada y traducida | SSR |

Idiomas: `it` (por defecto) y `es`. `src/proxy.ts` (reemplazo de `middleware.ts` en Next 16) gestiona la redirección por idioma.

## Arquitectura

```text
src/
├── app/[locale]/          # Solo rutas: componen dominios, cargan datos y metadatos
├── design-system/         # Todo lo global y reutilizable
│   ├── tokens/            # palette.css (colores) + theme.css (mapeo a Tailwind)
│   ├── components/        # Button, Badge, Price, FilterChip, Field, ThemeToggle…
│   ├── patterns/          # ProductCard (usada en Home y Producto)
│   ├── illustrations/     # Ilustraciones SVG (404, "en preparación")
│   ├── layout/            # SiteHeader (buscador, idioma, tema, carrito), SiteFooter
│   ├── hooks/             # useTheme (modo oscuro + transición circular)
│   └── utils/             # cn, formatPrice, coming-soon
├── domains/               # Una carpeta por página, solo código propio del dominio
│   ├── home/              # components · interfaces · hooks · utils
│   ├── product/
│   └── checkout/
└── shared/                # Lógica no visual usada por varios dominios
    ├── catalog/           # Datos mock tipados + consultas asíncronas
    ├── cart/              # Reducer y provider del carrito
    └── i18n/              # Configuración de next-intl
messages/{it,es}/          # Un JSON por namespace: common, home, product, checkout
```

Regla: si solo lo usa una página, va en `domains/<página>`; si es UI compartida, va en `design-system`; la lógica no visual compartida (datos, carrito, i18n) va en `shared`.

## Cambiar los colores

Todos los colores viven en **un solo archivo**: `src/design-system/tokens/palette.css`.

1. Cambia los cuatro colores de marca (`--brand-primary`, `--brand-text`, `--brand-accent`, `--brand-background`) para cambiar todo el sitio.
2. Ajusta los tokens semánticos (`--ds-surface`, `--ds-ink`, `--ds-line`…) de cada tema si hace falta.
3. Los componentes solo usan utilidades semánticas (`bg-surface`, `text-ink`, `border-line`, `bg-primary`), así que no hay que tocar nada más.

## Funcionalidades

- [x] Header: logo, navegación (Test, Formazione, Risorse, Contatti), botón "Accedi" y buscador que filtra la grilla por nombre
- [x] Hero con fondo degradado y CTA "Esplora il catalogo"
- [x] Cards: imagen, nombre, autor/docente, rango de edad o fecha de inicio, precio original y con descuento (`1.250,00 €`), badge de formato y botón de acción
- [x] Grilla: 3 columnas en desktop, 2 en tablet y 1 en mobile
- [x] Filtro por categoría con "Tutti" (y filtro por formato), sin recargar la página
- [x] Formulario de contacto con validación, errores visibles y estado de éxito
- [x] Footer: logo, links, redes sociales (placeholder) y copyright
- [x] Tema claro/oscuro con transición circular y selector de idioma IT/ES
- [x] Página de producto con ediciones, cantidad y carrito; checkout de demostración

## Supuestos

- Los productos son ficticios (sin nombres de tests reales), pero siguen cómo se venden los instrumentos de evaluación: rango de edad, tiempo de aplicación, nivel de cualificación, kits y reposiciones.
- Las imágenes son fotos genéricas de Unsplash acordes a cada producto; se necesita conexión a internet para verlas.
- No hay pasarela de pago: el checkout valida el formulario y simula un pedido confirmado. No se piden datos de tarjeta.
- `cacheComponents` (Next 16) está desactivado para tener SSR explícito por request en Home y Producto.
- El buscador del header filtra el catálogo en vivo con el parámetro `?q=`; desde otras páginas lleva al catálogo filtrado.

## Solución de problemas

| Problema | Solución |
|----------|----------|
| `npm install` falla o Next no arranca | Verifica `node -v` ≥ 20.9 |
| El puerto 3000 está ocupado | `npm run dev -- -p 3001` |
| Las imágenes de productos no cargan | Requieren internet (se sirven desde `images.unsplash.com`) |

## Mejoras propuestas

- Migrar `requestLocale` de next-intl (deprecado) a `next/root-params` cuando sea estable.
- Drawer de carrito y carrito/sesión en servidor; integración real con un proveedor de pagos.
- Tests de componentes (React Testing Library) y end-to-end (Playwright) para filtros y checkout.
- Slugs traducidos y `hreflang` para SEO.
