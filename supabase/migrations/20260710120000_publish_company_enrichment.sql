-- Ensure publish RPC copies all enrichment columns after insert

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
      fmcsa_last_checked = nullif(payload->>'fmcsa_last_checked', '')::timestamptz,
      authority_active = nullif(payload->>'authority_active', '')::boolean,
      out_of_service = coalesce((payload->>'out_of_service')::boolean, false),
      complaints_last_12m = coalesce((payload->>'complaints_last_12m')::int, 0),
      revocation_date = nullif(payload->>'revocation_date', '')::date,
      data_hash = nullif(payload->>'data_hash', ''),
      fmcsa_legal_name = nullif(payload->>'fmcsa_legal_name', ''),
      fmcsa_raw = payload->'fmcsa_raw',
      google_data = payload->'google_data',
      public_scrape_data = payload->'public_scrape_data',
      verification_sources = coalesce(payload->'verification_sources', '{}'::jsonb),
      verification_last_synced_at = nullif(payload->>'verification_last_synced_at', '')::timestamptz
    where id = v_id;
  exception
    when undefined_column then
      begin
        update public.companies set
          fmcsa_last_checked = nullif(payload->>'fmcsa_last_checked', '')::timestamptz,
          authority_active = nullif(payload->>'authority_active', '')::boolean,
          out_of_service = coalesce((payload->>'out_of_service')::boolean, false),
          fmcsa_legal_name = nullif(payload->>'fmcsa_legal_name', ''),
          fmcsa_raw = payload->'fmcsa_raw',
          google_data = payload->'google_data',
          public_scrape_data = payload->'public_scrape_data'
        where id = v_id;
      exception
        when undefined_column then
          null;
      end;
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

grant execute on function public.mth_publish_directory_company(jsonb) to service_role;

notify pgrst, 'reload schema';