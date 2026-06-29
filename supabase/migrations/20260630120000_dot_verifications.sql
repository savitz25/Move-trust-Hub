-- =====================================================
-- DOT / MC verification search logging
-- Move Trust Hub (savitz25)
-- =====================================================

create table if not exists public.dot_verifications (
  id uuid primary key default uuid_generate_v4(),
  dot_number text not null,
  number_type text not null default 'DOT' check (number_type in ('DOT', 'MC')),
  searched_at timestamptz not null default now(),
  user_ip text,
  source_page text
);

create index if not exists idx_dot_verifications_searched_at
  on public.dot_verifications (searched_at desc);

create index if not exists idx_dot_verifications_dot_number
  on public.dot_verifications (dot_number);

create index if not exists idx_dot_verifications_number_type
  on public.dot_verifications (number_type, dot_number);

comment on table public.dot_verifications is
  'Anonymous DOT/MC verification lookups from /verify-dot. No PII stored beyond optional IP.';

comment on column public.dot_verifications.dot_number is
  'Normalized digits searched (USDOT or MC docket number).';

alter table public.dot_verifications enable row level security;

-- Server Action logs via service_role; no public read
create policy "Service role manages dot verifications"
  on public.dot_verifications
  for all
  to service_role
  using (true)
  with check (true);

-- Optional: allow anon insert without select (if logging via anon client)
create policy "Anonymous can log dot verifications"
  on public.dot_verifications
  for insert
  to anon, authenticated
  with check (
    length(trim(dot_number)) between 1 and 20
    and number_type in ('DOT', 'MC')
  );