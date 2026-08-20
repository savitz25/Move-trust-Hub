-- Task 002: auditable identity-review outcomes. Additive. No company deletes.
BEGIN;

ALTER TABLE public.provider_identity_review
  ADD COLUMN IF NOT EXISTS resolved_at timestamptz;

ALTER TABLE public.provider_identity_review
  ADD COLUMN IF NOT EXISTS outcome text;

ALTER TABLE public.provider_identity_review
  ADD COLUMN IF NOT EXISTS evidence_json jsonb;

COMMENT ON COLUMN public.provider_identity_review.outcome IS
  'Evidence-backed resolution: RESOLVED_UNIQUE_AUTHORITY, BRAND_WITH_OPERATING_ENTITY, NETWORK_OR_VAN_LINE, TRUE_DUPLICATE, HISTORICAL_OR_INACTIVE_IDENTITY, UNRESOLVED_REVIEW_REQUIRED.';

GRANT SELECT ON public.provider_capability TO anon, authenticated;
GRANT SELECT ON public.provider_authority TO anon, authenticated;
GRANT SELECT ON public.provider_identity_review TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

COMMIT;
