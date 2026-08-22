# Task FL-011B — Florida state Wave 2 readiness

**Status:** `READY_FOR_FL_STATE_WAVE_2_DECISION`  
**Apply:** `false`  
**Production DB writes:** `0`  
**Google Places / API requests:** `0`  
**Wave 1 observation clock:** unchanged (`2026-08-22T14:45:00Z` → `2026-09-05T14:45:00Z`)

## What this is

Read-only FDACS identity + qualification + readiness for a **future** Florida State Wave 2. Not a publication apply. Not Wave 1 expansion. Not indexation. Not Builder 2 county-regulatory work.

## Wave 1 safety

Live membership **37**, PUBLISHABLE, `indexable=false`. Freeze unchanged: 5908 companies / 4905 indexable / 850 INGESTED / 5022 PUBLISHABLE. Gentletouch still HTTP 200.

## Universe (recomputed)

| Slice | Count |
| --- | ---: |
| Source IM records | 1330 |
| Source IM active | 1104 |
| Source IM expired / unknown / revoked | 113 / 112 / 1 |
| Source MB brokers (excluded) | 29 |
| Eligibility rows | 1332 |
| Eligibility PUBLICATION_READY (Wave 1 consumed) | 37 |
| DB `fl-im-*` companies | 817 |
| Active IM with no safe canonical company | 281 |

## Exclusions

- Wave 1: 37
- KEEP_80: 50 FL + 30 WA
- FL-007 / Suddath holds: `fl-im-350`, `fl-im-210`, `fl-im-3819`, `fl-im-4099` (and related KEEP_HOLD groups)
- Brokers (MB)
- Inactive / historical / status-blocked eligibility

## Full ready pool

**720** existing INGESTED `fl-im-*` companies pass `FL_STATE_WAVE_2_READINESS_V1` (active IM, STATUS_FRESH, COUNTY_VERIFIED geography, FDACS contact observation, not Wave 1 / KEEP_80 / hold).

Contact coverage on the ready pool: phone 720/720, email 714/720.

These are **already canonical**. Wave 2 would only change `INGESTED → PUBLISHABLE` later. Indexable stays false.

## Recommended Wave 2

**50** companies (cap), county round-robin across 38 Florida counties so the next apply is QA-bounded and not Miami-Dade-only (ready pool is 122 Miami-Dade / 105 Broward).

Draft: `FL_STATE_WAVE_2_DRAFT` hash `a5d15f3dca32a59a` `apply: false`  
File: `data/state-hhg/fl/fl-011b-wave2-draft-manifest.json`

## Simulated delta (not executed)

| Field | Delta |
| --- | ---: |
| companies | 0 |
| INGESTED | −50 |
| PUBLISHABLE | +50 |
| indexable | 0 |
| PSA | 0 |
| contacts | 0 |
| Trust Score | 0 |
| sitemap | 0 |
| KEEP_80 | 0 |
| Wave 1 | 0 |

## 404 contract

Recommended-sample slugs currently HTTP **404** (still INGESTED). Wave 1 Gentletouch remains **200**.

## Scale path (estimate, not publication)

- Immediately Wave-2-ready: 720
- Recommended next apply: 50
- Likely resolvable with bounded canonicalization: 281 STATE_RECORD_ONLY
- Review / hold / not eligible among `fl-im-*`: 2 / 4 / 4

## Artifacts

- `docs/task-fl-011b-florida-state-universe.json`
- `docs/task-fl-011b-exclusions.json`
- `docs/task-fl-011b-canonical-linkage.json`
- `docs/task-fl-011b-hold-list.json`
- `docs/task-fl-011b-simulated-delta.json`
- `docs/task-fl-011b-profile-semantics.json`
- `docs/task-fl-011b-strict-404.json`
- `docs/task-fl-011b-readiness-summary.json`
- `data/state-hhg/fl/fl-011b-wave2-ready-pool.json`
- `data/state-hhg/fl/fl-011b-wave2-draft-manifest.json`

Do not start a Wave 2 apply until Wave 1 observation completes and FL-012 keeps Wave 1.
