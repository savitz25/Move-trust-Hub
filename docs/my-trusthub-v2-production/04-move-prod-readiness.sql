-- MY TRUSTHUB V2 PRODUCTION HANDOFF — MOVE READINESS (READ-ONLY, operator).
-- Target arepfylnilkjmyduhwbz. Run after 01..03 and after the login password
-- is set. Requires the single marker below.
do $$ begin
  if current_setting('mth.v23_production', true) is distinct from 'approved' then
    raise exception 'Production target approval required';
  end if;
  if to_regnamespace('mth_profile_transfer') is null
     or to_regclass('mth_profile_transfer.stages') is null or to_regclass('mth_profile_transfer.quota') is null
     or to_regclass('mth_profile_transfer.assertion_nonces') is null or to_regclass('mth_profile_transfer.certified_publication') is null
     or to_regprocedure('mth_profile_transfer.claim_assertion_nonce(text,timestamptz)') is null then
    raise exception 'MTH_PROD_READY_FAIL: missing object';
  end if;
  if (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='mth_profile_transfer'
      and c.relkind='r' and not (c.relrowsecurity and c.relforcerowsecurity))>0 then
    raise exception 'MTH_PROD_READY_FAIL: a table lacks forced RLS';
  end if;
  if (select count(*) from mth_profile_transfer.certified_publication)<>1 then
    raise exception 'MTH_PROD_READY_FAIL: certified_publication must hold exactly the one canary row';
  end if;
  if not exists(select 1 from pg_roles where rolname='mth_move_v23_prod' and rolcanlogin
      and not (rolinherit or rolsuper or rolbypassrls or rolcreatedb or rolcreaterole or rolreplication)) then
    raise exception 'MTH_PROD_READY_FAIL: runtime login missing or over-privileged';
  end if;
  if (select count(*) from pg_auth_members m join pg_roles r on r.oid=m.roleid where m.member=to_regrole('mth_move_v23_prod'))<>1
     or not exists(select 1 from pg_auth_members m where m.member=to_regrole('mth_move_v23_prod') and m.roleid=to_regrole('mth_move_profile_transfer')
       and m.set_option and not m.inherit_option and not m.admin_option) then
    raise exception 'MTH_PROD_READY_FAIL: login membership must be exactly SET-only mth_move_profile_transfer';
  end if;
  if exists(select 1 from information_schema.role_table_grants where grantee='mth_move_v23_prod')
     or has_table_privilege('anon','mth_profile_transfer.stages','SELECT') or has_table_privilege('authenticated','mth_profile_transfer.stages','SELECT')
     or has_table_privilege('service_role','mth_profile_transfer.certified_publication','SELECT') then
    raise exception 'MTH_PROD_READY_FAIL: a non-capability role can reach transfer state';
  end if;
  raise notice 'MTH_PROD_SOURCE_READY_PASS';
end $$;
