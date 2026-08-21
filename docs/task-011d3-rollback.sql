-- Task 011D.3 canary rollback — exact LOCAL_HHG_FL_WA_2026_08_CANARY_1 only.
-- Preserves canonical companies, state authority, home-county evidence rows,
-- internal capabilities, contacts, Waves 1–4, Task 008B.
-- Google Places: 0

BEGIN;

-- Disable consumer discovery for canary home counties
UPDATE public.provider_local_discovery_evidence e
   SET consumer_eligible = false,
       updated_at = now()
  FROM public.local_hhg_canary_publication w
 WHERE w.wave_id = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1'
   AND w.company_id = e.company_id
   AND e.basis = 'VERIFIED_HOME_COUNTY'
   AND e.consumer_eligible = true;

-- Unpublish companies (do NOT delete)
UPDATE public.companies c
   SET publication_state = 'INGESTED',
       indexable = false,
       updated_at = now()
  FROM public.local_hhg_canary_publication w
 WHERE w.wave_id = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1'
   AND w.company_id = c.id
   AND c.publication_state = 'PUBLISHABLE'
   AND c.indexable = false
   AND (c.id LIKE 'fl-%' OR c.id LIKE 'wa-%')
   AND c.id NOT LIKE 'usdot-%';

UPDATE public.local_hhg_canary_publication
   SET status = 'unpublished'
 WHERE wave_id = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1'
   AND status = 'published';

COMMIT;
