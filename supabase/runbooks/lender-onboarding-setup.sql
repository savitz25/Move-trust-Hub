-- =====================================================
-- Lender onboarding — paste entire file into Supabase SQL Editor
-- Run once. Fixes: relation "public.lenders" does not exist
-- =====================================================

-- ── Part 1: lenders table (required FK target) ─────────────────────────────

create table if not exists public.lenders (
  id text primary key,
  slug text not null unique,
  name text not null,
  nmls_id text not null,
  lender_type text not null default 'Mortgage',
  city text,
  state text not null,
  state_slug text not null,
  county text not null,
  county_slug text not null,
  zip_codes jsonb not null default '[]'::jsonb,
  rating numeric(3,2),
  review_count integer not null default 0,
  trust_score numeric(5,2) not null default 0,
  county_experience_score numeric(5,2) not null default 0,
  loan_types jsonb not null default '[]'::jsonb,
  specialties jsonb not null default '[]'::jsonb,
  credit_tiers jsonb not null default '[]'::jsonb,
  nmls_verified boolean not null default false,
  cfpb_complaints integer not null default 0,
  bbb_rating text,
  google_rating numeric(3,2),
  trustpilot_rating numeric(3,2),
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
  published_from_onboarding boolean not null default false,
  data_freshness_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lenders_nmls_id on public.lenders (nmls_id);
create index if not exists idx_lenders_state_county on public.lenders (state_slug, county_slug);
create index if not exists idx_lenders_published on public.lenders (published_from_onboarding, updated_at desc);

drop trigger if exists lenders_updated_at on public.lenders;
create trigger lenders_updated_at
  before update on public.lenders
  for each row execute procedure public.handle_updated_at();

alter table public.lenders enable row level security;

drop policy if exists "Service role manages lenders" on public.lenders;
create policy "Service role manages lenders"
  on public.lenders for all
  to service_role
  using (true) with check (true);

drop policy if exists "Public read published lenders" on public.lenders;
create policy "Public read published lenders"
  on public.lenders for select
  to anon, authenticated
  using (true);

-- ── Part 2: onboarding queue ───────────────────────────────────────────────

create table if not exists public.lender_onboarding_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  nmls_id text not null,
  lender_type text default 'Mortgage',
  details text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'draft')),
  submitted_by_name text,
  submitted_by_email text,
  submitter_ip text,
  ip_hash text,
  email_hash text,
  source_page text,
  legal_name text,
  street_address text,
  city text,
  state text,
  zip text,
  phone text,
  fax text,
  website text,
  business_email text,
  date_formed text,
  nmls_preview jsonb,
  nmls_raw jsonb,
  google_data jsonb,
  public_scrape_data jsonb,
  cfpb_data jsonb,
  county_slug text,
  state_slug text,
  county_experience_score numeric(5,2) default 0,
  lender_id text references public.lenders(id) on delete set null,
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  needs_manual_review boolean not null default false,
  transparency_disclaimer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lender_onboarding_status
  on public.lender_onboarding_submissions (status, created_at desc);

create index if not exists idx_lender_onboarding_nmls
  on public.lender_onboarding_submissions (nmls_id);

create index if not exists idx_lender_onboarding_email_hash
  on public.lender_onboarding_submissions (email_hash, created_at desc);

create unique index if not exists idx_lender_onboarding_pending_nmls
  on public.lender_onboarding_submissions (nmls_id)
  where status = 'pending';

create table if not exists public.lender_onboarding_rate_limits (
  id uuid primary key default uuid_generate_v4(),
  ip_hash text not null,
  email_hash text,
  created_at timestamptz not null default now()
);

create index if not exists idx_lender_onboarding_rate_ip
  on public.lender_onboarding_rate_limits (ip_hash, created_at desc);

drop trigger if exists lender_onboarding_submissions_updated_at on public.lender_onboarding_submissions;
create trigger lender_onboarding_submissions_updated_at
  before update on public.lender_onboarding_submissions
  for each row execute procedure public.handle_updated_at();

alter table public.lender_onboarding_submissions enable row level security;
alter table public.lender_onboarding_rate_limits enable row level security;

drop policy if exists "Service role manages lender onboarding" on public.lender_onboarding_submissions;
create policy "Service role manages lender onboarding"
  on public.lender_onboarding_submissions for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages lender onboarding rate limits" on public.lender_onboarding_rate_limits;
create policy "Service role manages lender onboarding rate limits"
  on public.lender_onboarding_rate_limits for all
  to service_role
  using (true) with check (true);