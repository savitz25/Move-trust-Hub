# Move Trust Hub — Performance sprint (mobile / consumer responsiveness)

**Date:** 2026-08-07  
**Scope:** Homepage + shared chrome; protect research features and CLS.

## Changes shipped

### 1. Hydration
- `suppressHydrationWarning` on `<html>` / `<body>` for extension-driven attribute noise (React #418)
- Network bar split: **SSR desktop pills** + **client mobile switcher only** (smaller hydrate surface, fixed middot encoding)
- Avoid client-only markup differences on first paint for network chrome

### 2. Homepage JS / client boundaries
- Map loader: later idle + tighter rootMargin; `content-visibility` shell
- Below-fold: `InternalLinkHub` + `ReviewHighlights` dynamic / `ssr: false` for reviews
- Hero remains SSR H1 + static chips; route form stays intent-gated client island
- `NetworkTrustBlock` is RSC (handoff links remain client islands)
- Deferred UX chrome (coach/journey/tips) idle window extended slightly

### 3. Analytics deferral
- GA4: **idle gate (~2.5–4.5s)** then **DOM inject** (no `next/script` preload of gtag)
- Single init guard `window.__MTH_GA_INIT`
- ResearchClickTracker mounts only after GA ready
- Vercel Analytics remains interaction/idle deferred via ThirdPartyOrchestrator

### 4. CSS / font / logo
- `move-hub-pulse`: **transform + opacity** (composited), not `filter`
- Critical CSS: darker muted text token for small labels
- Header logo: display dimensions aligned to `.hub-logo-slot` (no oversized decode)

## Validation (run after deploy)

Comparable mobile lab (throttled):

| Page | Metrics to capture |
|------|-------------------|
| Homepage `/` | LCP, TBT, FCP, CLS, JS transferred first load |
| County e.g. Miami-Dade local movers | LCP, TBT, CLS |
| Directory `/companies` or a profile | LCP, TBT |

**Protect:** CLS ~0 · Verify/Compare/Calculator/My Move work · no integrity regressions.

### Expected direction (lab)
- LCP: less render delay on hero text (SSR H1 + deferred GA/map)
- TBT: lower main-thread contention from gtag + map + reviews
- FCP: stable or improved
- CLS: remain ~0

*Fill exact before/after numbers from your Lighthouse/PSI runs after production deploy.*

## Remaining limitations
- Header lockup is still **PNG** (full brand sheet); SVG mark (`/logo.svg`) is simplified M only — full SVG lockup needs design export
- Mega-nav still client JS on interaction (expected)
- Map/Leaflet still heavy once scrolled into view
- Insurance/Lender hosts share root layout GA path (host-aware ID)

## Hard rules preserved
Phases 0–5 SEO/integrity systems untouched. Research CTAs not removed.
