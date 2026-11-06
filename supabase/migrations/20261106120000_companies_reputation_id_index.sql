-- Query 8712037641848766451 is the PostgREST companies page:
--   SELECT the #233 list columns (no google_data, no public_scrape_data)
--   FROM public.companies
--   ORDER BY reputation_score DESC, id ASC
--   LIMIT $1 OFFSET $2
--
-- idx_companies_reputation is (reputation_score DESC) and has no id tie-break.
-- One score is shared by 3013 rows. A deep page has to sort that tie.
-- At work_mem 2184kB, OFFSET 5000 LIMIT 1000 used an incremental sort,
-- external merge, peak disk 3840kB, temp written 482 blocks.
-- OFFSET 0 stayed in memory (peak 1835kB) and wrote no temp blocks.
--
-- This index matches that ORDER BY, including DESC NULLS FIRST.
-- It does not change the selected columns, the two-row legacy clear,
-- publication, or any other #233 behavior. The older reputation index stays.
-- Not applied to Production.

CREATE INDEX IF NOT EXISTS idx_companies_reputation_id
  ON public.companies (reputation_score DESC, id ASC);
