-- =====================================================
-- Multi-source company verification (Google Places + public scrape)
-- Safe / re-runnable: detects actual table names in this project.
--
-- Directory enrichment targets (first match wins for notices, all existing
-- tables are updated):
--   1. public.companies       — interstate directory (schema.sql)
--   2. public.moving_companies — review-system carrier table
--
-- Suggestion queue:
--   public.company_suggestions (when present)
-- =====================================================

create or replace function public._mth_add_verification_jsonb_columns(
  p_schema text,
  p_table text,
  p_google_comment text,
  p_scrape_comment text
)
returns boolean
language plpgsql
as $$
declare
  v_qualified text;
begin
  v_qualified := format('%I.%I', p_schema, p_table);

  if to_regclass(v_qualified) is null then
    raise notice 'mth_verification_migration: skip % (relation does not exist)', v_qualified;
    return false;
  end if;

  execute format(
    'alter table %s add column if not exists google_data jsonb',
    v_qualified
  );

  execute format(
    'alter table %s add column if not exists public_scrape_data jsonb',
    v_qualified
  );

  execute format(
    'comment on column %s.google_data is %L',
    v_qualified,
    p_google_comment
  );

  execute format(
    'comment on column %s.public_scrape_data is %L',
    v_qualified,
    p_scrape_comment
  );

  raise notice 'mth_verification_migration: updated %', v_qualified;
  return true;
end;
$$;

-- Directory tables (apply to every table that exists in this Supabase project)
select public._mth_add_verification_jsonb_columns(
  'public',
  'companies',
  'Google Places API enrichment: rating, review_count, review_snippets, last_fetched',
  'Public / scraped ratings from BBB, Trustpilot, Yelp — lower confidence than official APIs'
);

select public._mth_add_verification_jsonb_columns(
  'public',
  'moving_companies',
  'Google Places API enrichment: rating, review_count, review_snippets, last_fetched',
  'Public / scraped ratings from BBB, Trustpilot, Yelp — lower confidence than official APIs'
);

-- User suggestion queue (optional — created by 20260705120000_company_suggestions.sql)
select public._mth_add_verification_jsonb_columns(
  'public',
  'company_suggestions',
  'Google Places snapshot at suggestion submit time',
  'Public scrape snapshot at suggestion submit time'
);

drop function if exists public._mth_add_verification_jsonb_columns(text, text, text, text);