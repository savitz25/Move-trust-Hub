-- MOVE-SEARCH-001B: exact public display-name census, independent of suggestion LIMIT.
-- Additive. Does not mutate identity or publication_state.
-- Rollback: DROP FUNCTION IF EXISTS public.directory_exact_display_name_count(text);

BEGIN;

CREATE OR REPLACE FUNCTION public.directory_exact_display_name_count(p_query text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH q AS (
    SELECT btrim(regexp_replace(lower(left(btrim(coalesce(p_query, '')), 80)), '[^a-z0-9]+', ' ', 'g')) AS norm
  )
  SELECT CASE
    WHEN (SELECT norm FROM q) = '' THEN 0
    ELSE (
      SELECT count(*)::integer
        FROM public.companies c
       WHERE (
               c.publication_state IS NULL
            OR c.publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
             )
         AND btrim(regexp_replace(lower(c.name), '[^a-z0-9]+', ' ', 'g')) = (SELECT norm FROM q)
    )
  END;
$$;

COMMENT ON FUNCTION public.directory_exact_display_name_count(text) IS
  'MOVE-SEARCH-001B exact public display-name group size. Publication-eligible rows only. Not a candidate-cap count.';

REVOKE ALL ON FUNCTION public.directory_exact_display_name_count(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.directory_exact_display_name_count(text)
  TO anon, authenticated, service_role;

COMMIT;
