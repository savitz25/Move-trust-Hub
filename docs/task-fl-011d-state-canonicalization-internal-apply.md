# Task FL-011D — Florida state canonicalization internal Wave

**Status (implementation PR):** dry-run complete, apply=false  
**Wave:** `FL_STATE_CANONICALIZATION_WAVE_INTERNAL_V1`  
**Hash:** `85a137ecd1a86d6f`  
**Draft hash (FL-011C):** `491de1629fa00c44`  
**Google Places / API requests:** `0`  
**Production apply:** not in this implementation commit

## Membership

| Op | Count |
| --- | ---: |
| LINK_EXISTING_CANONICAL | 81 |
| INSERT_NEW_CANONICAL | 32 |
| **Total** | **113** |
| Withheld (unchanged) | 168 |

Live revalidation: **113 / 113 PASS**. Identity failures: **0**.

## Dry-run deltas (identical #1 and #2)

| Surface | Delta |
| --- | ---: |
| New companies | +32 INGESTED / indexable=false |
| Existing canonical identity fields | 0 |
| PSA INSERT | 0 |
| PSA ATTACH (orphan active rows for the 32) | 32 |
| PSA already present (81 links) | 81 no-op |
| Contact observation INSERT | 0 |
| Contact observation ATTACH | 104 |
| Contact observation exact no-op | 233 |
| Canonical contact promotions | 0 |
| Publication / indexable / Trust Score / sitemap | 0 |
| County tables | 0 |

## Public-exposure gate

FDACS profile chrome, evidence block, and structured data render only when
`shouldRenderFloridaStateWaveChrome` is true (Wave 1 member **and** PUBLISHABLE).

The 81 LINK targets are not Wave 1 members. Adding or confirming `provider_state_authority`
does not auto-enable Florida state chrome. Pre-apply HTTP: 79 public LINK profiles checked, unexpected FDACS Wave chrome **0**. Gate: **PASS**.

IM1954 slug `a-1-freeman-moving-storage-llc` 307'd to existing `usdot-896791`. Reallocated to `a-1-freeman-moving-storage-llc-im1954` (pre-apply HTTP 404). Identity remains INSERT (different official phone/address; name-only is not a link).

## New company contract

All 32 inserts: `publication_state=INGESTED`, `indexable=false`, anonymous HTTP 404.

## Apply

Manifest-bound:

```
npx tsx scripts/run-task-fl-011d-state-canonicalization.ts --dry-run
npx tsx scripts/run-task-fl-011d-state-canonicalization.ts --apply --manifest-hash 85a137ecd1a86d6f
npx tsx scripts/run-task-fl-011d-state-canonicalization.ts --rollback --manifest-hash 85a137ecd1a86d6f
```

Do not apply until this implementation PR is merged and production SHA matches.
