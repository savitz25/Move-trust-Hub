-- =====================================================
-- ARE (Pro) schema parity for mover/ops tables from FREE (uvq).
-- Idempotent — safe to re-run in Supabase SQL Editor on arepfylnilkjmyduhwbz.
-- Does NOT touch auth.users or user Save My Move tables.
-- =====================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------- companies (directory + local onboard) ----------
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
  usdot_number text,
  mc_number text,
  fmcsa_safety_rating text,
  fmcsa_complaints integer default 0,
  fmcsa_shipments integer default 0,
  bbb_rating text,
  bbb_accredited boolean default false,
  overall_rating numeric(3,2),
  review_count integer default 0,
  reputation_score integer default 0,
  years_in_business integer,
  avg_price_per_move integer,
  price_range text,
  coverage text,
  services jsonb default '[]'::jsonb,
  specialties jsonb default '[]'::jsonb,
  rating_breakdown jsonb,
  is_verified boolean default false,
  last_updated timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.companies
  add column if not exists physical_address text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists service_scope text not null default 'interstate',
  add column if not exists coverage_counties jsonb not null default '[]'::jsonb,
  add column if not exists fmcsa_last_checked timestamptz,
  add column if not exists authority_active boolean,
  add column if not exists out_of_service boolean default false,
  add column if not exists complaints_last_12m integer default 0,
  add column if not exists revocation_date date,
  add column if not exists data_hash text,
  add column if not exists fmcsa_legal_name text,
  add column if not exists fmcsa_raw jsonb,
  add column if not exists bbb_last_checked timestamptz,
  add column if not exists complaints_last_36m integer default 0,
  add column if not exists bbb_customer_reviews integer default 0,
  add column if not exists bbb_data_hash text,
  add column if not exists bbb_business_id text,
  add column if not exists bbb_alert_count integer default 0,
  add column if not exists bbb_raw jsonb,
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb,
  add column if not exists verification_sources jsonb not null default '{}'::jsonb,
  add column if not exists verification_last_synced_at timestamptz,
  add column if not exists entity_type text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'companies_service_scope_check') then
    alter table public.companies
      add constraint companies_service_scope_check
      check (service_scope in ('interstate', 'intrastate'));
  end if;
exception when others then null;
end $$;

create index if not exists idx_companies_slug on public.companies (slug);
create index if not exists idx_companies_usdot on public.companies (usdot_number) where usdot_number is not null;
create index if not exists idx_companies_service_scope on public.companies (service_scope);
create index if not exists idx_companies_reputation on public.companies (reputation_score desc);

alter table public.companies enable row level security;
drop policy if exists "Public can read companies" on public.companies;
create policy "Public can read companies" on public.companies for select using (true);
drop policy if exists "Service role can manage companies" on public.companies;
create policy "Service role can manage companies" on public.companies for all using (auth.role() = 'service_role');

-- ---------- company_destination_assignments ----------
create table if not exists public.company_destination_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references public.companies (id) on delete cascade,
  company_slug text not null,
  state_slug text not null,
  county_slug text not null,
  destination_slug text,
  headquarters text,
  source text not null default 'onboarding_approval',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint company_destination_assignments_unique unique (company_id, state_slug, county_slug)
);

create index if not exists idx_company_destination_assignments_county
  on public.company_destination_assignments (state_slug, county_slug);
create index if not exists idx_company_destination_assignments_slug
  on public.company_destination_assignments (company_slug);

alter table public.company_destination_assignments enable row level security;
drop policy if exists company_destination_assignments_public_read on public.company_destination_assignments;
create policy company_destination_assignments_public_read
  on public.company_destination_assignments for select using (true);

-- ---------- company_suggestions ----------
create table if not exists public.company_suggestions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  usdot text,
  mc_number text,
  details text,
  status text not null default 'pending',
  suggested_by_name text,
  suggested_by_email text,
  submitter_ip text,
  ip_hash text,
  email_hash text,
  source_page text,
  legal_name text,
  headquarters text,
  phone text,
  contact_email text,
  authority_status text,
  fmcsa_preview jsonb,
  fmcsa_raw jsonb,
  google_data jsonb,
  public_scrape_data jsonb,
  company_id text,
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  service_scope text not null default 'interstate',
  selected_counties jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.company_suggestions
  add column if not exists service_scope text not null default 'interstate',
  add column if not exists selected_counties jsonb not null default '[]'::jsonb,
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb;

create index if not exists idx_company_suggestions_status
  on public.company_suggestions (status, created_at desc);

alter table public.company_suggestions enable row level security;

-- ---------- reviews (seed/editorial) ----------
create table if not exists public.reviews (
  id text primary key,
  company_id text references public.companies(id) on delete cascade,
  author text not null,
  rating numeric(2,1),
  date date not null,
  source text,
  title text,
  content text not null,
  verified boolean default false,
  location text,
  created_at timestamptz default now()
);

create index if not exists idx_reviews_company on public.reviews (company_id, date desc);
alter table public.reviews enable row level security;
drop policy if exists "Public can read reviews" on public.reviews;
create policy "Public can read reviews" on public.reviews for select using (true);

-- ---------- company_reviews (portal) ----------
create table if not exists public.company_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id text not null,
  user_id uuid,
  reviewer_name text not null,
  reviewer_email text not null,
  rating numeric not null,
  title text,
  content text not null,
  photo_urls jsonb default '[]'::jsonb,
  status text not null default 'pending',
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  submitter_ip text,
  email_hash text not null default '',
  move_date date,
  source_page text,
  verification_tier text default 'email_pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.company_reviews enable row level security;

-- ---------- dot_verifications ----------
create table if not exists public.dot_verifications (
  id uuid primary key default gen_random_uuid(),
  dot_number text not null,
  number_type text not null default 'DOT',
  searched_at timestamptz not null default now(),
  user_ip text,
  source_page text
);

alter table public.dot_verifications enable row level security;

-- ---------- FMCSA refresh ----------
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

alter table public.fmcsa_refresh_runs enable row level security;
alter table public.fmcsa_change_log enable row level security;

-- ---------- BBB refresh ----------
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

alter table public.bbb_refresh_runs enable row level security;
alter table public.bbb_change_log enable row level security;

-- ---------- rate limits ----------
create table if not exists public.suggestion_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,
  email_hash text,
  attempt_count integer default 1,
  window_start timestamptz default now(),
  last_attempt_at timestamptz default now()
);

create table if not exists public.review_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip_hash text,
  email_hash text,
  attempt_count integer default 1,
  window_start timestamptz default now(),
  last_attempt_at timestamptz default now()
);

alter table public.suggestion_rate_limits enable row level security;
alter table public.review_rate_limits enable row level security;

-- ---------- companies_with_stats view (best-effort) ----------
create or replace view public.companies_with_stats as
select
  c.*,
  c.overall_rating as stats_rating,
  c.review_count as stats_review_count
from public.companies c;

notify pgrst, 'reload schema';
