# Florida County Stack Integration Runbook V1

**Task:** FL-C010  
**Status:** FUTURE EXECUTION ONLY — do **not** run in C010  
**Strategy:** `STRATEGY_3_SELECTIVE_TRANSPLANT`  
**Freeze:** `FL_COUNTY_RESEARCH_V1_FREEZE` → `1256170855439413242acadf68e659e53f4aabc3`  
**Observed origin/main at gate close:** `ceeaa987982b2871662fbb41fee858b52f1a0651` (FL-010A Wave 1 apply merge)  
**Gate:** `STATE_TRACK_ACTIVE: YES` · `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW: NO` · `TECHNICALLY_READY_FOR_SELECTIVE_TRANSPLANT: YES`

---

## Purpose

Execute a **selective transplant** of the frozen Florida county research package onto a clean branch cut from **current** `origin/main`, once Builder 1’s state/publication track is stable enough that county docs/data/scripts can land without colliding with active publication mutation.

This runbook is **not**:

- a main merge of the C001–C010 research stack
- Palm Beach production implementation
- county evidence publication
- Trust Score work
- another county acquisition

---

## Preconditions (all required)

| # | Gate | C010 observation |
|---|---|---|
| 1 | No active critical company-routing remediation | PASS |
| 2 | No active state publication mutation | **FAIL** — FL-010A Wave 1 apply on main |
| 3 | FL_STATE_WAVE_1 immediate regression checks healthy | HOLD — observation period active |
| 4 | No unresolved profile/publication conflict for county data paths | PASS (county allowlist avoids app/state helpers) |
| 5 | Current main deploy/build green | Assumed (merged tip) |
| 6 | Transplant does not modify state publication behavior | PASS by allowlist |
| 7 | County validators pass on current-main rehearsal | **PASS 10/10** |

Until an authorized follow-on records `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = YES`: **stop**.

---

## Strategy 3 — Selective transplant (recommended)

1. `git fetch origin` and record exact `origin/main` SHA.
2. Create disposable or integration branch:  
   `integrate/fl-county-selective-transplant-<YYYYMMDD>` **from that SHA**.
3. Copy **only** paths in  
   `data/county-regulatory/fl/architecture/c010/transplant-allowlist.json` → `include`.
4. For each `review` path: human decide INCLUDE / ARCHIVE_OUTSIDE_GIT / EXCLUDE.
5. **Never** copy secrets, `.env*`, `node_modules`, `.next`, `supabase/migrations/**`, state publication helpers, Trust Score, or consumer PII.
6. Install deps / junction `node_modules` as needed for validators only.
7. Run validators:
   - `validate-fl-c001` … `validate-fl-c009`
   - `validate-fl-c010-integration-gate`
8. Open PR against `main` with checklist below.
9. Merge only after review. **County publish remains a later task.**

Do **not** rebase/merge the live C001–C010 research stack onto main in place.

---

## Allowlist summary (C010)

| Class | Count |
|---|---|
| INCLUDE_IN_TRANSPLANT | 379 |
| REVIEW_BEFORE_TRANSPLANT | 6 |
| EXCLUDE_FROM_TRANSPLANT | 0 |

Durable includes: source catalog, official safe raw evidence, normalized/qualified packages, architecture JSON, production integration specs, PRA drafts, validators, deterministic research scripts, provenance/hash artifacts.

Review (likely archive or keep one canonical crosswalk):

- duplicate `florida-im-company-crosswalk.json` under palm-beach/miami-dade evidence
- large MDC GIS open-data dumps
- large instructional / application PDFs not validator-critical for main

---

## Rehearsal evidence (already done in C010)

| Item | Result |
|---|---|
| Worktree | `C:\Users\makei\move-trust-hub-c010-rehearsal` (disposable, detached) |
| Base | `ceeaa987…` (refreshed from `3c7d205b…`) |
| File conflicts on county paths | **0** |
| Validators | **10/10 pass** |
| Persistent main changes | **none** |

---

## PR checklist (future integration PR)

- [ ] Cut from recorded current `origin/main`
- [ ] Only allowlisted paths added
- [ ] Review items disposition recorded
- [ ] Validators C001–C010 green
- [ ] `consumer_pii_included_in_transplant_allowlist = 0`
- [ ] Google Places API requests = 0
- [ ] No `supabase/migrations` from county research
- [ ] No state-HHG / FL_STATE_WAVE / Trust Score / company publication mutation changes
- [ ] No production writes in CI
- [ ] Explicit note: research/docs/data only — no county publish

---

## Rollback

- Revert the integration PR on main.
- Frozen county research stack (`FL_COUNTY_RESEARCH_V1_FREEZE`) remains source of truth.
- No production schema rollback required if migrations stay at 0.

---

## Related artifacts

- `data/county-regulatory/fl/architecture/c010/fl-county-research-v1-freeze.json`
- `data/county-regulatory/fl/architecture/c010/transplant-allowlist.json`
- `data/county-regulatory/fl/architecture/c010/rehearsal-results.json`
- `data/county-regulatory/fl/architecture/c010/integration-readiness.json`
- `data/county-regulatory/fl/architecture/c010/future-integration-manifest.json`
- `data/county-regulatory/fl/architecture/c010/conflict-report.json`
- `docs/county-regulatory/architecture/stack-integration-runbook.md` (C008 design precursor)
