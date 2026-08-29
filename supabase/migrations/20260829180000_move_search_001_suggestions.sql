-- MOVE-SEARCH-001: identity suggestion RPC + optional trigram recall.
-- Additive. Does not mutate company identity or publication_state.
-- Rollback:
--   DROP FUNCTION IF EXISTS public.directory_search_suggestions(text, integer);
--   DROP INDEX IF EXISTS public.idx_companies_name_lower_trgm;
--   DROP INDEX IF EXISTS public.idx_companies_legal_name_lower_trgm;
--   (leave pg_trgm installed; dropping the extension would affect other uses)

BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_companies_name_lower_trgm
  ON public.companies USING gin (lower(name) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_companies_legal_name_lower_trgm
  ON public.companies USING gin (lower(fmcsa_legal_name) gin_trgm_ops)
  WHERE fmcsa_legal_name IS NOT NULL AND btrim(fmcsa_legal_name) <> '';

CREATE OR REPLACE FUNCTION public.directory_search_suggestions(
  p_query text,
  p_limit integer DEFAULT 8
)
RETURNS TABLE (
  company_id text,
  slug text,
  display_name text,
  legal_name text,
  headquarters text,
  usdot text,
  mc text,
  role text,
  authority_active boolean,
  match_tier integer
)
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_query text := left(btrim(coalesce(p_query, '')), 80);
  v_limit integer := least(greatest(coalesce(p_limit, 8), 1), 100);
  v_digits text := nullif(regexp_replace(v_query, '\D', '', 'g'), '');
  v_norm text := btrim(regexp_replace(lower(v_query), '[^a-z0-9]+', ' ', 'g'));
BEGIN
  IF v_query IS NULL OR v_query = '' THEN
    RETURN;
  END IF;
  IF v_norm = '' AND v_digits IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH visible AS (
    SELECT
      c.id,
      c.slug,
      c.name,
      c.fmcsa_legal_name,
      c.headquarters,
      c.usdot_number,
      c.mc_number,
      c.entity_type,
      c.authority_active
    FROM public.companies c
    WHERE (
      c.publication_state IS NULL
      OR c.publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
    )
  ),
  scored AS (
    SELECT
      v.*,
      CASE
        WHEN v_digits IS NOT NULL
          AND length(v_digits) BETWEEN 3 AND 8
          AND regexp_replace(coalesce(v.usdot_number, ''), '\D', '', 'g') = v_digits
          AND v_query ~* '^(usd?ot|dot)'
          THEN 1
        WHEN v_digits IS NOT NULL
          AND length(v_digits) BETWEEN 3 AND 8
          AND regexp_replace(coalesce(v.mc_number, ''), '\D', '', 'g') = v_digits
          AND v_query ~* '^mc'
          THEN 2
        WHEN v_digits IS NOT NULL
          AND length(v_digits) BETWEEN 3 AND 8
          AND (
            regexp_replace(coalesce(v.usdot_number, ''), '\D', '', 'g') = v_digits
            OR regexp_replace(coalesce(v.mc_number, ''), '\D', '', 'g') = v_digits
          )
          THEN 3
        WHEN lower(btrim(v.name)) = v_norm THEN 4
        WHEN lower(btrim(coalesce(v.fmcsa_legal_name, ''))) = v_norm THEN 5
        WHEN v_norm <> '' AND (
               lower(v.name) LIKE v_norm || '%'
            OR lower(coalesce(v.fmcsa_legal_name, '')) LIKE v_norm || '%'
             )
          THEN 7
        WHEN v_norm <> '' AND (
               SELECT count(*) FROM unnest(string_to_array(v_norm, ' ')) t(token)
                WHERE length(t.token) >= 3
             ) >= 2
          AND (
               SELECT bool_and(
                 lower(v.name) LIKE '%' || t.token || '%'
                 OR lower(coalesce(v.fmcsa_legal_name, '')) LIKE '%' || t.token || '%'
               )
               FROM unnest(string_to_array(v_norm, ' ')) t(token)
               WHERE length(t.token) >= 3
             )
          THEN 8
        WHEN v_norm <> '' AND (
               similarity(v_norm, lower(v.name)) >= 0.28
            OR similarity(v_norm, lower(coalesce(v.fmcsa_legal_name, ''))) >= 0.28
            OR word_similarity(v_norm, lower(v.name)) >= 0.45
            OR word_similarity(v_norm, lower(coalesce(v.fmcsa_legal_name, ''))) >= 0.45
             )
          THEN 9
        WHEN v_norm <> '' AND (
               lower(v.name) LIKE '%' || v_norm || '%'
            OR lower(coalesce(v.fmcsa_legal_name, '')) LIKE '%' || v_norm || '%'
             )
          THEN 10
        ELSE NULL
      END AS match_tier
    FROM visible v
  )
  SELECT
    s.id::text,
    s.slug::text,
    s.name::text,
    nullif(btrim(coalesce(s.fmcsa_legal_name, '')), ''),
    coalesce(s.headquarters, ''),
    coalesce(s.usdot_number, ''),
    coalesce(s.mc_number, ''),
    coalesce(s.entity_type, ''),
    s.authority_active,
    s.match_tier::integer
  FROM scored s
  WHERE s.match_tier IS NOT NULL
  ORDER BY
    s.match_tier,
    lower(s.name),
    regexp_replace(coalesce(s.usdot_number, ''), '\D', '', 'g'),
    s.id
  LIMIT v_limit;
END;
$$;

COMMENT ON FUNCTION public.directory_search_suggestions(text, integer) IS
  'MOVE-SEARCH-001 read-only identity suggestions. Public-eligible companies only. No reputation ordering.';

REVOKE ALL ON FUNCTION public.directory_search_suggestions(text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.directory_search_suggestions(text, integer)
  TO anon, authenticated, service_role;

COMMIT;
