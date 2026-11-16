# Versione A — Catalogo Giunti Psychometrics (Next.js)

🌐 [English](README.md) · [Español](README.es.md) · **Italiano**

Landing di catalogo di Giunti Psychometrics Italia con **Next.js 16 (App Router) · Tailwind CSS 4 · TypeScript strict**, in italiano (predefinito) e spagnolo.

## Istruzioni di installazione

1. Installa **Node.js 20.9 o superiore**.
2. Clona il repository ed entra nella cartella di questa versione:

   ```bash
   git clone <url-del-repository>
   cd <repository>/version-a
   ```

3. Installa le dipendenze:

   ```bash
   npm install
   ```

## Comandi per l'esecuzione in sviluppo

```bash
npm run dev
```

Apri <http://localhost:3000> (reindirizza a `/it`; la versione spagnola è su `/es`).

| Comando | A cosa serve |
|---------|--------------|
| `npm run dev` | Server di sviluppo |
| `npm test` | Test unitari (Vitest) |
| `npm run lint` | Lint (ESLint) |
| `npm run typecheck` | Controllo dei tipi TypeScript |

## Comando di build per la produzione

```bash
npm run build
npm run start   # avvia la build su http://localhost:3000
```

## Versioni utilizzate

| Strumento | Versione |
|-----------|----------|
| Node.js | 22.13.1 (minimo 20.9) |
| npm | 10.9.2 |

## Assunzioni e miglioramenti proposti

### Assunzioni

- I prodotti sono fittizi (nessun nome di test reale), ma coerenti con il settore: fascia d'età, tempo di somministrazione, livello di qualifica, kit e ricambi.
- Le immagini sono foto generiche di Unsplash coerenti con ogni prodotto; serve internet per vederle.
- Nessun gateway di pagamento: il checkout valida il modulo e simula l'ordine. Non vengono richiesti dati della carta.
- Home e pagina prodotto usano SSR a ogni richiesta; il checkout è renderizzato lato client e il carrello è salvato in `localStorage`.
- I link fuori dall'ambito della prova (Accedi, Corporate, Privacy…) portano a una pagina "in arrivo".
- La palette è centralizzata in `src/design-system/tokens/palette.css`: cambiando i quattro colori del brand si aggiorna tutto il sito.

### Miglioramenti proposti

- Migrare `requestLocale` di next-intl (deprecato) a `next/root-params` quando sarà stabile.
- Drawer del carrello e carrello/sessione lato server; integrazione reale con un provider di pagamento.
- Test dei componenti (React Testing Library) ed end-to-end (Playwright) per filtri e checkout.
- Slug tradotti e `hreflang` per la SEO.
