-- Task 001 / 001.1: additive provider authority / capability / location /
-- service-area architecture. Does not replace public.companies.
-- companies.id is TEXT (not UUID). Legacy entity_type and service_scope remain.
--
-- Fail-closed: NEW rows default to INGESTED + indexable=false.
-- Existing production rows are explicitly promoted as legacy_directory_row.
-- Rollback: see docs/task-0011-provider-foundation-productionization.md

BEGIN;

-- Fail-closed defaults for future inserts. Existing rows are backfilled next.
ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS publication_state text NOT NULL DEFAULT 'INGESTED';

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS indexable boolean NOT NULL DEFAULT false;

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS claim_status text;

ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS legacy_directory_row boolean NOT NULL DEFAULT false;

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

-- REVIEW_REQUIRED / INACTIVE / INGESTED / CLASSIFIED cannot be indexable.
-- VERIFIED is not automatically indexable; only PUBLISHABLE and INDEXABLE may be.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'companies_indexable_publication_gate'
  ) THEN
    ALTER TABLE public.companies
      ADD CONSTRAINT companies_indexable_publication_gate
      CHECK (
        indexable = false
        OR publication_state IN ('PUBLISHABLE', 'INDEXABLE')
      );
  END IF;
END $$;

COMMENT ON COLUMN public.companies.publication_state IS
  'Fail-closed lifecycle. New rows default INGESTED. REVIEW_REQUIRED and INACTIVE are never indexable.';
COMMENT ON COLUMN public.companies.indexable IS
  'Sitemap/search-engine eligibility. Independent of whether a profile URL remains reachable.';
COMMENT ON COLUMN public.companies.legacy_directory_row IS
  'True for the pre-001.1 production universe whose public visibility is preserved.';

-- Promote the current production universe as legacy public profiles, then
-- demote inactive/collision rows below. Future inserts keep INGESTED/false.
-- Guard: rerunning must not promote newly ingested rows.
UPDATE public.companies
   SET legacy_directory_row = true,
       publication_state = 'PUBLISHABLE',
       indexable = true
 WHERE NOT EXISTS (
         SELECT 1
           FROM public.companies already_legacy
          WHERE already_legacy.legacy_directory_row = true
       )
   AND publication_state = 'INGESTED';

CREATE TABLE IF NOT EXISTS public.provider_authority (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
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
  retrieved_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS provider_authority_identity_idx
  ON public.provider_authority (
    company_id,
    jurisdiction,
    authority_type,
    COALESCE(authority_number, '')
  );

CREATE TABLE IF NOT EXISTS public.provider_capability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  capability text NOT NULL CHECK (capability IN (
    'hhg_interstate_carrier',
    'hhg_broker',
    'hhg_intrastate',
    'hhg_local',
    'auto_carrier',
    'auto_broker'
  )),
  evidence_source text NOT NULL,
  evidence_state text NOT NULL DEFAULT 'INFERRED'
    CHECK (evidence_state IN ('INFERRED', 'VERIFIED', 'REVIEW_REQUIRED')),
  evidence_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, capability)
);

COMMENT ON COLUMN public.provider_capability.evidence_state IS
  'INFERRED = legacy text/entity_type/services. VERIFIED = regulatory observation. Never treat inference as verified authority.';

CREATE TABLE IF NOT EXISTS public.provider_location (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
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
  company_id text NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
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
  company_ids text[] NOT NULL,
  resolution text NOT NULL DEFAULT 'REVIEW_REQUIRED',
  notes text,
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

-- Legacy/inferred capability backfill. evidence_state is INFERRED, not VERIFIED.
INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'hhg_intrastate', 'companies.service_scope', 'INFERRED'
  FROM public.companies c
 WHERE c.service_scope = 'intrastate'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'hhg_local', 'companies.service_scope', 'INFERRED'
  FROM public.companies c
 WHERE c.service_scope = 'intrastate'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'hhg_broker', 'companies.entity_type', 'INFERRED'
  FROM public.companies c
 WHERE c.service_scope = 'interstate'
   AND c.entity_type ILIKE '%broker%'
   AND coalesce(c.services::text, '') NOT ILIKE '%auto transport%'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'hhg_interstate_carrier', 'companies.entity_type', 'INFERRED'
  FROM public.companies c
 WHERE c.service_scope = 'interstate'
   AND c.entity_type ILIKE '%carrier%'
   AND coalesce(c.services::text, '') NOT ILIKE '%auto transport%'
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'auto_broker', 'companies.services', 'INFERRED'
  FROM public.companies c
 WHERE coalesce(c.services::text, '') ILIKE '%auto transport%'
   AND (
     c.entity_type ILIKE '%broker%'
     OR c.services::text ILIKE '%broker%'
   )
ON CONFLICT (company_id, capability) DO NOTHING;

INSERT INTO public.provider_capability (
  company_id, capability, evidence_source, evidence_state
)
SELECT c.id, 'auto_carrier', 'companies.services', 'INFERRED'
  FROM public.companies c
 WHERE coalesce(c.services::text, '') ILIKE '%auto transport%'
   AND (
     c.entity_type ILIKE '%carrier%'
     OR c.services::text ~* '(^|[^a-z])carrier([^a-z]|$)'
   )
   AND coalesce(c.entity_type, '') NOT ILIKE 'broker'
ON CONFLICT (company_id, capability) DO NOTHING;

-- USDOT/MC rows are registration/docket observations, not verified HHG/auto capabilities.
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

INSERT INTO public.provider_identity_review (
  collision_kind, collision_key, company_ids, resolution, notes
)
SELECT 'usdot',
       regexp_replace(c.usdot_number, '\D', '', 'g'),
       array_agg(c.id ORDER BY c.id),
       'REVIEW_REQUIRED',
       'Duplicate USDOT across separate company rows. Do not merge by name.'
  FROM public.companies c
 WHERE c.usdot_number IS NOT NULL
   AND btrim(c.usdot_number) <> ''
   AND regexp_replace(c.usdot_number, '\D', '', 'g') NOT IN ('', '0')
 GROUP BY regexp_replace(c.usdot_number, '\D', '', 'g')
HAVING count(*) > 1
ON CONFLICT (collision_kind, collision_key) DO UPDATE
  SET company_ids = EXCLUDED.company_ids,
      notes = EXCLUDED.notes;

INSERT INTO public.provider_identity_review (
  collision_kind, collision_key, company_ids, resolution, notes
)
SELECT 'mc',
       regexp_replace(upper(c.mc_number), '^MC-?', ''),
       array_agg(c.id ORDER BY c.id),
       'REVIEW_REQUIRED',
       'Duplicate MC/docket across separate company rows. Do not merge by name.'
  FROM public.companies c
 WHERE c.mc_number IS NOT NULL AND btrim(c.mc_number) <> ''
 GROUP BY regexp_replace(upper(c.mc_number), '^MC-?', '')
HAVING count(*) > 1
ON CONFLICT (collision_kind, collision_key) DO UPDATE
  SET company_ids = EXCLUDED.company_ids,
      notes = EXCLUDED.notes;

UPDATE public.provider_identity_review
   SET notes = 'Shared placeholder USDOT 125563 on national brand catalog rows (Allied, Mayflower, Atlas, Wheaton, Graebel, Arpin). Treat as identity/data-quality, not a merge key. Do not invent replacement USDOT numbers.'
 WHERE collision_kind = 'usdot'
   AND collision_key = '125563';

UPDATE public.companies
   SET publication_state = 'INACTIVE',
       indexable = false
 WHERE out_of_service = true
    OR authority_active = false;

UPDATE public.companies c
   SET publication_state = 'REVIEW_REQUIRED',
       indexable = false
  FROM public.provider_identity_review r
 WHERE c.id = ANY (r.company_ids)
   AND r.resolution = 'REVIEW_REQUIRED';

NOTIFY pgrst, 'reload schema';

COMMIT;
