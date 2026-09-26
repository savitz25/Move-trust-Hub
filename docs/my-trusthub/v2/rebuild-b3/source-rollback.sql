-- PREPARED ONLY. Requires separately approved source target, drained runtime,
-- reviewed retention/export decision and revoked login membership first.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then raise exception 'Isolated approval required'; end if;
  if exists(select 1 from pg_auth_members where roleid='mth_move_profile_transfer'::regrole) then raise exception 'Revoke source membership first'; end if;
  if exists(select 1 from pg_stat_activity where usename='mth_move_profile_transfer_preview') then raise exception 'Drain source runtime first'; end if;
end $$;
-- No CASCADE: unexpected external dependencies stop rollback for review.
drop table mth_profile_transfer.stages;
drop table mth_profile_transfer.quota;
drop table mth_profile_transfer.nonces;
drop table mth_profile_transfer.browsers;
drop function mth_profile_transfer.guard_stage_update();
drop schema mth_profile_transfer;
drop role mth_move_profile_transfer;
commit;
