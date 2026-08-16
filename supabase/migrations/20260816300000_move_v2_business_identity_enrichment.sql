-- Task 003: additive enrichment state. Regulatory facts remain untouched.
create table if not exists move_v2.enrichment_queue (
  provider_id uuid primary key references move_v2.provider(provider_id), wave text not null,
  sample_groups text[] not null, priority integer not null, status text not null default 'PENDING',
  reuse_candidate jsonb, attempt_count integer not null default 0,
  last_attempt_at timestamptz, completed_at timestamptz, error_code text
);
create index if not exists enrichment_queue_status_priority_idx on move_v2.enrichment_queue(status,priority,provider_id);

create table if not exists move_v2.google_place_match (
  provider_id uuid primary key references move_v2.provider(provider_id), place_id text,
  match_status text not null, score integer, reason_codes text[] not null default '{}',
  conflict_codes text[] not null default '{}', match_rule_version text not null,
  acquisition_method text not null, matched_at timestamptz not null,
  unique(place_id)
);
create index if not exists google_place_match_review_idx on move_v2.google_place_match(match_status,provider_id);

-- Google content is a bounded cache, not permanent evidence. Place ID remains in google_place_match.
create table if not exists move_v2.google_place_cache (
  provider_id uuid primary key references move_v2.provider(provider_id), place_id text not null,
  display_name text, formatted_address text, national_phone text, international_phone text,
  website_uri text, latitude numeric, longitude numeric, business_status text,
  rating numeric, rating_count integer, primary_type text, pure_service_area_business boolean,
  retrieved_at timestamptz not null, expires_at timestamptz not null,
  source_payload jsonb not null default '{}'
);
create index if not exists google_place_cache_place_idx on move_v2.google_place_cache(place_id);

create table if not exists move_v2.enrichment_request_ledger (
  request_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  request_type text not null, idempotency_key text not null unique, requested_at timestamptz not null,
  response_status text not null, billable_count integer not null default 0, run_id text not null
);
create index if not exists enrichment_request_run_idx on move_v2.enrichment_request_ledger(run_id,request_type);

create table if not exists move_v2.provider_website_identity (
  provider_id uuid primary key references move_v2.provider(provider_id), website_url text not null,
  normalized_domain text not null, match_status text not null, match_confidence numeric,
  reason_codes text[] not null default '{}', conflict_codes text[] not null default '{}',
  source_type text not null, source_reference text, verified_at timestamptz not null
);
create index if not exists provider_website_domain_idx on move_v2.provider_website_identity(normalized_domain);

create table if not exists move_v2.provider_published_observation (
  observation_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  observation_type text not null, observation_value text not null, normalized_value text not null,
  source_url text not null, retrieved_at timestamptz not null, confidence numeric not null,
  evidence_excerpt text, unique(provider_id,observation_type,normalized_value,source_url)
);
create index if not exists provider_published_observation_provider_idx on move_v2.provider_published_observation(provider_id,observation_type);

create table if not exists move_v2.provider_business_location (
  location_id uuid primary key default gen_random_uuid(), provider_id uuid not null references move_v2.provider(provider_id),
  location_type text not null, label text, address text not null, normalized_address text not null,
  phone text, latitude numeric, longitude numeric, source_url text not null,
  retrieved_at timestamptz not null, confidence numeric not null,
  unique(provider_id,normalized_address,source_url)
);
create index if not exists provider_business_location_provider_idx on move_v2.provider_business_location(provider_id);

create table if not exists move_v2.provider_geography_evidence (
  provider_id uuid primary key references move_v2.provider(provider_id),
  evidence_status text not null check(evidence_status in ('SERVICE_AREA_EXPLICIT','SERVICE_AREA_PARTIAL','SERVICE_AREA_NOT_FOUND','SERVICE_AREA_REVIEW')),
  derived_service_area_required boolean not null,
  explicit_observation_count integer not null default 0,
  rule_version text not null, evaluated_at timestamptz not null,
  check(not derived_service_area_required or evidence_status='SERVICE_AREA_NOT_FOUND')
);

alter table move_v2.enrichment_queue enable row level security;
alter table move_v2.google_place_match enable row level security;
alter table move_v2.google_place_cache enable row level security;
alter table move_v2.enrichment_request_ledger enable row level security;
alter table move_v2.provider_website_identity enable row level security;
alter table move_v2.provider_published_observation enable row level security;
alter table move_v2.provider_business_location enable row level security;
alter table move_v2.provider_geography_evidence enable row level security;
revoke all on move_v2.enrichment_queue,move_v2.google_place_match,move_v2.google_place_cache,
  move_v2.enrichment_request_ledger,move_v2.provider_website_identity,
  move_v2.provider_published_observation,move_v2.provider_business_location,
  move_v2.provider_geography_evidence from anon,authenticated;
