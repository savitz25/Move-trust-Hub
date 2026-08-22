-- PBC-PROD-001: minimum county regulatory foundation for Palm Beach Wave A.
-- Wave A only: county_regulatory_program + provider_county_credential.
-- No complaints/enforcement/contacts. No company mutations. No PSA overload.
-- Anonymous/authenticated PostgREST read must remain DENIED.

BEGIN;

CREATE TABLE IF NOT EXISTS public.county_regulatory_program (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text NOT NULL CHECK (state_code ~ '^[A-Z]{2}$'),
  county_fips text,
  county_name text NOT NULL,
  posture text NOT NULL CHECK (posture IN ('CREDENTIAL_BASED', 'ORDINANCE_ONLY')),
  agency_name text NOT NULL,
  program_name text NOT NULL,
  credential_type text,
  ordinance_citation text,
  terminology_notes text,
  status text NOT NULL DEFAULT 'OPERATING',
  source_key text NOT NULL,
  source_url text,
  access_class text NOT NULL DEFAULT 'OFFICIAL_PUBLIC',
  data_completeness_class text,
  pii_classification text NOT NULL DEFAULT 'BUSINESS_REGULATORY_ONLY'
    CHECK (pii_classification IN ('BUSINESS_REGULATORY_ONLY', 'MAY_CONTAIN_CONSUMER_PII', 'UNKNOWN')),
  source_authority_description text,
  retrieved_at timestamptz NOT NULL,
  provenance_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (state_code, county_name, program_name),
  UNIQUE (source_key)
);

COMMENT ON TABLE public.county_regulatory_program IS
  'PBC-PROD-001: county regulator/program registry. Not public. Distinct from provider_state_authority (STATE only).';

CREATE TABLE IF NOT EXISTS public.provider_county_credential (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.county_regulatory_program(id),
  company_id text NOT NULL REFERENCES public.companies(id),
  credential_type text NOT NULL,
  credential_number text NOT NULL,
  source_status text NOT NULL,
  normalized_status text NOT NULL,
  issue_date date,
  effective_date date,
  expiration_date date,
  legal_name text,
  dba_name text,
  regulator text NOT NULL,
  source text NOT NULL,
  source_url text,
  source_record_id text,
  raw_source_key text NOT NULL,
  retrieved_at timestamptz NOT NULL,
  last_verified_at timestamptz,
  evidence_hash text,
  verification_state text NOT NULL
    CHECK (verification_state IN (
      'VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL','NOT_FOUND'
    )),
  -- Cross-source identity audit (on-row; smallest V1)
  fdacs_im text,
  match_result text
    CHECK (match_result IS NULL OR match_result IN (
      'VERIFIED','REVIEW_REQUIRED','NOT_FOUND','CONFLICT','NOT_APPLICABLE'
    )),
  match_method text,
  ruleset_version text,
  linked_at timestamptz,
  identity_qa_state text,
  identity_qualified_at timestamptz,
  canonical_class text,
  -- Lifecycle / publication (county evidence only; never flips company indexable)
  lifecycle_state text NOT NULL DEFAULT 'QUALIFIED',
  evidence_publication_state text NOT NULL DEFAULT 'INTERNAL_ONLY'
    CHECK (evidence_publication_state IN (
      'INTERNAL_ONLY','QUALIFIED','PUBLICATION_ELIGIBLE','PUBLISHED','WITHHELD'
    )),
  ingest_run_id text,
  wave_id text,
  manifest_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (program_id, credential_number, source),
  UNIQUE (raw_source_key)
);

COMMENT ON TABLE public.provider_county_credential IS
  'PBC-PROD-001: county regulatory credentials (e.g. Palm Beach MV). INTERNAL_ONLY by default. Never overload provider_state_authority. Not public.';

CREATE UNIQUE INDEX IF NOT EXISTS provider_county_credential_jurisdiction_cred_uidx
  ON public.provider_county_credential (program_id, upper(credential_number));

CREATE INDEX IF NOT EXISTS provider_county_credential_company_idx
  ON public.provider_county_credential (company_id);

CREATE INDEX IF NOT EXISTS provider_county_credential_wave_idx
  ON public.provider_county_credential (wave_id)
  WHERE wave_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS provider_county_credential_evidence_state_idx
  ON public.provider_county_credential (evidence_publication_state);

-- Hard deny public/authenticated PostgREST access (service_role bypasses RLS).
ALTER TABLE public.county_regulatory_program ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_county_credential ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.county_regulatory_program FROM anon, authenticated;
REVOKE ALL ON public.provider_county_credential FROM anon, authenticated;

-- No permissive SELECT policies for anon/authenticated.
DROP POLICY IF EXISTS county_regulatory_program_deny_all ON public.county_regulatory_program;
DROP POLICY IF EXISTS provider_county_credential_deny_all ON public.provider_county_credential;

NOTIFY pgrst, 'reload schema';
COMMIT;
