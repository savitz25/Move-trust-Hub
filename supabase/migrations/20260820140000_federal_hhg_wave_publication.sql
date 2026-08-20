-- Task 004 Wave 1 publication manifest. Additive. Does not delete companies.
BEGIN;

CREATE TABLE IF NOT EXISTS public.federal_hhg_wave_publication (
  wave_id text NOT NULL,
  usdot text NOT NULL,
  company_id text NOT NULL,
  slug text NOT NULL,
  classification text NOT NULL,
  selected_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  indexable_at timestamptz,
  status text NOT NULL DEFAULT 'published',
  source text,
  PRIMARY KEY (wave_id, usdot)
);

CREATE INDEX IF NOT EXISTS federal_hhg_wave_company_idx
  ON public.federal_hhg_wave_publication (company_id);

COMMENT ON TABLE public.federal_hhg_wave_publication IS
  'Auditable Wave 1 federal HHG publications. Rollback unpublishes; it does not destroy evidence.';

NOTIFY pgrst, 'reload schema';
COMMIT;
