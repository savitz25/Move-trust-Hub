# County Regulatory Schema Sketch (Design-Only)

**Task:** FL-C008  
**Status:** Conceptual ERD / table sketch. **No migrations. Do not apply.**  
**Storage recommendation:** Option D hybrid — reuse state PSA + companies; **NEW** county credential + generic observation/event tables.

---

## Reuse audit (summary)

| Concept | Decision | Notes |
|---|---|---|
| `companies` | `REUSE_EXISTING` | Canonical identity target for fail-closed links |
| `provider_state_authority` | `REUSE_EXISTING` | **State** authority only — county credentials MUST NOT overload |
| `state_hhg_registry_staging` / ingest runs | `REUSE_EXISTING` | State track |
| County mover credential | `NEW_CONCEPT_REQUIRED` | e.g. conceptual `provider_county_credential` |
| County/ordinance program posture | `NEW_CONCEPT_REQUIRED` | e.g. `county_regulatory_program` |
| Generic regulatory observations/events | `NEW_CONCEPT_REQUIRED` | complaints, dispositions, enforcement, insurance obs, contacts |
| Cross-source link evidence | `NEW_CONCEPT_REQUIRED` | versioned reconciliation objects |
| Publication eligibility | `EXTEND_EXISTING` (future) | Do not touch Builder 1 paths in V1 design work |
| Trust Score tables/libs | **out of scope** | County evidence must not write Trust Score |

Full machine-readable audit: `data/county-regulatory/fl/architecture/c008/production-schema-reuse-audit.json`.

---

## Conceptual ERD

```
companies
   ^
   | company_id (nullable until LINKED)
   |
provider_state_authority  <--- STATE ONLY (existing)
   |
   +---- cross_source_link_evidence ----+
                                        |
county_regulatory_program  <--- posture CREDENTIAL_BASED | ORDINANCE_ONLY
   |
   +-- provider_county_credential (nullable rows for ORDINANCE_ONLY)
   |
   +-- county_regulatory_observation  (polymorphic/generic)
         |-- identity / owner_officer / contact
         |-- lbt_secondary
         |-- branch
         |-- vehicle
         |-- insurance (layered states)
         |-- complaint
         |-- disposition
         |-- enforcement_event
         |-- final_outcome
         |-- zero_result (INTERNAL / RESEARCH_ONLY)
```

Optional future: split observation subtypes into dedicated tables once volume justifies; V1 design allows one generic observation table **or** a small family (`county_complaint_observation`, `county_enforcement_event`, …) sharing provenance columns.

---

## Sketch: `county_regulatory_program`

```text
id
state_code                  -- e.g. FL
county_fips / county_name
posture                     -- CREDENTIAL_BASED | ORDINANCE_ONLY
agency_name
ordinance_citation
terminology_notes           -- e.g. Monitoring vs Licensing
status                      -- OPERATING | ...
source / source_url
retrieved_at
verification_state
```

## Sketch: `provider_county_credential`

```text
id
program_id                  -- FK county_regulatory_program
company_id                  -- nullable until fail-closed link
credential_type             -- moving_business_permit | mover_registration | moving_license | ...
credential_number           -- MV####, MR-#####, ...
status                      -- LICENSED | Issued | EXPIRED | ...
issue_date / expiration_date
legal_name / dba_name
regulator
source / source_url / source_record_id / raw_source_key
retrieved_at / last_verified_at
evidence_hash
verification_state          -- VERIFIED | REVIEW_REQUIRED | UNRESOLVED | HISTORICAL
match_method / match_confidence / review_reason
lifecycle_state             -- DISCOVERED..PUBLISHED / INTERNAL_ONLY / WITHHELD
publication_state           -- INTERNAL_ONLY | PUBLICATION_ELIGIBLE | PUBLISHED | WITHHELD
```

**Constraint intent:** uniqueness on (program_id, credential_number, source) or equivalent; company uniqueness only when `company_id IS NOT NULL`.

## Sketch: `county_regulatory_observation` (generic)

```text
id
program_id
credential_id               -- nullable (ordinance-only / unmatched)
company_id                  -- nullable
observation_class           -- IDENTITY | OWNER_OFFICER | LBT | BRANCH | VEHICLE |
                            -- INSURANCE | COMPLAINT | DISPOSITION | ENFORCEMENT |
                            -- FINAL_OUTCOME | ZERO_RESULT | OTHER
observation_subclass        -- free/check constrained per class
subject_ref                 -- case id, VIN, LBT account, etc.
payload jsonb               -- class-specific fields
effective_window_start/end  -- e.g. complaint history window
coverage_class              -- NEAR_FULL | SAMPLE | PRA_REQUIRED | SCHEMA_ONLY | ...
insurance_layer             -- null OR REQUIREMENT_DOCUMENTED | CURRENT_POLICY_OBSERVED | COMPLIANCE_VERIFIED
is_final                    -- explicit finality only; default false
misconduct_inference        -- FORBIDDEN for complaints unless separate verified finding model exists
source / source_url / source_record_id
retrieved_at
verification_state
lifecycle_state / publication_state
consumer_pii                -- must be false / absent in committed rows
```

## Sketch: `county_cross_source_link`

```text
id
ruleset_version
left_system / left_record_key
right_system / right_record_key   -- e.g. FDACS IM, companies.id, LBT account
link_class                      -- CREDENTIAL_TO_STATE | CREDENTIAL_TO_COMPANY | CREDENTIAL_TO_LBT | ...
match_result                    -- VERIFIED | REVIEW_REQUIRED | NOT_FOUND | CONFLICT | NOT_APPLICABLE
canonical_class                 -- CANONICAL_LINKED | STATE_RECORD_ONLY | COUNTY_ONLY_REVIEW | ...
precision_gate_meta jsonb
evidence_hash
retrieved_at
immutable bool                  -- versioned evidence packages prefer immutable rows
```

---

## Explicit non-overloads

- Do **not** insert county MV/MR credentials into `provider_state_authority`.
- Do **not** store LBT accounts as mover credentials.
- Do **not** store SCHEMA_ONLY application field definitions as per-company observations without `coverage_class = SCHEMA_ONLY` and zero company claim.
- Do **not** add Trust Score foreign keys from these tables in V1.

---

## Mapping from four pilots

| Pilot | Primary new rows |
|---|---|
| Palm Beach | program + credentials (MV) + identity + complaint/disposition/enforcement SAMPLE + links |
| Broward | program + credential **schema** + vehicle schema; roster observations PRA-gated (0 public rows today) |
| Miami-Dade | program + credentials (MR) + LBT secondary + links; insurance REQUIREMENT_DOCUMENTED |
| Pinellas | program ORDINANCE_ONLY; complaint SAMPLE + zero-result RESEARCH_ONLY; credential table empty |

---

## Migration policy

FL-C008 / FL-C009 (recommended): **design-only**. Production DDL is a later gated task after stack integration strategy executes and Pilot #1 internal wiring is approved.
