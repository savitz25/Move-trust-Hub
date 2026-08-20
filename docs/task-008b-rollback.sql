-- Remove Task 008B identity-resolution overlay only.
-- Does not touch public.companies, waves, or federal_hhg_staging dispositions.
BEGIN;
DELETE FROM public.federal_hhg_identity_resolution
 WHERE review_run_id = 'task-008b-2026-08';
COMMIT;
