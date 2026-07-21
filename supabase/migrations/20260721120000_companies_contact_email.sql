-- Business contact email on directory companies + suggestions.
-- Filled from website scrape (and optional user input) during onboarding.

alter table public.companies
  add column if not exists email text;

comment on column public.companies.email is
  'Primary business contact email (website scrape or onboarding). Not the submitter email.';

create index if not exists idx_companies_email
  on public.companies (email)
  where email is not null and email <> '';

alter table public.company_suggestions
  add column if not exists contact_email text;

comment on column public.company_suggestions.contact_email is
  'Company business email discovered during onboarding (not suggested_by_email).';
