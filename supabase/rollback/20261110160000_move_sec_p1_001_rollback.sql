-- ROLLBACK for 20261110160000_move_sec_p1_001.sql
-- Restores the function bodies, search_path, EXECUTE grants, company_reviews
-- column privileges, and companies_with_stats security mode captured read-only
-- on Move production (arepfylnilkjmyduhwbz) on 2026-11-10.
-- Re-opens anon EXECUTE and the four PII columns. Does not change row data.
-- Not applied by migration tooling (lives in supabase/rollback/).

begin;

set local lock_timeout = '5s';
set local statement_timeout = '60s';

create or replace function public.mth_publish_directory_company(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $mth$
declare
  v_id text := coalesce(payload->>'id', payload->>'slug');
  v_slug text := coalesce(payload->>'slug', payload->>'id');
  v_existing record;
begin
  if v_id is null or v_slug is null or payload->>'name' is null then
    raise exception 'payload requires id, slug, and name';
  end if;

  select id, slug into v_existing
  from public.companies
  where slug = v_slug or id = v_id
  limit 1;

  if found then
    return jsonb_build_object('company_id', v_existing.id, 'slug', v_existing.slug, 'existing', true);
  end if;

  if payload->>'usdot_number' is not null then
    select id, slug into v_existing
    from public.companies
    where usdot_number = payload->>'usdot_number'
    limit 1;

    if found then
      return jsonb_build_object('company_id', v_existing.id, 'slug', v_existing.slug, 'existing', true);
    end if;
  end if;

  insert into public.companies (
    id,
    slug,
    name,
    short_description,
    description,
    headquarters,
    website,
    usdot_number,
    mc_number,
    fmcsa_safety_rating,
    fmcsa_complaints,
    fmcsa_shipments,
    bbb_rating,
    bbb_accredited,
    overall_rating,
    review_count,
    reputation_score,
    years_in_business,
    avg_price_per_move,
    price_range,
    coverage,
    services,
    specialties,
    rating_breakdown,
    is_verified,
    last_updated
  ) values (
    v_id,
    v_slug,
    payload->>'name',
    payload->>'short_description',
    payload->>'description',
    coalesce(payload->>'headquarters', ''),
    coalesce(payload->>'website', ''),
    nullif(payload->>'usdot_number', ''),
    nullif(payload->>'mc_number', ''),
    coalesce(payload->>'fmcsa_safety_rating', 'Not Rated'),
    coalesce((payload->>'fmcsa_complaints')::int, 0),
    coalesce((payload->>'fmcsa_shipments')::int, 1000),
    coalesce(payload->>'bbb_rating', 'NR'),
    coalesce((payload->>'bbb_accredited')::boolean, false),
    coalesce((payload->>'overall_rating')::numeric, 0),
    coalesce((payload->>'review_count')::int, 0),
    coalesce((payload->>'reputation_score')::int, 0),
    coalesce((payload->>'years_in_business')::int, 0),
    coalesce((payload->>'avg_price_per_move')::int, 0),
    coalesce(payload->>'price_range', chr(36) || chr(36)),
    coalesce(payload->>'coverage', 'Continental US'),
    coalesce(payload->'services', '["Full Service"]'::jsonb),
    coalesce(payload->'specialties', '[]'::jsonb),
    coalesce(payload->'rating_breakdown', '{}'::jsonb),
    coalesce((payload->>'is_verified')::boolean, false),
    coalesce((payload->>'last_updated')::timestamptz, now())
  );

  begin
    update public.companies set
      fmcsa_last_checked = (payload->>'fmcsa_last_checked')::timestamptz,
      authority_active = (payload->>'authority_active')::boolean,
      out_of_service = coalesce((payload->>'out_of_service')::boolean, false),
      complaints_last_12m = coalesce((payload->>'complaints_last_12m')::int, 0),
      revocation_date = nullif(payload->>'revocation_date', '')::date,
      data_hash = nullif(payload->>'data_hash', ''),
      fmcsa_legal_name = nullif(payload->>'fmcsa_legal_name', ''),
      fmcsa_raw = payload->'fmcsa_raw',
      google_data = payload->'google_data',
      public_scrape_data = payload->'public_scrape_data'
    where id = v_id;
  exception
    when undefined_column then
      null;
  end;

  return jsonb_build_object('company_id', v_id, 'slug', v_slug, 'existing', false);
exception
  when unique_violation then
    select id, slug into v_existing
    from public.companies
    where slug = v_slug or id = v_id
    limit 1;
    return jsonb_build_object(
      'company_id', v_existing.id,
      'slug', v_existing.slug,
      'existing', true
    );
end;
$mth$;

create or replace function public.mth_get_directory_company(p_key text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $mth$
declare
  v_row public.companies%rowtype;
  v_usdot text;
begin
  if p_key is null or length(trim(p_key)) = 0 then
    return null;
  end if;

  select * into v_row
  from public.companies
  where slug = p_key or id = p_key
  limit 1;

  if found then
    return to_jsonb(v_row);
  end if;

  if p_key ~ '^dot-[0-9]{3,8}$' then
    v_usdot := substring(p_key from 5);
  elsif p_key ~ '^[0-9]{3,8}$' then
    v_usdot := p_key;
  end if;

  if v_usdot is not null then
    select * into v_row
    from public.companies
    where usdot_number = v_usdot
    limit 1;

    if found then
      return to_jsonb(v_row);
    end if;
  end if;

  return null;
end;
$mth$;

alter function public.mth_directory_health() set search_path = public;
alter function public.refresh_moving_company_review_stats(uuid) set search_path = public;
alter function public.trg_refresh_company_review_stats() set search_path = public;
alter function public.consume_network_auth_handoff(text, text) set search_path = public;
alter function public.local_canary_movers_for_county(text, text, integer) set search_path = public;

-- Prior ACLs: PUBLIC execute on the first five; consume and canary had no PUBLIC grant.
grant execute on function public.mth_directory_health() to public, anon, authenticated, service_role;
grant execute on function public.mth_publish_directory_company(jsonb) to public, anon, authenticated, service_role;
grant execute on function public.mth_get_directory_company(text) to public, anon, authenticated, service_role;
grant execute on function public.refresh_moving_company_review_stats(uuid) to public, anon, authenticated, service_role;
grant execute on function public.trg_refresh_company_review_stats() to public, anon, authenticated, service_role;

revoke all on function public.consume_network_auth_handoff(text, text) from public;
grant execute on function public.consume_network_auth_handoff(text, text) to anon, authenticated, service_role;

revoke all on function public.local_canary_movers_for_county(text, text, integer) from public;
grant execute on function public.local_canary_movers_for_county(text, text, integer) to anon, authenticated, service_role;

-- Drop column-specific SELECT, then restore table-level ALL (arwdDxtm) for anon and authenticated.
do $rb$
declare
  cols text;
begin
  select string_agg(quote_ident(attname), ', ' order by attnum)
    into cols
  from pg_attribute
  where attrelid = 'public.company_reviews'::regclass
    and attnum > 0
    and not attisdropped;

  execute format(
    'revoke all (%s) on table public.company_reviews from anon, authenticated, public',
    cols
  );
end;
$rb$;

grant all on table public.company_reviews to anon, authenticated;

alter view public.companies_with_stats reset (security_invoker);

notify pgrst, 'reload schema';

commit;
