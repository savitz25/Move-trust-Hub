-- Task 009A.1: DB-backed directory query engine (additive only).
-- Indexes + read-only SECURITY INVOKER RPC for bounded page queries.
-- Does NOT change publication_state, identities, or public defaults.
-- Rollback: DROP FUNCTION public.directory_query_page; drop indexes listed below.

BEGIN;

-- Exact regulatory lookup
CREATE INDEX IF NOT EXISTS idx_companies_usdot_number
  ON public.companies (usdot_number)
  WHERE usdot_number IS NOT NULL AND btrim(usdot_number) <> '';

CREATE INDEX IF NOT EXISTS idx_companies_mc_number
  ON public.companies (mc_number)
  WHERE mc_number IS NOT NULL AND btrim(mc_number) <> '';

-- Publication visibility gate (fail-closed allowlist)
CREATE INDEX IF NOT EXISTS idx_companies_publication_state
  ON public.companies (publication_state);

-- Default interstate browse
CREATE INDEX IF NOT EXISTS idx_companies_scope_reputation
  ON public.companies (service_scope, reputation_score DESC, id ASC);

-- Sort helpers
CREATE INDEX IF NOT EXISTS idx_companies_avg_price
  ON public.companies (avg_price_per_move)
  WHERE avg_price_per_move IS NOT NULL AND avg_price_per_move > 0;

CREATE INDEX IF NOT EXISTS idx_companies_years
  ON public.companies (years_in_business DESC NULLS LAST, id ASC);

-- Name search (prefix / equality). Trigram optional later after measurement.
CREATE INDEX IF NOT EXISTS idx_companies_name_lower
  ON public.companies (lower(name));

CREATE INDEX IF NOT EXISTS idx_companies_legal_name_lower
  ON public.companies (lower(fmcsa_legal_name))
  WHERE fmcsa_legal_name IS NOT NULL AND btrim(fmcsa_legal_name) <> '';

CREATE INDEX IF NOT EXISTS idx_provider_capability_cap_company
  ON public.provider_capability (capability, company_id);

COMMENT ON INDEX public.idx_companies_publication_state IS
  'Task 009A.1: speed fail-closed consumer visibility filters';
COMMENT ON INDEX public.idx_companies_scope_reputation IS
  'Task 009A.1: default interstate directory browse order';

-- ---------------------------------------------------------------------------
-- directory_query_page — bounded ID page + exact total
-- SECURITY INVOKER: respects caller RLS; returns only public.companies ids.
-- Does not expose emails, claim data, identity queues, or admin tables.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.directory_query_page(
  p_offset integer DEFAULT 0,
  p_limit integer DEFAULT 24,
  p_search text DEFAULT NULL,
  p_sort text DEFAULT 'reputation',
  p_min_rating numeric DEFAULT NULL,
  p_max_price numeric DEFAULT NULL,
  p_exclude_local boolean DEFAULT true,
  p_only_full_service boolean DEFAULT false,
  p_only_verified boolean DEFAULT false,
  p_bbb_min text DEFAULT NULL,
  p_role text DEFAULT NULL,
  p_state text DEFAULT NULL,
  p_usdot text DEFAULT NULL,
  p_mc text DEFAULT NULL,
  p_candidate_limit integer DEFAULT 250
)
RETURNS TABLE (
  total_count bigint,
  company_id text,
  row_offset integer
)
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_offset integer := GREATEST(COALESCE(p_offset, 0), 0);
  v_limit integer := LEAST(GREATEST(COALESCE(p_limit, 24), 1), 100);
  v_search text := NULLIF(btrim(COALESCE(p_search, '')), '');
  v_sort text := lower(COALESCE(NULLIF(btrim(p_sort), ''), 'reputation'));
  v_role text := lower(NULLIF(btrim(COALESCE(p_role, '')), ''));
  v_state text := upper(NULLIF(btrim(COALESCE(p_state, '')), ''));
  v_usdot text := NULLIF(regexp_replace(COALESCE(p_usdot, ''), '\D', '', 'g'), '');
  v_mc text := NULLIF(regexp_replace(COALESCE(p_mc, ''), '\D', '', 'g'), '');
  v_cand integer := LEAST(GREATEST(COALESCE(p_candidate_limit, 250), 24), 500);
  v_bbb_order text[] := ARRAY['C','B-','B','B+','A-','A','A+'];
  v_bbb_min_idx integer := NULL;
BEGIN
  IF p_bbb_min IS NOT NULL AND btrim(p_bbb_min) <> '' THEN
    SELECT i INTO v_bbb_min_idx
      FROM generate_subscripts(v_bbb_order, 1) AS i
     WHERE v_bbb_order[i] = btrim(p_bbb_min);
  END IF;

  RETURN QUERY
  WITH visible AS (
    SELECT c.*
      FROM public.companies c
     WHERE (
             c.publication_state IS NULL
          OR c.publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
           )
       AND (
             NOT COALESCE(p_exclude_local, true)
          OR c.service_scope IS DISTINCT FROM 'intrastate'
           )
       AND (p_min_rating IS NULL OR COALESCE(c.overall_rating, 0) >= p_min_rating)
       AND (
             p_max_price IS NULL
          OR (COALESCE(c.avg_price_per_move, 0) > 0 AND c.avg_price_per_move <= p_max_price)
           )
       AND (
             NOT COALESCE(p_only_full_service, false)
          OR COALESCE(c.services::text, '') ILIKE '%Full Service%'
           )
       AND (
             NOT COALESCE(p_only_verified, false)
          OR (
               c.usdot_number IS NOT NULL AND btrim(c.usdot_number) <> ''
               AND COALESCE(c.out_of_service, false) = false
               AND c.authority_active IS DISTINCT FROM false
             )
           )
       AND (
             v_bbb_min_idx IS NULL
          OR (
               c.bbb_rating = ANY (v_bbb_order)
               AND array_position(v_bbb_order, c.bbb_rating) >= v_bbb_min_idx
             )
           )
       AND (
             v_usdot IS NULL
          OR regexp_replace(COALESCE(c.usdot_number, ''), '\D', '', 'g') = v_usdot
           )
       AND (
             v_mc IS NULL
          OR regexp_replace(COALESCE(c.mc_number, ''), '\D', '', 'g') = v_mc
           )
       AND (
             v_state IS NULL
          OR COALESCE(c.coverage, '') ILIKE '%national%'
          OR COALESCE(c.coverage, '') ILIKE '%nationwide%'
          OR COALESCE(c.coverage, '') ILIKE '%continental%'
          OR COALESCE(c.coverage, '') ILIKE '%all 50%'
          OR COALESCE(c.coverage, '') ILIKE '%united states%'
          OR c.coverage IS NULL
          OR btrim(c.coverage) = ''
          OR upper(COALESCE(c.headquarters, '')) LIKE '%,' || ' ' || v_state
          OR upper(COALESCE(c.headquarters, '')) LIKE '% ' || v_state || '%'
          OR upper(COALESCE(c.coverage, '')) LIKE '%' || v_state || '%'
          OR COALESCE(c.coverage_counties::text, '') ILIKE '%' || lower(v_state) || '%'
           )
       AND (
             v_role IS NULL
          OR (
               v_role = 'local mover'
               AND (
                 c.service_scope = 'intrastate'
                 OR EXISTS (
                   SELECT 1 FROM public.provider_capability pc
                    WHERE pc.company_id = c.id
                      AND pc.capability IN ('hhg_intrastate', 'hhg_local')
                      AND pc.evidence_state <> 'REVIEW_REQUIRED'
                 )
               )
             )
          OR (
               v_role = 'carrier'
               AND EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_interstate_carrier'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
               AND NOT EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_broker'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
             )
          OR (
               v_role = 'broker'
               AND EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_broker'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
               AND NOT EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_interstate_carrier'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
             )
          OR (
               v_role IN ('carrier / broker', 'carrier/broker')
               AND EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_interstate_carrier'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
               AND EXISTS (
                 SELECT 1 FROM public.provider_capability pc
                  WHERE pc.company_id = c.id
                    AND pc.capability = 'hhg_broker'
                    AND pc.evidence_state <> 'REVIEW_REQUIRED'
               )
             )
           )
       AND (
             v_search IS NULL
          OR v_usdot IS NOT NULL
          OR v_mc IS NOT NULL
          OR lower(COALESCE(c.name, '')) = lower(v_search)
          OR lower(COALESCE(c.fmcsa_legal_name, '')) = lower(v_search)
          OR lower(COALESCE(c.slug, '')) = lower(regexp_replace(v_search, '\s+', '-', 'g'))
          OR lower(COALESCE(c.name, '')) LIKE lower(v_search) || '%'
          OR lower(COALESCE(c.fmcsa_legal_name, '')) LIKE lower(v_search) || '%'
          OR lower(COALESCE(c.slug, '')) LIKE lower(regexp_replace(v_search, '\s+', '-', 'g')) || '%'
          OR lower(COALESCE(c.name, '')) LIKE '%' || lower(v_search) || '%'
          OR lower(COALESCE(c.fmcsa_legal_name, '')) LIKE '%' || lower(v_search) || '%'
          OR lower(COALESCE(c.slug, '')) LIKE '%' || lower(regexp_replace(v_search, '\s+', '-', 'g')) || '%'
          -- Only treat digit-bearing queries as regulatory equality (avoid '' = '' matching all empty MC/USDOT).
          OR (
               length(regexp_replace(v_search, '\D', '', 'g')) >= 3
           AND regexp_replace(COALESCE(c.usdot_number, ''), '\D', '', 'g')
               = regexp_replace(v_search, '\D', '', 'g')
             )
          OR (
               length(regexp_replace(v_search, '\D', '', 'g')) >= 3
           AND regexp_replace(COALESCE(c.mc_number, ''), '\D', '', 'g')
               = regexp_replace(v_search, '\D', '', 'g')
             )
           )
  ),
  ranked AS (
    SELECT
      v.id,
      CASE v_sort
        WHEN 'rating' THEN row_number() OVER (ORDER BY COALESCE(v.overall_rating, 0) DESC, v.id ASC)
        WHEN 'reviews' THEN row_number() OVER (ORDER BY COALESCE(v.review_count, 0) DESC, v.id ASC)
        WHEN 'price-low' THEN row_number() OVER (
          ORDER BY
            CASE WHEN COALESCE(v.avg_price_per_move, 0) > 0 THEN 0 ELSE 1 END,
            COALESCE(v.avg_price_per_move, 0) ASC,
            v.id ASC
        )
        WHEN 'price-high' THEN row_number() OVER (
          ORDER BY
            CASE WHEN COALESCE(v.avg_price_per_move, 0) > 0 THEN 0 ELSE 1 END,
            COALESCE(v.avg_price_per_move, 0) DESC,
            v.id ASC
        )
        WHEN 'years' THEN row_number() OVER (ORDER BY COALESCE(v.years_in_business, 0) DESC, v.id ASC)
        WHEN 'complaints' THEN row_number() OVER (
          ORDER BY
            CASE WHEN COALESCE(v.fmcsa_shipments, 0) > 0 THEN 0 ELSE 1 END,
            CASE
              WHEN COALESCE(v.fmcsa_shipments, 0) > 0
                THEN COALESCE(v.fmcsa_complaints, 0)::numeric / v.fmcsa_shipments::numeric
              ELSE NULL
            END ASC NULLS LAST,
            v.id ASC
        )
        ELSE row_number() OVER (ORDER BY COALESCE(v.reputation_score, 0) DESC, v.id ASC)
      END AS rn,
      count(*) OVER () AS total
      FROM visible v
  ),
  -- For text search without exact regulatory match, cap candidate pool before offset
  limited AS (
    SELECT r.id, r.rn, r.total
      FROM ranked r
     WHERE v_search IS NULL OR v_usdot IS NOT NULL OR v_mc IS NOT NULL OR r.rn <= v_cand
  ),
  paged AS (
    SELECT l.id, l.rn, l.total,
           CASE
             WHEN v_search IS NOT NULL AND v_usdot IS NULL AND v_mc IS NULL
               THEN (l.rn - 1)::integer  -- candidate pool; Node may rerank
             ELSE (l.rn - 1)::integer
           END AS off
      FROM limited l
     WHERE
       -- Exact / non-search paths: true DB pagination
       ((v_search IS NULL OR v_usdot IS NOT NULL OR v_mc IS NOT NULL)
         AND l.rn > v_offset
         AND l.rn <= v_offset + v_limit)
       -- Text search: return bounded candidates for Node rerank (offset applied in Node)
       OR (v_search IS NOT NULL AND v_usdot IS NULL AND v_mc IS NULL)
  )
  SELECT p.total::bigint, p.id::text, p.off
    FROM paged p
   ORDER BY p.rn;
END;
$$;

COMMENT ON FUNCTION public.directory_query_page IS
  'Task 009A.1 read-only directory page: fail-closed visibility, sort, count, offset/limit. SECURITY INVOKER.';

GRANT EXECUTE ON FUNCTION public.directory_query_page(
  integer, integer, text, text, numeric, numeric, boolean, boolean, boolean, text, text, text, text, text, integer
) TO anon, authenticated, service_role;

COMMIT;
