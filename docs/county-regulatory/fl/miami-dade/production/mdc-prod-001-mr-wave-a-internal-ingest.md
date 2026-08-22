# MDC-PROD-001 — Miami-Dade MR Wave A Internal Ingest

**Status:** `MIAMI-DADE MR WAVE A INGESTED — INTERNAL ONLY`

| Field | Value |
|---|---|
| Program | `mdc-moving-business-registration` |
| Wave | `MDC_MR_WAVE_A_INTERNAL_V1` |
| Companies / credentials | **70 / 70** |
| Evidence state | **INTERNAL_ONLY** |
| Published / PUBLICATION_ELIGIBLE | **0 / 0** |
| LBT mutations | **0** |

## Hard freezes

- Palm Beach: 46 total / 11 PUBLISHED / 35 INTERNAL_ONLY — **unchanged**
- Builder 1 state waves / PSA / contacts — **unchanged**
- No consumer MR profile / search / directory / JSON-LD / OG exposure

## Source authority

| Source | Authority |
|---|---|
| MIAMI_DADE_MOVING | Miami-Dade Moving Business Registration / License `MR-#####` |
| FDACS | Chapter 507 state mover registration |
| MIAMI_DADE_LBT | Local Business Tax only — **not** mover credential |
| FMCSA | Federal/interstate where applicable |

Regulator (exact research wording):

`Miami-Dade Department of Regulatory and Economic Resources (RER) — Consumer and Neighborhood Protection Division`

## Wave A

Frozen from FL-C006 `CANONICAL_LINKED=70` as `MDC_MR_WAVE_A_RESEARCH_FREEZE_V1`.

Live revalidation: **70/70 STILL_PRODUCTION_LINK_READY**.

Newly linkable after Florida state work: reported separately; **not** added to Wave A.

## Commands

```bash
node scripts/run-mdc-prod-001-internal-ingest.mjs --preconditions
node scripts/run-mdc-prod-001-internal-ingest.mjs --build-freeze
node scripts/run-mdc-prod-001-internal-ingest.mjs --revalidate
node scripts/run-mdc-prod-001-internal-ingest.mjs --build-manifest
node scripts/run-mdc-prod-001-internal-ingest.mjs --dry-run
node scripts/run-mdc-prod-001-internal-ingest.mjs --apply --manifest-hash <hash>
node scripts/validate-mdc-prod-001.mjs
```

## Safety counters

```text
PUBLISHED: 0
PUBLICATION_ELIGIBLE: 0
Trust Score: 0
sitemap: 0
LBT mutations: 0
complaints/enforcement: 0
contacts promoted: 0
Google Places: 0
Consumer PII: 0
Palm Beach delta: 0
```
