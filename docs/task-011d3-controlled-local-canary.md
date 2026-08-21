# Task 011D.3 — Controlled FL + WA Local Publication Canary

**Status:** COMPLETE — FL + WA LOCAL CANARY LIVE / NOINDEX

**Wave ID:** `LOCAL_HHG_FL_WA_2026_08_CANARY_1`

**Google Places API requests:** 0

**Repo / project:** savitz25/Move-trust-Hub · MoveTrustHub (`movetrusthub.com`)

## Decision

**KEEP CANARY NOINDEX**

- Do **not** set `indexable=true`
- Do **not** add sitemap URLs
- Do **not** expand beyond exact 80

## Published

| State | Count |
|-------|------:|
| FL | 50 |
| WA | 30 |
| **Total** | **80** |

Publication state: `PUBLISHABLE`  
Indexable: `false`  
Robots: `noindex, follow`  
Discovery basis: `VERIFIED_HOME_COUNTY` with `consumer_eligible=true` (exact 80 only)

## Counts

| Metric | Before | After |
|--------|-------:|------:|
| Companies | 5870 | 5870 |
| Indexable | 4905 | 4905 |
| INGESTED state-only | 929 | 849 |
| Canary PUBLISHABLE noindex | 0 | 80 |
| Interstate-visible directory pool | 4605 | 4605 (Δ0) |
| Consumer-eligible evidence | 0 | 80 |

## Gates

- Manifest hashes: FL `c1cad11d` / WA `e2967186` (unchanged)
- Pre-publish authority: 80/80 valid
- Non-manifest reject probe: pass
- Idempotent re-publish: 0 new changes
- Profile noindex: 80/80
- Non-manifest mutations: 0
- Radius / adjacency: disabled
- Federal Waves 1–4 unchanged

## Discovery

SQL path: `local_canary_movers_for_county` / `queryCanaryLocalDiscovery`  
Materialization bounded to `limit` (24). Empty/low counties allowed.

## Rollback

`docs/task-011d3-rollback.sql` and `npm run rollback:task-011d3`  
Preserves canonical companies + authority + home-county rows.

## Recommendation

**Task 011D.4 — Local Canary Observation + Index/Scale Decision**

Choose later: keep noindex longer, index proven 80, prepare larger FL/WA wave, or rollback if live issues appear.
