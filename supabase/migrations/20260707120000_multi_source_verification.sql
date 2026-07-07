-- Multi-source company verification (Google Places + public scrape enrichment)

alter table public.companies
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb;

comment on column public.companies.google_data is
  'Google Places API enrichment: rating, review_count, review_snippets, last_fetched';

comment on column public.companies.public_scrape_data is
  'Public / scraped ratings from BBB, Trustpilot, Yelp — lower confidence than official APIs';

alter table public.company_suggestions
  add column if not exists google_data jsonb,
  add column if not exists public_scrape_data jsonb;

comment on column public.company_suggestions.google_data is
  'Google Places snapshot at suggestion submit time';

comment on column public.company_suggestions.public_scrape_data is
  'Public scrape snapshot at suggestion submit time';