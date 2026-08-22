# PBC-PROD-002 — Palm Beach Credential Publication Readiness

**Status:** `READY_FOR_PBC_CREDENTIAL_PUBLICATION_CANARY`  
**Production DB writes:** **0**  
**Public behavior change:** **0**

## Wave A baseline (verified live)

| Metric | Value |
|---|---|
| Wave | `PBC_COUNTY_CREDENTIAL_WAVE_A_INTERNAL_V1` |
| Manifest hash | `39c66453…e5d871` |
| Credentials | **46** |
| Distinct companies | **43** |
| INTERNAL_ONLY | **46** |
| PUBLISHED | **0** |

## Revalidation

`46 / 46` exact company ↔ FDACS IM ↔ Palm Beach MV. Wrong-company links: **0**.

## Multi-credential

3 companies hold multiple MV permits. Classified **VALID_MULTI_CREDENTIAL** (distinct active permits; list all current distinct permits in future UI).

## Readiness

| Layer | Ready | Withheld |
|---|---|---|
| Companies (43) | 12 `READY_FOR_PUBLICATION_CANARY` | 31 mostly `WITHHOLD_IDENTITY` (not anonymously public) |
| Credentials (46) | 13 `PUBLICATION_READY` | 33 `WITHHOLD` (company-not-public / etc.) |

## Recommended canary (draft only)

`PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1_DRAFT`  
**apply=false**

- Companies: **11**
- Credentials: **11**
- Prefer single-credential, public-eligible companies with CURRENT freshness

## Contracts

- Consumer copy: Palm Beach County Moving **Permit** (not endorsement)
- Public read: fail-closed — company public **and** evidence `PUBLISHED`
- Anon direct table read: **DENIED**
- Trust Score / ranking / sitemap: **0**
- Structured data: **HOLD_FROM_STRUCTURED_DATA_V1**

## Next

`PBC-PROD-003 — Palm Beach County Credential Controlled Publication Canary`  
Do not start automatically.
