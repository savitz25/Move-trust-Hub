# Palm Beach V1 — Storage & Schema Spec (Design-Only)

**Task:** FL-C009  
**Storage recommendation:** Option D hybrid  
**Executable migrations:** **0** — sketches below are NON-EXECUTABLE and MUST NOT be placed under `supabase/migrations`.

---

## 1. Principles

- Reuse `companies` as canonical identity target (fail-closed `company_id`).
- Reuse `provider_state_authority` for **STATE** HHG only — **psa_overload_forbidden = true**.
- NEW county program + credential concepts.
- Prefer smallest cross-source link footprint: verified link fields **on** `provider_county_credential`; separate link table OPTIONAL V1.
- EXTEND/REUSE `provider_contact_observation` for Wave B county contacts (source provenance); never overwrite `companies.*`.
- Complaints and dispositions are separate storage contracts.
- Enforcement events carry explicit finality; separate final-outcome table not required for V1.

---

## 2. Conceptual ERD

```
companies  <--- company_id (nullable until LINKED)
   ^
provider_state_authority     -- STATE ONLY (existing)

county_regulatory_program    -- NEW (PBC Moving Business Permit program)
   |
   +-- provider_county_credential   -- NEW (MV####)
   |      includes optional verified link fields (FDACS IM, company_id, ruleset, method, linked_at)
   |
   +-- regulatory_disposition_code  -- NEW reference (PBC 44-code catalog)
   |
   +-- county_complaint_observation -- NEW (Wave C)
   +-- county_disposition_observation -- NEW (Wave C)
   +-- county_enforcement_event     -- NEW (Wave D; finality enum on row)

provider_contact_observation -- EXTEND/REUSE (Wave B; county regulator/source)
```

Optional V1:

```
county_cross_source_link     -- OPTIONAL if link history/versioning outgrows credential columns
```

---

## 3. NON-EXECUTABLE SQL sketches

> **WARNING:** Design sketches only. Do not apply. Do not copy into `supabase/migrations` in FL-C009 or PBC-PROD-001 without a later gated migration task.

### 3.1 `county_regulatory_program`

```sql
-- DESIGN SKETCH ONLY — NOT A MIGRATION
CREATE TABLE public.county_regulatory_program (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL CHECK (state_code ~ '^[A-Z]{2}$'),
  county_fips text,
  county_name text NOT NULL,
  posture text NOT NULL CHECK (posture IN ('CREDENTIAL_BASED', 'ORDINANCE_ONLY')),
  agency_name text NOT NULL,
  program_name text NOT NULL,
  credential_type text,                 -- nullable if ORDINANCE_ONLY
  ordinance_citation text,
  terminology_notes text,
  status text NOT NULL DEFAULT 'OPERATING',
  source text NOT NULL,
  source_url text,
  retrieved_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (state_code, county_name, program_name)
);
```

Palm Beach seed intent (not applied):

- `state_code = 'FL'`, `county_name = 'Palm Beach'`, `posture = 'CREDENTIAL_BASED'`
- `program_name = 'Moving Business Permit'`, `credential_type = 'moving_business_permit'`
- Agency: Palm Beach County Consumer Affairs / licensing as documented in C002/C003

### 3.2 `provider_county_credential`

```sql
-- DESIGN SKETCH ONLY — NOT A MIGRATION
CREATE TABLE public.provider_county_credential (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.county_regulatory_program(id),
  company_id text,                      -- nullable until fail-closed link
  credential_type text NOT NULL,        -- moving_business_permit
  credential_number text NOT NULL,      -- MV####
  status text NOT NULL,                 -- LICENSED | EXPIRED | ...
  issue_date date,
  expiration_date date,
  legal_name text,
  dba_name text,
  regulator text NOT NULL,
  source text NOT NULL,
  source_url text,
  source_record_id text,
  raw_source_key text,
  retrieved_at timestamptz NOT NULL,
  last_verified_at timestamptz,
  evidence_hash text,
  verification_state text NOT NULL
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL','NOT_FOUND')),
  -- Cross-source link fields (prefer on-row; smallest V1)
  fdacs_im text,
  match_result text
    CHECK (match_result IS NULL OR match_result IN (
      'VERIFIED','REVIEW_REQUIRED','NOT_FOUND','CONFLICT','NOT_APPLICABLE')),
  match_method text,
  ruleset_version text,
  linked_at timestamptz,
  canonical_class text,
  -- Lifecycle / publication
  lifecycle_state text NOT NULL DEFAULT 'QUALIFIED',
  evidence_publication_state text NOT NULL DEFAULT 'INTERNAL_ONLY'
    CHECK (evidence_publication_state IN (
      'INTERNAL_ONLY','QUALIFIED','PUBLICATION_ELIGIBLE','PUBLISHED','WITHHELD')),
  ingest_run_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (program_id, credential_number, source)
);

CREATE INDEX provider_county_credential_company_idx
  ON public.provider_county_credential (company_id)
  WHERE company_id IS NOT NULL;
```

**Wave A rule:** For PRODUCTION_LINK_READY (46), set `company_id` from cohort freeze, `evidence_publication_state = 'INTERNAL_ONLY'`, do not publish.

### 3.3 Optional `county_cross_source_link`

```sql
-- OPTIONAL V1 — only if versioned link history needed beyond credential columns
CREATE TABLE public.county_cross_source_link (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id uuid REFERENCES public.provider_county_credential(id),
  ruleset_version text NOT NULL,
  left_system text NOT NULL,
  left_record_key text NOT NULL,
  right_system text NOT NULL,
  right_record_key text NOT NULL,
  link_class text NOT NULL,
  match_result text NOT NULL,
  canonical_class text,
  match_method text,
  evidence_hash text,
  retrieved_at timestamptz NOT NULL,
  immutable bool NOT NULL DEFAULT true
);
```

### 3.4 Contact observation EXTEND (Wave B)

Existing `provider_contact_observation` uniqueness is `(regulatory_id, observation_type)` with FDACS-oriented `regulatory_id`. County reuse requires a **design extension**, not silent overwrite of FDACS rows:

Recommended V1 approach (choose one in later migration task; document both):

**Preferred:** broaden uniqueness to `(regulator, regulatory_id, observation_type)` and allow `regulator = 'PBC_CONSUMER_AFFAIRS'` (or equivalent) with `regulatory_id = 'MV####'`.

**Alternative:** add nullable `jurisdiction_scope` / `source_system` and a new unique index that includes it.

Hard rules:

- Never write `companies.email` / `companies.phone` / `companies.physical_address` from county observations.
- Preserve FDACS rows; county observations are additional provenance.

### 3.5 `regulatory_disposition_code` (reference)

```sql
-- DESIGN SKETCH ONLY — NOT A MIGRATION
CREATE TABLE public.regulatory_disposition_code (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES public.county_regulatory_program(id),
  jurisdiction text NOT NULL,           -- e.g. FL_PBC
  code text NOT NULL,
  description text,
  code_group text,
  source text NOT NULL,
  retrieved_at timestamptz NOT NULL,
  UNIQUE (jurisdiction, code)
);
```

Seed from C003 `disposition-catalog-with-groups.json` (44 codes) — reference data, not consumer claims.

### 3.6 Complaints & dispositions (separate)

```sql
-- DESIGN SKETCH ONLY — NOT A MIGRATION
CREATE TABLE public.county_complaint_observation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.county_regulatory_program(id),
  credential_id uuid REFERENCES public.provider_county_credential(id),
  company_id text,
  case_or_subject_ref text,
  allegation_summary text,              -- business-level; no consumer PII
  observed_at date,
  window_start date,
  window_end date,
  coverage_class text NOT NULL DEFAULT 'SAMPLE',
  source text NOT NULL,
  source_url text,
  source_record_id text,
  retrieved_at timestamptz NOT NULL,
  verification_state text NOT NULL DEFAULT 'UNRESOLVED',
  evidence_publication_state text NOT NULL DEFAULT 'INTERNAL_ONLY',
  misconduct_inference_forbidden bool NOT NULL DEFAULT true,
  consumer_pii bool NOT NULL DEFAULT false CHECK (consumer_pii = false),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.county_disposition_observation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.county_regulatory_program(id),
  complaint_id uuid REFERENCES public.county_complaint_observation(id),
  credential_id uuid REFERENCES public.provider_county_credential(id),
  company_id text,
  disposition_code text,
  disposition_description text,
  disposition_code_id uuid REFERENCES public.regulatory_disposition_code(id),
  observed_at date,
  source text NOT NULL,
  source_url text,
  source_record_id text,
  retrieved_at timestamptz NOT NULL,
  verification_state text NOT NULL DEFAULT 'UNRESOLVED',
  evidence_publication_state text NOT NULL DEFAULT 'INTERNAL_ONLY',
  consumer_pii bool NOT NULL DEFAULT false CHECK (consumer_pii = false),
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### 3.7 Enforcement events (finality on row)

```sql
-- DESIGN SKETCH ONLY — NOT A MIGRATION
CREATE TABLE public.county_enforcement_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.county_regulatory_program(id),
  credential_id uuid REFERENCES public.provider_county_credential(id),
  company_id text,
  event_key text NOT NULL,
  event_type text NOT NULL,             -- CITATION | NOV | HEARING | ADMIN_ACTION | ...
  event_date date,
  ordinance_or_section text,
  case_ref text,
  coverage_class text NOT NULL DEFAULT 'SAMPLE',
  finality_state text NOT NULL DEFAULT 'UNKNOWN'
    CHECK (finality_state IN (
      'UNKNOWN','NON_FINAL','FINAL_EXPLICIT','VACATED_EXPLICIT')),
  is_final bool NOT NULL DEFAULT false, -- true only when FINAL_EXPLICIT
  source text NOT NULL,
  source_url text,
  source_record_id text,
  retrieved_at timestamptz NOT NULL,
  verification_state text NOT NULL DEFAULT 'UNRESOLVED',
  evidence_publication_state text NOT NULL DEFAULT 'INTERNAL_ONLY',
  consumer_pii bool NOT NULL DEFAULT false CHECK (consumer_pii = false),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (program_id, event_key)
);
```

No separate `county_final_outcome` table required for V1 when `finality_state` is explicit.

---

## 4. Owner / officer & fleet

| Concept | V1 decision |
|---|---|
| Owner/officer observation | `V1_OPTIONAL` — Wave B+ or FUTURE; **not Wave A** |
| Fleet size from roster | Optional Wave B label: “county-reported fleet total”; **not** verified VIN inventory (`FUTURE` for VIN/tag/GVW tables) |

---

## 5. Explicit non-overloads

- Do **not** insert MV credentials into `provider_state_authority`.
- Do **not** store LBT as mover credentials.
- Do **not** add Trust Score FKs from county tables in V1.
- Do **not** place these sketches under `supabase/migrations` in this task.

---

## 6. Related machine-readable specs

- `data/county-regulatory/fl/architecture/c009/production-storage-decision.json`
- `credential-storage-spec.json`
- `complaint-storage-spec.json`
- `disposition-storage-spec.json`
- `enforcement-storage-spec.json`
- `cross-source-link-decision.json`
- `migration-specification.json`
