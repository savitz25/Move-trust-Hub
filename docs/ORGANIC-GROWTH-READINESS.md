# Organic Growth Readiness Checklist — Move Trust Hub

Last updated: July 2026  
Production: https://www.movetrusthub.com

## UX — Delightful, warm, educational

| Item | Status | Notes |
|------|--------|-------|
| Conversational coach tips on move hub pages | ✅ | `MoveCoachTip` — contextual, dismissible per page |
| Journey progress tracker with celebrations | ✅ | `JourneyTracker` — milestones for calculator, directory, verify, compare, review |
| Cross-vertical recommendation strip | ✅ | `HubRecommendationStrip` on all three hubs |
| Legacy domain welcome banners (308 redirects) | ✅ | `LegacyWelcomeBanner` + `?from=` attribution |
| Cross-hub life-event promo bar | ✅ | `HubCrossLinkBar` with motion + warmer copy |
| Email tips opt-in (non-intrusive) | ✅ | `MoveTipsOptIn` — links to contact, localStorage dismiss |
| Warm trust bar copy per hub | ✅ | `TrustBadgeRow` conversational subtitle |
| Homepage coach-tone refresh | ✅ | Hero + “How it works” copy updated |

## SEO

| Item | Status | Notes |
|------|--------|-------|
| Directory ItemList + CollectionPage schema | ✅ | `/companies` via `buildCompaniesDirectorySchemaGraph` |
| Company review AggregateRating + Review schema | ✅ | `/company/[slug]` existing |
| Article + FAQ schema on hub guides | ✅ | Lender + insurance resource articles |
| Network Organization schema (root) | ✅ | `buildTrustHubNetworkSchema` in root layout |
| Hub home Service + FAQ schema | ✅ | Lender + insurance homepages |
| Internal linking hub component | ✅ | `InternalLinkHub` on companies directory |
| Cross-hub footer + nav resources links | ✅ | All three hubs |
| Legacy URL 301/308 redirects | ✅ | `vercel.json` + slug aliases |
| Sitemaps per hub | ✅ | Move, lender, insurance sitemap routes |
| Canonical URLs via `buildHubMetadata` | ✅ | Sub-hub pages |

## Performance & Core Web Vitals

| Item | Status | Notes |
|------|--------|-------|
| `next/image` AVIF/WebP formats | ✅ | `next.config.ts` |
| `OptimizedImage` wrapper for logos | ✅ | `HubLogo` migrated |
| Font `display: swap`, reduced weights | ✅ | Geist 400 + 600 only preloaded |
| Deferred GA4, chatbot, toaster | ✅ | `DeferredWidgets`, `DeferredAnalytics` |
| `content-visibility: auto` on below-fold | ✅ | `.content-auto` utility |
| Package import optimization | ✅ | lucide, radix, framer-motion in `experimental.optimizePackageImports` |
| Logo `priority` + `sizes` on LCP | ✅ | Header logo |
| Client islands only where needed | ✅ | Coach/journey/opt-in are client; chrome stays server |

### Post-deploy verification (run after each major release)

```bash
npm run build
npx lighthouse https://www.movetrusthub.com --only-categories=performance,seo --chrome-flags="--headless"
```

Target: LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile (Vercel Speed Insights).

## Growth & conversion

| Item | Status | Notes |
|------|--------|-------|
| Hub selector in global nav | ✅ | Move / Lender / Insurance |
| ZIP search on hub homepages | ✅ | `HubZipSearch` |
| Calculator CTAs on move hub | ✅ | Hero + nav |
| Lead capture on lender directory | ✅ | Existing `LeadCaptureForm` |
| Cross-vertical synergy on key paths | ✅ | Cross-link bar on home, calculator, companies, resources |
| GA4 legacy arrival events | ✅ | `trackLegacyArrival` |
| Move tips contact funnel | ✅ | `/contact?subject=move-tips` |

## Content & E-E-A-T

| Item | Status | Notes |
|------|--------|-------|
| Move resources library (11+ guides) | ✅ | `/resources/*` |
| Lender mortgage guide | ✅ | `/lender/resources/how-to-choose-mortgage-lender` |
| Insurance health plan guide | ✅ | `/insurance/resources/how-to-choose-health-insurance-plan` |
| FMCSA / NMLS / DOI verify links | ✅ | Trust bars + article CTAs |
| Independent directory disclaimers | ✅ | Footers + article conclusions |

## Remaining opportunities (P2)

- [ ] Fix pre-existing `tsc` errors in `scripts/` and `store/calculator-store.ts`
- [ ] Add `SpeakableSpecification` on top FAQ sections
- [ ] A/B test coach tip copy via feature flags
- [ ] Newsletter backend (Resend list) for move-tips opt-in
- [ ] RUM dashboard alerts in Vercel for CWV regressions

## Sign-off

The site is **organic-growth ready** for indexed directory pages, hub guides, and cross-vertical discovery. Monitor GSC coverage weekly and Vercel Speed Insights after deploy `5a4c8b5d` and subsequent UX release.