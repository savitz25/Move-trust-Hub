-- =====================================================
-- Ensure interstate directory table exists (public.companies)
-- Production Supabase may only have moving_companies from the review
-- system — approval publishes to public.companies for /companies/[slug].
-- Safe / re-runnable.
-- =====================================================

create extension if not exists "uuid-ossp";

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
  fmcsa_safety_rating text check (
    fmcsa_safety_rating in ('Satisfactory', 'Conditional', 'Unsatisfactory', 'Not Rated')
  ),
  fmcsa_complaints integer default 0,
  fmcsa_shipments integer default 0,
  bbb_rating text,
  bbb_accredited boolean default false,
  overall_rating numeric(3,2) check (overall_rating >= 0 and overall_rating <= 5),
  review_count integer default 0,
  reputation_score integer default 0 check (reputation_score >= 0 and reputation_score <= 100),
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

-- FMCSA refresh columns
alter table public.companies
  add column if not exists fmcsa_last_checked timestamptz,
  add column if not exists authority_active boolean,
  add column if not exists out_of_service boolean default false,
  add column if not exists complaints_last_12m integer default 0,
  add column if not exists revocation_date date,
  add column if not exists data_hash text,
  add column if not exists fmcsa_legal_name text,
  add column if not exists fmcsa_raw jsonb;

-- BBB refresh columns
alter table public.companies
  add column if not exists bbb_last_checked timestamptz,
  add column if not exists complaints_last_36m integer default 0,
  add column if not exists bbb_customer_reviews integer default 0,
  add column if not exists bbb_data_hash text,
  add column if not exists bbb_business_id text,
  add column if not exists bbb_alert_count integer default 0,
  add column if not exists bbb_raw jsonb;

-- Multi-source verification columns
alter table public.companies
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb;

comment on table public.companies is
  'Interstate mover directory — source of truth for /companies/[slug] profiles.';

comment on column public.companies.google_data is
  'Google Places API enrichment: rating, review_count, review_snippets, last_fetched';

comment on column public.companies.public_scrape_data is
  'Public / scraped ratings from BBB, Trustpilot, Yelp — lower confidence than official APIs';

create index if not exists idx_companies_slug on public.companies (slug);
create index if not exists idx_companies_usdot on public.companies (usdot_number) where usdot_number is not null;
create index if not exists idx_companies_reputation on public.companies (reputation_score desc);
create index if not exists idx_companies_rating on public.companies (overall_rating desc);
create index if not exists idx_companies_reviews on public.companies (review_count desc);
create index if not exists idx_companies_verified on public.companies (is_verified);

-- updated_at trigger (shared with suggestions)
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

alter table public.companies enable row level security;

drop policy if exists "Public can read companies" on public.companies;
create policy "Public can read companies"
  on public.companies for select
  using (true);

drop policy if exists "Service role can manage companies" on public.companies;
create policy "Service role can manage companies"
  on public.companies for all
  using (auth.role() = 'service_role');

-- Suggestion queue (optional FK — table may already exist from earlier migration)
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
  company_id text,
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  google_data jsonb,
  public_scrape_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.company_suggestions
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb;

-- Link company_id when companies table is present (skip if already constrained)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'company_suggestions_company_id_fkey'
      and conrelid = 'public.company_suggestions'::regclass
  ) then
    alter table public.company_suggestions
      add constraint company_suggestions_company_id_fkey
      foreign key (company_id) references public.companies(id) on delete set null;
  end if;
exception
  when others then
    raise notice 'company_suggestions_company_id_fkey: %', sqlerrm;
end;
$$;

create index if not exists idx_company_suggestions_status
  on public.company_suggestions (status, created_at desc);

alter table public.company_suggestions enable row level security;

drop policy if exists "Service role manages company suggestions" on public.company_suggestions;
create policy "Service role manages company suggestions"
  on public.company_suggestions for all
  to service_role
  using (true) with check (true);

drop trigger if exists company_suggestions_updated_at on public.company_suggestions;
create trigger company_suggestions_updated_at
  before update on public.company_suggestions
  for each row execute procedure public.handle_updated_at();

do $$
begin
  raise notice 'ensure_companies_directory: public.companies is ready for /companies/[slug] publishing';
end;
$$;

-- Required so Supabase API (PostgREST) sees public.companies immediately
notify pgrst, 'reload schema';