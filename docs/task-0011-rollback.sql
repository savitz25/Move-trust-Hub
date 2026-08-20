-- Task 001.1 database rollback. Additive schema only.
-- Do NOT run unless production safety requires removing the provider foundation.
-- Prefer application rollback to SHA 68be790022931f6e6d43941e00b5810e5e1adbd3.
-- This does not delete public.companies rows and does not change slug/USDOT/MC.

BEGIN;

ALTER TABLE public.companies DROP CONSTRAINT IF EXISTS companies_indexable_publication_gate;
ALTER TABLE public.companies DROP CONSTRAINT IF EXISTS companies_publication_state_check;

DROP TABLE IF EXISTS public.provider_identity_review;
DROP TABLE IF EXISTS public.provider_service_area;
DROP TABLE IF EXISTS public.provider_location;
DROP TABLE IF EXISTS public.provider_capability;
DROP TABLE IF EXISTS public.provider_authority;

ALTER TABLE public.companies DROP COLUMN IF EXISTS publication_state;
ALTER TABLE public.companies DROP COLUMN IF EXISTS indexable;
ALTER TABLE public.companies DROP COLUMN IF EXISTS claim_status;
ALTER TABLE public.companies DROP COLUMN IF EXISTS legacy_directory_row;

NOTIFY pgrst, 'reload schema';

COMMIT;
