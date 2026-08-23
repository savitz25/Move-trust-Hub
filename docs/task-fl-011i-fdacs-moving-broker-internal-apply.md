# Task FL-011I — Florida FDACS moving broker internal staging apply

**Status:** `FL BROKER INTERNAL STAGING APPLIED — PUBLIC FREEZE HEALTHY`  
**Draft hash:** `e1e78a4d18cf2c0c`  
**Final hash:** `228e2fa252322c93`  
**Google API:** `0`  
**FL-012:** prohibited until `2026-09-05T14:45:00Z`

Applies **only** the frozen FL-011H 18-operation manifest. Not a publication wave.

## Manifest

| | |
|---|---|
| LINK | 1 (MB159 → `fl-im-3405`) |
| INSERT | 17 (`fl-mb-*`, INGESTED / indexable=false) |
| total | 18 |
| MB171 control | outside manifest (`usdot-3197443`) |

Live revalidation: **18/18 PASS**. MB12 Suddath gate: **DISTINCT_INSERT_SAFE**.

## Role safety

New companies use `entity_type=BROKER`. `companies.service_scope` is NOT NULL and CHECK-constrained to `interstate|intrastate`; `intrastate` would classify as a local mover, so INSERT uses `interstate` plus `entity_type=BROKER`, which resolves to the Broker consumer role (not Local Mover / Carrier). Broker authority lives on `provider_state_authority.authority_type=intrastate_hhg_broker`. Canonical phone/email/address are not written; observations only.

Existing PSA MB rows are orphans (29 MB authorities already ingested). Apply **ATTACH**s them; it does not insert duplicate authorities.

## County freeze (current, not FL-011H’s old 70-INTERNAL_ONLY)

Palm Beach 46 / 11 PUBLISHED / 35 INTERNAL_ONLY.  
Miami-Dade 70 / 9 PUBLISHED / 61 INTERNAL_ONLY.  
`MDC_MR_CANARY_OBSERVATION_V1` launch `2026-08-23T00:07:51.092Z`, maturity `2026-08-30T00:07:51.092Z`.

## Tooling

`npm run qa:fl-011i` dry-run.  
`npm run apply:fl-011i -- --manifest-hash 228e2fa252322c93` after production serves the merge SHA.  
`npm run rollback:fl-011i -- --manifest-hash 228e2fa252322c93` is manifest-bound and never deletes the MB159 company.
