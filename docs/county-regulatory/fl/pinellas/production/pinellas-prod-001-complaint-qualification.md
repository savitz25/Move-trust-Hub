# PINELLAS-PROD-001 — Complaint / Disposition Production Qualification

**Status:** `PINELLAS COMPLAINT RESEARCH COMPLETE — NO_SAFE_INTERNAL_COHORT`

| Field | Value |
|---|---|
| Base main | `e7682294` |
| Production DB writes | **0** |
| Fake Pinellas credential | **NO** |
| Historical Accela cases | **24** unique |
| CANONICAL_LINK_READY | **0** |
| Ready pool / staging draft | **NONE** |
| Google Places | **0** |
| Consumer PII | **0** |

## Regulatory model

`ORDINANCE_REGULATION_WITHOUT_SEPARATE_PUBLIC_CREDENTIAL`

Pinellas is **not** a Palm Beach permit or Miami-Dade registration county for public mover credentials. Do not invent `provider_county_credential` rows.

## Complaint source

Official Accela Civic Platform 5-year business complaint history (Consumer Protection), reached via:

https://pinellas.gov/services/find-a-business-complaint-history/

Access: business-name form → PDF. Bulk structured export not public.

## Identity fail-closed

FL-C007 and this task reject **name-only** complaint PDF business names as deterministic canonical links.

All 24 historical cases remain `BUSINESS_IDENTITY_REVIEW`.

Wrong-company: **0** (no unsafe links staged).

## Semantics

- Complaint ≠ violation
- Complaint ≠ enforcement
- Disposition / RECORD STATUS preserved as raw official wording
- Zero-result ≠ “no complaints” / “complaint-free”

## Schema fit

`MINIMAL_EXTENSION_REQUIRED` for a future case-level complaint/disposition observation store.

Do **not** force Accela cases into `provider_county_credential`.

No migration in this task.

## Freezes

- Palm Beach / Miami-Dade / Broward PRA (SENT: NO) / state: **0 writes**
- Trust Score / search / SEO / UI: **0**

## Next

Do not invent another Pinellas production task for this pilot. Optional later: bounded generic observation-model extension, then identity-corroborated re-run.
