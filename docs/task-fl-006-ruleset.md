# MULTI_STATE_REGULATED_ENTITY_V1

Implementation: `lib/state-hhg/multi-state-entity.ts`.

## Strong same-entity evidence

- Exact legal name **and** same USDOT
- Exact legal name **and** official regulator/filing tie (same legal entity named on both authorities)
- Same USDOT named by both state regulators

## Corroborating (not sufficient alone)

Exact phone, named (non-generic) email, exact physical address, exact DBA.

## Insufficient / never enough alone

Generic enterprise email (`legal@`, `info@`), brand, website/domain, franchise/network name, parent organization, city, fuzzy name.

## Resolution states

`SAME_CANONICAL_ENTITY` → attach authority  
`DISTINCT_LEGAL_ENTITIES` → keep/create separate company  
`BRANCH_OR_LOCATION_REVIEW` / `CORPORATE_FAMILY_RELATED` / `REVIEW_REQUIRED` → hold  
`REJECTED_MATCH` → do not attach to that candidate
