# FL-C004 — Broward County Mover Regulatory Acquisition & Staging

**Status:** COMPLETE (research/staging; public roster PRA-dependent)  
**Branch:** `task-fl-c004-broward-regulatory-acquisition`  
**Base:** `task-fl-c003-palm-beach-evidence-qualification` @ `0af416b8…`  
**Stacked PR base:** C003 (do not merge automatically)  
**Rebase onto main:** **NO**

## Safety

| Gate | Result |
|---|---|
| Production companies / PSA / Trust Score / publication | unchanged |
| Broward county page | unchanged |
| Production DB migrations | 0 |
| Google Places/API requests | 0 |
| Consumer PII committed | 0 |
| PR #45 / #48 / #51 merged | NO |

## Program (verified)

- **Agency:** Broward County Consumer Protection Division — Consumer Affairs  
- **Credentials:** **Mover's Registration** + **Mover Permit (decal)**  
- **Ordinance:** Chapter **20-176.90** Broward County Code  
- **Status:** Operating; annual cycle expires **September 30**  
- **Fees:** $400 registration + $75 per-vehicle decal  

## Public data outcome

| Asset | Classification |
|---|---|
| Program docs / forms | PUBLICLY_ACQUIRED |
| Mover roster | **PRA_REQUIRED** (no public lookup/bulk found) |
| Vehicle/decal inventory | **PRA_REQUIRED** (schema documented from application) |
| Complaint history/dispositions | **INTAKE_ONLY** public / **PRA_REQUIRED** for history |
| Enforcement/hearing case data | Process documented / **PRA_REQUIRED** for cases |

## Recommended FL-C005

**FL-C005 — Miami-Dade County Mover Regulatory Acquisition & Staging**

Do not force Broward qualification while public roster access remains PRA-gated. Palm Beach remains the strong public pilot; Broward PRA stays drafted/unsent.

## Validation

```bash
node scripts/validate-fl-c001-catalog.mjs
node scripts/validate-fl-c002-palm-beach.mjs
node scripts/validate-fl-c003-palm-beach-qualification.mjs
node scripts/validate-fl-c004-broward-acquisition.mjs
```
