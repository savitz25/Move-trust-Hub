# County Stack Integration Runbook (FUTURE — DO NOT EXECUTE)

**Task reference:** FL-C008  
**Status:** Design-only runbook. **Do not execute** while `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = NO`.  
**Observed origin/main:** `4711355486f3787e5c154cadeb0ff6d11dbb0118`  
**County stack C007 head:** `05e018e2236cd1f865ef3808874aa388065720df`  
**Recommended strategy:** Strategy 3 — clean branch from current main + selective transplant

---

## Purpose

Document how to bring Florida county-regulatory research artifacts onto a production-aligned branch **after** state-track publication work is stable — without rebasing the live county stack onto main during Builder 1 activity, and without touching Builder 1 state publication paths.

---

## Preconditions (all required)

| Gate | Requirement |
|---|---|
| State wave stable | FL state / publication path idle; no in-flight Builder 1 publish applies |
| No overlapping publication work | No concurrent tasks writing companies, PSA publish flags, or canary publication |
| Clean main | Integration branch cut from a known-good `origin/main` SHA |
| Frozen county head | Validators C001–C008 green on frozen county commit |
| Safety counters | Consumer PII committed = 0; production DB migrations in county package = 0; no Google Places in county scripts |
| Explicit go | Human records `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = YES` in a follow-on task artifact |

Until all gates pass: **stop**. Do not merge, rebase, or transplant.

---

## Strategy summary

| ID | Strategy | Use when | Verdict |
|---|---|---|---|
| 1 | Rebase/merge entire C001–C008 stack onto main | Stack linear and main quiet | Rejected for now — collision risk with Builder 1 |
| 2 | Squash county stack into one commit on main | Need compact history | Acceptable fallback; less reviewable |
| **3** | **Clean branch from current main + selective transplant** | **Main advanced; need reviewability** | **Recommended** |

Strategy 3 preferred because Builder 1 continues advancing main (including FL-010 wave1 apply). A selective transplant onto fresh main preserves reviewability of county paths against current production code without rewriting the research stack history in place.

---

## Future execution outline (Strategy 3)

> **DO NOT RUN these steps in FL-C008.**

1. **Freeze** county head SHA; archive validator green logs.
2. **Confirm** preconditions JSON updated to YES by an authorized follow-on task.
3. `git fetch origin` and record `origin/main` SHA.
4. Create branch: `integrate/fl-county-selective-transplant-<date>` from that main SHA.
5. Selectively checkout/copy **only** allowed paths, e.g.:
   - `docs/county-regulatory/**`
   - `data/county-regulatory/**`
   - `data/regulatory-source-catalog/fl/**` (if present and county-owned)
   - `scripts/fl-c00*.mjs`, `scripts/validate-fl-c00*.mjs`
6. **Do not** transplant:
   - Builder 1 state publication scripts/migrations
   - Unrelated hub/app edits that may have drifted on the stack
   - Any production migration files introduced for county (there should be none)
7. Run validators C001–C008 on the integration branch.
8. Open PR with explicit checklist: no Trust Score changes, no PSA overload, no Places APIs, no PII, no production writes in CI.
9. Merge only after review — county publish remains a **separate** later task (not this runbook’s merge).

---

## Path ownership rules

| Path class | Owner during integration |
|---|---|
| `data/county-regulatory/**` | County track (transplant) |
| `docs/county-regulatory/**` | County track (transplant) |
| `supabase/migrations/**` state/publication | Builder 1 — **do not touch** |
| Trust Score / ranking libs | Untouched |
| Company publication pipelines | Untouched |

Do **not** reorganize or move existing county pilot data trees during transplant.

---

## Rollback sketch

- Integration PR revert restores main.
- County research stack branch remains intact as source of truth for artifacts.
- No production schema to roll back if migrations stay at 0 (required).

---

## Related artifacts

- `data/county-regulatory/fl/architecture/c008/stack-integration-options.json`
- `data/county-regulatory/fl/architecture/c008/state-track-coordination.json`
- `data/county-regulatory/fl/architecture/c008/stack-manifest.json`
- `docs/county-regulatory/architecture/COUNTY_REGULATORY_ARCHITECTURE_V1.md`
