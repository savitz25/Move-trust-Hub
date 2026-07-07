-- Publish directory companies via RPC (bypasses PostgREST table schema cache issues)

create or replace function public.mth_directory_health()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'companies_table_exists',
      exists (
        select 1
        from information_schema.tables
        where table_schema = 'public'
          and table_name = 'companies'
      ),
    'companies_row_count',
      case
        when exists (
          select 1 from information_schema.tables
          where table_schema = 'public' and table_name = 'companies'
        )
        then (select count(*)::int from public.companies)
        else 0
      end,
    'suggestions_pending',
      case
        when exists (
          select 1 from information_schema.tables
          where table_schema = 'public' and table_name = 'company_suggestions'
        )
        then (select count(*)::int from public.company_suggestions where status = 'pending')
        else 0
      end
  );
$$;

create or replace function public.mth_publish_directory_company(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
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
    coalesce(payload->>'price_range', '$$'),
    coalesce(payload->>'coverage', 'Continental US'),
    coalesce(payload->'services', '["Full Service"]'::jsonb),
    coalesce(payload->'specialties', '[]'::jsonb),
    coalesce(payload->'rating_breakdown', '{}'::jsonb),
    coalesce((payload->>'is_verified')::boolean, false),
    coalesce((payload->>'last_updated')::timestamptz, now())
  );

  -- Optional extended columns (ignore if migration not applied)
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
$$;

create or replace function public.mth_get_directory_company(p_key text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
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
$$;

grant execute on function public.mth_directory_health() to service_role;
grant execute on function public.mth_publish_directory_company(jsonb) to service_role;
grant execute on function public.mth_get_directory_company(text) to anon, authenticated, service_role;

notify pgrst, 'reload schema';