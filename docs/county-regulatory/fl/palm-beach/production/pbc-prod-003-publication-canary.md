# PBC-PROD-003 — Palm Beach County Credential Controlled Publication Canary

**Status:** `PBC CREDENTIAL CANARY PUBLISHED — OBSERVATION ACTIVE`

| Field | Value |
|---|---|
| Implementation PR | [#74](https://github.com/savitz25/Move-trust-Hub/pull/74) merge `2fc416c2` |
| Cache hotfix PR | [#75](https://github.com/savitz25/Move-trust-Hub/pull/75) merge `c3ea773a` |
| Manifest hash | `f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f` |
| Published / Internal | **11 / 35** (46 total) |

## Hard rules

- **No** `?showInternal=true`
- **No** production flag that renders `INTERNAL_ONLY`
- **PUBLISHED gate is real**
- Direct anon/authenticated table SELECT remains **DENIED**
- Server-only service-role read → sanitized DTO → profile only
- Not in directory / compare / search / JSON-LD / OG

## Cohort (exact draft membership)

| Field | Value |
|---|---|
| Draft | `PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1_DRAFT` |
| Draft hash | `031ab4bca2b422842e9a05936204e10e560643970bac78394bbf630a7a40a3f9` |
| Final | `PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1` |
| Final hash | `f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f` |
| Companies / credentials | **11 / 11** |
| Company state | all `PUBLISHABLE` |
| Multi-credential | excluded from canary |

## Sequence

1. Merge/deploy code (read path + UI)  
2. **Zero-exposure gate** while still INTERNAL_ONLY: 11/11 HTTP 200, **0/11** county blocks  
3. Dry-run → apply exactly 11 `INTERNAL_ONLY → PUBLISHED`  
4. Revalidate ISR (`revalidate=300` on company profiles; wait/retry smoke)  
5. Prove 11 visible / 35 hidden  

## Commands

```bash
node scripts/pbc-prod-003-canary.mjs --baseline
node scripts/pbc-prod-003-canary.mjs --revalidate
node scripts/pbc-prod-003-canary.mjs --promote-manifest
npx tsx --test lib/county-regulatory/pbc/public-read.test.ts
node scripts/validate-pbc-prod-003.mjs

# after deploy, before publish:
node scripts/publish-pbc-prod-003-canary.mjs --preconditions
node scripts/publish-pbc-prod-003-canary.mjs --dry-run

# publish:
node scripts/publish-pbc-prod-003-canary.mjs --apply --manifest-hash f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f

# rollback:
node scripts/publish-pbc-prod-003-canary.mjs --rollback --manifest-hash f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f
```

## UI / a11y

- Desktop 1440×900; mobile 412 / 390 — no overflow; status not color-only  
- Hierarchy: Federal → State (FDACS) → County (Palm Beach permit)  
- Disclaimer + source attribution in text for screen readers  
- Icon decorative (`aria-hidden`); permit number exposed as text  

## Safety counters

```text
Trust Score: 0
sitemap: 0
ranking: 0
contacts/complaints/enforcement: 0
company publication/indexable: 0
Google Places: 0
Consumer PII: 0
```

## Observation

| Field | Value |
|---|---|
| ID | `PBC_CREDENTIAL_CANARY_OBSERVATION_V1` |
| Launch | `2026-08-22T19:56:00.000Z` |
| Window | **7 days** → `2026-08-29T19:56:00.000Z` |
| Does not block Builder 1 | **YES** |
| Expand during observation | **NO** |

Rollback triggers: wrong-company / wrong MV / INTERNAL_ONLY leakage / table exposure / non-canary evidence / material security or render failure. Minor copy/layout alone is not a rollback trigger.

## Structured artifacts

Under `data/county-regulatory/fl/palm-beach/production/pbc-prod-003/`:

- `current-main-baseline.json`
- `final-canary-manifest.json`
- `live-preapply-revalidation.json`
- `public-read-contract.json`
- `runtime-security-audit.json`
- `preapply-zero-exposure.json`
- `apply-dry-run.json`
- `rollback-dry-run.json`
- `apply-result.json`
- `post-apply-db-audit.json`
- `canary-profile-sweep.json`
- `non-canary-control-sweep.json`
- `anon-security-check.json`
- `search-directory-compare-regression.json`
- `seo-structured-og-regression.json`
- `state-regression.json`
- `pbc-impact-delta.json`
- `observation-baseline.json`

Impact ledger: `docs/florida-impact-ledger/county/pbc-prod-003-impact-delta.json`

## Post-apply closeout

```bash
node scripts/pbc-prod-003-post-apply-closeout.mjs
npm run qa:fl-wave1-observation
```

Next (do not start automatically): **PBC-PROD-004 — Palm Beach Credential Canary Observation & Expanded Credential Publication Gate**
