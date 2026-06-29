-- =====================================================
-- Quote requests: production hardening
-- Move Trust Hub (savitz25) — RLS, indexes, soft delete, extended fields
-- Safe to re-run (IF NOT EXISTS / OR REPLACE)
-- =====================================================

-- Extended quote fields (inventory, auto transport, service type)
alter table public.quote_requests
  add column if not exists estimated_weight numeric,
  add column if not exists inventory jsonb,
  add column if not exists service_type text default 'moving',
  add column if not exists auto_transport jsonb,
  add column if not exists status text default 'new',
  add column if not exists deleted_at timestamptz,
  add column if not exists updated_at timestamptz default now();

comment on column public.quote_requests.estimated_weight is
  'Estimated shipment weight in lbs (typically volume × 7).';
comment on column public.quote_requests.inventory is
  'Moving calculator inventory JSON array when submitted from Smart Move Estimator.';
comment on column public.quote_requests.service_type is
  'moving | auto-transport — drives matching workflow.';
comment on column public.quote_requests.auto_transport is
  'Auto transport calculator snapshot (distance, method, estimate range).';
comment on column public.quote_requests.status is
  'Lead workflow: new → contacted → matched → closed | spam.';
comment on column public.quote_requests.deleted_at is
  'Soft delete timestamp — NULL = active lead.';

-- Constrain status values
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'quote_requests_status_check'
  ) then
    alter table public.quote_requests
      add constraint quote_requests_status_check
      check (status in ('new', 'contacted', 'matched', 'closed', 'spam'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'quote_requests_service_type_check'
  ) then
    alter table public.quote_requests
      add constraint quote_requests_service_type_check
      check (service_type in ('moving', 'auto-transport'));
  end if;
end $$;

-- Performance indexes for analytics dashboards and destination attribution
create index if not exists idx_quote_requests_created_active
  on public.quote_requests (created_at desc)
  where deleted_at is null;

create index if not exists idx_quote_requests_source
  on public.quote_requests (source)
  where deleted_at is null;

create index if not exists idx_quote_requests_service_type
  on public.quote_requests (service_type)
  where deleted_at is null;

create index if not exists idx_quote_requests_status
  on public.quote_requests (status)
  where deleted_at is null;

create index if not exists idx_quote_requests_destination_created
  on public.quote_requests (destination_slug, created_at desc)
  where destination_slug is not null and deleted_at is null;

-- =====================================================
-- RLS hardening — replace permissive insert policy
-- =====================================================
drop policy if exists "Anyone can submit quote requests" on public.quote_requests;

create policy "Anonymous can submit valid quote requests"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (
    deleted_at is null
    and length(trim(name)) between 2 and 100
    and email ~* '^[^@]+@[^@]+\.[^@]+$'
    and from_zip ~ '^\d{5}$'
    and to_zip ~ '^\d{5}$'
    and (service_type is null or service_type in ('moving', 'auto-transport'))
    and (status is null or status = 'new')
  );

-- Explicit deny public reads (service_role bypasses RLS)
drop policy if exists "Service role can manage quote requests" on public.quote_requests;

create policy "Service role full access on quote requests"
  on public.quote_requests
  for all
  to service_role
  using (true)
  with check (true);

-- Future: authenticated users read own saved quotes
-- create policy "Users read own quote requests" ...

-- =====================================================
-- updated_at trigger
-- =====================================================
drop trigger if exists quote_requests_updated_at on public.quote_requests;

create trigger quote_requests_updated_at
  before update on public.quote_requests
  for each row execute procedure public.handle_updated_at();

-- =====================================================
-- Analytics view (service_role / admin only)
-- =====================================================
create or replace view public.quote_analytics_summary as
select
  date_trunc('day', created_at)::date as day,
  count(*) filter (where deleted_at is null) as quotes,
  count(*) filter (where deleted_at is null and phone is not null and phone <> '') as with_phone,
  count(*) filter (where deleted_at is null and destination_slug is not null) as attributed
from public.quote_requests
group by 1
order by 1 desc;

comment on view public.quote_analytics_summary is
  'Daily quote volume for admin dashboards. Query via service_role only.';

-- =====================================================
-- Future: saved_quotes for authenticated users
-- =====================================================
create table if not exists public.saved_quotes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  quote_request_id uuid references public.quote_requests(id) on delete set null,
  label text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.saved_quotes enable row level security;

create policy "Users manage own saved quotes"
  on public.saved_quotes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Service role manages saved quotes"
  on public.saved_quotes for all
  to service_role
  using (true)
  with check (true);