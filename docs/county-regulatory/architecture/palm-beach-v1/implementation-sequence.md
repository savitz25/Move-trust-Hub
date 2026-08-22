# Implementation Sequence — Palm Beach Production Wiring

**Task:** FL-C009 (design-only sequence)  
**Do not execute PBC-PROD tasks while `SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = NO`.**

Observed:

- `origin/main`: `ab93c84195f3b36c7e2bbd70495a0ee1432d8140`
- C008 head: `13f409cc17e6c18e27388773848fc995c518cd27`
- Recommended next: **FL-C010 — County Stack Integration Gate — WAIT_FOR_STATE_TRACK_STABILITY**

---

## 0. Coordination (now)

| ID | Task | Action |
|---|---|---|
| FL-C009 | This package | Design only — complete |
| **FL-C010** | County Stack Integration Gate | **WAIT_FOR_STATE_TRACK_STABILITY** — do **not** transplant yet |
| (later) | Selective transplant PR | Only after YES gate |

---

## 1. Ordered production tasks (future)

| ID | Name | Depends on | Notes |
|---|---|---|---|
| **PBC-PROD-001** | Foundation + Wave A INTERNAL ingest | Stack transplant merged; DDL gate approved | Create program + credential tables (gated migration task); ingest 46 credentials as `INTERNAL_ONLY`; **publish nothing** |
| PBC-PROD-002 | Wave A read path (internal) | PBC-PROD-001 | Staff/internal API only |
| PBC-PROD-003 | Wave B contact observation extend | PBC-PROD-001 | Extend uniqueness; county contacts; never overwrite companies |
| PBC-PROD-004 | Wave C complaint/disposition + 44-code catalog | PBC-PROD-001 | Separate tables; no complaint-free |
| PBC-PROD-005 | Wave D enforcement events | PBC-PROD-001 | Finality on event |
| PBC-PROD-006 | Controlled publication eligibility pass | Prior waves + company public reachability | Promote evidence only when company public **and** evidence eligible; still no Trust Score |
| PBC-PROD-007 | Profile/county-page presentation | PBC-PROD-006 | Copy-only surfaces per presentation specs |

Owner/officer productization and VIN fleet remain optional/FUTURE unless explicitly pulled into a Wave B+ task.

---

## 2. FIRST implementation task after stack integration (detail)

### PBC-PROD-001 — Foundation + Wave A INTERNAL ingest

**Goal:** Stand up the minimum county credential storage and load the 46 PRODUCTION_LINK_READY rows as internal evidence only.

**Includes:**

1. Gated migration (separate PR from research design) implementing sketches for:
   - `county_regulatory_program`
   - `provider_county_credential` (with on-row link fields)
2. Seed Palm Beach CREDENTIAL_BASED program row
3. Upsert 46 credentials from `pbc-production-link-ready-v1.json` / cohort freeze
4. Set every row `evidence_publication_state = INTERNAL_ONLY`
5. Record `ingest_run_id`, `ruleset_version = PBC_FDACS_RECONCILIATION_V1`, match method/timestamp
6. Validators: row count 46, PSA county inserts 0, companies publication untouched, Trust Score untouched, PII 0, Places 0

**Explicitly excludes:**

- Publishing any credential
- Profile/county page UI
- Waves B–D data
- Contact observation migration (unless tightly coupled and still non-publishing)
- Trust Score / indexable changes
- Google Places

**Abort if:** state track unstable; link cohort delta unexplained; PII found; any publish flag set true.

---

## 3. Invariant across all PBC-PROD tasks

- Stack transplant **before** PBC-PROD-*
- PSA not overloaded
- Wave A first ingest INTERNAL
- County evidence never flips indexable / Trust Score
- Consumer PII committed = 0
- Production migrations only in dedicated gated PRs — never sneak into design tasks

Machine-readable: `implementation-sequence.json`, `first-implementation-task-spec.json`.
