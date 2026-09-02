-- NJ-MOVE-001 — reusable state-regulatory ledger for Public Movers & Warehousemen
-- and later states. Additive. Internal-only. No NJ-only company table.
-- Does not publish profiles, sitemaps, or consumer rankings.
-- NJ intrastate authority is not FMCSA interstate authority.

alter table public.provider_state_authority
  drop constraint if exists provider_state_authority_authority_type_check;
alter table public.provider_state_authority
  add constraint provider_state_authority_authority_type_check
  check (authority_type in (
    'intrastate_hhg_carrier',
    'intrastate_hhg_broker',
    'intrastate_mover_registration',
    'intrastate_certificate',
    'local_mover_license',
    'warehouse',
    'intrastate_public_mover',
    'intrastate_public_warehouseman',
    'intrastate_public_mover_and_warehouseman',
    'other'
  ));

create table if not exists public.state_hhg_source_coverage (
  id uuid primary key default gen_random_uuid(),
  source_dataset text not null,
  source_family text not null,
  source_url text,
  source_hash text,
  coverage_state text not null check (coverage_state in (
    'ACQUIRED_COMPLETE','ACQUIRED_CURRENT_SNAPSHOT','ACQUIRED_PARTIAL_HISTORY',
    'PARTIAL_SOURCE_COVERAGE','OPEN_SEARCH_ONLY','SOURCE_AVAILABLE_BY_REQUEST',
    'SOURCE_NOT_ACQUIRED','SOURCE_ACCESS_BLOCKED','SOURCE_UNVERIFIED'
  )),
  retrieved_at timestamptz,
  notes text,
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists uq_state_hhg_source_coverage
  on public.state_hhg_source_coverage (source_dataset, source_family, coalesce(source_url, ''));

comment on table public.state_hhg_source_coverage is
  'Official source acquisition state. Unavailable evidence is never a zero finding.';

create table if not exists public.state_hhg_regulatory_events (
  id uuid primary key default gen_random_uuid(),
  source_dataset text not null,
  source_family text not null,
  event_fingerprint text not null check (event_fingerprint ~ '^[a-f0-9]{64}$'),
  event_class text not null,
  operation text,
  order_number text,
  nov_number text,
  docket text,
  respondent_caption text not null,
  event_date date,
  proposed_penalty numeric,
  final_penalty numeric,
  disposition text,
  source_url text,
  document_hash text,
  company_id text references public.companies(id) on delete set null,
  public_eligibility text not null default 'internal_only' check (public_eligibility in (
    'internal_only','review_required','public_candidate'
  )),
  monitoring_state text not null default 'baseline_only',
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (source_dataset, event_fingerprint)
);

comment on table public.state_hhg_regulatory_events is
  'State regulatory events. NOV is not a final order. Events may exist without a matched carrier.';

create table if not exists public.state_hhg_event_parties (
  id uuid primary key default gen_random_uuid(),
  event_fingerprint text not null,
  source_dataset text not null,
  party_type text not null,
  legal_name text not null,
  role_in_event text not null default 'respondent',
  nj_license_number text,
  usdot text,
  mc_number text,
  match_status text not null default 'UNRESOLVED',
  match_method text,
  company_id text references public.companies(id) on delete set null,
  public_eligibility text not null default 'internal_only',
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists uq_state_hhg_event_parties
  on public.state_hhg_event_parties (
    source_dataset, event_fingerprint, legal_name, party_type, coalesce(nj_license_number, '')
  );

create table if not exists public.state_hhg_regulatory_documents (
  id uuid primary key default gen_random_uuid(),
  canonical_document_id text not null,
  content_hash text not null check (content_hash ~ '^[a-f0-9]{64}$'),
  source_url text,
  document_type text,
  byte_length bigint not null default 0,
  public_eligibility text not null default 'internal_only',
  raw_metadata jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  unique (canonical_document_id),
  unique (content_hash)
);

create table if not exists public.state_hhg_locations (
  id uuid primary key default gen_random_uuid(),
  state_code text not null check (char_length(state_code) = 2),
  authority_number text,
  location_kind text not null check (location_kind in (
    'BUSINESS_HEADQUARTERS','MOVER_OPERATING_LOCATION','WAREHOUSE_LOCATION',
    'MAILING_ADDRESS','OTHER_OFFICIAL_LOCATION'
  )),
  address text,
  city text,
  county text,
  postal_code text,
  company_id text references public.companies(id) on delete set null,
  public_eligibility text not null default 'internal_only',
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.state_hhg_identity_matches (
  id uuid primary key default gen_random_uuid(),
  state_code text not null,
  state_license_number text,
  usdot text,
  mc_number text,
  match_status text not null check (match_status in (
    'EXACT','HIGH_CONFIDENCE','REVIEW_REQUIRED','CONFLICT','UNRESOLVED','UNSAFE_REJECTED'
  )),
  match_method text,
  company_id text references public.companies(id) on delete set null,
  auto_attach boolean not null default false,
  public_eligibility text not null default 'internal_only',
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.state_hhg_monitoring_events (
  id uuid primary key default gen_random_uuid(),
  source_dataset text not null,
  source_family text not null,
  event_key text not null,
  event_kind text not null,
  baseline_only boolean not null default true,
  alerted boolean not null default false,
  jurisdiction text not null default 'NJ',
  publication_allowed boolean not null default false,
  raw_value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (source_dataset, event_key)
);

comment on table public.state_hhg_monitoring_events is
  'First snapshot of every family is baseline-only. Prefer state license number and NOV/order/docket keys.';

alter table public.state_hhg_source_coverage enable row level security;
alter table public.state_hhg_source_coverage force row level security;
alter table public.state_hhg_regulatory_events enable row level security;
alter table public.state_hhg_regulatory_events force row level security;
alter table public.state_hhg_event_parties enable row level security;
alter table public.state_hhg_event_parties force row level security;
alter table public.state_hhg_regulatory_documents enable row level security;
alter table public.state_hhg_regulatory_documents force row level security;
alter table public.state_hhg_locations enable row level security;
alter table public.state_hhg_locations force row level security;
alter table public.state_hhg_identity_matches enable row level security;
alter table public.state_hhg_identity_matches force row level security;
alter table public.state_hhg_monitoring_events enable row level security;
alter table public.state_hhg_monitoring_events force row level security;

drop policy if exists "Service role manages state hhg source coverage" on public.state_hhg_source_coverage;
drop policy if exists "Service role manages state hhg regulatory events" on public.state_hhg_regulatory_events;
drop policy if exists "Service role manages state hhg event parties" on public.state_hhg_event_parties;
drop policy if exists "Service role manages state hhg regulatory documents" on public.state_hhg_regulatory_documents;
drop policy if exists "Service role manages state hhg locations" on public.state_hhg_locations;
drop policy if exists "Service role manages state hhg identity matches" on public.state_hhg_identity_matches;
drop policy if exists "Service role manages state hhg monitoring events" on public.state_hhg_monitoring_events;

create policy "Service role manages state hhg source coverage"
  on public.state_hhg_source_coverage for all to service_role using (true) with check (true);
create policy "Service role manages state hhg regulatory events"
  on public.state_hhg_regulatory_events for all to service_role using (true) with check (true);
create policy "Service role manages state hhg event parties"
  on public.state_hhg_event_parties for all to service_role using (true) with check (true);
create policy "Service role manages state hhg regulatory documents"
  on public.state_hhg_regulatory_documents for all to service_role using (true) with check (true);
create policy "Service role manages state hhg locations"
  on public.state_hhg_locations for all to service_role using (true) with check (true);
create policy "Service role manages state hhg identity matches"
  on public.state_hhg_identity_matches for all to service_role using (true) with check (true);
create policy "Service role manages state hhg monitoring events"
  on public.state_hhg_monitoring_events for all to service_role using (true) with check (true);

revoke all on public.state_hhg_source_coverage from anon, authenticated;
revoke all on public.state_hhg_regulatory_events from anon, authenticated;
revoke all on public.state_hhg_event_parties from anon, authenticated;
revoke all on public.state_hhg_regulatory_documents from anon, authenticated;
revoke all on public.state_hhg_locations from anon, authenticated;
revoke all on public.state_hhg_identity_matches from anon, authenticated;
revoke all on public.state_hhg_monitoring_events from anon, authenticated;
