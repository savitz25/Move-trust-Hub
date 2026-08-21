-- Task 009A.1 rollback (safe / additive objects only).
-- Does not mutate company identities, publication_state, or provider data.

BEGIN;

DROP FUNCTION IF EXISTS public.directory_query_page(
  integer, integer, text, text, numeric, numeric, boolean, boolean, boolean, text, text, text, text, text, integer
);

DROP INDEX IF EXISTS public.idx_companies_usdot_number;
DROP INDEX IF EXISTS public.idx_companies_mc_number;
DROP INDEX IF EXISTS public.idx_companies_publication_state;
DROP INDEX IF EXISTS public.idx_companies_scope_reputation;
DROP INDEX IF EXISTS public.idx_companies_avg_price;
DROP INDEX IF EXISTS public.idx_companies_years;
DROP INDEX IF EXISTS public.idx_companies_name_lower;
DROP INDEX IF EXISTS public.idx_companies_legal_name_lower;
DROP INDEX IF EXISTS public.idx_provider_capability_cap_company;

COMMIT;
