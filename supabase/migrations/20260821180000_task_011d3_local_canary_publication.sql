-- Task 011D.3: local HHG canary publication membership (manifest-bound).
-- Does not auto-publish. Publication script writes rows intentionally.
-- Google Places requests: 0.
-- Rollback: docs/task-011d3-rollback.sql

BEGIN;

CREATE TABLE IF NOT EXISTS public.local_hhg_canary_publication (
  wave_id text NOT NULL,
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  state_code text NOT NULL CHECK (char_length(state_code) = 2),
  slug text NOT NULL,
  home_county_fips text NOT NULL,
  authority_number text,
  selected_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  status text NOT NULL DEFAULT 'prepared'
    CHECK (status IN ('prepared', 'published', 'unpublished')),
  source text NOT NULL DEFAULT 'task_011d2b_manifest',
  PRIMARY KEY (wave_id, company_id)
);

CREATE INDEX IF NOT EXISTS local_hhg_canary_publication_status_idx
  ON public.local_hhg_canary_publication (wave_id, status);

CREATE INDEX IF NOT EXISTS local_hhg_canary_publication_county_idx
  ON public.local_hhg_canary_publication (state_code, home_county_fips)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS local_hhg_canary_publication_company_idx
  ON public.local_hhg_canary_publication (company_id);

COMMENT ON TABLE public.local_hhg_canary_publication IS
  'Task 011D.3: exact local canary wave membership. Consumer discovery must require status=published + companies.PUBLISHABLE + discovery evidence consumer_eligible.';

REVOKE ALL ON public.local_hhg_canary_publication FROM anon, authenticated;

-- Bounded SQL discovery for published canary only (no radius / adjacency).
CREATE OR REPLACE FUNCTION public.local_canary_movers_for_county(
  p_state_code text,
  p_county_fips text,
  p_limit integer DEFAULT 24
)
RETURNS TABLE (
  company_id text,
  slug text,
  name text,
  authority_number text,
  regulator text,
  home_county_fips text,
  home_county_name text,
  phone text,
  publication_state text,
  indexable boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id,
    c.slug,
    c.name,
    w.authority_number,
    psa.regulator,
    e.county_fips,
    e.county_name,
    c.phone,
    c.publication_state,
    c.indexable
  FROM public.local_hhg_canary_publication w
  JOIN public.companies c ON c.id = w.company_id
  JOIN public.provider_local_discovery_evidence e
    ON e.company_id = c.id
   AND e.basis = 'VERIFIED_HOME_COUNTY'
   AND e.county_fips = p_county_fips
   AND e.consumer_eligible = true
  JOIN public.provider_state_authority psa
    ON psa.company_id = c.id
   AND psa.state_code = upper(p_state_code)
   AND psa.verification_state = 'VERIFIED'
   AND psa.status = 'active'
  WHERE w.wave_id = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1'
    AND w.status = 'published'
    AND w.state_code = upper(p_state_code)
    AND w.home_county_fips = p_county_fips
    AND c.publication_state = 'PUBLISHABLE'
    AND c.indexable = false
    AND c.service_scope = 'intrastate'
  ORDER BY c.name ASC, c.id ASC
  LIMIT GREATEST(1, LEAST(COALESCE(p_limit, 24), 50));
$$;

REVOKE ALL ON FUNCTION public.local_canary_movers_for_county(text, text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.local_canary_movers_for_county(text, text, integer) TO anon, authenticated, service_role;

COMMENT ON FUNCTION public.local_canary_movers_for_county(text, text, integer) IS
  'Task 011D.3: SQL-gated canary home-county discovery. Manifest wave only.';

NOTIFY pgrst, 'reload schema';
COMMIT;
