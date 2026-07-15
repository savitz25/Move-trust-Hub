# Phase 4 — Sitewide Consistency Pass

**Branch:** `phase-4-sitewide-consistency`  
**Generated:** 2026-07-15

## Recap: Phases 1–3

| Phase | Scope | Status |
|-------|-------|--------|
| **1** | Removed fabricated movers/reviews, unified indexability evaluator | ✓ |
| **1.1** | Tier 1 tightened to 97 counties, stripped meta-keywords (partial), seat fixes | ✓ |
| **2** | Tier classification, data cleanup, Supabase enrichment, state-hub foundation | ✓ |
| **3** | 295 deep-research counties, state badges, full crawl (3,143 URLs) zero failures | ✓ |

**Current baseline:** Tier 1 = 254 counties (≤400 cap), sitemap aligned, guardrails active.

## Phase 4 Changes

### Metadata & SEO
- Removed `keywords` from county, state, hub, destinations index, lender/insurance resource metadata
- County + state pages now use shared `buildOpenGraph` / `buildTwitter` with `/opengraph-image` (1200×630)
- Contact page OG type fixed to `website` (was `article`)

### State hubs (`/local-movers/[state]`)
- Tier-sorted county grid via `lib/local-movers/state-county-grid.ts`
- **Deep guide** badges on indexed deep-research counties
- Legend row (deep / 50+ / 10–49 / 1–9 movers)
- Hero copy DRY'd to `buildStateDescription()` (removed 120-line inline ternary)
- Removed duplicate `TrustBadges` (chrome `TrustBadgeRow` is single source of truth)

### Content / scaffolding
- Error boundary: removed stale quote-request copy
- State selector: removed "Coming soon" labels
- State fallback section: neutral copy (no internal scaffolding notes)
- Deep county research wired into `getCountyResearch()`

### Audit tooling
- `scripts/audit-phase4-crawl-assertion.ts` — local 3,143-county robots/keywords assertion + production HTML probes
- npm scripts: `audit:phase4`, `audit:phase4:production`, `audit:phase4:full-crawl`

## Verification

### Local (pre-deploy)
```bash
npm run audit:phase4
npm run build
```

### Production (post-deploy)
```bash
npm run audit:phase4:production
npm run audit:phase4:full-crawl   # all 3,143 county URLs
```

**Standard probe URLs (17 + 3 flagged + 5 seeded-random):**
`/`, `/contact`, `/about`, `/companies`, `/compare`, `/moving-calculator`, `/my-move`, `/local-movers`, `/local-movers/california`, `/local-movers/florida`, `/local-movers/texas`, `/local-movers/virginia/fairfax`, `/local-movers/colorado/douglas`, `/local-movers/nebraska/sherman`, `/local-movers/florida/highlands`, `/moving-to`, `/moving-to/myrtle-beach-sc`, `/resources`, `/privacy-policy`, `/terms-of-service` + 5 commit-seeded counties.

## Reports

- `scripts/output/phase4-crawl-assertion-report.json` — machine-readable pass/fail
- `scripts/output/seo-pass-report.json` — county indexability summary (unchanged baseline)