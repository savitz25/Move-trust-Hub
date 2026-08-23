# BROWARD-PROD-001 — Official Mover Roster Recovery & Production Qualification

**Status:** `BLOCKED — BROWARD OFFICIAL ROSTER REQUIRES PRA`

| Field | Value |
|---|---|
| Task | BROWARD-PROD-001 |
| Base main | `57aefd74` (MDC-PROD-003 closeout #90) |
| Production DB writes | **0** |
| Google Places/API | **0** |
| Official mover rows recovered | **0** |
| Completeness class | **PRA_REQUIRED** |
| Wave A draft | **NONE** (not forced) |
| PRA package | `BROWARD_PRA_ROSTER_REQUEST_V1` — **SENT: NO** |

## Hard rules honored

- Read-only; no county/state/company mutations
- Palm Beach / Miami-Dade observation clocks untouched
- No commercial directories / Google as roster substitutes
- No name-only canonical links
- Vehicle/decal ≠ mover registration
- Complaint allegation ≠ disposition / violation
- No consumer PII requested or committed

## Historical FL-C004

Public program/docs/application/enforcement process evidence existed, but:

- mover registration rows: **0**
- vehicle permit rows: **0**
- complaint rows: **0**
- enforcement rows: **0**
- roster completeness: **PRA_REQUIRED**

## BROWARD-PROD-001 rediscovery result

Re-checked official Consumer Affairs, Forms, ePermits, PRR portal, ArcGIS citizen portal, Municode Div. 5 Movers, complaint intake, BCS/vendor directories.

**No public machine-readable mover-registration roster, export, or searchable licensing database** equivalent to Palm Beach or Miami-Dade was found. Public guidance continues to point consumers to **phone verification**.

Therefore this task does **not** invent a production cohort.

## Schema fit (design only)

| Component | Fit |
|---|---|
| Mover registration credential | `REUSE_AS_IS` (`county_regulatory_program` + `provider_county_credential`) |
| Vehicle/decal child evidence | `MINIMAL_EXTENSION_REQUIRED` (no migration in this task) |
| Complaints / enforcement events | Separate observation/enforcement models — not collapsed into license DTO |

## PRA next step

Artifacts include the full unsent request package:

`data/county-regulatory/fl/broward/production/broward-prod-001/pra-request-package.json`

**Do not submit** until the user explicitly authorizes external transmission.

While PRA is pending, Builder 2 may proceed to **Pinellas** production qualification.

## Commands

```bash
node scripts/broward-prod-001-finalize.mjs
node scripts/validate-broward-prod-001.mjs
```
