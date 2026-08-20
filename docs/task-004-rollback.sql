-- Unpublish Wave 1 from consumer discovery without deleting regulatory evidence.
BEGIN;

UPDATE public.companies c
   SET indexable = false,
       publication_state = 'INACTIVE'
  FROM public.federal_hhg_wave_publication w
 WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
   AND w.company_id = c.id
   AND w.status <> 'unpublished';

UPDATE public.federal_hhg_wave_publication
   SET status = 'unpublished',
       indexable_at = NULL
 WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_1'
   AND status <> 'unpublished';

COMMIT;
