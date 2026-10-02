-- MY TRUSTHUB V2 PRODUCTION HANDOFF — MOVE ROLLBACK.
-- Target arepfylnilkjmyduhwbz. Operator session. Removes ONLY what 01..03
-- created. Turning MTH_MOVE_PARENT_SAVE_MODE off (or NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED
-- to 0) in Vercel is the first rollback; this file is the second, for a clean
-- re-apply. Public mover evidence is untouched.
begin;
do $$ begin
  if current_setting('mth.v23_production', true) is distinct from 'approved'
     or current_setting('mth.v23_rollback_authorized', true) is distinct from 'true' then
    raise exception 'Explicit production rollback authorization required';
  end if;
end $$;
revoke mth_move_profile_transfer from mth_move_v23_prod;
drop role if exists mth_move_v23_prod;
drop table if exists mth_profile_transfer.certified_publication;
drop function if exists mth_profile_transfer.claim_assertion_nonce(text, timestamptz);
drop function if exists mth_profile_transfer.cleanup_assertion_nonces(integer);
drop table if exists mth_profile_transfer.assertion_nonces;
drop table if exists mth_profile_transfer.stages;
drop table if exists mth_profile_transfer.quota;
drop function if exists mth_profile_transfer.guard_stage_update();
alter default privileges in schema mth_profile_transfer grant execute on functions to public;
drop schema mth_profile_transfer;
drop role mth_move_profile_transfer;
do $$ begin
  if to_regnamespace('mth_profile_transfer') is not null or to_regrole('mth_move_profile_transfer') is not null or to_regrole('mth_move_v23_prod') is not null then
    raise exception 'MTH_PROD_ROLLBACK_FAIL';
  end if;
  raise notice 'MTH_PROD_ROLLBACK_PASS';
end $$;
commit;
