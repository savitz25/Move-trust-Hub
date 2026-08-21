-- Task 011D.2A rollback — ONLY new state-only canonical companies from this task.
-- Preserves Waves 1-4, prior public companies, 011B/011C evidence, reviews, claims.
-- Google Places: 0

BEGIN;

-- Scope: Task 011D.2A state-only INGESTED companies (fl-*/wa-*, not usdot-*).
-- Discovery evidence for this task
DELETE FROM public.provider_local_discovery_evidence
 WHERE task_tag = '011D.2A'
    OR (
      (company_id LIKE 'fl-%' OR company_id LIKE 'wa-%')
      AND company_id NOT LIKE 'usdot-%'
    );

-- Capabilities on new state-only companies
DELETE FROM public.provider_capability
 WHERE (company_id LIKE 'fl-%' OR company_id LIKE 'wa-%')
   AND company_id NOT LIKE 'usdot-%'
   AND company_id IN (
     SELECT id FROM public.companies
      WHERE publication_state = 'INGESTED'
        AND indexable = false
        AND legacy_directory_row = false
   );

-- Detach authority from new companies (restore to UNRESOLVED unmatched)
UPDATE public.provider_state_authority
   SET company_id = NULL,
       matched_company_id = NULL,
       verification_state = 'UNRESOLVED',
       match_method = NULL,
       match_confidence = NULL,
       updated_at = now()
 WHERE (company_id LIKE 'fl-%' OR company_id LIKE 'wa-%')
   AND company_id NOT LIKE 'usdot-%'
   AND company_id IN (
     SELECT id FROM public.companies
      WHERE publication_state = 'INGESTED'
        AND indexable = false
        AND legacy_directory_row = false
   );

-- Restore staging disposition for authorities that pointed at new companies
UPDATE public.state_hhg_registry_staging s
   SET disposition = 'NEW_PROVIDER_CANDIDATE',
       matched_company_id = NULL,
       match_method = NULL,
       match_confidence = NULL,
       updated_at = now()
 WHERE (s.matched_company_id LIKE 'fl-%' OR s.matched_company_id LIKE 'wa-%')
   AND s.matched_company_id NOT LIKE 'usdot-%'
   AND s.matched_company_id IN (
     SELECT id FROM public.companies
      WHERE publication_state = 'INGESTED'
        AND indexable = false
        AND legacy_directory_row = false
   );

-- Delete only new state-only company rows from this task
DELETE FROM public.companies
 WHERE (id LIKE 'fl-%' OR id LIKE 'wa-%')
   AND id NOT LIKE 'usdot-%'
   AND publication_state = 'INGESTED'
   AND indexable = false
   AND legacy_directory_row = false;

COMMIT;
