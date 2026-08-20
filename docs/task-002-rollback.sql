-- Task 002 rollback is not a full USDOT restore.
-- Prefer application rollback to da083ba2 if the identity updates must be undone.
-- This only drops the additive review columns. It does NOT restore copied Mayflower USDOTs.

BEGIN;
ALTER TABLE public.provider_identity_review DROP COLUMN IF EXISTS evidence_json;
ALTER TABLE public.provider_identity_review DROP COLUMN IF EXISTS outcome;
ALTER TABLE public.provider_identity_review DROP COLUMN IF EXISTS resolved_at;
COMMIT;
