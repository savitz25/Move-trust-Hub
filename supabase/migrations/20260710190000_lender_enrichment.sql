-- Lender directory enrichment columns (LenderTrustHub / MoveTrustHub lender vertical)
-- Safe to run when lenders table already exists from prior onboarding migrations.

CREATE TABLE IF NOT EXISTS public.lenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  nmls_id text NOT NULL,
  lender_type text NOT NULL DEFAULT 'Lender',
  city text,
  state text NOT NULL,
  state_slug text NOT NULL,
  county text NOT NULL,
  county_slug text NOT NULL,
  zip_codes jsonb NOT NULL DEFAULT '[]'::jsonb,
  rating numeric(3, 2),
  review_count integer NOT NULL DEFAULT 0,
  trust_score integer NOT NULL DEFAULT 0,
  county_experience_score integer NOT NULL DEFAULT 0,
  loan_types jsonb NOT NULL DEFAULT '[]'::jsonb,
  specialties jsonb NOT NULL DEFAULT '[]'::jsonb,
  credit_tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  nmls_verified boolean NOT NULL DEFAULT true,
  cfpb_complaints integer NOT NULL DEFAULT 0,
  bbb_rating text,
  google_rating numeric(3, 2),
  trustpilot_rating numeric(3, 2),
  short_description text,
  website text,
  phone text,
  is_featured boolean NOT NULL DEFAULT false,
  zero_paid_placement boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS google_place_id text;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS google_review_count integer;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS bbb_accredited boolean;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS bbb_complaint_count integer;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS bbb_score text;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS cfpb_complaints_count integer;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS enriched_at timestamptz;
ALTER TABLE public.lenders ADD COLUMN IF NOT EXISTS enrichment_json jsonb;

CREATE INDEX IF NOT EXISTS lenders_slug_idx ON public.lenders (slug);
CREATE INDEX IF NOT EXISTS lenders_state_county_idx ON public.lenders (state_slug, county_slug);
CREATE INDEX IF NOT EXISTS lenders_enriched_at_idx ON public.lenders (enriched_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS lenders_google_rating_idx ON public.lenders (google_rating DESC NULLS LAST);

COMMENT ON COLUMN public.lenders.enrichment_json IS
  'Full multi-source enrichment payload (Google, BBB, CFPB, county score) for audit and UI fallbacks.';