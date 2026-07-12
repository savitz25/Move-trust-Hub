-- Persist FMCSA entity type (Carrier, Broker, Carrier/Broker) for profile display.
alter table public.companies
  add column if not exists entity_type text;

comment on column public.companies.entity_type is
  'FMCSA census/authority entity type — Carrier, Broker, or Carrier/Broker';

create index if not exists idx_companies_entity_type
  on public.companies (entity_type)
  where entity_type is not null;

notify pgrst, 'reload schema';