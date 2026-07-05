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