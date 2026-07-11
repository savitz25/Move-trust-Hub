-- =====================================================
-- Lender Trust Hub — core directory tables
-- Prerequisite for lender_onboarding_submissions (FK → lenders)
-- =====================================================

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

comment on table public.lenders is
  'Lender Trust Hub directory profiles — static seed + onboarding-published lenders.';

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