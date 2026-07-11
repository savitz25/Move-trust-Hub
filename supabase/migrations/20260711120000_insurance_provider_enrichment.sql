-- Insurance provider enrichment columns (InsuranceTrustHub / MoveTrustHub insurance vertical)
-- Safe to run when providers table already exists.

CREATE TABLE IF NOT EXISTS public.providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  provider_type text NOT NULL DEFAULT 'independent_agent',
  categories jsonb NOT NULL DEFAULT '[]'::jsonb,
  states_licensed jsonb NOT NULL DEFAULT '[]'::jsonb,
  cities jsonb NOT NULL DEFAULT '[]'::jsonb,
  license_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  specialties jsonb NOT NULL DEFAULT '[]'::jsonb,
  rating numeric(3, 2) NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  years_in_business integer,
  relocation_experience boolean NOT NULL DEFAULT false,
  verified boolean NOT NULL DEFAULT false,
  description text,
  short_description text,
  contact jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS google_place_id text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS google_rating numeric(3, 2);
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS google_review_count integer;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS bbb_rating text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS bbb_accredited boolean;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS bbb_complaint_count integer;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS trust_score integer;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS enriched_at timestamptz;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS enrichment_json jsonb;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS needs_manual_review boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS providers_slug_idx ON public.providers (slug);
CREATE INDEX IF NOT EXISTS providers_enriched_at_idx ON public.providers (enriched_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS providers_google_rating_idx ON public.providers (google_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS providers_bbb_accredited_idx ON public.providers (bbb_accredited) WHERE bbb_accredited = true;
CREATE INDEX IF NOT EXISTS providers_trust_score_idx ON public.providers (trust_score DESC NULLS LAST);

COMMENT ON COLUMN public.providers.enrichment_json IS
  'Full multi-source enrichment payload (Google Places, BBB) for audit and UI fallbacks.';
COMMENT ON COLUMN public.providers.needs_manual_review IS
  'Set when automated Google/BBB lookup found no confident match — queue for human verification.';