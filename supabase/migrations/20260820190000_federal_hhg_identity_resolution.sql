-- Task 008B: additive identity-resolution overlay. Does not publish companies.
BEGIN;

CREATE TABLE IF NOT EXISTS public.federal_hhg_identity_resolution (
  usdot text PRIMARY KEY,
  review_run_id text NOT NULL,
  original_disposition text NOT NULL,
  original_review_reason text,
  original_review_category text NOT NULL,
  matched_company_id text,
  matched_company_usdot text,
  matched_company_slug text,
  matched_company_name text,
  resolution text NOT NULL,
  resolution_confidence text NOT NULL,
  eligible_for_canonicalization boolean NOT NULL DEFAULT false,
  evidence_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  source text NOT NULL,
  resolved_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    resolution IN (
      'RESOLVED_DISTINCT',
      'REMAIN_REVIEW_REQUIRED',
      'BRAND_OR_FRANCHISE_REVIEW',
      'POSSIBLE_SUCCESSOR_PREDECESSOR',
      'POSSIBLE_DUPLICATE',
      'LEGAL_ENTITY_CONFLICT'
    )
  ),
  CHECK (eligible_for_canonicalization = false OR resolution = 'RESOLVED_DISTINCT')
);

CREATE INDEX IF NOT EXISTS federal_hhg_identity_resolution_run_idx
  ON public.federal_hhg_identity_resolution (review_run_id, resolution);

COMMENT ON TABLE public.federal_hhg_identity_resolution IS
  'Task 008B non-public identity-review overlay. Staging disposition stays IDENTITY_REVIEW_REQUIRED. Never creates public.companies rows.';

REVOKE ALL ON public.federal_hhg_identity_resolution FROM anon, authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
