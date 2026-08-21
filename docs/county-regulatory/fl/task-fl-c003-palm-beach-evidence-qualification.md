# FL-C003 — Palm Beach Deterministic FDACS Reconciliation & County Evidence Qualification

**Status:** COMPLETE (internal evidence package only)  
**Branch:** `task-fl-c003-palm-beach-evidence-qualification`  
**Base:** `task-fl-c002-palm-beach-regulatory-acquisition` @ `a92d194b566e34966b73ae19a955c5fe1b0f7696`  
**Stacked PR base:** C002 (do not merge automatically)  
**Rebase onto main:** **NO** (county stack preserved)

## Safety

| Gate | Result |
|---|---|
| Production companies changed | NO |
| Provider state authority changed | NO |
| Trust Score changed | NO |
| Publication/indexability changed | NO |
| Palm Beach county page changed | NO |
| Production DB migrations | 0 |
| Google Places/API requests | 0 |
| Consumer PII committed | 0 |
| PR #45 / #48 merged | NO |

## Rulesets

- `PBC_FDACS_RECONCILIATION_V1` — fail-closed VERIFIED / REVIEW_REQUIRED / NOT_FOUND / CONFLICT / NOT_APPLICABLE  
- `PBC_COUNTY_EVIDENCE_V1` — permit / identity / complaint / disposition / enforcement classes  

## C002 baseline (recomputed)

| Metric | Count |
|---|---:|
| Active licensed permits | 142 |
| BIR businesses sampled | 22 |
| Complaint observations | 20 |
| Dispositions present | 17 |
| Enforcement observations | 54 |
| C002 DETERMINISTIC_MATCH (reference) | 59 |

## C003 reconciliation (all 142 permits)

| Outcome | Count |
|---|---:|
| VERIFIED | 64 |
| REVIEW_REQUIRED | 12 |
| NOT_FOUND | 66 |
| CONFLICT | 0 |
| NOT_APPLICABLE | 0 |

### Canonical crosswalk (read-only live FL identity)

| Class | Count |
|---|---:|
| CANONICAL_LINKED | 46 |
| CANONICAL_CANDIDATE | 0 |
| STATE_RECORD_ONLY | 18 |
| COUNTY_ONLY_REVIEW | 78 |

Live identity reference: Supabase REST snapshot — 1,359 FL PSA rows; 817 `fl-im-*` companies; **0** fl-im indexable.

## Precision QA

| Metric | Value |
|---|---:|
| verified_checked | 64 |
| correct | 64 |
| incorrect | 0 |
| precision | **100%** |
| gate | **PASS** (≥98%) |

## Evidence qualification highlights

- All 142 Moving Business Permits have stable MV IDs and are county-credential candidates; unresolved FDACS matches **must not** attach to canonical companies.  
- Complaints remain `COMPLAINT_OBSERVATION`; dispositions retain `official_code` + `official_description` from the 44-code catalog.  
- Enforcement: 54 raw → **49** unique event keys after API duplicate collapse; finality unknown unless explicit.  
- Source authority: FDACS ≠ Palm Beach; statuses are jurisdictional facts.

## County Pilot #1 readiness

**READY_FOR_COUNTY_PILOT_1_INTERNAL**

Palm Beach evidence model is strong enough for an internal county pilot before Builder 2 moves to Broward acquisition. Consumer publication remains unauthorized.

## Package locations

- Evidence working set: `data/county-regulatory/fl/palm-beach/evidence/c003/`
- **Versioned qualified outputs:** `data/county-regulatory/fl/palm-beach/qualified/`
  - `pbc-fdacs-crosswalk-v1.json` (64 VERIFIED)
  - `pbc-fdacs-unresolved-review-v1.json` (78)
  - `complaint-evidence-v1.json` (20, SAMPLE_ONLY)
  - `enforcement-evidence-v1.json` (49 unique events, SAMPLE_ONLY)

## Recommended next task

**FL-C004 — Broward County Mover Regulatory Acquisition & Staging**

Do not integrate Palm Beach into production yet. Collect several real county systems (Palm Beach → Broward → Miami-Dade → Pinellas) before generalized county architecture.

## Validation

```bash
node scripts/validate-fl-c001-catalog.mjs
node scripts/validate-fl-c002-palm-beach.mjs
node scripts/validate-fl-c003-palm-beach-evidence.mjs
node scripts/validate-fl-c003-palm-beach-qualification.mjs
```
