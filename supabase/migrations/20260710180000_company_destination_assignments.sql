-- Auto-file approved onboarding companies into local-movers / destination hubs by HQ address.

create table if not exists public.company_destination_assignments (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references public.companies (id) on delete cascade,
  company_slug text not null,
  state_slug text not null,
  county_slug text not null,
  destination_slug text,
  headquarters text,
  source text not null default 'onboarding_approval',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint company_destination_assignments_unique unique (company_id, state_slug, county_slug)
);

create index if not exists idx_company_destination_assignments_county
  on public.company_destination_assignments (state_slug, county_slug);

create index if not exists idx_company_destination_assignments_destination
  on public.company_destination_assignments (destination_slug)
  where destination_slug is not null;

create index if not exists idx_company_destination_assignments_slug
  on public.company_destination_assignments (company_slug);

comment on table public.company_destination_assignments is
  'Maps approved directory companies to local-movers counties and moving-to destination hubs based on headquarters.';

alter table public.company_destination_assignments enable row level security;

drop policy if exists company_destination_assignments_public_read on public.company_destination_assignments;
create policy company_destination_assignments_public_read
  on public.company_destination_assignments
  for select
  using (true);