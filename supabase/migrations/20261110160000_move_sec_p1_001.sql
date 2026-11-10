-- MOVE-SEC-P1-001
-- Privilege lockdown for the seven anon-executable SECURITY DEFINER functions on
-- Move (arepfylnilkjmyduhwbz) and for company_reviews PII columns.
-- Does not change row data. Do not apply this file to production from the PR.
--
-- Captured read-only on 2026-11-10. Anon EXECUTE was true for:
--   mth_directory_health(), mth_publish_directory_company(jsonb),
--   mth_get_directory_company(text), refresh_moving_company_review_stats(uuid),
--   trg_refresh_company_review_stats(), consume_network_auth_handoff(text,text),
--   local_canary_movers_for_county(text,text,integer)
--
-- Callers (see TEST-RECEIPT.md):
--   mth_publish_directory_company / mth_directory_health — service_role only.
--   consume_network_auth_handoff — service_role only (Lender 10-16 pattern:
--     revoke anon + authenticated + PUBLIC, keep service_role, pin search_path).
--   refresh_* / trg_* — trigger only; the owner runs them. No API caller.
--   local_canary_movers_for_county — server-only caller moved to service_role.
--   mth_get_directory_company — EXCEPTION. The public company resolver
--     (lib/supabase/queries/companies.ts) calls it with the anon key when the
--     table read misses or the schema cache is unavailable. Anon EXECUTE stays.
--     The function is read-only and rejects any JWT role other than anon or
--     service_role. authenticated is revoked: no caller uses that role.

begin;

set local lock_timeout = '5s';
set local statement_timeout = '60s';

-- ---------------------------------------------------------------------------
-- P1-A. Publish RPC: reject anon/authenticated even if EXECUTE is re-granted.
-- current_user inside SECURITY DEFINER is the owner, so the check uses the
-- PostgREST JWT role. A direct owner/service connection has no JWT and is allowed.
-- ---------------------------------------------------------------------------
create or replace function public.mth_publish_directory_company(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $mth$
declare
  v_id text := coalesce(payload->>'id', payload->>'slug');
  v_slug text := coalesce(payload->>'slug', payload->>'id');
  v_existing record;
  v_api_role text := nullif(current_setting('request.jwt.claim.role', true), '');
begin
  if v_api_role is null and coalesce(current_setting('request.jwt.claims', true), '') ~ '^\s*\{' then
    begin
      v_api_role := nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'role', '');
    exception
      when others then
        v_api_role := null;
    end;
  end if;

  if v_api_role in ('anon', 'authenticated') then
    raise exception 'permission denied for function mth_publish_directory_company'
      using errcode = '42501';
  end if;

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

  -- Same enrichment write as 20260710120000. The nested handler keeps
  -- publishes working if those columns are absent. Rollback restores the
  -- body captured from production on 2026-11-10, which did not set them.
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

-- ---------------------------------------------------------------------------
-- Exception: public profile fallback. Read-only. Anon EXECUTE is retained.
-- ---------------------------------------------------------------------------
create or replace function public.mth_get_directory_company(p_key text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $mth$
declare
  v_row public.companies%rowtype;
  v_usdot text;
  v_api_role text := nullif(current_setting('request.jwt.claim.role', true), '');
begin
  if v_api_role is null and coalesce(current_setting('request.jwt.claims', true), '') ~ '^\s*\{' then
    begin
      v_api_role := nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'role', '');
    exception
      when others then
        v_api_role := null;
    end;
  end if;

  if v_api_role is not null and v_api_role not in ('anon', 'service_role') then
    raise exception 'permission denied for function mth_get_directory_company'
      using errcode = '42501';
  end if;

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

alter function public.mth_directory_health() set search_path = public, pg_temp;
alter function public.refresh_moving_company_review_stats(uuid) set search_path = public, pg_temp;
alter function public.trg_refresh_company_review_stats() set search_path = public, pg_temp;
alter function public.consume_network_auth_handoff(text, text) set search_path = public, pg_temp;
alter function public.local_canary_movers_for_county(text, text, integer) set search_path = public, pg_temp;

-- PUBLIC plus the named API roles. service_role keeps EXECUTE on every function.
revoke all on function public.mth_directory_health() from public, anon, authenticated;
revoke all on function public.mth_publish_directory_company(jsonb) from public, anon, authenticated;
revoke all on function public.mth_get_directory_company(text) from public, authenticated;
revoke all on function public.refresh_moving_company_review_stats(uuid) from public, anon, authenticated;
revoke all on function public.trg_refresh_company_review_stats() from public, anon, authenticated;
revoke all on function public.consume_network_auth_handoff(text, text) from public, anon, authenticated;
revoke all on function public.local_canary_movers_for_county(text, text, integer) from public, anon, authenticated;

grant execute on function public.mth_directory_health() to service_role;
grant execute on function public.mth_publish_directory_company(jsonb) to service_role;
grant execute on function public.mth_get_directory_company(text) to anon, service_role;
grant execute on function public.refresh_moving_company_review_stats(uuid) to service_role;
grant execute on function public.trg_refresh_company_review_stats() to service_role;
grant execute on function public.consume_network_auth_handoff(text, text) to service_role;
grant execute on function public.local_canary_movers_for_county(text, text, integer) to service_role;

-- ---------------------------------------------------------------------------
-- P1-B. Table SELECT implies every column. Replace it with an explicit column
-- list that omits reviewer_email, email_hash, submitter_ip, and user_id.
-- anon and authenticated have no caller that selects those four columns.
-- service_role keeps table-level privileges (admin, rate limit, portal, submit).
-- Public review queries select the columns granted below and filter on status.
-- ---------------------------------------------------------------------------
revoke select on table public.company_reviews from anon, authenticated, public;

grant select (
  id,
  company_id,
  reviewer_name,
  rating,
  title,
  content,
  photo_urls,
  status,
  moderation_note,
  moderated_at,
  moderated_by,
  move_date,
  source_page,
  created_at,
  updated_at,
  verification_tier,
  owner_response,
  owner_response_at,
  owner_response_by,
  dispute_status,
  dispute_category,
  dispute_reason,
  disputed_at,
  disputed_by,
  dispute_moderation_note,
  dispute_resolved_at
) on table public.company_reviews to anon, authenticated;

-- ---------------------------------------------------------------------------
-- P2. companies_with_stats is a security-definer view (reloptions null) over
-- public.companies. Read-only check on 2026-11-10: view rows = companies rows
-- (5957), RLS is on, FORCE RLS is off, and the only public SELECT policy is
-- USING (true). anon also holds table-level privileges on companies, so every
-- view column stays selectable. security_invoker therefore returns the same
-- rows. Rollback resets the option.
-- ---------------------------------------------------------------------------
alter view public.companies_with_stats set (security_invoker = true);

notify pgrst, 'reload schema';

commit;
