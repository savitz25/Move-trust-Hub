# Current Main Compatibility — FL-C009

**Design-only compatibility note** against observed `origin/main`.

| Ref | SHA / value |
|---|---|
| `origin/main` observed | `ab93c84195f3b36c7e2bbd70495a0ee1432d8140` |
| Note on main | FL-010r hard-404 remediation merged — **state/publication still active** |
| C008 head | `13f409cc17e6c18e27388773848fc995c518cd27` |
| `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW` | **NO** |
| Recommended FL-C010 | `WAIT_FOR_STATE_TRACK_STABILITY` |

---

## 1. Why integrate-now is unsafe

Builder 1 continues to change publication / hard-404 / reachability behavior on main. County stack integration or PBC-PROD DDL/UI would collide with:

- Company publication state transitions
- Indexable / sitemap / 404 remediation paths
- State HHG publish canaries

County evidence rules depend on a stable definition of “company publicly reachable.” That definition is still moving.

---

## 2. Compatible today (no main code changes required)

These FL-C009 artifacts are compatible with current main **as documentation/data/scripts only**:

- Docs under `docs/county-regulatory/architecture/palm-beach-v1/`
- JSON under `data/county-regulatory/fl/architecture/c009/`
- Emit/validate scripts for C009
- Continued use of existing `provider_contact_observation` **semantics** (extend later; do not migrate now)
- Existing PSA remaining STATE-only

---

## 3. Incompatible / deferred until gate clears

| Work | Why deferred |
|---|---|
| Selective transplant onto main | SAFE_TO_INTEGRATE = NO |
| County DDL under `supabase/migrations` | Migration policy + state-track collision |
| Profile / county page wiring | Depends on stable public reachability + publication model |
| Promoting evidence to PUBLICATION_ELIGIBLE/PUBLISHED | Almost no PRODUCTION_LINK_READY companies are public-ready (33 INGESTED, 11 null, 2 PUBLISHABLE; indexable mostly false) |
| Trust Score hooks | Hard forbidden in V1 |

---

## 4. Cohort freeze compatibility

Recomputed C009 cohort vs historical C003:

- Canonical-linked: 46 → 46 (gained 0 / lost 0)
- PRODUCTION_LINK_READY: 46

Identity snapshot remains read-only reference; live DB may continue to evolve under Builder 1 — **re-freeze before PBC-PROD-001**.

---

## 5. Design implication

Wave A must assume INTERNAL_ONLY for all 46 and must not encode product logic that expects public profiles for this cohort today. Public credential display is a **later** gated concern after both (a) state-track stability / transplant and (b) company publication eligibility improve or are explicitly accepted case-by-case.
