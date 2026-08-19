# MoveTrustHub V1 → V2 migration inventory

No redirects or V1 removals are part of Task 001. Traffic importance is inferred from sitemap/static-generation/caching/code emphasis; analytics should validate it before migration.

| Current route | Purpose / importance | Future disposition |
|---|---|---|
| `/` | Brand homepage and primary discovery; highest | Keep URL; evolve behind separately approved migration |
| `/companies` | Company directory; indexed/high | Keep URL; rebuild read model in place |
| `/companies/[slug]` | Canonical provider profiles; indexed/high | Keep URL; merge V2 evidence/profile contract later |
| `/company/[slug]` | Legacy/singular profile path | Preserve now; evaluate redirect only after traffic/canonical audit |
| `/verify-dot` | DOT verification and FMCSA handoff; high trust intent | Keep URL; merge provider identity resolution |
| `/compare` | Compare Movers | Keep URL; rebuild on provider IDs and move context |
| `/local-movers` and `/local-movers/[state]` | State discovery/SEO; high | Keep URLs; add route-aware eligibility later |
| `/local-movers/[state]/[county]` | County discovery/SEO; very high, large static surface | Keep URLs and metadata; migrate read source carefully |
| `/moving-to/[state]/[city]` | Destination/city research; indexed/high | Keep URL; connect to Move Plan later |
| `/moving-calculator` | Moving cost/calculator entry | Keep URL; merge into shared Move Plan context |
| `/my-move` | Persistent Move Plan | Keep URL; evolve existing saved-plan architecture |
| `/my-move/plans/[planId]` | Saved plan detail | Keep URL; preserve IDs and auth behavior |
| `/my-move/reports` | Move research reports | Keep; merge with future research packet |
| inventory APIs/components under `/api/save-my-move/inventory/[id]` | Inventory persistence | Reuse; align domain boundaries, do not rebuild gratuitously |
| `/resources` | Guides/resources index | Keep URL |
| `/resources/routes` and `/resources/routes/[slug]` | Interstate route guides; indexed/high | Keep URLs |
| `/resources/scams` | Consumer protection | Keep; evidence-first integration later |
| `/auto-transport` and `/auto-transport/[slug]` | Auto transport directory/content | Defer; preserve current URLs |
| portable/container data and content | Container/portable moving research | Defer; inventory exact public routes before changes |
| `/portal`, `/portal/claim/[companySlug]`, portal tools | Existing mover claim/provider workflows | Preserve; merge later with provider ID/organization IDs; do not imply endorsement |

## Existing architecture worth preserving

- Next.js App Router route groups and large SSG sitemap/county architecture.
- Supabase/PostgreSQL companies, review, saved mover/comparison, Move Plan, portal, and enrichment migrations.
- Existing FMCSA refresh/DOT verification and Google Places snapshot code.
- Existing local-mover county/state datasets and diversity/SEO guards.
- Google Analytics root integration plus Vercel Analytics/Speed Insights where currently configured.

## Migration policy

Preserve intent-equivalent URLs. Rebuild behind stable routes, validate canonical/sitemap behavior, and use permanent redirects only after a route truly moves. Maintain a rollback window and monitor crawl/index/traffic before removing any legacy handler.
