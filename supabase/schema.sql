-- =====================================================
-- InterstateMovers USA - Supabase PostgreSQL Schema
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
create policy "Public can read companies"
  on public.companies for select
  using (true);

create policy "Public can read reviews"
  on public.reviews for select
  using (true);

-- Only authenticated admin users (you) can insert/update companies & reviews.
-- For demo / simplicity, allow service_role or use admin dashboard with RLS later.
-- For production: Create an "admin" role or use Supabase Edge Functions + service key.

create policy "Service role can manage companies"
  on public.companies for all
  using (auth.role() = 'service_role');

create policy "Service role can manage reviews"
  on public.reviews for all
  using (auth.role() = 'service_role');

-- Users can manage only their own saved comparisons
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
-- SEED DATA NOTES
-- =====================================================
-- After running this schema:
-- 1. Use the included scripts/seed.ts (or Supabase Data Editor) to insert rows from data/seed-companies.ts and seed-reviews.ts
-- 2. Or copy/paste INSERT statements generated from seed data.
-- 3. For production, replace seed with real scraped/imported data and set up regular refresh jobs.

comment on table public.companies is 'Core directory of interstate moving companies with FMCSA, BBB, pricing, and reputation data.';
comment on table public.reviews is 'Aggregated customer reviews from multiple sources. verified = true indicates confirmed customer move.';
