-- BBB automated refresh pipeline (mirrors FMCSA refresh system)

-- =====================================================
-- COMPANIES: BBB refresh columns
-- =====================================================
alter table public.companies
  add column if not exists bbb_last_checked timestamptz,
  add column if not exists complaints_last_36m integer default 0,
  add column if not exists bbb_customer_reviews integer default 0,
  add column if not exists bbb_data_hash text,
  add column if not exists bbb_business_id text,
  add column if not exists bbb_alert_count integer default 0,
  add column if not exists bbb_raw jsonb;

comment on column public.companies.bbb_last_checked is 'Last BBB API refresh timestamp (UTC)';
comment on column public.companies.complaints_last_36m is 'BBB-reported complaints in trailing 36 months';
comment on column public.companies.bbb_customer_reviews is 'BBB customer review count';
comment on column public.companies.bbb_data_hash is 'SHA-256 of normalized BBB snapshot for change detection';
comment on column public.companies.bbb_business_id is 'Cached BBB org id (format: {sourceBbbId}-{businessId})';
comment on column public.companies.bbb_alert_count is 'Active BBB alerts on business profile';
comment on column public.companies.bbb_raw is 'Latest raw BBB API payload';

create index if not exists idx_companies_bbb_last_checked
  on public.companies (bbb_last_checked nulls first);

create index if not exists idx_companies_bbb_data_hash
  on public.companies (bbb_data_hash)
  where bbb_data_hash is not null;

create index if not exists idx_companies_bbb_business_id
  on public.companies (bbb_business_id)
  where bbb_business_id is not null;

-- =====================================================
-- REFRESH RUNS
-- =====================================================
create table if not exists public.bbb_refresh_runs (
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

create index if not exists idx_bbb_refresh_runs_started
  on public.bbb_refresh_runs (started_at desc);

-- =====================================================
-- CHANGE LOG
-- =====================================================
create table if not exists public.bbb_change_log (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.bbb_refresh_runs(id) on delete set null,
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

create index if not exists idx_bbb_change_log_created
  on public.bbb_change_log (created_at desc);

create index if not exists idx_bbb_change_log_company
  on public.bbb_change_log (company_id, created_at desc);

create index if not exists idx_bbb_change_log_severity
  on public.bbb_change_log (severity, created_at desc)
  where severity in ('warning', 'critical');

alter table public.bbb_refresh_runs enable row level security;
alter table public.bbb_change_log enable row level security;

create policy "Service role full access bbb_refresh_runs"
  on public.bbb_refresh_runs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role full access bbb_change_log"
  on public.bbb_change_log for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');