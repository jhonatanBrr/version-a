# Versión A — Catálogo Giunti Psychometrics (Next.js)

🌐 [English](README.md) · **Español** · [Italiano](README.it.md)

Landing de catálogo de Giunti Psychometrics Italia con **Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript estricto**, en italiano (por defecto) y español.

## Instrucciones de instalación

1. Instala **Node.js 20.9 o superior**.
2. Clona el repositorio y entra en la carpeta de esta versión:

   ```bash
   git clone <url-del-repositorio>
   cd <repositorio>/version-a
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Comandos para ejecutar en desarrollo

```bash
npm run dev
```

Abre <http://localhost:3000> (redirige a `/it`; la versión en español está en `/es`).

| Comando | Para qué sirve |
|---------|----------------|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Tests unitarios (Vitest) |
| `npm run lint` | Lint (ESLint) |
| `npm run typecheck` | Chequeo de tipos de TypeScript |

## Comando de build para producción

```bash
npm run build
npm run start   # sirve el build en http://localhost:3000
```

## Versiones utilizadas

| Herramienta | Versión |
|-------------|---------|
| Node.js | 22.13.1 (mínimo 20.9) |
| npm | 10.9.2 |

## Supuestos y mejoras propuestas

### Supuestos

- Los productos son ficticios (sin nombres de tests reales), pero coherentes con el sector: rango de edad, tiempo de aplicación, nivel de cualificación, kits y reposiciones.
- Las imágenes son fotos genéricas de Unsplash acordes a cada producto; se necesita internet para verlas.
- No hay pasarela de pago: el checkout valida el formulario y simula el pedido. No se piden datos de tarjeta.
- Home y página de producto usan SSR en cada request; el checkout se renderiza en el cliente y el carrito se guarda en `localStorage`.
- Los enlaces fuera del alcance de la prueba (Accedi, Corporate, Privacy…) llevan a una página "en preparación".
- La paleta está centralizada en `src/design-system/tokens/palette.css`: cambiando los cuatro colores de marca se actualiza todo el sitio.

### Mejoras propuestas

- Migrar `requestLocale` de next-intl (deprecado) a `next/root-params` cuando sea estable.
- Drawer de carrito y carrito/sesión en servidor; integración real con un proveedor de pagos.
- Tests de componentes (React Testing Library) y end-to-end (Playwright) para filtros y checkout.
- Slugs traducidos y `hreflang` para SEO.
