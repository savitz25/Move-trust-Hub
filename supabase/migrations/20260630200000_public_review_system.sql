-- =====================================================
-- Public review system — moving_companies + company_reviews
-- Move Trust Hub (savitz25)
-- =====================================================

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

comment on table public.moving_companies is
  'Carrier records keyed by DOT/MC. Auto-created when users submit reviews for unknown carriers.';

-- ---------------------------------------------------------------
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

comment on table public.company_reviews is
  'User-submitted mover reviews. Public visibility requires status = approved (moderation queue).';

-- ---------------------------------------------------------------
create table if not exists public.review_rate_limits (
  id uuid primary key default uuid_generate_v4(),
  ip_hash text not null,
  email_hash text,
  attempt_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_attempt_at timestamptz not null default now()
);

create index if not exists idx_review_rate_limits_ip on public.review_rate_limits (ip_hash, window_start desc);

-- ---------------------------------------------------------------
-- Recalculate approved review stats on moving_companies
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

-- updated_at triggers
drop trigger if exists moving_companies_updated_at on public.moving_companies;
create trigger moving_companies_updated_at
  before update on public.moving_companies
  for each row execute procedure public.handle_updated_at();

drop trigger if exists company_reviews_updated_at on public.company_reviews;
create trigger company_reviews_updated_at
  before update on public.company_reviews
  for each row execute procedure public.handle_updated_at();

-- ---------------------------------------------------------------
-- RLS
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

-- Storage bucket (create in Supabase Dashboard if SQL insert fails):
-- Bucket: review-photos (public read, authenticated/service upload)