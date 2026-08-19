-- MoveTrustHub 2.0 additive foundation. No V1 table is altered.
create schema if not exists move_v2;
create schema if not exists move_v2_commercial;

create table if not exists move_v2.schema_migration (
  version text primary key,
  name text not null,
  sha256 text not null,
  applied_at timestamptz not null default now()
);

create table if not exists move_v2.provider (
  provider_id uuid primary key default gen_random_uuid(),
  organization_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists move_v2.source_snapshot (
  source_snapshot_id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_dataset text not null,
  source_release text,
  source_retrieved_at timestamptz not null,
  source_effective_at timestamptz,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (source_name, source_dataset, source_release, source_retrieved_at)
);

create table if not exists move_v2.provider_source_record (
  provider_source_record_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  source_snapshot_id uuid not null references move_v2.source_snapshot(source_snapshot_id),
  source_record_id text not null,
  raw_record_reference text not null,
  normalized_record_reference text,
  raw_record_sha256 text,
  created_at timestamptz not null default now(),
  unique (source_snapshot_id, source_record_id)
);

create table if not exists move_v2.provider_identifier (
  provider_identifier_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  identifier_type text not null check (identifier_type in ('USDOT','MC','MX','FF','STATE_LICENSE')),
  identifier_value text not null,
  issuing_jurisdiction text,
  provider_source_record_id uuid references move_v2.provider_source_record(provider_source_record_id),
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  unique nulls not distinct (identifier_type, identifier_value, issuing_jurisdiction)
);

create table if not exists move_v2.provider_name (
  provider_name_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  name_type text not null check (name_type in ('LEGAL','DBA','DISPLAY','FORMER','OTHER')),
  name_value text not null,
  normalized_name text not null,
  provider_source_record_id uuid references move_v2.provider_source_record(provider_source_record_id),
  valid_from timestamptz,
  valid_to timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists move_v2.provider_address (
  provider_address_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  address_type text not null check (address_type in ('PHYSICAL','MAILING','BRANCH','OTHER')),
  address_line_1 text, address_line_2 text, city text, state text, postal_code text, country_code text not null default 'US',
  latitude numeric, longitude numeric,
  provider_source_record_id uuid references move_v2.provider_source_record(provider_source_record_id),
  first_seen_at timestamptz not null, last_seen_at timestamptz not null
);

create table if not exists move_v2.provider_contact (
  contact_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  contact_type text not null check (contact_type in ('PHONE','EMAIL','WEBSITE')),
  value text not null, normalized_value text not null, extension text, label text,
  source_type text not null check (source_type in ('FMCSA','STATE_REGULATOR','GOOGLE_PLACES','OFFICIAL_WEBSITE','PROVIDER_SUBMITTED','TRUSTHUB_DERIVED')),
  source_record_id text, source_url text,
  first_seen_at timestamptz not null, last_seen_at timestamptz not null, last_verified_at timestamptz,
  is_primary boolean not null default false,
  status text not null default 'UNKNOWN' check (status in ('ACTIVE','STALE','INVALID','UNKNOWN')),
  confidence numeric check (confidence between 0 and 1),
  unique (provider_id, contact_type, normalized_value, source_type, source_record_id)
);

create table if not exists move_v2.provider_external_identity (
  provider_external_identity_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  identity_type text not null check (identity_type in ('GOOGLE_PLACE','OFFICIAL_COMPANY_WEBSITE','BBB','OTHER')),
  external_id text, external_url text, normalized_domain text,
  match_status text not null check (match_status in ('CANDIDATE','AUTO_ACCEPTED','IDENTITY_REVIEW','VERIFIED','REJECTED')),
  match_confidence numeric check (match_confidence between 0 and 1),
  match_rule_version text, source_record_id text, verified_at timestamptz,
  unique nulls not distinct (identity_type, external_id, normalized_domain)
);

create table if not exists move_v2.provider_classification (
  provider_classification_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  classification text not null check (classification in ('INTERSTATE_CARRIER','LOCAL_INTRASTATE_CARRIER','LOCAL_INTRASTATE_CARRIER_CANDIDATE','AUTHORIZED_BROKER','DUAL_ROLE_CARRIER_BROKER','INACTIVE_ENTITY','NEEDS_REGULATORY_REVIEW','UNKNOWN_UNCLASSIFIED')),
  classification_reason text not null,
  classification_rule_version text not null,
  classified_at timestamptz not null,
  supporting_evidence_ids uuid[] not null default '{}',
  superseded_at timestamptz
);
create unique index if not exists provider_current_classification on move_v2.provider_classification(provider_id) where superseded_at is null;

create table if not exists move_v2.provider_state_authority (
  provider_state_authority_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  state text not null, license_or_registration_number text not null, authority_type text not null,
  status text not null, effective_date date, expiration_date date,
  source text not null, source_url text, source_record_id text, last_checked_at timestamptz not null,
  unique (state, license_or_registration_number, authority_type)
);

create table if not exists move_v2.provider_location (
  provider_location_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  provider_address_id uuid references move_v2.provider_address(provider_address_id),
  label text, status text not null default 'ACTIVE', created_at timestamptz not null default now()
);

create table if not exists move_v2.provider_service_area (
  provider_service_area_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  area_type text not null check (area_type in ('STATE','COUNTY','CITY','POSTAL_CODE','METRO','OTHER')),
  authority_scope text not null check (authority_scope in ('REGULATORY_ALLOWED_AREA','PROVIDER_PUBLISHED_SERVICE_AREA','TRUSTHUB_DERIVED_SEARCH_AREA')),
  state text, county text, city text, postal_code text, label text not null,
  source_type text not null, source_url text, source_record_id text,
  confidence numeric check (confidence between 0 and 1), first_seen_at timestamptz not null, last_verified_at timestamptz
);

create table if not exists move_v2.identity_review (
  identity_review_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  review_type text not null, candidate jsonb not null, score jsonb not null, status text not null default 'PENDING',
  created_at timestamptz not null default now(), resolved_at timestamptz
);

create table if not exists move_v2.pipeline_run (
  pipeline_run_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  step text not null, idempotency_key text not null unique, status text not null, rule_version text,
  started_at timestamptz not null default now(), completed_at timestamptz, error_code text
);

-- Commercial data is structurally outside the public provider schema. Public read
-- functions and ranking queries must never join this schema.
create table if not exists move_v2_commercial.organization_subscription (
  organization_id uuid primary key, subscription_status text not null,
  updated_at timestamptz not null default now()
);
revoke all on schema move_v2_commercial from anon, authenticated;
revoke all on all tables in schema move_v2_commercial from anon, authenticated;

alter table move_v2.provider enable row level security;
alter table move_v2.source_snapshot enable row level security;
alter table move_v2.provider_source_record enable row level security;
alter table move_v2.provider_identifier enable row level security;
alter table move_v2.provider_name enable row level security;
alter table move_v2.provider_address enable row level security;
alter table move_v2.provider_contact enable row level security;
alter table move_v2.provider_external_identity enable row level security;
alter table move_v2.provider_classification enable row level security;
alter table move_v2.provider_state_authority enable row level security;
alter table move_v2.provider_location enable row level security;
alter table move_v2.provider_service_area enable row level security;
alter table move_v2.identity_review enable row level security;
alter table move_v2.pipeline_run enable row level security;
