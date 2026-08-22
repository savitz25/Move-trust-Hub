# COUNTY_REGULATORY_ARCHITECTURE_V1

**ADR status:** Accepted (design-only)  
**Task:** FL-C008 — Florida County Regulatory Architecture Discovery V1 & Stack Integration Plan  
**Date:** 2026-08-22  
**Scope:** Architecture discovery + design + integration planning only  
**Production migrations:** 0 · **Trust Score wiring:** none · **Google Places APIs:** 0  
**Observed origin/main:** `4711355486f3787e5c154cadeb0ff6d11dbb0118`  
**County stack head (C007):** `05e018e2236cd1f865ef3808874aa388065720df`

---

## 1. Context

Four Florida county pilots (Palm Beach, Broward, Miami-Dade, Pinellas) established that counties regulate movers through two durable postures:

1. **CREDENTIAL_BASED** — a county issues a mover-specific credential (permit/registration/license) with a roster that may be public or PRA-gated.
2. **ORDINANCE_ONLY** — a county regulates mover conduct by ordinance without a separate public mover credential (Monitoring, not Licensing).

State HHG authority already lives in `provider_state_authority` (Task 011B / FL state track). County credentials must **not** overload that table. This ADR defines the smallest durable county model, concept catalog, lifecycle, adapter contract, storage recommendation, first production pilot, and feature waves — without executing schema, merge, or publication work.

---

## 2. Goals

- Support both **CREDENTIAL_BASED** and **ORDINANCE_ONLY** counties in one conceptual model.
- Preserve jurisdictional independence: FDACS / county / LBT / FMCSA facts coexist with provenance.
- Fail closed on identity matching and publication eligibility.
- Separate complaint ≠ disposition ≠ enforcement ≠ final outcome.
- Separate insurance REQUIREMENT_DOCUMENTED ≠ CURRENT_POLICY_OBSERVED ≠ COMPLIANCE_VERIFIED.
- Separate SCHEMA_ONLY application fields from company observations.
- Keep county evidence off Trust Score in V1.
- Enable Palm Beach as first production pilot when integration gates clear.
- Remain nationally portable for later county/local regulatory tracks.

## 3. Non-goals (V1)

- Production DB migrations, publishes, or Trust Score changes.
- Merging or rebasing the county stack onto `main`.
- Overloading `provider_state_authority` with county credentials.
- Consumer-facing “complaint-free” claims from zero-result searches.
- Google Places (or other paid Places) APIs for county identity.
- Touching Builder 1 state publication paths.
- Reorganizing existing county pilot data trees.
- Criminal-record productization or consumer PII commitment.
- National multi-state county rollout in this task.

---

## 4. County regulatory posture model

| Posture | Meaning | Roster | Pilot exemplars |
|---|---|---|---|
| `CREDENTIAL_BASED` | County issues mover-specific credential | May be NEAR_FULL public, SAMPLE, or PRA_REQUIRED | Palm Beach, Broward, Miami-Dade |
| `ORDINANCE_ONLY` | Ordinance regulates conduct; no separate public mover credential | `NO_SEPARATE_ROSTER_IDENTIFIED` | Pinellas |

**Invariant:** Architecture must remain valid when credential rows = 0 but ordinance + complaint/enforcement observations exist.

Coverage classes (roster / evidence accessibility):

- `NEAR_FULL` — public roster approximately complete for active set
- `SAMPLE` — observations exist but not universe-complete
- `PRA_REQUIRED` — bulk/history requires public-records request
- `SCHEMA_ONLY` — application/docs define fields; no company rows observed
- `INTAKE_ONLY` — complaint intake documented; history not public
- `NO_SEPARATE_ROSTER_IDENTIFIED` — ordinance-only / no credential roster
- `REQUIREMENT_DOCUMENTED` — requirement text known; not a compliance fact

---

## 5. Concept catalog (normative)

Each concept is classified `V1_REQUIRED` | `V1_OPTIONAL` | `RESEARCH_ONLY` | `FUTURE`.

### 5.1 Source (`V1_REQUIRED`)
Official origin of an observation (agency + system + URL/record id + retrieval timestamp). Every retained fact keeps provenance.

### 5.2 Jurisdiction (`V1_REQUIRED`)
Geographic/legal authority scope (state, county, municipality). Status in one jurisdiction never overwrites another.

### 5.3 County credential (`V1_REQUIRED` for CREDENTIAL_BASED; nullable for ORDINANCE_ONLY)
Mover-specific county permit/registration/license (e.g., PBC `MV####`, Broward registration+decal, MDC `MR-#####`). Stored in **new** county-credential concepts — **not** in `provider_state_authority`.

### 5.4 Ordinance posture (`V1_REQUIRED`)
Record that a jurisdiction regulates movers via ordinance with or without a credential program (`CREDENTIAL_BASED` / `ORDINANCE_ONLY`), including Monitoring vs Licensing taxonomy where observed.

### 5.5 Identity observation (`V1_REQUIRED`)
County-reported legal name, DBA, address, phone, email, website. Observations ≠ canonical company fields until fail-closed link.

### 5.6 Owner / officer observation (`V1_OPTIONAL`)
Public or PRA-derived contact/title/owner fields. No DOB or consumer PII committed.

### 5.7 Local Business Tax (LBT) (`V1_OPTIONAL`)
Tax-category corroboration (e.g., MDC MOV-*). **Architectural rule: LBT ≠ mover authority.**

### 5.8 Branch (`V1_OPTIONAL` / often `SCHEMA_ONLY`)
Additional location candidates only when an explicit branch record exists. Schema support ≠ observed branches.

### 5.9 Vehicle / fleet (`V1_OPTIONAL`)
Fleet count or VIN/tag/GVW/decal observations. SCHEMA_ONLY application fields are not company observations.

### 5.10 Insurance states (`V1_REQUIRED` as vocabulary; observation rows `V1_OPTIONAL`)
Strictly layered:

| State | Meaning |
|---|---|
| `REQUIREMENT_DOCUMENTED` | Ordinance/application states a requirement |
| `CURRENT_POLICY_OBSERVED` | A current policy artifact was retrieved |
| `COMPLIANCE_VERIFIED` | Compliance against requirement was verified under ruleset |

Never collapse these three.

### 5.11 Complaint (`V1_REQUIRED` concept; rows as available)
Allegation / intake / case observation. Existence of a complaint is **not** a misconduct finding.

### 5.12 Disposition (`V1_REQUIRED` concept; rows as available)
Official resolution code/status for a complaint. **COMPLAINT ≠ DISPOSITION.**

### 5.13 Enforcement event (`V1_REQUIRED` concept; rows as available)
Citation, notice, hearing, administrative action observation. **ENFORCEMENT_EVENT ≠ FINAL_OUTCOME.**

### 5.14 Finality / final outcome (`V1_OPTIONAL`)
Explicit final order / closed-with-finality marker when source provides it. Do not infer finality.

### 5.15 Zero-result observation (`RESEARCH_ONLY` / optional INTERNAL)
`NO_COMPLAINT_RECORD_RETURNED_FOR_SEARCH_WINDOW` (and analogs). Never consumer-facing as “complaint-free.”

### 5.16 Legal / criminal boundary (`V1_REQUIRED` policy)
County civil/administrative tracks may reference criminal referral language. V1 does **not** productize criminal records or imply guilt from referral statuses (e.g., Pinellas `Closed-Criminal`).

### 5.17 Cross-source link (`V1_REQUIRED`)
Versioned, fail-closed links among county credential ↔ FDACS IM ↔ canonical company ↔ LBT (secondary). Match results: `VERIFIED`, `REVIEW_REQUIRED`, `NOT_FOUND`, `CONFLICT`, `NOT_APPLICABLE`, plus canonical classes `CANONICAL_LINKED`, `STATE_RECORD_ONLY`, `COUNTY_ONLY_REVIEW`, etc.

### 5.18 Conflict model (`V1_REQUIRED`)
Preserve both sides with provenance. Types include `JURISDICTIONAL_DIFFERENCE`, `TEMPORAL_DIFFERENCE`, `BRANCH_CANDIDATE`, `IDENTITY_REVIEW`, `TRUE_DATA_CONFLICT`, `IDENTITY_CONFLICT`, `CROSS_SOURCE_REVIEW_REQUIRED`.

### 5.19 Lifecycle (`V1_REQUIRED`)
See §7.

### 5.20 Publication states (`V1_REQUIRED`)
See §8. County evidence does not change Trust Score in V1.

### 5.21 Adapter contract (`V1_REQUIRED`)
See §9.

### 5.22 PII policy (`V1_REQUIRED`)
Consumer PII committed = 0. Business-level regulatory fields only. Strip/redact complainant identity from any raw artifact before commit.

### 5.23 Coverage classes (`V1_REQUIRED`)
See §4.

### 5.24 Trust Score boundary (`V1_REQUIRED`)
County regulatory evidence is **display / corroboration candidates only** in V1. No Trust Score inputs, weights, or gates from county facts.

---

## 6. Storage recommendation (design-only — Option D hybrid)

**Do not apply migrations in FL-C008.**

| Concept | Recommendation | Classification |
|---|---|---|
| State HHG authority | Keep / use existing `provider_state_authority` | `REUSE_EXISTING` |
| County mover credential | **NEW** conceptual table(s) — do **not** overload PSA | `NEW_CONCEPT_REQUIRED` |
| Ordinance posture / jurisdiction program | **NEW** | `NEW_CONCEPT_REQUIRED` |
| Generic regulatory observations/events (complaint, disposition, enforcement, insurance observation, contact observation) | **NEW** generic observation/event layer (county-scoped), parallel to proposed state event designs | `NEW_CONCEPT_REQUIRED` |
| Cross-source links / reconciliation evidence | **NEW** versioned evidence objects (staging JSON now; tables later) | `NEW_CONCEPT_REQUIRED` |
| Companies / canonical identity | Reuse `companies` via fail-closed `company_id` attachment | `REUSE_EXISTING` |
| Publication eligibility flags | Extend publication model carefully later; **do not touch Builder 1 paths now** | `EXTEND_EXISTING` (future only) |

**Rationale:** PSA is state-authority-shaped (state_code + state authority_type). County credentials have county FIPS/name, different credential types, PRA coverage, and ordinance-only null credentials. Hybrid Option D = reuse company identity + keep PSA for state + add county credential + generic observation tables.

---

## 7. Evidence lifecycle

```
DISCOVERED → ACQUIRED → NORMALIZED → QUALIFIED → LINKED
  → PUBLICATION_ELIGIBLE → PUBLISHED
```

Parallel / terminal publication-adjacent states:

- `INTERNAL_ONLY` — usable internally; not consumer-visible
- `WITHHELD` — deliberately held (PII, conflict, precision gate, legal)

Rules:

- Advancement is monotonic only under explicit ruleset version bumps.
- `QUALIFIED` requires ruleset + precision gates where applicable (e.g., VERIFIED ≥ 98%).
- `LINKED` requires fail-closed identity match (`VERIFIED` / `CANONICAL_LINKED`).
- `PUBLICATION_ELIGIBLE` does **not** auto-publish.
- `PUBLISHED` is out of scope for FL-C008 / recommended FL-C009 design-only.

Pilot mapping examples:

| County | Typical max stage today |
|---|---|
| Palm Beach | QUALIFIED + LINKED sample; READY_FOR_COUNTY_PILOT_1_INTERNAL |
| Broward | ACQUIRED / SCHEMA_ONLY / PRA_REQUIRED |
| Miami-Dade | QUALIFIED + LINKED for Issued cohort |
| Pinellas | ACQUIRED / RESEARCH_ONLY (no roster to qualify) |

---

## 8. Publication states & Trust Score

Allowed consumer-facing posture for county evidence in future pilots (not executed here):

| State | Consumer meaning |
|---|---|
| `INTERNAL_ONLY` | Staff/tools only |
| `PUBLICATION_ELIGIBLE` | Passed gates; awaiting controlled publish task |
| `PUBLISHED` | Visible under approved copy |
| `WITHHELD` | Hidden despite eligibility |

**Trust Score boundary:** County evidence MUST NOT alter Trust Score computation, badges, or ranking in V1.

**Zero-result:** RESEARCH_ONLY / optional INTERNAL observation only. Forbidden consumer label: `COMPLAINT_FREE`.

---

## 9. Adapter contract (conceptual)

Each county adapter MUST declare:

1. `jurisdiction` (state + county identifiers)
2. `posture` (`CREDENTIAL_BASED` | `ORDINANCE_ONLY`)
3. `credential_schema` (nullable if ordinance-only)
4. `source_interfaces` (API / portal / PDF / open data / PRA)
5. `coverage_classes` per capability
6. `normalize()` → staging records with provenance
7. `qualify()` → ruleset-versioned evidence (optional if no roster)
8. `link()` → fail-closed crosswalk outputs
9. `pii_policy` (consumer PII = 0)
10. `publication_default` (`INTERNAL_ONLY` until explicit pilot task)

Adapters MUST NOT:

- Write production DB in discovery/qualification tasks
- Call Google Places for matching
- Infer dispositions/finality/compliance
- Treat LBT as mover credential
- Emit consumer “complaint-free” claims

---

## 10. Identity matching (fail closed)

- Prefer deterministic keys: credential number + normalized name + phone/address as available.
- `VERIFIED` only when ruleset criteria met; otherwise `REVIEW_REQUIRED` / `NOT_FOUND` / `CONFLICT`.
- Precision gate for VERIFIED cohorts: target ≥ 98% (Palm Beach & Miami-Dade pilots hit 100% on checked sets).
- Never attach `company_id` on weak fuzzy-only evidence.
- Multi-jurisdiction coexistence: FDACS ACTIVE and county LICENSED/Issued are distinct facts.

---

## 11. First production pilot

**Palm Beach County** is Pilot #1.

Reasons:

- CREDENTIAL_BASED with NEAR_FULL public roster (~142 active Moving Business Permits)
- C003: VERIFIED 64 @ 100% precision; CANONICAL_LINKED 46
- BIR complaints/dispositions + 44-code catalog; enforcement observations SAMPLE
- Explicit recommendation: `READY_FOR_COUNTY_PILOT_1_INTERNAL`
- Highest public accessibility vs Broward (PRA), richer complaint/disposition public path than MDC, and unlike Pinellas has a credential roster to publish carefully

Publication for Pilot #1 remains **INTERNAL_ONLY** until a later controlled publish task. FL-C009 prepares the production evidence integration **spec** only.

---

## 12. Feature waves (Palm Beach first; portable)

| Wave | Scope | Notes |
|---|---|---|
| **A — Credential** | County credential identity, status, dates, regulator, source | Core consumer-safe regulatory fact |
| **B — Identity** | County-reported name/DBA/address/phone/owner-contact enrichment | Fail-closed link to canonical company |
| **C — Complaints / dispositions** | Case observations + official disposition codes | Allegation ≠ finding; window explicit |
| **D — Enforcement** | Citations / admin actions; finality only when explicit | Enforcement ≠ final outcome |

Later optional waves (not Pilot #1 blockers): vehicles/fleet, insurance observation layers, LBT secondary, branches, ordinance-only complaint history patterns (Pinellas/Accela).

---

## 13. Stack integration posture

`SAFE_TO_INTEGRATE_COUNTY_STACK_NOW`: **NO**

Builder 1 recently merged FL-010 wave1 apply; state/publication path remains active. County stack (C001–C008) must stay isolated until:

1. State wave is stable
2. No overlapping publication work
3. `main` is clean relative to county integration plan
4. Frozen county head validators are green

**Recommended integration strategy:** Strategy 3 — clean branch from current `main` + selective transplant of county artifacts (preferred over full-stack rebase or opaque squash). See `stack-integration-runbook.md` and `stack-integration-options.json`.

---

## 14. National portability

The posture model, lifecycle, conflict types, insurance layers, adapter contract, and observation/event split are intended to port to other states’ county/local mover programs and to adjacent TrustHubs (contractor, senior care, etc.) where local licensing vs ordinance patterns recur. Florida pilots are the proving ground, not the ceiling.

---

## 15. Recommended next task

**FL-C009 — Palm Beach County Production Evidence Integration Spec V1 (design-only; no merge/no publish)**

Prepares production wiring design for Pilot #1 without integrating the whole county stack and without publishing.

---

## 16. Decision summary

1. Smallest durable model supports CREDENTIAL_BASED and ORDINANCE_ONLY.
2. Hybrid storage (Option D): reuse PSA for state only; NEW county credential + generic observations/events.
3. LBT ≠ mover authority.
4. COMPLAINT ≠ DISPOSITION; ENFORCEMENT_EVENT ≠ FINAL_OUTCOME.
5. REQUIREMENT_DOCUMENTED ≠ CURRENT_POLICY_OBSERVED ≠ COMPLIANCE_VERIFIED.
6. SCHEMA_ONLY ≠ company observation.
7. FAIL CLOSED identity matching.
8. County evidence does NOT change Trust Score in V1.
9. Lifecycle DISCOVERED→…→PUBLISHED with INTERNAL_ONLY/WITHHELD.
10. Zero-result never consumer-facing as complaint-free.
11. Stack strategy: Strategy 3 (selective transplant from clean main).
12. SAFE_TO_INTEGRATE_COUNTY_STACK_NOW = NO.
13. First production county = Palm Beach.
14. Next = FL-C009 Palm Beach Production Evidence Integration Spec V1 (design-only).
