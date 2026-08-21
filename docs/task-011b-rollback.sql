-- Task 011B rollback — remove ONLY 011B state staging / authority rows and objects.
-- Does NOT touch: companies, Federal Waves 1–4, Task 008B, reviews, claims, consumer data.
-- Google Places requests: 0

BEGIN;

-- Remove authority rows created by 011B sources
DELETE FROM public.provider_state_authority
 WHERE source IN (
   'fdacs_legacy_xls',
   'fdacs_new_portal_csv',
   'wa_utc_hhg_html',
   'fdacs_license_lookup_csv'
 )
 OR raw_source_key LIKE 'FDACS:%'
 OR raw_source_key LIKE 'WA_UTC:%';

DELETE FROM public.state_hhg_registry_staging
 WHERE state_code IN ('FL', 'WA');

DELETE FROM public.state_hhg_ingest_run
 WHERE state_code IN ('FL', 'WA');

-- Optional full schema drop (only if no later tasks depend on these tables):
-- DROP TABLE IF EXISTS public.provider_state_authority;
-- DROP TABLE IF EXISTS public.state_hhg_registry_staging;
-- DROP TABLE IF EXISTS public.state_hhg_ingest_run;

NOTIFY pgrst, 'reload schema';
COMMIT;
