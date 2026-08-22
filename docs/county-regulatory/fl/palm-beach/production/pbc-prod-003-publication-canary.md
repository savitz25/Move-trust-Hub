# PBC-PROD-003 — Palm Beach County Credential Controlled Publication Canary

**Target status:** `PBC CREDENTIAL CANARY PUBLISHED — OBSERVATION ACTIVE`

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
