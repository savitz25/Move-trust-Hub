# Phase 0 — Class D noindex inventory (MoveTrustHub)

**Date:** 2026-07-26  
**Scope:** `movetrusthub.com` only. No 301s. No specialist-domain redirect changes.

## 1. Navigation / branding purification

| Surface | Change |
|--------|--------|
| Move primary nav | Already moving-only (Find Movers, Destinations, Calculator, Verify DOT, Guides) |
| `HubFamilyBar` (Move / Lender / Insurance tabs) | **Removed on move hub** (`hub-chrome.tsx`) |
| Footer finance CTAs | **Removed** from move `AfterYourMoveModule`; replaced with soft network line |
| Soft network line | “Part of the ConsumerTrust Hub network → LenderTrustHub · InsuranceTrustHub” in footers |

Lender and Insurance **sub-hubs** keep their own nav when users are on `/lender/*` or `/insurance/*`.

## 2. Explicit noindex, follow URLs

### A. Redundant legal (Class D)

| URL | Action |
|-----|--------|
| `/lender/privacy` | `noindex, follow` + sitemap removed |
| `/lender/terms` | `noindex, follow` + sitemap removed |
| `/insurance/privacy` | `noindex, follow` + sitemap removed |
| `/insurance/terms` | `noindex, follow` + sitemap removed |

Prefer: `/privacy-policy`, `/terms-of-service`.

### B. Empty / thin local lender counties (Class D)

**Rule (runtime + sitemap):**  
`evaluateLenderClusterIndexability` → `noindex` when:

- `getLendersByCounty(state, county).length === 0` (`zero_lenders`), or  
- length `1..2` (`insufficient_lenders`, `MIN_LENDERS_TO_INDEX = 3`)

Curated cluster content remains indexable.

**Robots:** `index: false`, `follow: true` via `buildHubMetadata`.

**Sitemap:** only counties/clusters with `shouldIndexLenderCluster === true`.

**Example:** `/lender/local-lenders/florida/pasco` (0 lenders) → noindex.

Exact empty set depends on seed data; any zero-listing county page receives noindex when rendered.

### C. Thin auto vertical (Class D)

| URL pattern | Action |
|-------------|--------|
| `/lender/auto-loan-companies` | `noindex, follow` + removed from lender sitemap |
| `/lender/auto-loan-companies/{state}` | `noindex, follow` + removed from lender sitemap |

## 3. Sitemap files updated

- `app/lender/sitemap.ts` — dropped privacy, terms, auto hub/states  
- `app/insurance/sitemap.ts` — dropped privacy, terms  

## 4. Explicitly NOT done (per Phase 0)

- No 301s from `/lender` or `/insurance`  
- No changes to lendertrusthub.com / insurancetrusthub.com redirects  
- No content deletion of finance sections  
- No content migration to specialist domains  

## 5. Regression checklist (moving core)

- [ ] Homepage `/` — no Lender/Insurance in primary header  
- [ ] `/companies`, `/local-movers`, `/moving-calculator`, `/verify-dot`, `/compare`  
- [ ] Footer still shows FMCSA notice + soft network line only  
- [ ] `/lender/*` and `/insurance/*` still load when visited directly  
