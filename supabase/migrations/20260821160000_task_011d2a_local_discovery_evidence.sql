-- Task 011D.2A: internal provider local discovery evidence (home county / explicit positives).
-- Does NOT publish companies, capabilities to consumers, counties, or sitemap rows.
-- Google Places requests: 0.
-- Rollback: docs/task-011d2a-rollback.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.provider_local_discovery_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  state_code text NOT NULL CHECK (char_length(state_code) = 2),
  county_fips text NOT NULL CHECK (char_length(county_fips) = 5),
  county_name text,
  basis text NOT NULL CHECK (basis IN (
    'VERIFIED_HOME_COUNTY',
    'EXPLICIT_SERVICE_AREA',
    'REGULATOR_TERRITORY',
    'CURATED_VERIFIED',
    'DERIVED_EXPERIMENTAL',
    'PROVIDER_EXPLICIT'
  )),
  evidence_source text NOT NULL,
  source_url text,
  observed_at timestamptz NOT NULL DEFAULT now(),
  confidence text NOT NULL DEFAULT 'HIGH'
    CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW')),
  verification_state text NOT NULL DEFAULT 'VERIFIED'
    CHECK (verification_state IN ('VERIFIED', 'REVIEW_REQUIRED', 'UNRESOLVED', 'HISTORICAL')),
  consumer_eligible boolean NOT NULL DEFAULT false,
  address_provenance text,
  notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  task_tag text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- One row per company/county/basis (positive-only; no negative edges).
CREATE UNIQUE INDEX IF NOT EXISTS provider_local_discovery_evidence_uniq
  ON public.provider_local_discovery_evidence (company_id, county_fips, basis);

CREATE INDEX IF NOT EXISTS provider_local_discovery_evidence_state_county_idx
  ON public.provider_local_discovery_evidence (state_code, county_fips)
  WHERE consumer_eligible = true;

CREATE INDEX IF NOT EXISTS provider_local_discovery_evidence_company_idx
  ON public.provider_local_discovery_evidence (company_id);

CREATE INDEX IF NOT EXISTS provider_local_discovery_evidence_task_idx
  ON public.provider_local_discovery_evidence (task_tag)
  WHERE task_tag IS NOT NULL;

COMMENT ON TABLE public.provider_local_discovery_evidence IS
  'Task 011D: internal positive-only local discovery evidence. consumer_eligible=false until publication gate opens. No radius/adjacency edges.';

COMMENT ON COLUMN public.provider_local_discovery_evidence.basis IS
  'VERIFIED_HOME_COUNTY = based/registered here (not a service guarantee). EXPLICIT/REGULATOR/CURATED = positive service evidence.';

COMMENT ON COLUMN public.provider_local_discovery_evidence.consumer_eligible IS
  '011D.2A keeps false. Future canary/publication may flip only after product gate.';

REVOKE ALL ON public.provider_local_discovery_evidence FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
