-- Task FL-001 DESIGN ONLY — do not apply in this task.
-- Extends Task 011B state authority without mutating public companies.
-- Google Places requests: 0.

-- Already live (011B; do not recreate):
--   public.state_hhg_ingest_run
--   public.state_hhg_registry_staging
--   public.provider_state_authority

-- Proposed additive tables for Florida and later states:

CREATE TABLE IF NOT EXISTS public.provider_state_regulatory_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text REFERENCES public.companies(id) ON DELETE SET NULL,
  state_code text NOT NULL CHECK (char_length(state_code) = 2),
  regulator text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN (
    'notice_of_noncompliance',
    'administrative_complaint',
    'fine',
    'cease_and_desist',
    'probation',
    'suspension',
    'revocation',
    'registration_denial',
    'final_order',
    'other'
  )),
  case_number text,
  event_date date,
  allegation text,
  disposition text,
  finding_is_final boolean NOT NULL DEFAULT false,
  fine_amount numeric(12,2),
  source text NOT NULL,
  source_url text,
  source_record_id text,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL')),
  raw jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.provider_state_broker_relationship (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL CHECK (char_length(state_code) = 2),
  broker_registration_id text NOT NULL,
  mover_registration_id text,
  broker_company_id text REFERENCES public.companies(id) ON DELETE SET NULL,
  mover_company_id text REFERENCES public.companies(id) ON DELETE SET NULL,
  broker_legal_name text,
  mover_legal_name text,
  relationship_type text NOT NULL DEFAULT 'contracted_or_affiliated',
  source text NOT NULL,
  source_url text,
  effective_date date,
  last_verified timestamptz,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL')),
  UNIQUE (state_code, broker_registration_id, coalesce(mover_registration_id, ''), source)
);

CREATE TABLE IF NOT EXISTS public.provider_contact_observation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text REFERENCES public.companies(id) ON DELETE SET NULL,
  state_code text,
  field text NOT NULL CHECK (field IN (
    'phone','email','website','physical_address','mailing_address',
    'owner_officer','registered_agent','dba'
  )),
  observed_value text NOT NULL,
  source text NOT NULL,
  source_record_id text,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL'))
);

-- Rules:
-- 1. Never overwrite companies.phone/email/website from these observations automatically.
-- 2. Never attach events or broker edges on name-only evidence.
-- 3. Inferred local capability remains INFERRED until a later publication task.
