-- Move Trust Hub: key migrations bundle (safe to re-run)
-- Paste entire file in Supabase SQL Editor.


-- ===== BASELINE schema.sql =====
-- =====================================================
-- Move Trust Hub - Supabase PostgreSQL Schema
-- =====================================================
-- Run this in Supabase SQL Editor to set up your database.
-- Then use the seed script or Supabase dashboard to populate data.

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- =====================================================
-- COMPANIES TABLE
-- =====================================================
create table if not exists public.companies (
  id text primary key,
  slug text unique not null,
  name text not null,
  logo text,
  short_description text,
  description text,
  founded_year integer,
  headquarters text,
  website text,

  -- FMCSA & Licensing
  usdot_number text,
  mc_number text,
  fmcsa_safety_rating text check (fmcsa_safety_rating in ('Satisfactory','Conditional','Unsatisfactory','Not Rated')),
  fmcsa_complaints integer default 0,
  fmcsa_shipments integer default 0,
  bbb_rating text,
  bbb_accredited boolean default false,

  -- Reputation metrics
  overall_rating numeric(3,2) check (overall_rating >= 0 and overall_rating <= 5),
  review_count integer default 0,
  reputation_score integer default 0 check (reputation_score >= 0 and reputation_score <= 100),

  -- Business
  years_in_business integer,
  avg_price_per_move integer,
  price_range text,

  -- Coverage
  coverage text,
  services jsonb default '[]'::jsonb,        -- array of service types
  specialties jsonb default '[]'::jsonb,    -- array of strings

  -- Rating breakdown
  rating_breakdown jsonb,

  is_verified boolean default false,
  last_updated timestamptz default now(),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for fast filtering/sorting
create index if not exists idx_companies_slug on public.companies (slug);
create index if not exists idx_companies_reputation on public.companies (reputation_score desc);
create index if not exists idx_companies_rating on public.companies (overall_rating desc);
create index if not exists idx_companies_reviews on public.companies (review_count desc);
create index if not exists idx_companies_price on public.companies (avg_price_per_move);
create index if not exists idx_companies_verified on public.companies (is_verified);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
create table if not exists public.reviews (
  id text primary key,
  company_id text references public.companies(id) on delete cascade,
  author text not null,
  rating numeric(2,1) check (rating >= 1 and rating <= 5),
  date date not null,
  source text check (source in ('Google','BBB','Trustpilot','Yelp','MoverReviews','Verified Customer')),
  title text,
  content text not null,
  verified boolean default false,
  location text,

  created_at timestamptz default now()
);

create index if not exists idx_reviews_company on public.reviews (company_id, date desc);
create index if not exists idx_reviews_rating on public.reviews (rating);

-- =====================================================
-- USER SAVED COMPARISONS (optional future feature)
-- =====================================================
create table if not exists public.saved_comparisons (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  company_slugs text[] not null,
  name text,
  created_at timestamptz default now()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
alter table public.companies enable row level security;
alter table public.reviews enable row level security;
alter table public.saved_comparisons enable row level security;

-- Public read access for directory (anyone can read companies + reviews)
drop policy if exists "Public can read companies" on public.companies;
create policy "Public can read companies"
  on public.companies for select
  using (true);

drop policy if exists "Public can read reviews" on public.reviews;
create policy "Public can read reviews"
  on public.reviews for select
  using (true);

-- Only authenticated admin users (you) can insert/update companies & reviews.
-- For demo / simplicity, allow service_role or use admin dashboard with RLS later.
-- For production: Create an "admin" role or use Supabase Edge Functions + service key.

drop policy if exists "Service role can manage companies" on public.companies;
create policy "Service role can manage companies"
  on public.companies for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role can manage reviews" on public.reviews;
create policy "Service role can manage reviews"
  on public.reviews for all
  to service_role
  using (true) with check (true);

-- Users can manage only their own saved comparisons
drop policy if exists "Users can manage own saved comparisons" on public.saved_comparisons;
create policy "Users can manage own saved comparisons"
  on public.saved_comparisons for all
  using (auth.uid() = user_id);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists companies_updated_at on public.companies;
create trigger companies_updated_at
  before update on public.companies
  for each row execute procedure public.handle_updated_at();

-- =====================================================
-- USEFUL VIEWS (optional)
-- =====================================================
create or replace view public.companies_with_stats as
select 
  c.*,
  (select count(*) from public.reviews r where r.company_id = c.id and r.verified) as verified_review_count
from public.companies c;

-- =====================================================
-- QUOTE REQUESTS (Lead capture from "Get Free Quotes" form)
-- =====================================================
create table if not exists public.quote_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  from_zip text not null,
  to_zip text not null,
  move_date date,
  home_size text,
  estimated_volume numeric,
  notes text,
  destination_slug text,
  market_priority smallint,
  source text default 'website',
  created_at timestamptz default now()
);

create index if not exists idx_quote_requests_created on public.quote_requests (created_at desc);
create index if not exists idx_quote_requests_email on public.quote_requests (email);
create index if not exists idx_quote_requests_destination on public.quote_requests (destination_slug) where destination_slug is not null;

-- RLS: Public can submit leads (insert only). No public read.
alter table public.quote_requests enable row level security;

drop policy if exists "Anyone can submit quote requests" on public.quote_requests;
create policy "Anyone can submit quote requests"
  on public.quote_requests for insert
  with check (true);

drop policy if exists "Service role can manage quote requests" on public.quote_requests;
create policy "Service role can manage quote requests"
  on public.quote_requests for all
  to service_role
  using (true) with check (true);

comment on table public.quote_requests is 'Lead capture from Get Free Quotes modal. Contains contact + move details for matching with movers.';

-- =====================================================
-- SEED DATA NOTES
-- =====================================================
-- After running this schema:
-- 1. Use the included scripts/seed.ts (or Supabase Data Editor) to insert rows from data/seed-companies.ts and seed-reviews.ts
-- 2. Or copy/paste INSERT statements generated from seed data.
-- 3. For production, replace seed with real scraped/imported data and set up regular refresh jobs.

comment on table public.companies is 'Core directory of interstate moving companies with FMCSA, BBB, pricing, and reputation data.';
comment on table public.reviews is 'Aggregated customer reviews from multiple sources. verified = true indicates confirmed customer move.';


-- ===== FMCSA pipeline =====
-- FMCSA automated refresh pipeline
-- Adds tracking columns to companies + run/change log tables

-- =====================================================
-- COMPANIES: FMCSA refresh columns
-- =====================================================
alter table public.companies
  add column if not exists fmcsa_last_checked timestamptz,
  add column if not exists authority_active boolean,
  add column if not exists out_of_service boolean default false,
  add column if not exists complaints_last_12m integer default 0,
  add column if not exists revocation_date date,
  add column if not exists data_hash text,
  add column if not exists fmcsa_legal_name text,
  add column if not exists fmcsa_raw jsonb;

comment on column public.companies.fmcsa_last_checked is 'Last FMCSA API/SAFER refresh timestamp (UTC)';
comment on column public.companies.authority_active is 'True when FMCSA reports active operating authority';
comment on column public.companies.out_of_service is 'True when carrier has an active OOS order';
comment on column public.companies.complaints_last_12m is 'FMCSA-reported complaints in trailing 12 months';
comment on column public.companies.revocation_date is 'Most recent authority revocation date from FMCSA';
comment on column public.companies.data_hash is 'SHA-256 of normalized FMCSA snapshot for change detection';
comment on column public.companies.fmcsa_raw is 'Latest raw FMCSA API payload (debugging / future fields)';

create index if not exists idx_companies_fmcsa_last_checked
  on public.companies (fmcsa_last_checked nulls first);

create index if not exists idx_companies_data_hash
  on public.companies (data_hash)
  where data_hash is not null;

-- =====================================================
-- REFRESH RUNS (job audit + idempotency)
-- =====================================================
create table if not exists public.fmcsa_refresh_runs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique not null,
  mode text not null check (mode in ('incremental', 'full')),
  status text not null default 'running'
    check (status in ('running', 'completed', 'failed', 'partial')),
  triggered_by text not null default 'cron'
    check (triggered_by in ('cron', 'github', 'admin', 'api')),
  companies_total integer not null default 0,
  companies_processed integer not null default 0,
  companies_updated integer not null default 0,
  companies_failed integer not null default 0,
  changes_detected integer not null default 0,
  error_summary text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists idx_fmcsa_refresh_runs_started
  on public.fmcsa_refresh_runs (started_at desc);

-- =====================================================
-- CHANGE LOG (per-company diffs)
-- =====================================================
create table if not exists public.fmcsa_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.fmcsa_refresh_runs(id) on delete set null,
  company_id text not null references public.companies(id) on delete cascade,
  company_slug text,
  company_name text,
  field_name text not null,
  old_value text,
  new_value text,
  severity text not null default 'info'
    check (severity in ('info', 'warning', 'critical')),
  created_at timestamptz not null default now()
);

create index if not exists idx_fmcsa_change_log_created
  on public.fmcsa_change_log (created_at desc);

create index if not exists idx_fmcsa_change_log_company
  on public.fmcsa_change_log (company_id, created_at desc);

create index if not exists idx_fmcsa_change_log_severity
  on public.fmcsa_change_log (severity, created_at desc)
  where severity in ('warning', 'critical');

-- RLS: service_role only (admin client)
alter table public.fmcsa_refresh_runs enable row level security;
alter table public.fmcsa_change_log enable row level security;

drop policy if exists "Service role full access fmcsa_refresh_runs" on public.fmcsa_refresh_runs;
create policy "Service role full access fmcsa_refresh_runs"
  on public.fmcsa_refresh_runs for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role full access fmcsa_change_log" on public.fmcsa_change_log;
create policy "Service role full access fmcsa_change_log"
  on public.fmcsa_change_log for all
  to service_role
  using (true) with check (true);

-- ===== BBB pipeline =====
-- BBB automated refresh pipeline (mirrors FMCSA refresh system)

-- =====================================================
-- COMPANIES: BBB refresh columns
-- =====================================================
alter table public.companies
  add column if not exists bbb_last_checked timestamptz,
  add column if not exists complaints_last_36m integer default 0,
  add column if not exists bbb_customer_reviews integer default 0,
  add column if not exists bbb_data_hash text,
  add column if not exists bbb_business_id text,
  add column if not exists bbb_alert_count integer default 0,
  add column if not exists bbb_raw jsonb;

comment on column public.companies.bbb_last_checked is 'Last BBB API refresh timestamp (UTC)';
comment on column public.companies.complaints_last_36m is 'BBB-reported complaints in trailing 36 months';
comment on column public.companies.bbb_customer_reviews is 'BBB customer review count';
comment on column public.companies.bbb_data_hash is 'SHA-256 of normalized BBB snapshot for change detection';
comment on column public.companies.bbb_business_id is 'Cached BBB org id (format: {sourceBbbId}-{businessId})';
comment on column public.companies.bbb_alert_count is 'Active BBB alerts on business profile';
comment on column public.companies.bbb_raw is 'Latest raw BBB API payload';

create index if not exists idx_companies_bbb_last_checked
  on public.companies (bbb_last_checked nulls first);

create index if not exists idx_companies_bbb_data_hash
  on public.companies (bbb_data_hash)
  where bbb_data_hash is not null;

create index if not exists idx_companies_bbb_business_id
  on public.companies (bbb_business_id)
  where bbb_business_id is not null;

-- =====================================================
-- REFRESH RUNS
-- =====================================================
create table if not exists public.bbb_refresh_runs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique not null,
  mode text not null check (mode in ('incremental', 'full')),
  status text not null default 'running'
    check (status in ('running', 'completed', 'failed', 'partial')),
  triggered_by text not null default 'cron'
    check (triggered_by in ('cron', 'github', 'admin', 'api')),
  companies_total integer not null default 0,
  companies_processed integer not null default 0,
  companies_updated integer not null default 0,
  companies_failed integer not null default 0,
  changes_detected integer not null default 0,
  error_summary text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists idx_bbb_refresh_runs_started
  on public.bbb_refresh_runs (started_at desc);

-- =====================================================
-- CHANGE LOG
-- =====================================================
create table if not exists public.bbb_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.bbb_refresh_runs(id) on delete set null,
  company_id text not null references public.companies(id) on delete cascade,
  company_slug text,
  company_name text,
  field_name text not null,
  old_value text,
  new_value text,
  severity text not null default 'info'
    check (severity in ('info', 'warning', 'critical')),
  created_at timestamptz not null default now()
);

create index if not exists idx_bbb_change_log_created
  on public.bbb_change_log (created_at desc);

create index if not exists idx_bbb_change_log_company
  on public.bbb_change_log (company_id, created_at desc);

create index if not exists idx_bbb_change_log_severity
  on public.bbb_change_log (severity, created_at desc)
  where severity in ('warning', 'critical');

alter table public.bbb_refresh_runs enable row level security;
alter table public.bbb_change_log enable row level security;

drop policy if exists "Service role full access bbb_refresh_runs" on public.bbb_refresh_runs;
create policy "Service role full access bbb_refresh_runs"
  on public.bbb_refresh_runs for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role full access bbb_change_log" on public.bbb_change_log;
create policy "Service role full access bbb_change_log"
  on public.bbb_change_log for all
  to service_role
  using (true) with check (true);

-- ===== Company suggestions =====
-- =====================================================
-- User-submitted company suggestions for directory
-- Move Trust Hub
-- =====================================================

create table if not exists public.company_suggestions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  usdot text,
  mc_number text,
  details text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  suggested_by_name text,
  suggested_by_email text,
  submitter_ip text,
  ip_hash text,
  email_hash text,
  source_page text,
  legal_name text,
  headquarters text,
  phone text,
  authority_status text,
  fmcsa_preview jsonb,
  fmcsa_raw jsonb,
  company_id text references public.companies(id) on delete set null,
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_company_suggestions_status
  on public.company_suggestions (status, created_at desc);

create index if not exists idx_company_suggestions_usdot
  on public.company_suggestions (usdot)
  where usdot is not null;

create index if not exists idx_company_suggestions_email_hash
  on public.company_suggestions (email_hash, created_at desc);

create unique index if not exists idx_company_suggestions_pending_usdot
  on public.company_suggestions (usdot)
  where status = 'pending' and usdot is not null;

comment on table public.company_suggestions is
  'User-submitted missing carrier suggestions. Moderated before insertion into companies.';

-- Rate limit tracking for suggestion submissions
create table if not exists public.suggestion_rate_limits (
  id uuid primary key default uuid_generate_v4(),
  ip_hash text not null,
  email_hash text,
  created_at timestamptz not null default now()
);

create index if not exists idx_suggestion_rate_limits_ip
  on public.suggestion_rate_limits (ip_hash, created_at desc);

drop trigger if exists company_suggestions_updated_at on public.company_suggestions;
create trigger company_suggestions_updated_at
  before update on public.company_suggestions
  for each row execute procedure public.handle_updated_at();

-- RLS
alter table public.company_suggestions enable row level security;
alter table public.suggestion_rate_limits enable row level security;

drop policy if exists "Service role manages company suggestions" on public.company_suggestions;
create policy "Service role manages company suggestions"
  on public.company_suggestions for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages suggestion rate limits" on public.suggestion_rate_limits;
create policy "Service role manages suggestion rate limits"
  on public.suggestion_rate_limits for all
  to service_role
  using (true) with check (true);

-- ===== Multi-source verification =====
-- Multi-source company verification (FMCSA + BBB + manual/suggestion pipeline)
-- Fixes service_role RLS bindings and adds backfill audit support.

-- =====================================================
-- COMPANIES: aggregated verification snapshot
-- =====================================================
alter table public.companies
  add column if not exists verification_sources jsonb not null default '{}'::jsonb,
  add column if not exists verification_last_synced_at timestamptz;

comment on column public.companies.verification_sources is
  'Per-source verification snapshot, e.g. { "fmcsa": { "checked_at": "...", "active": true }, "bbb": { ... } }';
comment on column public.companies.verification_last_synced_at is
  'Last multi-source verification backfill or refresh timestamp (UTC)';

create index if not exists idx_companies_verification_last_synced
  on public.companies (verification_last_synced_at nulls first);

-- =====================================================
-- BACKFILL RUN AUDIT (scripts/backfill-company-verification.ts)
-- =====================================================
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

comment on table public.company_verification_backfill_runs is
  'Audit log for FMCSA/BBB verification backfill batches.';

alter table public.company_verification_backfill_runs enable row level security;

drop policy if exists "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs;
create policy "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs for all
  to service_role
  using (true) with check (true);

-- =====================================================
-- RLS FIX: use role binding (matches company_suggestions)
-- =====================================================
drop policy if exists "Service role full access fmcsa_refresh_runs" on public.fmcsa_refresh_runs;
create policy "Service role full access fmcsa_refresh_runs"
  on public.fmcsa_refresh_runs for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role full access fmcsa_change_log" on public.fmcsa_change_log;
create policy "Service role full access fmcsa_change_log"
  on public.fmcsa_change_log for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role can manage companies" on public.companies;
create policy "Service role can manage companies"
  on public.companies for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role can manage reviews" on public.reviews;
create policy "Service role can manage reviews"
  on public.reviews for all
  to service_role
  using (true) with check (true);

-- Helpful read model for admin dashboards
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

comment on view public.company_verification_status is
  'Multi-source verification summary for directory companies (FMCSA + BBB + manual).';
