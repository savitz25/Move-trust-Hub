-- Task 011B: additive state HHG registry staging + canonical provider_state_authority.
-- INTERNAL ONLY. Does not publish companies, capabilities, counties, or sitemap rows.
-- Google Places requests: 0.
-- Rollback: docs/task-011b-rollback.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.state_hhg_ingest_run (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL CHECK (char_length(state_code) BETWEEN 2 AND 2),
  source text NOT NULL,
  source_url text,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  records_read integer NOT NULL DEFAULT 0,
  inserted integer NOT NULL DEFAULT 0,
  updated integer NOT NULL DEFAULT 0,
  unchanged integer NOT NULL DEFAULT 0,
  matched_existing integer NOT NULL DEFAULT 0,
  new_provider_candidate integer NOT NULL DEFAULT 0,
  review_required integer NOT NULL DEFAULT 0,
  historical integer NOT NULL DEFAULT 0,
  out_of_scope integer NOT NULL DEFAULT 0,
  google_places_requests integer NOT NULL DEFAULT 0 CHECK (google_places_requests = 0),
  notes text
);

COMMENT ON TABLE public.state_hhg_ingest_run IS
  'Task 011B: state registry ingest runs. Internal staging only.';

CREATE TABLE IF NOT EXISTS public.state_hhg_registry_staging (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL CHECK (char_length(state_code) BETWEEN 2 AND 2),
  source text NOT NULL,
  source_record_id text NOT NULL,
  raw_source_key text NOT NULL,
  authority_number text,
  authority_type text NOT NULL,
  role_class text NOT NULL DEFAULT 'other'
    CHECK (role_class IN ('mover','broker','warehouse','other')),
  status_raw text,
  status_normalized text NOT NULL DEFAULT 'unknown'
    CHECK (status_normalized IN ('active','inactive','expired','suspended','revoked','unknown')),
  issue_date date,
  expiration_date date,
  legal_name_raw text,
  legal_name_norm text,
  dba_raw text,
  dba_norm text,
  usdot_raw text,
  usdot_norm text,
  phone_raw text,
  phone_norm text,
  email_raw text,
  email_norm text,
  website_raw text,
  physical_address_raw text,
  physical_address_norm text,
  mailing_address_raw text,
  mailing_address_norm text,
  city_norm text,
  postal_code_norm text,
  county_raw text,
  ubi text,
  permit_number text,
  insurance_raw jsonb,
  bond_raw jsonb,
  complaints_raw jsonb,
  enforcement_raw jsonb,
  broker_relationships jsonb,
  source_url text,
  source_retrieved_at timestamptz NOT NULL,
  evidence_hash text NOT NULL,
  disposition text NOT NULL DEFAULT 'REVIEW_REQUIRED'
    CHECK (disposition IN (
      'MATCHED_EXISTING',
      'NEW_PROVIDER_CANDIDATE',
      'REVIEW_REQUIRED',
      'HISTORICAL',
      'OUT_OF_SCOPE'
    )),
  matched_company_id text,
  match_method text,
  match_confidence numeric(5,4),
  match_evidence jsonb,
  review_reason text,
  run_id uuid REFERENCES public.state_hhg_ingest_run(id),
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (state_code, raw_source_key)
);

CREATE INDEX IF NOT EXISTS state_hhg_registry_staging_state_disp_idx
  ON public.state_hhg_registry_staging (state_code, disposition, status_normalized);
CREATE INDEX IF NOT EXISTS state_hhg_registry_staging_usdot_idx
  ON public.state_hhg_registry_staging (usdot_norm)
  WHERE usdot_norm IS NOT NULL;
CREATE INDEX IF NOT EXISTS state_hhg_registry_staging_auth_idx
  ON public.state_hhg_registry_staging (state_code, authority_number);
CREATE INDEX IF NOT EXISTS state_hhg_registry_staging_match_idx
  ON public.state_hhg_registry_staging (matched_company_id);

COMMENT ON TABLE public.state_hhg_registry_staging IS
  'Task 011B: immutable-ish official state registry observations. Not public. Not companies.';

-- Canonical additive authority layer. company_id nullable until identity is resolved.
CREATE TABLE IF NOT EXISTS public.provider_state_authority (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text REFERENCES public.companies(id) ON DELETE SET NULL,
  state_code text NOT NULL CHECK (char_length(state_code) BETWEEN 2 AND 2),
  authority_type text NOT NULL CHECK (authority_type IN (
    'intrastate_hhg_carrier',
    'intrastate_hhg_broker',
    'intrastate_mover_registration',
    'intrastate_certificate',
    'local_mover_license',
    'warehouse',
    'other'
  )),
  authority_number text,
  status text NOT NULL DEFAULT 'unknown'
    CHECK (status IN ('active','inactive','expired','suspended','revoked','unknown')),
  issue_date date,
  expiration_date date,
  legal_name text,
  dba_name text,
  regulator text NOT NULL,
  source text NOT NULL,
  source_url text,
  source_record_id text,
  raw_source_key text NOT NULL,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  last_verified_at timestamptz,
  evidence_hash text,
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL')),
  matched_company_id text,
  match_method text,
  match_confidence numeric(5,4),
  review_reason text,
  staging_id uuid REFERENCES public.state_hhg_registry_staging(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS provider_state_authority_source_key_idx
  ON public.provider_state_authority (state_code, raw_source_key);

-- Only enforce company+authority uniqueness once identity is attached.
-- Unmatched/new-candidate rows share null company_id and must not collide.
CREATE UNIQUE INDEX IF NOT EXISTS provider_state_authority_company_auth_partial_idx
  ON public.provider_state_authority (
    company_id,
    state_code,
    authority_type,
    COALESCE(authority_number, '')
  )
  WHERE company_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS provider_state_authority_state_status_idx
  ON public.provider_state_authority (state_code, status, verification_state);

CREATE INDEX IF NOT EXISTS provider_state_authority_company_idx
  ON public.provider_state_authority (company_id)
  WHERE company_id IS NOT NULL;

COMMENT ON TABLE public.provider_state_authority IS
  'Task 011B: canonical state authority records. Inferred authority must never be VERIFIED. No public capability promotion.';

REVOKE ALL ON public.state_hhg_ingest_run FROM anon, authenticated;
REVOKE ALL ON public.state_hhg_registry_staging FROM anon, authenticated;
REVOKE ALL ON public.provider_state_authority FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
