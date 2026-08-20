-- Unpublish Wave 3 only. Wave 1 and Wave 2 are not touched.
BEGIN;

UPDATE public.companies c
   SET indexable = false,
       publication_state = 'INACTIVE'
  FROM public.federal_hhg_wave_publication w
 WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_3'
   AND w.company_id = c.id
   AND w.status <> 'unpublished';

UPDATE public.federal_hhg_wave_publication
   SET status = 'unpublished',
       indexable_at = NULL
 WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_3'
   AND status <> 'unpublished';

COMMIT;
