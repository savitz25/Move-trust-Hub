-- Task 004: additive state-regulator evidence and derived local eligibility.
create table if not exists move_v2.state_source_release (
  state_source_release_id uuid primary key default gen_random_uuid(),
  state text not null check (state in ('NJ','FL')), regulator text not null,
  source_name text not null, source_url text not null, source_class text not null
    check (source_class in ('STATE_REGULATOR_CURRENT','STATE_REGULATOR_HISTORY','STATE_ENFORCEMENT')),
  retrieved_at timestamptz not null, source_updated_at timestamptz,
  record_count integer check(record_count >= 0), sha256 text,
  adapter_version text not null, retrieval_method text not null,
  ingestion_status text not null check(ingestion_status in ('VALIDATED','BOUNDED_PILOT','PUBLISHED','FAILED')),
  unique(state,source_url,retrieved_at)
);

create table if not exists move_v2.state_authority_source_record (
  state_authority_source_record_id uuid primary key default gen_random_uuid(),
  state_source_release_id uuid not null references move_v2.state_source_release(state_source_release_id),
  state text not null, authority_type text not null, license_registration_number text not null,
  status text not null, effective_date date, expiration_date date,
  legal_name text not null, dba_name text, address jsonb not null default '{}', phone text,
  source_record_reference text not null, source_record_hash text not null,
  raw_record jsonb not null, created_at timestamptz not null default now(),
  unique(state_source_release_id,source_record_reference)
);

create table if not exists move_v2.provider_state_authority_match (
  provider_state_authority_match_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id),
  state_authority_source_record_id uuid references move_v2.state_authority_source_record(state_authority_source_record_id),
  state text not null, match_status text not null check(match_status in
    ('STATE_MATCH_HIGH_CONFIDENCE','STATE_MATCH_REVIEW','STATE_NOT_FOUND','STATE_MULTIPLE_PLAUSIBLE_MATCHES')),
  match_score integer, reason_codes text[] not null default '{}', conflict_codes text[] not null default '{}',
  match_rule_version text not null, matched_at timestamptz not null,
  unique nulls not distinct(provider_id,state,state_authority_source_record_id,match_rule_version)
);

create table if not exists move_v2.provider_local_eligibility (
  provider_local_eligibility_id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references move_v2.provider(provider_id), state text not null,
  eligibility text not null check(eligibility in
    ('STATE_VERIFIED_LOCAL_MOVER','STATE_VERIFIED_MOVING_BROKER','STATE_INACTIVE_LOCAL_MOVER','STATE_AUTHORITY_NOT_FOUND','STATE_AUTHORITY_REVIEW')),
  rule_version text not null, reason_codes text[] not null default '{}',
  state_authority_source_record_ids uuid[] not null default '{}', evaluated_at timestamptz not null,
  superseded_at timestamptz
);
create unique index if not exists provider_current_local_eligibility_idx
  on move_v2.provider_local_eligibility(provider_id,state) where superseded_at is null;

create table if not exists move_v2.state_lookup_ledger (
  state_lookup_id uuid primary key default gen_random_uuid(), state text not null,
  provider_id uuid references move_v2.provider(provider_id), request_kind text not null,
  query_fingerprint text not null, source_url text not null, requested_at timestamptz not null,
  response_status text not null, cache_reference text, adapter_version text not null,
  unique(state,query_fingerprint,adapter_version)
);

create index if not exists state_authority_license_idx on move_v2.state_authority_source_record(state,license_registration_number);
create index if not exists state_authority_name_idx on move_v2.state_authority_source_record(state,legal_name);
create index if not exists state_match_provider_idx on move_v2.provider_state_authority_match(provider_id,state,match_status);
create index if not exists local_eligibility_state_idx on move_v2.provider_local_eligibility(state,eligibility,provider_id) where superseded_at is null;
create index if not exists service_area_provider_scope_idx on move_v2.provider_service_area(provider_id,authority_scope);

alter table move_v2.state_source_release enable row level security;
alter table move_v2.state_authority_source_record enable row level security;
alter table move_v2.provider_state_authority_match enable row level security;
alter table move_v2.provider_local_eligibility enable row level security;
alter table move_v2.state_lookup_ledger enable row level security;
revoke all on move_v2.state_source_release,move_v2.state_authority_source_record,
  move_v2.provider_state_authority_match,move_v2.provider_local_eligibility,
  move_v2.state_lookup_ledger from anon,authenticated;
