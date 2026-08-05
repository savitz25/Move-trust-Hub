-- Ensure interstate/intrastate columns exist (idempotent) and reload PostgREST schema cache.
-- Production was missing companies.service_scope / coverage_counties as of 2026-07-26 audit.

alter table public.companies
  add column if not exists service_scope text not null default 'interstate';

alter table public.companies
  add column if not exists coverage_counties jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'companies_service_scope_check'
  ) then
    alter table public.companies
      add constraint companies_service_scope_check
      check (service_scope in ('interstate', 'intrastate'));
  end if;
end $$;

create index if not exists idx_companies_service_scope
  on public.companies (service_scope);

alter table public.company_suggestions
  add column if not exists service_scope text not null default 'interstate';

alter table public.company_suggestions
  add column if not exists selected_counties jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'company_suggestions_service_scope_check'
  ) then
    alter table public.company_suggestions
      add constraint company_suggestions_service_scope_check
      check (service_scope in ('interstate', 'intrastate'));
  end if;
end $$;

-- Backfill: any company with local_intrastate_selection assignments → intrastate
update public.companies c
set service_scope = 'intrastate'
where c.service_scope is distinct from 'intrastate'
  and exists (
    select 1
    from public.company_destination_assignments a
    where a.company_id = c.id
      and (
        a.source = 'local_intrastate_selection'
        or a.source ilike '%local_intrastate%'
      )
  );

-- Ensure locals with local assignments are verified for county eligibility
update public.companies c
set is_verified = true
where coalesce(c.is_verified, false) = false
  and exists (
    select 1
    from public.company_destination_assignments a
    where a.company_id = c.id
      and (
        a.source = 'local_intrastate_selection'
        or a.source ilike '%local_intrastate%'
      )
  );

notify pgrst, 'reload schema';
