-- Task 010 Wave 4 rollback (publication only — does not mutate Waves 1–3).
-- Prefer: npx tsx scripts/publish-federal-hhg-wave4.ts --rollback

BEGIN;

UPDATE public.companies c
   SET indexable = false,
       publication_state = 'INACTIVE'
  FROM public.federal_hhg_wave_publication w
 WHERE w.wave_id = 'FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'
   AND w.company_id = c.id
   AND w.status <> 'unpublished';

UPDATE public.federal_hhg_wave_publication
   SET status = 'unpublished',
       indexable_at = NULL
 WHERE wave_id = 'FEDERAL_HHG_2026_08_WAVE_4_FINAL_CLEAN'
   AND status <> 'unpublished';

COMMIT;
