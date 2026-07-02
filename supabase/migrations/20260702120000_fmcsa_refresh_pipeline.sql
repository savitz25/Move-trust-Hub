-- FMCSA automated refresh pipeline
-- Adds tracking columns to companies + run/change log tables

-- =====================================================
-- COMPANIES: FMCSA refresh columns
-- =====================================================
alter table public.companies
  add column if not exists fmcsa_last_checked timestamptz,
  add column if not exists authority_active boolean,
  add column if not exists out_of_service boolean default false,
  add column if not exists complaints_last_12m integer default 0,
  add column if not exists revocation_date date,
  add column if not exists data_hash text,
  add column if not exists fmcsa_legal_name text,
  add column if not exists fmcsa_raw jsonb;

comment on column public.companies.fmcsa_last_checked is 'Last FMCSA API/SAFER refresh timestamp (UTC)';
comment on column public.companies.authority_active is 'True when FMCSA reports active operating authority';
comment on column public.companies.out_of_service is 'True when carrier has an active OOS order';
comment on column public.companies.complaints_last_12m is 'FMCSA-reported complaints in trailing 12 months';
comment on column public.companies.revocation_date is 'Most recent authority revocation date from FMCSA';
comment on column public.companies.data_hash is 'SHA-256 of normalized FMCSA snapshot for change detection';
comment on column public.companies.fmcsa_raw is 'Latest raw FMCSA API payload (debugging / future fields)';

create index if not exists idx_companies_fmcsa_last_checked
  on public.companies (fmcsa_last_checked nulls first);

create index if not exists idx_companies_data_hash
  on public.companies (data_hash)
  where data_hash is not null;

-- =====================================================
-- REFRESH RUNS (job audit + idempotency)
-- =====================================================
create table if not exists public.fmcsa_refresh_runs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text unique not null,
  mode text not null check (mode in ('incremental', 'full')),
  status text not null default 'running'
    check (status in ('running', 'completed', 'failed', 'partial')),
  triggered_by text not null default 'cron'
    check (triggered_by in ('cron', 'github', 'admin', 'api')),
  companies_total integer not null default 0,
  companies_processed integer not null default 0,
  companies_updated integer not null default 0,
  companies_failed integer not null default 0,
  changes_detected integer not null default 0,
  error_summary text,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  metadata jsonb default '{}'::jsonb
);

create index if not exists idx_fmcsa_refresh_runs_started
  on public.fmcsa_refresh_runs (started_at desc);

-- =====================================================
-- CHANGE LOG (per-company diffs)
-- =====================================================
create table if not exists public.fmcsa_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.fmcsa_refresh_runs(id) on delete set null,
  company_id text not null references public.companies(id) on delete cascade,
  company_slug text,
  company_name text,
  field_name text not null,
  old_value text,
  new_value text,
  severity text not null default 'info'
    check (severity in ('info', 'warning', 'critical')),
  created_at timestamptz not null default now()
);

create index if not exists idx_fmcsa_change_log_created
  on public.fmcsa_change_log (created_at desc);

create index if not exists idx_fmcsa_change_log_company
  on public.fmcsa_change_log (company_id, created_at desc);

create index if not exists idx_fmcsa_change_log_severity
  on public.fmcsa_change_log (severity, created_at desc)
  where severity in ('warning', 'critical');

-- RLS: service_role only (admin client)
alter table public.fmcsa_refresh_runs enable row level security;
alter table public.fmcsa_change_log enable row level security;

create policy "Service role full access fmcsa_refresh_runs"
  on public.fmcsa_refresh_runs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role full access fmcsa_change_log"
  on public.fmcsa_change_log for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');