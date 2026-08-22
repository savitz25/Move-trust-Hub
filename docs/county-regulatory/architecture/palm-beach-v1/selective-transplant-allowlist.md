# Selective Transplant Allowlist (Palm Beach / County Stack)

**Task:** FL-C009 (design-only)  
**Strategy:** STRATEGY_3_SELECTIVE_TRANSPLANT  
**Execute now:** **NO** — `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = NO`  
**Recommended gate task:** FL-C010 — WAIT_FOR_STATE_TRACK_STABILITY

---

## 1. Preconditions (all required)

1. State track / publication path stable (Builder 1 idle on publication/404/indexable behavior)
2. No overlapping publication work
3. Clean cut from known-good `origin/main`
4. Frozen county head validators C001–C009 green
5. Human records `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = YES`
6. **Stack transplant completes BEFORE any PBC-PROD implementation**

Until then: do not merge, rebase, or transplant.

---

## 2. Allowlist (transplant)

| Path | Notes |
|---|---|
| `docs/county-regulatory/**` | Architecture + pilot docs |
| `data/county-regulatory/**` | County research + C008/C009 packages |
| `data/regulatory-source-catalog/fl/**` | Only if county-owned and present |
| `scripts/fl-c00*.mjs` | Emit/normalize/qualify helpers |
| `scripts/validate-fl-c00*.mjs` | Validators |

---

## 3. Denylist (do not transplant / do not touch)

| Path / area | Reason |
|---|---|
| `supabase/migrations/**` | Builder 1 / state track ownership; county migrations must be 0 on research stack |
| Trust Score libs / ranking | Out of scope |
| Company publication pipelines / Builder 1 state publish scripts | Collision risk |
| Profile page / county page product code edits on research stack | Defer to gated UI tasks after transplant |
| Google Places integration paths | Forbidden for county matching |
| Unrelated hub/app drift on long county stack | Avoid blast radius |

---

## 4. Post-transplant checklist

- [ ] Validators C001–C009 green on integration branch
- [ ] `SAFE_TO_INTEGRATE` artifact updated intentionally
- [ ] No Trust Score diffs
- [ ] No PSA county overload introduced
- [ ] No Places API additions
- [ ] Consumer PII committed = 0
- [ ] Production writes in CI = false
- [ ] PBC-PROD tasks still blocked until DDL gate + Wave A INTERNAL plan approved

---

## 5. Related

- `docs/county-regulatory/architecture/stack-integration-runbook.md`
- `data/county-regulatory/fl/architecture/c009/selective-transplant-allowlist.json`
- `data/county-regulatory/fl/architecture/c009/state-track-coordination.json`
