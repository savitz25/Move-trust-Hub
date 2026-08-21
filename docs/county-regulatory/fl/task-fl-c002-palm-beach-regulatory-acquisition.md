# FL-C002 — Palm Beach County Mover Regulatory Data Acquisition & Staging

**Status:** COMPLETE (research/staging only)  
**Branch:** `task-fl-c002-palm-beach-regulatory-acquisition`  
**Base:** `task-fl-c001-county-regulatory-discovery` @ `91863908249c4230c5247f4055c3a25394b33645`  
**Stacked PR:** against C001 (do not merge automatically)  
**PR #45 (C001):** remains OPEN / unmerged  

## Safety gates

| Gate | Result |
|---|---|
| Production companies changed | NO |
| Provider regulatory records changed | NO |
| Trust Score changed | NO |
| Publication/indexability changed | NO |
| Palm Beach county page changed | NO |
| Production DB migrations | 0 |
| New Google Places/API requests | 0 |
| Consumer PII committed (normalized) | 0 |
| PRA submitted | NO |

## Program verification

- **Agency:** Palm Beach County Public Safety — Consumer Affairs Division  
- **Credential:** **Moving Business Permit** (official License_Type_Desc; License_Type_Seq **8**)  
- **Ordinance:** **2005-007** / PBC Code Ch. 17 Art. VIII Moving & Storage (grandfathered under Fla. Stat. §507.13)  
- **Business type (search):** BusinessType **58** — Moving & Storage  
- **Status:** Program operating; public licensed-mover lookup live  
- **Renewal cue:** Moving Business Permit renewal date shown as **06/01** on GetLicenseTypeNotExpired  

## Data access characterization

| Mode | Available? |
|---|---|
| Official bulk download of full universe | **NO** |
| Official searchable public API/UI | **YES** |
| Official report/document (BIR) | **YES** (per-business) |
| Bounded representative extraction | **YES** (used) |
| PRA required for complete bulk/historical | **YES** |

Distinction:

- `PUBLICLY_ACQUIRED` — near-full **active LICENSED** roster via `Companies/GetCompanies`  
- `PRA_REQUIRED_FOR_COMPLETE_BULK_DATA` — inactive/expired/historical permits; full complaint/enforcement bulk extracts  

## Staging outputs

Under `data/county-regulatory/fl/palm-beach/`:

- `raw/` — untouched official API/PDF/JS evidence + BIR sample payloads + provenance hashes in `meta/raw-provenance.json`  
- `normalized/` — research-only JSON staging (permits, BIR, complaints, enforcement, identity, matchability, coverage)  

## Key quantified results

- Active licensed mover permits staged: **142** (NEAR_FULL_ACTIVE_LICENSED_ROSTER)  
- BIR reports analyzed: **22** (SAMPLE)  
- Complaint observations (sample): **20** (85% with disposition)  
- Enforcement observations (sample): **54**  
- FDACS offline matchability: DETERMINISTIC **59** / REVIEW **17** / NOT_FOUND **66** / INSUFFICIENT **0**  

## Architecture observations (lab only; not final shared schema)

Recurring county concepts exposed by Palm Beach:

1. County regulatory credential (Moving Business Permit / MV#)  
2. Business identity observation (legal/DBA/address/phone/web/officer)  
3. Complaint observation (allegation ≠ disposition ≠ final enforcement)  
4. Complaint disposition code table (official GetResolutions)  
5. Enforcement event (NOV / Citation / fine)  
6. Owner/officer/dispute-contact observation  
7. Fleet-size observation  

Florida remains the architecture laboratory. No production migrations.

## Recommended FL-C003

**FL-C003 — Palm Beach Deterministic FDACS Reconciliation & County Evidence Qualification**

Rationale: public Palm Beach data are already rich enough for meaningful internal reconciliation (59 deterministic matches + strong county-only fields: MV permit, owners, fleet, BIR dispositions, enforcement). Keep the refined PRA **unsent** as a completeness track, but do not block county-track progress on PRA turnaround. Broward remains the next *acquisition* county after Palm Beach evidence qualification, unless PRA latency later flips priority.

## Validation

```bash
node scripts/validate-fl-c001-catalog.mjs
node scripts/validate-fl-c002-palm-beach.mjs
```
