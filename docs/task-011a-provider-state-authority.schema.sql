-- Task 011A DESIGN ONLY — do NOT apply in Task 011A.
-- Additive state authority table for future 011B+ adapters.
-- Does not mutate companies, waves, or capabilities by itself.

-- BEGIN DESIGN

CREATE TABLE IF NOT EXISTS public.provider_state_authority (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
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
  dba text,
  regulator text NOT NULL,
  source text NOT NULL,
  source_url text,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  evidence_hash text,
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS provider_state_authority_identity_idx
  ON public.provider_state_authority (
    company_id,
    state_code,
    authority_type,
    COALESCE(authority_number, '')
  );

CREATE INDEX IF NOT EXISTS provider_state_authority_state_status_idx
  ON public.provider_state_authority (state_code, status, verification_state);

COMMENT ON TABLE public.provider_state_authority IS
  'Task 011A design: verified state HHG/local authorities. Inferred rows must never be VERIFIED.';

-- Optional future county coverage edges (DERIVED vs VERIFIED). Not created in 011A.
-- CREATE TABLE public.provider_county_coverage (...);

-- END DESIGN
