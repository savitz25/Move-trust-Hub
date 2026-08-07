# Move Trust Hub — Critical Reliability + Performance Sprint

**Date:** 2026-08-07  
**Scope:** P0 reliability first, then P1 performance (prior mobile sprint retained).

## Production baseline (pre-fix probe)

| Page | SSR status | `__next_error__` | title | lang | main | Linked JS HEAD |
|------|------------|------------------|-------|------|------|----------------|
| `/` | 200 | no | yes | yes | yes | 19/19 ok |
| Miami-Dade county | 200 | no | yes | yes | yes | — |
| `/companies` | 200 | no | yes | yes | yes | — |

**Chunk findings:** Current production homepage asset URLs resolve (no missing critical chunks on clean SSR).  
`ChunkLoadError: Loading chunk … failed` is consistent with **stale client session after deploy** (immutable `/_next/static/*` + soft navigation to hashes from a previous build), not with permanently missing artifacts on a fresh document load.

## P0 changes shipped

### 1. Chunk failure recovery
- `ClientRuntimeGuard` — on `ChunkLoadError` / dynamic import failures, **hard reload once** per tab session (`sessionStorage` key `mth_chunk_reload_v1`)
- Client router static `staleTimes` reduced **1800s → 300s** to shorten soft-nav windows after deploys
- Existing hard-nav for calculator prefill retained

### 2. Hydration `#418`
- Root `suppressHydrationWarning` on `<html>` / `<body>` (extension noise)
- Network bar SSR/static split (prior sprint)
- Date components: FMCSA/BBB last-verified + Google/BBB scrape labels use **absolute UTC** dates (no `Date.now()` relative text / locale TZ drift)

### 3. Error boundary / fallback document
- `app/global-error.tsx` — full document: `lang`, `<title>`, description, **noindex**, main landmark, recovery links
- `app/error.tsx` (+ move segment re-export) — segment fallback with noindex via document head mutation, recovery CTAs

### 4. Monitoring
- `POST /api/client-errors` — structured `console.error` JSON for Vercel Runtime Logs (rate-limited)
- Guard reports: chunk_load, hydration, uncaught, unhandled_rejection
- `ErrorBoundary` + `global-error` also report

## P1 performance (already on main + retained)

See `docs/PERFORMANCE-SPRINT-MOBILE.md`:
- Idle GA DOM inject (no early gtag preload)
- Map / reviews / UX chrome deferred
- Network trust block RSC
- Composited `move-hub-pulse`, critical Geist 600, logo box sizing

## Validation checklist (post-deploy)

1. Homepage desktop + mobile: clean render, no `__next_error__`
2. Heavy county + directory: same
3. DevTools: no chunk 404s on first load; after a **deploy**, soft-nav may reload once (expected)
4. Trigger a test error (optional) → Runtime Logs show `mth.client_error`
5. PSI only after clean document (not error shell)

## Metrics (fill after clean lab)

| Page | LCP | TBT | FCP | CLS | First-load JS | GTM start |
|------|-----|-----|-----|-----|---------------|-----------|
| Homepage | *…* | *…* | *…* | protect ~0 | *…* | idle ≥2.5s |
| Heavy county | *…* | *…* | *…* | *…* | *…* | *…* |
| Directory/profile | *…* | *…* | *…* | *…* | *…* | *…* |

## Remaining limitations
- Extension-injected DOM can still warn in some browsers (suppressed on html/body)
- Full SVG brand lockup not yet design-exported
- Map/Leaflet still heavy when scrolled into view
- Client error sink is log-only (no third-party APM yet)
