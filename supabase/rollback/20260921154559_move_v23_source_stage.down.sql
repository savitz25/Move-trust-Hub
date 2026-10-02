-- UNAPPLIED. Stop new stages and wait for retry retention before approved teardown.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then
    raise exception 'Isolated target approval required';
  end if;
  if exists(select 1 from mth_profile_transfer.stages where receipt_retry_until>clock_timestamp()) then
    raise exception 'Live source retry metadata remains; refuse destructive rollback';
  end if;
  if exists(select 1 from mth_profile_transfer.assertion_nonces where expires_at>clock_timestamp()) then
    raise exception 'Live assertion nonces remain; refuse destructive rollback';
  end if;
end $$;
-- Clear schema-scoped default ACL rows before DROP SCHEMA.
-- This does not change PostgreSQL's built-in function default and does not use CASCADE.
alter default privileges in schema mth_profile_transfer grant execute on functions to public;
alter default privileges in schema mth_profile_transfer revoke all on tables from public, anon, authenticated, service_role;
alter default privileges in schema mth_profile_transfer revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges in schema mth_profile_transfer revoke all on functions from anon, authenticated, service_role;
drop function mth_profile_transfer.claim_assertion_nonce(text, timestamptz);
drop function mth_profile_transfer.cleanup_assertion_nonces(integer);
drop table mth_profile_transfer.assertion_nonces;
drop table mth_profile_transfer.stages;
drop table mth_profile_transfer.quota;
drop function mth_profile_transfer.guard_stage_update();
drop schema mth_profile_transfer; -- no CASCADE: unexpected dependencies must block
drop role mth_move_profile_transfer; -- active grants/memberships must be reviewed
commit;
