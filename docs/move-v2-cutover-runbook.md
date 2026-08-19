# MoveTrustHub V1 → V2 cutover runbook

## Strategy

Use a **hybrid, route-by-route, feature-flag cutover**. Keep URLs and content at the same path by default. Compose V2 discovery into `/` and `/local-movers` first; keep unresolved provider, Move Plan, auto, portable/container, and editorial surfaces on their current implementation. Database and route changes are additive. Do not use a big-bang replacement.

## Pre-cutover checks

1. Freeze the approved commit and confirm PR/CI/Vercel status.
2. Export the live sitemap indexes, redirect configuration, robots response, 28-URL golden set, provider identity map, GA4 identity, and active V1/V2 database counts.
3. Require zero unclassified launch-critical routes and zero accidental golden-set 404s.
4. Review all provider mappings; allow only exact authority/identity matches. Keep ambiguous/unmatched URLs on V1.
5. Confirm NJ and Illinois remain unavailable for state-verified local eligibility and experimental-derived is false.
6. Confirm reviewer UI, audit data, job controls, service credentials, and write commands return 404/inaccessible publicly.

## Database checkpoint

Record without secrets: canonical project reference, V1 row counts/checksums, current Move V2 release ID/fingerprint, prior immutable release ID, candidate counts, schema migration checksums, and timestamp. Create a named cutover checkpoint in the release pointer log. Do not update or delete V1 evidence/tables.

## Environment validation

Required Production names: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, server database connection variable used by the deployment, `SUPABASE_SERVICE_ROLE_KEY` for server jobs only, `NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE`, and existing Vercel environment identity. Internal-only: `ADMIN_SECRET`, `CRON_SECRET`, `FMCSA_WEB_KEY`, `GOOGLE_PLACES_API_KEY`. Preview-only/default-off: `MOVE_ENABLE_INTERNAL_REVIEW`, enrichment flags, browser QA flags. Never expose server/internal values through `NEXT_PUBLIC_*` or browser bundles.

## Feature flags at launch

- `MOVE_ENABLE_V2=true` only after approval.
- `MOVE_ENABLE_REAL_PROVIDER_DATA=true` only with the approved full immutable release.
- `MOVE_ENABLE_GOOGLE_ENRICHMENT=false` and `MOVE_ENABLE_WEBSITE_ENRICHMENT=false` in request-serving deployments.
- `MOVE_ENABLE_INTERNAL_REVIEW=false` in Production.
- Experimental derived inclusion remains hard false; it is not a client flag.

## Migration order

1. Publish the approved full FL/WA immutable discovery release without moving the current pointer.
2. Validate candidate counts, source traces, commercial firewall, and sanitized read responses.
3. Deploy code with V2 routes dark/default-off.
4. Run golden-set, sitemap, robots, canonical, analytics, mobile, and security smoke tests on the candidate.
5. Advance the database pointer, then enable sanitized reads, then enable route composition. These are separate reversible actions.
6. Activate reviewed one-hop redirects only after their targets return canonical 200 responses.

## Redirect, sitemap, and robots validation

Every redirect target must be equivalent, one hop, and never the homepage fallback. Query strings are preserved unless they are known tracking-only parameters; fragments remain browser-side. Sitemap URLs must return 200, self-canonical, indexable HTML and never redirect. Production robots must allow public content, disallow `/admin`, `/api/`, internal admin prefixes, and `/_next/`, and advertise only Move sitemaps. Preview retains page-level noindex and must never be canonical.

## Smoke and analytics checks

Run homepage search, local FL/WA, interstate, unsupported NJ/IL, Trust Report, sources, compare, shortlist, DOT verify, Move Plan, calculator, auto, portable/container, five provider pages, state/county pages, guides, legal pages, 404, and internal-route blocking. Confirm Move GA4 stream continuity, SPA page views, Vercel Analytics, and privacy-safe action events in Realtime without personal move data.

## Rollback triggers

Rollback immediately for: widespread legacy 404s, redirect loops/chains, wrong canonical host, Production noindex, sitemap redirects, loss of provider identity, incorrect authority inclusion, public internal/write access, analytics identity split, material error-rate/latency regression, or inability to trace consumer facts.

## Rollback procedure

1. Disable V2 route composition while leaving evidence intact.
2. Restore sanitized API flag to its prior state.
3. Restore the prior immutable discovery release pointer.
4. Redeploy/reselect the prior V1 route implementation; do not reverse or delete source observations.
5. Disable newly activated redirects that are implicated, leaving proven historical redirects untouched.
6. Purge only affected HTML cache keys, then rerun the V1 golden set, robots, sitemap, canonicals, analytics, and database integrity snapshot.
7. Append an incident and corrective release; never rewrite the bad normalized/reviewer decision.

## Post-cutover and Search Console

Compare sitemap URL counts, coverage, crawl errors, canonicals, Core Web Vitals, provider impressions, state/county impressions, and redirect targets daily for the first week and weekly thereafter. Submit sitemaps only after Production validation. Inspect “Duplicate without user-selected canonical,” soft 404, redirect, and blocked-resource reports. Keep the V1 rollback package and database checkpoint until stability criteria are met.

Task 012 performs none of these Production actions; it only rehearses and documents them.
