# PBC-PROD-001 — Palm Beach County Credential Production Foundation

**Status:** implementation in progress → `INTERNAL WAVE A INGESTED — NOT PUBLIC` when apply completes  
**Wave:** `PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1` (exactly **46**)  
**Evidence state:** `INTERNAL_ONLY` (not public)

## Objective

Move Palm Beach from qualified research evidence to production-resident **internal** county credentials without publishing, without mutating companies/PSA/contacts/Trust Score, and without UI changes.

## Baseline

| Item | Value |
|---|---|
| Starting main | `cf42ae00` (incl. FL-C011 + FL-011A) |
| Freeze cohort (C009) | 46 `PRODUCTION_LINK_READY` |
| Live preflight | 46 still ready / 0 dropped / 0 review |
| Newly linkable | excluded from Wave A |

## Schema

Migration: `supabase/migrations/20260822170000_pbc_prod_001_county_credential_foundation.sql`

| Object | Purpose |
|---|---|
| `county_regulatory_program` | Program/source registry (Palm Beach Moving Business Permit) |
| `provider_county_credential` | County MV credentials + identity audit fields |

**Hard rules**

- `provider_state_authority` remains **STATE only** (no MV overload)
- RLS enabled; `REVOKE ALL` from `anon` / `authenticated`
- No complaint/enforcement/contact tables in this task

## Regulator

`Palm Beach County Public Safety — Consumer Affairs Division`  
Source key: `pbc-consumer-affairs-moving-business-permit`  
County FIPS: `12099`

## Ingest

```bash
node scripts/pbc-prod-001-live-cohort-preflight.mjs
node scripts/pbc-prod-001-build-wave-a-manifest.mjs
node scripts/ingest-pbc-prod-001-wave-a.mjs --apply-migration
node scripts/ingest-pbc-prod-001-wave-a.mjs --dry-run
node scripts/ingest-pbc-prod-001-wave-a.mjs --apply --manifest-hash <hash>
# rollback (data only):
node scripts/ingest-pbc-prod-001-wave-a.mjs --rollback --manifest-hash <hash>
```

## Rollback

Prefer **manifest-bound row delete** (`--rollback`) preserving schema. Do not drop tables unless schema itself is defective. Rollback must leave companies / PSA / contacts / Trust Score untouched.

## Safety counters (required)

```text
companies delta: 0
publication_state delta: 0
indexable delta: 0
provider_state_authority delta: 0
provider_contact_observation delta: 0
complaint/enforcement: 0
Trust Score: unchanged
Consumer PII: 0
Google Places: 0
Public county credential exposure: 0
```

## Next

`PBC-PROD-002 — Palm Beach Credential Wave A Internal QA & Publication Readiness Gate`  
Do not start automatically.
