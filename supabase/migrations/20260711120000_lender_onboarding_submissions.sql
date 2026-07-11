-- =====================================================
-- Lender provider onboarding submissions
-- Lender Trust Hub (mirrors company_suggestions for movers)
-- =====================================================

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

comment on table public.lender_onboarding_submissions is
  'Lender provider onboarding queue. NMLS-verified submissions moderated before lenders table insert.';

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

-- Extend lenders table for onboarding-published profiles
alter table public.lenders
  add column if not exists nmls_preview jsonb,
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb,
  add column if not exists cfpb_complaints_data jsonb,
  add column if not exists verification_sources jsonb,
  add column if not exists transparency_note text,
  add column if not exists published_from_onboarding boolean not null default false,
  add column if not exists data_freshness_note text;