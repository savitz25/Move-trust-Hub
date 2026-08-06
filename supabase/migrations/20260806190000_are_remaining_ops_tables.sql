-- =====================================================
-- ARE remaining MOVE-ONLY ops (idempotent, view-safe)
-- Fixes 42P16: never CREATE OR REPLACE views that may change columns.
-- No lenders (Lender-Trust-Hub = hidcrbexurginnuqgjpx).
-- =====================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ---------- tables ----------
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

alter table public.company_verification_backfill_runs enable row level security;
drop policy if exists "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs;
create policy "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs for all
  to service_role using (true) with check (true);

create table if not exists public.magic_link_rate_limits (
  email_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

alter table public.magic_link_rate_limits enable row level security;
drop policy if exists "Service role manages magic link limits"
  on public.magic_link_rate_limits;
create policy "Service role manages magic link limits"
  on public.magic_link_rate_limits for all
  to service_role using (true) with check (true);

create table if not exists public.magic_link_ip_rate_limits (
  ip_hash text primary key,
  request_count integer not null default 1,
  window_start timestamptz not null default now(),
  last_request_at timestamptz not null default now()
);

alter table public.magic_link_ip_rate_limits enable row level security;
drop policy if exists "Service role manages magic link ip limits"
  on public.magic_link_ip_rate_limits;
create policy "Service role manages magic link ip limits"
  on public.magic_link_ip_rate_limits for all
  to service_role using (true) with check (true);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text,
  created_at timestamptz default now()
);

alter table public.providers enable row level security;
drop policy if exists "Service role manages providers" on public.providers;
create policy "Service role manages providers"
  on public.providers for all
  to service_role using (true) with check (true);

-- ---------- view (DROP + CREATE only; never CREATE OR REPLACE) ----------
drop view if exists public.company_verification_status;

create view public.company_verification_status as
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

-- companies_with_stats: intentionally left alone (exists on are; OR REPLACE causes 42P16).

-- No lenders.

notify pgrst, 'reload schema';
