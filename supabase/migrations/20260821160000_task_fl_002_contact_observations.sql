-- Task FL-002: source-backed contact observations + Florida regulatory identity columns.
-- INTERNAL ONLY. Does not publish companies, capabilities, sitemap, or Trust Score.
-- Does not overwrite canonical company contacts.
-- Google Places requests: 0.
-- Rollback: docs/task-fl-002-rollback.sql

BEGIN;

ALTER TABLE public.state_hhg_registry_staging
  ADD COLUMN IF NOT EXISTS regulatory_id text,
  ADD COLUMN IF NOT EXISTS candidate_class text;

CREATE INDEX IF NOT EXISTS state_hhg_registry_staging_reg_id_idx
  ON public.state_hhg_registry_staging (regulatory_id)
  WHERE regulatory_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.provider_contact_observation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text,
  state_code text,
  regulator text NOT NULL DEFAULT 'FDACS',
  regulatory_id text NOT NULL,
  observation_type text NOT NULL CHECK (observation_type IN (
    'business_email',
    'business_phone',
    'physical_address'
  )),
  raw_value text NOT NULL,
  normalized_value text,
  source text NOT NULL,
  source_record_id text,
  source_url text,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  verification_state text NOT NULL DEFAULT 'UNRESOLVED'
    CHECK (verification_state IN ('VERIFIED','REVIEW_REQUIRED','UNRESOLVED','HISTORICAL')),
  match_status text,
  match_evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  quality_class text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS provider_contact_observation_company_idx
  ON public.provider_contact_observation (company_id)
  WHERE company_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS provider_contact_observation_reg_idx
  ON public.provider_contact_observation (regulatory_id);
CREATE UNIQUE INDEX IF NOT EXISTS provider_contact_observation_unique_idx
  ON public.provider_contact_observation (regulatory_id, observation_type);

COMMENT ON TABLE public.provider_contact_observation IS
  'FL-002: official source contact observations. Never blindly overwrite companies.phone/email/physical_address.';

REVOKE ALL ON public.provider_contact_observation FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
