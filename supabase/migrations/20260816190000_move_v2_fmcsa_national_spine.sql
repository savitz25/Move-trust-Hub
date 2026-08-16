-- Task 002: additive, release-aware FMCSA national data spine. V1 tables are untouched.
create table if not exists move_v2.fmcsa_source_release (
  source_release_id uuid primary key default gen_random_uuid(), source_name text not null,
  dataset_id text not null, dataset_url text not null, publisher text not null,
  retrieved_at timestamptz not null, source_data_updated_at timestamptz,
  source_metadata_updated_at timestamptz, record_count bigint not null check (record_count >= 0),
  file_size bigint not null check (file_size >= 0), sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  schema_version text not null, data_dictionary_reference text, source_era text not null
    check (source_era in ('MCMIS_CENSUS_CURRENT','MOTUS_CURRENT','LEGACY_LI_HISTORICAL')),
  ingestion_status text not null check (ingestion_status in ('DOWNLOADED','VALIDATED','STAGED','PUBLISHED','FAILED','ROLLED_BACK')),
  created_at timestamptz not null default now(), unique(dataset_id, sha256)
);

create table if not exists move_v2.fmcsa_provider_fact (
  provider_id uuid primary key references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id),
  usdot text not null unique, legal_name text not null, dba_name text, display_name text not null,
  entity_type text, usdot_status text, carrier_operation text, hhg_cargo_reported boolean,
  physical_address jsonb not null default '{}'::jsonb, mailing_address jsonb not null default '{}'::jsonb,
  phone text, power_units integer, drivers integer, source_record_key text not null,
  moving_relevance text not null check (moving_relevance in ('RELEVANT','REVIEW','NOT_CURRENTLY_RELEVANT')),
  relevance_reasons text[] not null default '{}', published_at timestamptz not null default now(),
  unique(source_release_id, source_record_key)
);

create table if not exists move_v2.fmcsa_authority (
  authority_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id), source_record_key text not null,
  usdot text not null, docket_number text, docket_prefix text, authority_type text, authority_status text,
  cargo_required boolean, cargo_on_file boolean, bond_required boolean, bond_on_file boolean,
  minimum_bipd_coverage bigint, bipd_on_file bigint, source_effective_at timestamptz, raw_record_reference text,
  unique(source_release_id, source_record_key)
);

create table if not exists move_v2.fmcsa_authority_event (
  authority_event_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id), source_record_key text not null,
  usdot text not null, docket_number text, authority_type text, authority_status text, reason text,
  status_change_date date, event_kind text not null check(event_kind in ('AUTHORITY_HISTORY','REVOKE_SUSPEND','LEGACY_HISTORY')),
  raw_record_reference text, unique(source_release_id, source_record_key)
);

create table if not exists move_v2.fmcsa_insurance_filing (
  insurance_filing_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id), source_record_key text not null,
  usdot text not null, docket_number text, filing_type text, form_code text, insurance_carrier text,
  effective_date date, policy_reference text, filing_status text, raw_record_reference text,
  unique(source_release_id, source_record_key)
);

create table if not exists move_v2.fmcsa_boc3 (
  boc3_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  source_release_id uuid not null references move_v2.fmcsa_source_release(source_release_id), source_record_key text not null,
  usdot text not null, docket_number text, filed_at date, raw_record_reference text,
  unique(source_release_id, source_record_key)
);

create table if not exists move_v2.fmcsa_classification_result (
  classification_result_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  source_release_ids uuid[] not null, classification text not null, rule_version text not null,
  classified_at timestamptz not null, supporting_facts jsonb not null, reason_codes text[] not null,
  conflicts text[] not null default '{}', superseded_at timestamptz
);
create unique index if not exists fmcsa_current_classification on move_v2.fmcsa_classification_result(provider_id) where superseded_at is null;
create index if not exists fmcsa_fact_state_idx on move_v2.fmcsa_provider_fact ((physical_address->>'state'));
create index if not exists fmcsa_fact_display_name_idx on move_v2.fmcsa_provider_fact using gin (to_tsvector('simple', display_name));
create index if not exists fmcsa_authority_provider_idx on move_v2.fmcsa_authority(provider_id);
create index if not exists fmcsa_authority_docket_idx on move_v2.fmcsa_authority(docket_number);
create index if not exists fmcsa_event_provider_date_idx on move_v2.fmcsa_authority_event(provider_id, status_change_date desc);

alter table move_v2.fmcsa_source_release enable row level security;
alter table move_v2.fmcsa_provider_fact enable row level security;
alter table move_v2.fmcsa_authority enable row level security;
alter table move_v2.fmcsa_authority_event enable row level security;
alter table move_v2.fmcsa_insurance_filing enable row level security;
alter table move_v2.fmcsa_boc3 enable row level security;
alter table move_v2.fmcsa_classification_result enable row level security;
revoke all on all tables in schema move_v2 from anon, authenticated;
