# PBC-PROD-004 — Canary Observation & Expanded Credential Publication Gate

**Status:** `WAITING — PBC CANARY OBSERVATION NOT MATURE`

| Field | Value |
|---|---|
| Observation ID | `PBC_CREDENTIAL_CANARY_OBSERVATION_V1` |
| Launch | `2026-08-22T19:56:00.000Z` |
| Maturity | `2026-08-29T19:56:00.000Z` |
| Expanded publication apply | **false** |
| Production credential writes | **0** |

## Time gate

This run is **before** maturity. Early health is recorded, but the final READY decision is deferred until after `2026-08-29T19:56:00.000Z`. Do not shorten the window.

## Production baseline (live)

| Metric | Value |
|---|---|
| Total / PUBLISHED / INTERNAL_ONLY | **46 / 11 / 35** |
| Duplicates / orphans / unexpected PUBLISHED | **0 / 0 / 0** |
| Canary companies | **11** |

## Canary health (read-only)

- Manifest hash `f9d56097…` membership exact 11/11
- Identity EXACT 11/11
- Profile sweep 11/11 (MV/regulator/status/source/disclaimer)
- Wrong-company / duplicate block / prohibited endorsement: **0**
- CDN TTL ~300s; no cross-company MV contamination
- Anon + authenticated table SELECT: **DENIED**
- Remaining 35 public exposure: **0**

## Status semantics

Official PBC `License_Status_Code` includes **LICENSED** (“License issued”).  
Consumer label remains **Active county moving-business permit** (permit framing — not a MoveTrustHub endorsement).

## Remaining cohort (live recompute)

| Gate | Count (approx) |
|---|---|
| COMPANY_NOT_PUBLIC_CREDENTIAL_READY (mostly INGESTED) | 24 |
| STATUS_REVIEW (STALE) | 10 |
| MULTI_CREDENTIAL_REVIEW (public + ready sibling set) | 1 CURRENT (+ 1 STALE sibling) |

## Multi-credential

| Company | MVs | Classification | Public? |
|---|---|---|---|
| blue-line-moving-llc | MV1062, MV1229 | VALID_CONCURRENT_MULTI_CREDENTIAL | INGESTED — not eligible |
| gator-relocators-moving-storage-inc | MV1130, MV1174 | VALID_CONCURRENT_MULTI_CREDENTIAL | INGESTED — not eligible |
| lee-s-moving-company-usdot-3034432 | MV50, MV868 | VALID_CONCURRENT_MULTI_CREDENTIAL | PUBLISHABLE; **MV50 CURRENT**, **MV868 STALE** |

## Expanded draft (apply=false)

`PBC_COUNTY_CREDENTIAL_EXPANDED_PUBLICATION_V1_DRAFT`

| Field | Value |
|---|---|
| Companies / credentials | **1 / 1** |
| Member | `lee-s-moving-company-usdot-3034432` · **MV50** · IM2822 |
| Held | MV868 (STALE) until CURRENT |
| Hash | see `expanded-publication-draft-v1.json` |
| Historical 1×2 expectation | **Not matched live** (sibling freshness) |

UI: singular “Palm Beach County Moving Permit” until both MVs are CURRENT; plural contract documented for later.

## Freezes

Company / PSA / contacts / complaints / enforcement / Trust Score / Google Places / PII: **0 delta** from this task.

## Next

1. After maturity, re-run this gate for `READY_FOR_PBC_EXPANDED_CREDENTIAL_PUBLICATION` (or DEGRADED).
2. Only then authorize a separate apply task for the exact draft.

Do **not** expand the public cohort in PBC-PROD-004.
