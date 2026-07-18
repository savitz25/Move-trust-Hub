-- Physical address + phone on directory companies (FMCSA phy* / telephone).
-- Used in Licensing & Compliance profile section.

alter table public.companies
  add column if not exists physical_address text;

alter table public.companies
  add column if not exists phone text;

comment on column public.companies.physical_address is
  'FMCSA physical street address (phyStreet/city/state/zip). Distinct from free-text headquarters when present.';

comment on column public.companies.phone is
  'Primary business phone from FMCSA telephone field when available.';

create index if not exists idx_companies_phone
  on public.companies (phone)
  where phone is not null and phone <> '';
