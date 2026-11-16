# Versione A — Catalogo Giunti Psychometrics (Next.js)

🌐 [English](README.md) · [Español](README.es.md) · **Italiano**

Landing di catalogo per Giunti Psychometrics Italia: test psicologici e corsi di formazione, con pagina prodotto e checkout dimostrativo. Realizzata con **Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript strict**, in italiano (predefinito) e spagnolo, con tema chiaro e scuro.

## Installazione rapida

> Requisito: **Node.js 20.9 o superiore** (testato con Node 22.13.1 e npm 10.9.2).

```bash
git clone <url-del-repository>
cd <repository>/version-a
npm install
npm run dev
```

Apri <http://localhost:3000>: reindirizza automaticamente a `/it`. La versione spagnola è su `/es` oppure tramite il selettore **IT / ES** nell'header.

## Comandi

| Obiettivo | Comando |
|-----------|---------|
| Server di sviluppo | `npm run dev` |
| Build di produzione | `npm run build` |
| Avviare la build | `npm run start` |
| Test unitari (Vitest) | `npm test` |
| Lint (ESLint) | `npm run lint` |
| Controllo dei tipi | `npm run typecheck` |

### Provare la build di produzione

```bash
npm run build
npm run start      # http://localhost:3000
```

## Versioni utilizzate

| Strumento | Versione |
|-----------|----------|
| Node.js | 22.13.1 (minimo 20.9) |
| npm | 10.9.2 |
| Next.js | 16.4.6 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| next-intl | 4.15.1 |
| PHP / Composer | Non usati nella Versione A (vedi `version-b`) |

## Pagine e rendering

| Percorso | Contenuto | Rendering |
|----------|-----------|-----------|
| `/[locale]` | Home: hero, catalogo con ricerca e filtri, modulo di contatto | SSR a ogni richiesta; i filtri funzionano lato client |
| `/[locale]/prodotti/[slug]` | Pagina prodotto | SSR a ogni richiesta, 404 se lo slug non esiste, metadati e JSON-LD |
| `/[locale]/checkout` | Checkout | Rendering lato client (il carrello è salvato in `localStorage`) |
| `/[locale]/in-arrivo` | Sezioni fuori dall'ambito della prova (Accedi, Corporate…) | SSR |
| Qualsiasi altro percorso | Pagina 404 illustrata e tradotta | SSR |

Lingue: `it` (predefinita) ed `es`. `src/proxy.ts` (il sostituto di `middleware.ts` in Next 16) gestisce il reindirizzamento per lingua.

## Architettura

```text
src/
├── app/[locale]/          # Solo route: compongono i domini, caricano dati e metadati
├── design-system/         # Tutto ciò che è globale e riutilizzabile
│   ├── tokens/            # palette.css (colori) + theme.css (mappatura Tailwind)
│   ├── components/        # Button, Badge, Price, FilterChip, Field, ThemeToggle…
│   ├── patterns/          # ProductCard (usata in Home e Prodotto)
│   ├── illustrations/     # Illustrazioni SVG (404, "in arrivo")
│   ├── layout/            # SiteHeader (ricerca, lingua, tema, carrello), SiteFooter
│   ├── hooks/             # useTheme (tema scuro + transizione circolare)
│   └── utils/             # cn, formatPrice, coming-soon
├── domains/               # Una cartella per pagina, solo codice del dominio
│   ├── home/              # components · interfaces · hooks · utils
│   ├── product/
│   └── checkout/
└── shared/                # Logica non visiva usata da più domini
    ├── catalog/           # Dati mock tipizzati + query asincrone
    ├── cart/              # Reducer e provider del carrello
    └── i18n/              # Configurazione di next-intl
messages/{it,es}/          # Un JSON per namespace: common, home, product, checkout
```

Regola: se lo usa una sola pagina, sta in `domains/<pagina>`; se è UI condivisa, sta in `design-system`; la logica non visiva condivisa (dati, carrello, i18n) sta in `shared`.

## Cambiare i colori

Tutti i colori si trovano in **un solo file**: `src/design-system/tokens/palette.css`.

1. Modifica i quattro colori del brand (`--brand-primary`, `--brand-text`, `--brand-accent`, `--brand-background`) per cambiare tutto il sito.
2. Se serve, regola i token semantici (`--ds-surface`, `--ds-ink`, `--ds-line`…) di ciascun tema.
3. I componenti usano solo utility semantiche (`bg-surface`, `text-ink`, `border-line`, `bg-primary`), quindi non c'è altro da toccare.

## Funzionalità

- [x] Header: logo, navigazione (Test, Formazione, Risorse, Contatti), pulsante "Accedi" e ricerca che filtra la griglia per nome
- [x] Hero con sfondo sfumato e CTA "Esplora il catalogo"
- [x] Card: immagine, nome, autore/docente, fascia d'età o data di inizio, prezzo originale e scontato (`1.250,00 €`), badge del formato e pulsante d'azione
- [x] Griglia: 3 colonne su desktop, 2 su tablet e 1 su mobile
- [x] Filtro per categoria con "Tutti" (e filtro per formato), senza ricaricare la pagina
- [x] Modulo di contatto con validazione, errori visibili e stato di successo
- [x] Footer: logo, link, social (placeholder) e copyright
- [x] Tema chiaro/scuro con transizione circolare e selettore di lingua IT/ES
- [x] Pagina prodotto con edizioni, quantità e carrello; checkout dimostrativo

## Assunzioni

- I prodotti sono fittizi (nessun nome di test reale), ma seguono il modo in cui si vendono gli strumenti di valutazione: fascia d'età, tempo di somministrazione, livello di qualifica, kit e ricambi.
- Le immagini sono foto generiche di Unsplash coerenti con ogni prodotto; serve una connessione internet per vederle.
- Nessun gateway di pagamento: il checkout valida il modulo e simula un ordine confermato. Non vengono richiesti dati della carta.
- `cacheComponents` (Next 16) è disattivato per avere SSR esplicito a ogni richiesta su Home e Prodotto.
- La ricerca nell'header filtra il catalogo in tempo reale con il parametro `?q=`; dalle altre pagine porta al catalogo filtrato.

## Risoluzione dei problemi

| Problema | Soluzione |
|----------|-----------|
| `npm install` fallisce o Next non si avvia | Verifica che `node -v` sia ≥ 20.9 |
| La porta 3000 è occupata | `npm run dev -- -p 3001` |
| Le immagini dei prodotti non si caricano | Serve internet (sono servite da `images.unsplash.com`) |

## Miglioramenti proposti

- Migrare `requestLocale` di next-intl (deprecato) a `next/root-params` quando sarà stabile.
- Drawer del carrello e carrello/sessione lato server; integrazione reale con un provider di pagamento.
- Test dei componenti (React Testing Library) ed end-to-end (Playwright) per filtri e checkout.
- Slug tradotti e `hreflang` per la SEO.
