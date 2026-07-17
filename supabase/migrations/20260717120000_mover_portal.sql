-- =====================================================
-- Verified Mover Portal — claims, ownership, responses,
-- disputes, reputation sync, service areas
-- Move Trust Hub
--
-- Safe to re-run. Bootstraps moving_companies / company_reviews
-- when the public review system migration was never applied.
-- =====================================================

create extension if not exists "uuid-ossp";

-- Ensure updated_at helper exists (used by several directory tables)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------
-- Bootstrap public review system (if missing in this project)
-- Required before owner responses / dispute columns
-- ---------------------------------------------------------------
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
  avg_rating numeric(3,2) not null default 0 check (avg_rating >= 0 and avg_rating <= 5),
  review_count integer not null default 0 check (review_count >= 0),
  approved_review_count integer not null default 0 check (approved_review_count >= 0),
  legacy_company_id text,
  source text not null default 'user_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint moving_companies_dot_unique unique (dot_number),
  constraint moving_companies_mc_unique unique (mc_number)
);

create index if not exists idx_moving_companies_slug on public.moving_companies (slug);
create index if not exists idx_moving_companies_dot on public.moving_companies (dot_number) where dot_number is not null;
create index if not exists idx_moving_companies_mc on public.moving_companies (mc_number) where mc_number is not null;
create index if not exists idx_moving_companies_rating on public.moving_companies (avg_rating desc, approved_review_count desc);

create table if not exists public.company_reviews (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.moving_companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  reviewer_name text not null,
  reviewer_email text not null,
  rating smallint not null check (rating between 1 and 5),
  title text,
  content text not null check (char_length(trim(content)) >= 50),
  photo_urls jsonb not null default '[]'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  submitter_ip text,
  email_hash text not null,
  move_date date,
  source_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_company_reviews_company on public.company_reviews (company_id, created_at desc);
create index if not exists idx_company_reviews_status on public.company_reviews (status, created_at desc);
create index if not exists idx_company_reviews_email_hash on public.company_reviews (company_id, email_hash);
create index if not exists idx_company_reviews_approved on public.company_reviews (company_id, rating)
  where status = 'approved';

create table if not exists public.review_rate_limits (
  id uuid primary key default uuid_generate_v4(),
  ip_hash text not null,
  email_hash text,
  attempt_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_attempt_at timestamptz not null default now()
);

create index if not exists idx_review_rate_limits_ip on public.review_rate_limits (ip_hash, window_start desc);

-- verification_tier (from later review migration)
alter table public.company_reviews
  add column if not exists verification_tier text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_reviews_verification_tier_check'
  ) then
    alter table public.company_reviews
      add constraint company_reviews_verification_tier_check
      check (verification_tier is null or verification_tier in ('email_pending', 'verified_mth'));
  end if;
end $$;

update public.company_reviews
set verification_tier = 'email_pending'
where verification_tier is null;

alter table public.company_reviews
  alter column verification_tier set default 'email_pending';

-- Stats refresh helpers (idempotent)
create or replace function public.refresh_moving_company_review_stats(p_company_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_avg numeric(3,2);
  v_total integer;
  v_approved integer;
begin
  select
    coalesce(round(avg(rating)::numeric, 2), 0),
    count(*),
    count(*) filter (where status = 'approved')
  into v_avg, v_total, v_approved
  from public.company_reviews
  where company_id = p_company_id;

  update public.moving_companies
  set
    avg_rating = coalesce(
      (select round(avg(rating)::numeric, 2) from public.company_reviews where company_id = p_company_id and status = 'approved'),
      0
    ),
    review_count = v_total,
    approved_review_count = v_approved,
    updated_at = now()
  where id = p_company_id;
end;
$$;

create or replace function public.trg_refresh_company_review_stats()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.refresh_moving_company_review_stats(
    coalesce(new.company_id, old.company_id)
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists company_reviews_stats_refresh on public.company_reviews;
create trigger company_reviews_stats_refresh
  after insert or update of status, rating or delete on public.company_reviews
  for each row execute procedure public.trg_refresh_company_review_stats();

drop trigger if exists moving_companies_updated_at on public.moving_companies;
create trigger moving_companies_updated_at
  before update on public.moving_companies
  for each row execute procedure public.handle_updated_at();

drop trigger if exists company_reviews_updated_at on public.company_reviews;
create trigger company_reviews_updated_at
  before update on public.company_reviews
  for each row execute procedure public.handle_updated_at();

alter table public.moving_companies enable row level security;
alter table public.company_reviews enable row level security;
alter table public.review_rate_limits enable row level security;

drop policy if exists "Public read moving companies" on public.moving_companies;
create policy "Public read moving companies"
  on public.moving_companies for select
  using (true);

drop policy if exists "Service role manages moving companies" on public.moving_companies;
create policy "Service role manages moving companies"
  on public.moving_companies for all
  to service_role
  using (true) with check (true);

drop policy if exists "Public read approved reviews" on public.company_reviews;
create policy "Public read approved reviews"
  on public.company_reviews for select
  using (status = 'approved');

drop policy if exists "Service role manages company reviews" on public.company_reviews;
create policy "Service role manages company reviews"
  on public.company_reviews for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages rate limits" on public.review_rate_limits;
create policy "Service role manages rate limits"
  on public.review_rate_limits for all
  to service_role
  using (true) with check (true);

-- ---------------------------------------------------------------
-- Ownership claims (pending verification)
-- ---------------------------------------------------------------
create table if not exists public.company_claims (
  id uuid primary key default uuid_generate_v4(),
  company_id text not null references public.companies(id) on delete cascade,
  company_slug text not null,
  company_name text not null,
  claimant_user_id uuid references auth.users(id) on delete set null,
  claimant_name text not null,
  claimant_email text not null,
  claimant_phone text,
  claimant_title text,
  usdot_submitted text not null,
  verification_method text not null default 'manual'
    check (verification_method in ('email_domain', 'fmcsa_contact', 'phone', 'manual')),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'needs_info')),
  moderation_note text,
  moderated_at timestamptz,
  moderated_by text,
  submitter_ip text,
  email_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_company_claims_status
  on public.company_claims (status, created_at desc);

create index if not exists idx_company_claims_company
  on public.company_claims (company_id, status);

create index if not exists idx_company_claims_email
  on public.company_claims (claimant_email, created_at desc);

create index if not exists idx_company_claims_user
  on public.company_claims (claimant_user_id)
  where claimant_user_id is not null;

create unique index if not exists idx_company_claims_pending_company
  on public.company_claims (company_id)
  where status = 'pending';

comment on table public.company_claims is
  'Mover business ownership claims. Approved claims create company_owners rows. No paid placement.';

-- ---------------------------------------------------------------
-- Verified owners (active portal access)
-- ---------------------------------------------------------------
create table if not exists public.company_owners (
  id uuid primary key default uuid_generate_v4(),
  company_id text not null references public.companies(id) on delete cascade,
  company_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  claim_id uuid references public.company_claims(id) on delete set null,
  role text not null default 'owner'
    check (role in ('owner', 'manager')),
  status text not null default 'active'
    check (status in ('active', 'revoked')),
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create index if not exists idx_company_owners_user
  on public.company_owners (user_id, status);

create index if not exists idx_company_owners_company
  on public.company_owners (company_id, status);

comment on table public.company_owners is
  'Verified mover portal owners. Cannot edit scores or remove legitimate reviews.';

-- ---------------------------------------------------------------
-- Portal profile extras (service area + reputation sync)
-- ---------------------------------------------------------------
create table if not exists public.company_portal_profiles (
  company_id text primary key references public.companies(id) on delete cascade,
  company_slug text not null,
  last_reputation_sync_at timestamptz,
  last_reputation_sync_summary jsonb,
  service_area_mode text not null default 'regional'
    check (service_area_mode in ('national', 'regional', 'local')),
  service_area_states text[] not null default '{}',
  service_area_counties text[] not null default '{}',
  service_area_radius_miles integer
    check (service_area_radius_miles is null or (service_area_radius_miles >= 10 and service_area_radius_miles <= 500)),
  primary_interstate_lanes jsonb not null default '[]'::jsonb,
  coverage_notes text,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.company_portal_profiles is
  'Owner-managed service area and reputation sync metadata. Rankings are never purchasable.';

-- ---------------------------------------------------------------
-- Owner responses + dispute flags on community reviews
-- ---------------------------------------------------------------
alter table public.company_reviews
  add column if not exists owner_response text;

alter table public.company_reviews
  add column if not exists owner_response_at timestamptz;

alter table public.company_reviews
  add column if not exists owner_response_by uuid references auth.users(id) on delete set null;

alter table public.company_reviews
  add column if not exists dispute_status text;

alter table public.company_reviews
  add column if not exists dispute_category text;

alter table public.company_reviews
  add column if not exists dispute_reason text;

alter table public.company_reviews
  add column if not exists disputed_at timestamptz;

alter table public.company_reviews
  add column if not exists disputed_by uuid references auth.users(id) on delete set null;

alter table public.company_reviews
  add column if not exists dispute_moderation_note text;

alter table public.company_reviews
  add column if not exists dispute_resolved_at timestamptz;

update public.company_reviews
set dispute_status = 'none'
where dispute_status is null;

alter table public.company_reviews
  alter column dispute_status set default 'none';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_reviews_dispute_status_check'
  ) then
    alter table public.company_reviews
      add constraint company_reviews_dispute_status_check
      check (dispute_status in ('none', 'under_review', 'resolved_upheld', 'resolved_rejected'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_reviews_dispute_category_check'
  ) then
    alter table public.company_reviews
      add constraint company_reviews_dispute_category_check
      check (
        dispute_category is null
        or dispute_category in (
          'mistaken_identity',
          'fraud',
          'harassment',
          'not_a_customer',
          'other_policy'
        )
      );
  end if;
end $$;

create index if not exists idx_company_reviews_dispute
  on public.company_reviews (dispute_status, disputed_at desc)
  where dispute_status = 'under_review';

-- ---------------------------------------------------------------
-- Claim rate limits
-- ---------------------------------------------------------------
create table if not exists public.portal_claim_rate_limits (
  id uuid primary key default uuid_generate_v4(),
  ip_hash text not null,
  email_hash text,
  created_at timestamptz not null default now()
);

create index if not exists idx_portal_claim_rate_limits_ip
  on public.portal_claim_rate_limits (ip_hash, created_at desc);

-- ---------------------------------------------------------------
-- Updated_at triggers
-- ---------------------------------------------------------------
drop trigger if exists company_claims_updated_at on public.company_claims;
create trigger company_claims_updated_at
  before update on public.company_claims
  for each row execute procedure public.handle_updated_at();

drop trigger if exists company_owners_updated_at on public.company_owners;
create trigger company_owners_updated_at
  before update on public.company_owners
  for each row execute procedure public.handle_updated_at();

drop trigger if exists company_portal_profiles_updated_at on public.company_portal_profiles;
create trigger company_portal_profiles_updated_at
  before update on public.company_portal_profiles
  for each row execute procedure public.handle_updated_at();

-- ---------------------------------------------------------------
-- RLS — service role only (app uses admin client after auth checks)
-- ---------------------------------------------------------------
alter table public.company_claims enable row level security;
alter table public.company_owners enable row level security;
alter table public.company_portal_profiles enable row level security;
alter table public.portal_claim_rate_limits enable row level security;

drop policy if exists "Service role manages company claims" on public.company_claims;
create policy "Service role manages company claims"
  on public.company_claims for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages company owners" on public.company_owners;
create policy "Service role manages company owners"
  on public.company_owners for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages portal profiles" on public.company_portal_profiles;
create policy "Service role manages portal profiles"
  on public.company_portal_profiles for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role manages portal claim rate limits" on public.portal_claim_rate_limits;
create policy "Service role manages portal claim rate limits"
  on public.portal_claim_rate_limits for all
  to service_role
  using (true) with check (true);
