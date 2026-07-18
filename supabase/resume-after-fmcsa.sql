-- Resume setup: run if schema + FMCSA already applied (idempotent)


-- ===== 20260702140000_bbb_refresh_pipeline.sql =====
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

drop policy if exists "Service role full access bbb_refresh_runs" on public.bbb_refresh_runs;
create policy "Service role full access bbb_refresh_runs"
  on public.bbb_refresh_runs for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role full access bbb_change_log" on public.bbb_change_log;
create policy "Service role full access bbb_change_log"
  on public.bbb_change_log for all
  to service_role
  using (true) with check (true);

-- ===== 20260705120000_company_suggestions.sql =====
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

-- ===== 20260707120000_multi_source_verification.sql =====
-- Multi-source company verification (FMCSA + BBB + manual/suggestion pipeline)
-- Fixes service_role RLS bindings and adds backfill audit support.

-- =====================================================
-- COMPANIES: aggregated verification snapshot
-- =====================================================
alter table public.companies
  add column if not exists verification_sources jsonb not null default '{}'::jsonb,
  add column if not exists verification_last_synced_at timestamptz;

comment on column public.companies.verification_sources is
  'Per-source verification snapshot, e.g. { "fmcsa": { "checked_at": "...", "active": true }, "bbb": { ... } }';
comment on column public.companies.verification_last_synced_at is
  'Last multi-source verification backfill or refresh timestamp (UTC)';

create index if not exists idx_companies_verification_last_synced
  on public.companies (verification_last_synced_at nulls first);

-- =====================================================
-- BACKFILL RUN AUDIT (scripts/backfill-company-verification.ts)
-- =====================================================
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

comment on table public.company_verification_backfill_runs is
  'Audit log for FMCSA/BBB verification backfill batches.';

alter table public.company_verification_backfill_runs enable row level security;

drop policy if exists "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs;
create policy "Service role manages verification backfill runs"
  on public.company_verification_backfill_runs for all
  to service_role
  using (true) with check (true);

-- =====================================================
-- RLS FIX: use role binding (matches company_suggestions)
-- =====================================================
drop policy if exists "Service role full access fmcsa_refresh_runs" on public.fmcsa_refresh_runs;
create policy "Service role full access fmcsa_refresh_runs"
  on public.fmcsa_refresh_runs for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role full access fmcsa_change_log" on public.fmcsa_change_log;
create policy "Service role full access fmcsa_change_log"
  on public.fmcsa_change_log for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role can manage companies" on public.companies;
create policy "Service role can manage companies"
  on public.companies for all
  to service_role
  using (true) with check (true);

drop policy if exists "Service role can manage reviews" on public.reviews;
create policy "Service role can manage reviews"
  on public.reviews for all
  to service_role
  using (true) with check (true);

-- Helpful read model for admin dashboards
create or replace view public.company_verification_status as
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
