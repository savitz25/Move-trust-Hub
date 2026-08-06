-- =====================================================
-- ARE remaining ops tables for FREE(uvq) → PRO(are) parity
-- Idempotent. Does NOT touch auth.users or Save My Move user data.
-- Run in Supabase SQL Editor on arepfylnilkjmyduhwbz if tables missing.
-- =====================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------- companies enrichment columns (if lagging) ----------
alter table public.companies
  add column if not exists verification_sources jsonb not null default '{}'::jsonb,
  add column if not exists verification_last_synced_at timestamptz,
  add column if not exists service_scope text not null default 'interstate',
  add column if not exists coverage_counties jsonb not null default '[]'::jsonb,
  add column if not exists entity_type text,
  add column if not exists physical_address text,
  add column if not exists phone text,
  add column if not exists email text;

-- ---------- company_verification_backfill_runs ----------
create table if not exists public.company_verification_backfill_runs (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('dry-run', 'live')),
  batch_size integer not null default 25,
  companies_total integer not null default 0,
  companies_processed integer not null default 0,
  companies_updated integer not null default 0,
  companies_failed integer not null default 0,
  error_summary text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists idx_company_verification_backfill_runs_started
  on public.company_verification_backfill_runs (started_at desc);

alter table public.company_verification_backfill_runs enable row level security;
drop policy if exists "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs;
create policy "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs for all
  to service_role using (true) with check (true);

-- ---------- company_verification_status VIEW ----------
create or replace view public.company_verification_status as
select
  c.id,
  c.slug,
  c.name,
  c.usdot_number,
  c.is_verified,
  c.fmcsa_last_checked,
  c.authority_active,
  c.out_of_service,
  c.bbb_last_checked,
  c.bbb_rating,
  c.bbb_accredited,
  c.verification_last_synced_at,
  c.verification_sources,
  case
    when c.fmcsa_last_checked is not null and coalesce(c.authority_active, false) then true
    else false
  end as fmcsa_verified,
  case
    when c.bbb_last_checked is not null then true
    else false
  end as bbb_data_present
from public.companies c;

-- ---------- companies_with_stats VIEW ----------
create or replace view public.companies_with_stats as
select
  c.*,
  coalesce(
    (select count(*)::int from public.reviews r where r.company_id = c.id and coalesce(r.verified, false)),
    0
  ) as verified_review_count
from public.companies c;

-- ---------- FMCSA / BBB audit tables ----------
create table if not exists public.fmcsa_refresh_runs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique,
  mode text,
  status text,
  triggered_by text,
  companies_total integer default 0,
  companies_processed integer default 0,
  companies_updated integer default 0,
  companies_failed integer default 0,
  changes_detected integer default 0,
  error_summary text,
  started_at timestamptz default now(),
  finished_at timestamptz,
  metadata jsonb
);

create table if not exists public.fmcsa_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid,
  company_id text,
  company_slug text,
  company_name text,
  field_name text,
  old_value text,
  new_value text,
  severity text,
  created_at timestamptz default now()
);

create table if not exists public.bbb_refresh_runs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique,
  mode text,
  status text,
  triggered_by text,
  companies_total integer default 0,
  companies_processed integer default 0,
  companies_updated integer default 0,
  companies_failed integer default 0,
  changes_detected integer default 0,
  error_summary text,
  started_at timestamptz default now(),
  finished_at timestamptz,
  metadata jsonb
);

create table if not exists public.bbb_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid,
  company_id text,
  company_slug text,
  company_name text,
  field_name text,
  old_value text,
  new_value text,
  severity text,
  created_at timestamptz default now()
);

alter table public.fmcsa_refresh_runs enable row level security;
alter table public.fmcsa_change_log enable row level security;
alter table public.bbb_refresh_runs enable row level security;
alter table public.bbb_change_log enable row level security;

drop policy if exists "Service role full access fmcsa_refresh_runs" on public.fmcsa_refresh_runs;
create policy "Service role full access fmcsa_refresh_runs"
  on public.fmcsa_refresh_runs for all to service_role using (true) with check (true);
drop policy if exists "Service role full access fmcsa_change_log" on public.fmcsa_change_log;
create policy "Service role full access fmcsa_change_log"
  on public.fmcsa_change_log for all to service_role using (true) with check (true);
drop policy if exists "Service role full access bbb_refresh_runs" on public.bbb_refresh_runs;
create policy "Service role full access bbb_refresh_runs"
  on public.bbb_refresh_runs for all to service_role using (true) with check (true);
drop policy if exists "Service role full access bbb_change_log" on public.bbb_change_log;
create policy "Service role full access bbb_change_log"
  on public.bbb_change_log for all to service_role using (true) with check (true);

-- ---------- moving_companies (parent of company_reviews) ----------
create table if not exists public.moving_companies (
  id uuid primary key default uuid_generate_v4(),
  dot_number text,
  mc_number text,
  slug text not null unique,
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  website text,
  avg_rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  approved_review_count integer not null default 0,
  legacy_company_id text,
  source text not null default 'user_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.moving_companies enable row level security;
drop policy if exists "Public can read moving_companies" on public.moving_companies;
create policy "Public can read moving_companies"
  on public.moving_companies for select using (true);
drop policy if exists "Service role manages moving_companies" on public.moving_companies;
create policy "Service role manages moving_companies"
  on public.moving_companies for all to service_role using (true) with check (true);

-- company_reviews already may exist with FK to moving_companies
create table if not exists public.company_reviews (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.moving_companies(id) on delete cascade,
  user_id uuid,
  reviewer_name text not null,
  reviewer_email text not null,
  rating smallint not null,
  title text,
  content text not null,
  photo_urls jsonb not null default '[]'::jsonb,
  status text not null default 'pending',
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  submitter_ip text,
  email_hash text not null default '',
  move_date date,
  source_page text,
  verification_tier text,
  owner_response text,
  owner_response_at timestamptz,
  owner_response_by text,
  dispute_status text,
  dispute_category text,
  dispute_reason text,
  disputed_at timestamptz,
  disputed_by text,
  dispute_moderation_note text,
  dispute_resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add optional portal columns if table already existed without them
alter table public.company_reviews
  add column if not exists verification_tier text,
  add column if not exists owner_response text,
  add column if not exists owner_response_at timestamptz,
  add column if not exists owner_response_by text,
  add column if not exists dispute_status text,
  add column if not exists dispute_category text,
  add column if not exists dispute_reason text,
  add column if not exists disputed_at timestamptz,
  add column if not exists disputed_by text,
  add column if not exists dispute_moderation_note text,
  add column if not exists dispute_resolved_at timestamptz;

alter table public.company_reviews enable row level security;

-- ---------- lenders ----------
create table if not exists public.lenders (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  nmls_id text not null,
  lender_type text not null default 'Lender',
  city text,
  state text not null,
  state_slug text not null,
  county text not null,
  county_slug text not null,
  zip_codes jsonb not null default '[]'::jsonb,
  rating numeric(3, 2),
  review_count integer not null default 0,
  trust_score integer not null default 0,
  county_experience_score integer not null default 0,
  loan_types jsonb not null default '[]'::jsonb,
  specialties jsonb not null default '[]'::jsonb,
  credit_tiers jsonb not null default '[]'::jsonb,
  nmls_verified boolean not null default true,
  cfpb_complaints integer not null default 0,
  bbb_rating text,
  google_rating numeric(3, 2),
  trustpilot_rating numeric(3, 2),
  short_description text,
  website text,
  phone text,
  is_featured boolean not null default false,
  zero_paid_placement boolean not null default true,
  nmls_preview jsonb,
  google_data jsonb,
  public_scrape_data jsonb,
  cfpb_complaints_data jsonb,
  verification_sources jsonb,
  transparency_note text,
  published_from_onboarding boolean,
  data_freshness_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  google_place_id text,
  google_review_count integer,
  bbb_accredited boolean,
  bbb_complaint_count integer,
  bbb_score text,
  cfpb_complaints_count integer,
  enriched_at timestamptz,
  enrichment_json jsonb
);

create index if not exists lenders_slug_idx on public.lenders (slug);
create index if not exists lenders_state_county_idx on public.lenders (state_slug, county_slug);

alter table public.lenders enable row level security;
drop policy if exists "Public can read lenders" on public.lenders;
create policy "Public can read lenders" on public.lenders for select using (true);
drop policy if exists "Service role manages lenders" on public.lenders;
create policy "Service role manages lenders"
  on public.lenders for all to service_role using (true) with check (true);

create table if not exists public.lender_onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  payload jsonb default '{}'::jsonb
);

create table if not exists public.lender_onboarding_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,
  window_start timestamptz default now(),
  request_count integer default 1
);

alter table public.lender_onboarding_submissions enable row level security;
alter table public.lender_onboarding_rate_limits enable row level security;

-- ---------- magic link rate limits ----------
create table if not exists public.magic_link_rate_limits (
  email_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

create table if not exists public.magic_link_ip_rate_limits (
  ip_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

alter table public.magic_link_rate_limits enable row level security;
alter table public.magic_link_ip_rate_limits enable row level security;
drop policy if exists "Service role manages magic link limits" on public.magic_link_rate_limits;
create policy "Service role manages magic link limits"
  on public.magic_link_rate_limits for all to service_role using (true) with check (true);
drop policy if exists "Service role manages magic link ip limits" on public.magic_link_ip_rate_limits;
create policy "Service role manages magic link ip limits"
  on public.magic_link_ip_rate_limits for all to service_role using (true) with check (true);

-- ---------- my_move activity (FK to auth.users — only copy rows with matching users) ----------
create table if not exists public.my_move_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_my_move_activity_user on public.my_move_activity_events (user_id);
alter table public.my_move_activity_events enable row level security;
drop policy if exists "Service role manages my move activity" on public.my_move_activity_events;
create policy "Service role manages my move activity"
  on public.my_move_activity_events for all to service_role using (true) with check (true);

-- ---------- quote_requests (create if missing; migrator only fills when empty) ----------
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name text,
  email text,
  phone text,
  from_zip text,
  to_zip text,
  move_date date,
  home_size text,
  estimated_volume numeric,
  estimated_weight numeric,
  inventory jsonb,
  notes text,
  destination_slug text,
  market_priority integer,
  source text,
  service_type text default 'moving',
  auto_transport jsonb,
  status text default 'new',
  deleted_at timestamptz
);

alter table public.quote_requests enable row level security;

create table if not exists public.portal_claim_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,
  window_start timestamptz default now(),
  request_count integer default 1
);
alter table public.portal_claim_rate_limits enable row level security;

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text,
  created_at timestamptz default now()
);
alter table public.providers enable row level security;

notify pgrst, 'reload schema';
