-- Task 011B follow-up: replace non-null-coalesce unique index that blocked unmatched rows.
BEGIN;

DROP INDEX IF EXISTS public.provider_state_authority_company_auth_idx;

CREATE UNIQUE INDEX IF NOT EXISTS provider_state_authority_company_auth_partial_idx
  ON public.provider_state_authority (
    company_id,
    state_code,
    authority_type,
    COALESCE(authority_number, '')
  )
  WHERE company_id IS NOT NULL;

NOTIFY pgrst, 'reload schema';
COMMIT;
