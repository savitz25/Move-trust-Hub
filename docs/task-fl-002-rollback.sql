-- Remove FL-002 overlay only. Does not touch public.companies or waves.
BEGIN;
DELETE FROM public.provider_contact_observation
 WHERE source LIKE 'fdacs%' OR regulator = 'FDACS';
ALTER TABLE public.state_hhg_registry_staging
  DROP COLUMN IF EXISTS candidate_class,
  DROP COLUMN IF EXISTS regulatory_id;
DROP TABLE IF EXISTS public.provider_contact_observation;
COMMIT;
