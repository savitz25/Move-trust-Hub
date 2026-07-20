-- Interstate vs Intrastate (local) company scope + selected county coverage.

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

comment on column public.companies.service_scope is
  'interstate = USDOT movers for /companies directory; intrastate = local/in-state only (county pages).';

comment on column public.companies.coverage_counties is
  'JSON array of { stateSlug, countySlug, name? } for local/intrastate service area.';

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

comment on column public.company_suggestions.service_scope is
  'Funnel used at submission: interstate (FMCSA) vs intrastate (Google + counties).';

comment on column public.company_suggestions.selected_counties is
  'User-confirmed counties for local/intrastate movers.';
