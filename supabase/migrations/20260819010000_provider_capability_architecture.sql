-- Task 001: additive provider authority / capability / location / service-area
-- architecture. Does not replace public.companies. Legacy entity_type and
-- service_scope remain for compatibility. Rollback: drop the new tables/columns.

BEGIN;

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS publication_state text NOT NULL DEFAULT 'PUBLISHABLE';

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS indexable boolean NOT NULL DEFAULT true;

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS claim_status text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'companies_publication_state_check'
  ) THEN
    ALTER TABLE public.companies
      ADD CONSTRAINT companies_publication_state_check
      CHECK (publication_state IN (
        'INGESTED', 'CLASSIFIED', 'VERIFIED', 'REVIEW_REQUIRED',
        'INACTIVE', 'PUBLISHABLE', 'INDEXABLE'
      ));
  END IF;
END $$;

COMMENT ON COLUMN public.companies.publication_state IS
  'Publication lifecycle. REVIEW_REQUIRED is never automatically indexable.';
COMMENT ON COLUMN public.companies.indexable IS
  'SEO/sitemap eligibility. Independent of whether a profile can be viewed.';

CREATE TABLE IF NOT EXISTS public.provider_authority (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  jurisdiction text NOT NULL CHECK (jurisdiction IN ('federal', 'state')),
  authority_type text NOT NULL,
  authority_number text,
  issuing_agency text NOT NULL,
  status text NOT NULL DEFAULT 'unknown',
  granted_at date,
  expires_at date,
  revoked_at date,
  reinstated_at date,
  source text NOT NULL,
  retrieved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, jurisdiction, authority_type, authority_number)
);

CREATE TABLE IF NOT EXISTS public.provider_capability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  capability text NOT NULL CHECK (capability IN (
    'hhg_interstate_carrier',
    'hhg_broker',
    'hhg_intrastate',
    'hhg_local',
    'auto_carrier',
    'auto_broker'
  )),
  evidence_source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, capability)
);

CREATE TABLE IF NOT EXISTS public.provider_location (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  label text,
  street text,
  city text,
  state_code text,
  postal_code text,
  is_headquarters boolean NOT NULL DEFAULT false,
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.provider_service_area (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  level text NOT NULL CHECK (level IN ('national', 'regional', 'state', 'county', 'city', 'zip')),
  value text NOT NULL,
  source text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, level, value)
);

CREATE TABLE IF NOT EXISTS public.provider_identity_review (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collision_kind text NOT NULL,
  collision_key text NOT NULL,
  company_ids uuid[] NOT NULL,
  resolution text NOT NULL DEFAULT 'REVIEW_REQUIRED',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (collision_kind, collision_key)
);

CREATE INDEX IF NOT EXISTS provider_authority_company_idx
  ON public.provider_authority (company_id);
CREATE INDEX IF NOT EXISTS provider_capability_company_idx
  ON public.provider_capability (company_id);
CREATE INDEX IF NOT EXISTS provider_location_company_idx
  ON public.provider_location (company_id);
CREATE INDEX IF NOT EXISTS provider_service_area_company_idx
  ON public.provider_service_area (company_id);

-- Deterministic capability backfill from existing columns. Does not create companies.
INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'hhg_intrastate', 'companies.service_scope'
  FROM public.companies c
 WHERE c.service_scope = 'intrastate'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'hhg_local', 'companies.service_scope'
  FROM public.companies c
 WHERE c.service_scope = 'intrastate'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'hhg_broker', 'companies.entity_type'
  FROM public.companies c
 WHERE c.service_scope = 'interstate'
   AND c.entity_type ILIKE '%broker%'
   AND coalesce(c.services::text, '') NOT ILIKE '%auto transport%'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'hhg_interstate_carrier', 'companies.entity_type'
  FROM public.companies c
 WHERE c.service_scope = 'interstate'
   AND c.entity_type ILIKE '%carrier%'
   AND coalesce(c.services::text, '') NOT ILIKE '%auto transport%'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'auto_broker', 'companies.services'
  FROM public.companies c
 WHERE coalesce(c.services::text, '') ILIKE '%auto transport%'
   AND (
     c.entity_type ILIKE '%broker%'
     OR c.services::text ILIKE '%broker%'
   )
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (company_id, capability, evidence_source)
SELECT c.id, 'auto_carrier', 'companies.services'
  FROM public.companies c
 WHERE coalesce(c.services::text, '') ILIKE '%auto transport%'
   AND (
     c.entity_type ILIKE '%carrier%'
     OR c.services::text ~* '(^|[^a-z])carrier([^a-z]|$)'
   )
   AND c.entity_type NOT ILIKE 'broker'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_authority (
  company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source
)
SELECT c.id, 'federal', 'usdot_registration', c.usdot_number, 'FMCSA',
       CASE WHEN c.out_of_service THEN 'inactive' WHEN c.authority_active = false THEN 'inactive' ELSE 'unknown' END,
       'companies.usdot_number'
  FROM public.companies c
 WHERE c.usdot_number IS NOT NULL AND btrim(c.usdot_number) <> ''
ON CONFLICT DO NOTHING;

INSERT INTO public.provider_authority (
  company_id, jurisdiction, authority_type, authority_number, issuing_agency, status, source
)
SELECT c.id, 'federal', 'mc_docket', c.mc_number, 'FMCSA',
       CASE WHEN c.out_of_service THEN 'inactive' WHEN c.authority_active = false THEN 'inactive' ELSE 'unknown' END,
       'companies.mc_number'
  FROM public.companies c
 WHERE c.mc_number IS NOT NULL AND btrim(c.mc_number) <> ''
ON CONFLICT DO NOTHING;

UPDATE public.companies
   SET publication_state = 'INACTIVE',
       indexable = false
 WHERE out_of_service = true
    OR authority_active = false;

NOTIFY pgrst, 'reload schema';

COMMIT;
