# Florida Move County Intelligence — metric dictionary

Payload version: `mth-fl-county-intel-v1`  
Canonical routes (no duplicate URLs):

| County | Canonical path |
| --- | --- |
| Broward | `/local-movers/florida/broward` |
| Palm Beach | `/local-movers/florida/palm-beach` |
| Miami-Dade | `/local-movers/florida/miami-dade` |
| Pinellas | `/local-movers/florida/pinellas` |

Coverage default: **Statewide Research**. Enhanced Local Research is documented and **not activated**.

The existing relocation `CountyIntelligenceHub` on these pages is logistics (zones, parking, HOA). It is not Enhanced coverage and not a county credential census.

## Coverage gate (documented, not activated)

Enhanced requires **all** of:

1. Validated county credential census (or equivalent local permit evidence)
2. Attributed county complaints (complaint ≠ finding still applies)
3. Final enforcement dispositions attributed
4. `operatingGeographyProven` — actual operating/activity evidence in the county  
   HQ city, county seat, and directory `coverage_counties` are **not** sufficient
5. Identity review complete (county credential ≠ FDACS ≠ FMCSA ≠ company)
6. Public-eligibility review (INTERNAL_ONLY never published)

`countyResearchCoverage()` does not call this gate. Wiring it is a future evidence change, not a page redesign.

## READY (public)

Only when a county credential dataset is contributing **and** `evidence_publication_state=PUBLISHED`:

| Key | Entity | Limitation |
| --- | --- | --- |
| `county_published_credentials` | county_credential | County credential ≠ FDACS ≠ FMCSA ≠ company |

Palm Beach and Miami-Dade can be READY. Broward and Pinellas have no contributing dataset — not READY, not zero.

## INTERNAL_ONLY

`county_internal_credentials` — ingested rows that are not public company claims.

Do not render INTERNAL_ONLY counts on the county page.

## NOT_READY

- Headquarters-in-county (no HQ→county map)
- FDACS-by-county
- County complaints
- Enforcement / final dispositions
- Inspections / OOS / crash
- County-attributed contact observations
- Operating / activity evidence

No dataset ≠ zero incidents. Inspection volume ≠ quality.

## Upgrade contract

Modules on every county payload (`READY` / `INTERNAL_ONLY` / `NOT_READY`):

- county credentials
- county complaints
- enforcement / final dispositions
- permit / local credential evidence
- county consumer-affairs records
- civil / public regulatory data
- expanded contact observations
- operating / activity evidence

New datasets plug into module readiness. No page redesign.

## Discovery

Defensible listing route is the canonical county page `#movers`. That list is curated assignments / regional fallback — not HQ, not county credential holders, not FDACS-by-county.

Do not use `/companies?counties=` as an HQ or credential filter.

## SEO

County Intelligence is a section on the existing county route. Canonical tags, sitemap-local, and indexability stay with `/local-movers/florida/{county}`. Do not add `/florida/{county}`.
