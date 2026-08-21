# Task 011D.2B — FL + WA Local Publication Canary Preparation

**Status:** COMPLETE — FL + WA LOCAL CANARY READY / NOT PUBLISHED

**Repo / project:** savitz25/Move-trust-Hub · MoveTrustHub (`movetrusthub.com`)

**Google Places API requests:** 0

**Wave ID:** `LOCAL_HHG_FL_WA_2026_08_CANARY_1`

**publish:** false  
**future_task:** 011D.3  
**future_initial_publication_state:** PUBLISHABLE  
**future_initial_indexable:** false  
**robots (planned):** noindex, follow  
**sitemap (planned):** excluded

## Publication-ready pool

| State | Eligible |
|-------|--------:|
| FL | 781 |
| WA | 148 |
| **Total** | **929** |

Excluded (not weakened): franchise 0, review 0, inactive 0, broker 0, missing fields 0, wrong-state county 0.

### Authority freshness

FDACS/WA UTC authority retrieved_at clustered on 2026-08-21 ingest; VERIFIED+active filters applied. No material staleness requiring full re-ingest for canary preparation.

## Canary selection

| State | Selected |
|-------|--------:|
| FL | 50 |
| WA | 30 |
| **Total** | **80** |

### Geography

- FL counties represented: **44**
- WA counties represented: **22**

FL top counties:
- Broward (12011): 3
- Hernando (12053): 2
- Miami-Dade (12086): 2
- Pinellas (12103): 2
- Volusia (12127): 2
- Alachua (12001): 1
- Bay (12005): 1
- Brevard (12009): 1

WA top counties:
- Clark (53011): 3
- King (53033): 3
- Snohomish (53061): 3
- Thurston (53067): 3
- Benton (53005): 1
- Chelan (53007): 1
- Clallam (53009): 1
- Cowlitz (53015): 1

### Determinism

| | SHA |
|--|-----|
| Run A FL | c1cad11d |
| Run B FL | c1cad11d |
| Run A WA | e2967186 |
| Run B WA | e2967186 |
| Match | **YES** |

## QA summary

- Identity precision: 80/80, failures 0, precision 100%
- Profile issues: 0
- Same-state routes pass: true
- Interstate exclusion pass: true
- Radius / adjacency: disabled
- Consumer-eligible edges: 0
- New public state-only: 0

## Discovery basis

- VERIFIED_HOME_COUNTY only: 80
- With explicit positives: 0
- Radius edges: 0

## Future copy (not live)

- "Based in {countyName}"
- FL authority: "Registration verified with the Florida Department of Agriculture and Consumer Services."
- WA authority: "Household-goods carrier authority verified with the Washington Utilities and Transportation Commission."
- CTA: "Confirm pickup availability for your exact address."
- Explicit: "Provider identifies {countyName} as a service area."

## Consumer gating plan (011D.3)

Enable **only** `LOCAL_HHG_FL_WA_2026_08_CANARY_1` membership. Non-manifest (~849) remain INGESTED / indexable=false / consumer_eligible=false.

## Recommendation

Proceed to **Task 011D.3 — FL + WA Controlled Local Publication Canary** for the exact 80 only. Do not index automatically. Do not broaden beyond the manifest.

## Artifacts

- `docs/task-011d2b-fl-canary-manifest.json`
- `docs/task-011d2b-wa-canary-manifest.json`
- `docs/task-011d2b-canary-qa.json`
- `docs/task-011d2b-canary-rollback.md`
