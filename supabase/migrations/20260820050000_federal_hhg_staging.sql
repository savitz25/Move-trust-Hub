-- Task 003: fail-closed federal HHG staging. Additive. Does not insert public.companies.
BEGIN;

CREATE TABLE IF NOT EXISTS public.federal_hhg_staging_run (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  source_updated_at timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  records_read integer NOT NULL DEFAULT 0,
  inserted integer NOT NULL DEFAULT 0,
  updated integer NOT NULL DEFAULT 0,
  unchanged integer NOT NULL DEFAULT 0,
  rejected integer NOT NULL DEFAULT 0,
  failed integer NOT NULL DEFAULT 0,
  google_places_requests integer NOT NULL DEFAULT 0,
  notes text
);

CREATE TABLE IF NOT EXISTS public.federal_hhg_staging (
  usdot text PRIMARY KEY,
  mc text,
  legal_name text,
  dba_name text,
  phy_city text,
  phy_state text,
  phone text,
  classification text NOT NULL,
  disposition text NOT NULL,
  hhg_chk text,
  common_stat text,
  contract_stat text,
  broker_stat text,
  property_chk text,
  hhg_carrier_verified boolean NOT NULL DEFAULT false,
  hhg_broker_verified boolean NOT NULL DEFAULT false,
  matched_company_id text,
  match_reason text,
  source text NOT NULL,
  source_dockets text[] NOT NULL DEFAULT '{}',
  retrieved_at timestamptz NOT NULL,
  run_id uuid REFERENCES public.federal_hhg_staging_run(id),
  raw jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (classification IN (
    'HHG_CARRIER', 'HHG_BROKER', 'HHG_CARRIER_BROKER',
    'NOT_HHG', 'INACTIVE', 'REVIEW_REQUIRED'
  )),
  CHECK (disposition IN (
    'MATCHED_EXISTING', 'NEW_CANONICAL_CANDIDATE',
    'IDENTITY_REVIEW_REQUIRED', 'INACTIVE', 'NOT_HHG', 'REJECTED'
  ))
);

CREATE INDEX IF NOT EXISTS federal_hhg_staging_class_idx
  ON public.federal_hhg_staging (classification, disposition);
CREATE INDEX IF NOT EXISTS federal_hhg_staging_state_idx
  ON public.federal_hhg_staging (phy_state);
CREATE INDEX IF NOT EXISTS federal_hhg_staging_match_idx
  ON public.federal_hhg_staging (matched_company_id);

REVOKE ALL ON public.federal_hhg_staging FROM anon, authenticated;
REVOKE ALL ON public.federal_hhg_staging_run FROM anon, authenticated;

COMMENT ON TABLE public.federal_hhg_staging IS
  'Task 003 fail-closed federal HHG candidates. Not public, not indexable, not sitemap.';

NOTIFY pgrst, 'reload schema';
COMMIT;
