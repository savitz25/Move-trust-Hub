-- UNAPPLIED. Stop new stages and wait for retry retention before approved teardown.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then
    raise exception 'Isolated target approval required';
  end if;
  if exists(select 1 from mth_profile_transfer.stages where receipt_retry_until>clock_timestamp()) then
    raise exception 'Live source retry metadata remains; refuse destructive rollback';
  end if;
end $$;
drop table mth_profile_transfer.stages;
drop table mth_profile_transfer.quota;
drop function mth_profile_transfer.guard_stage_update();
drop schema mth_profile_transfer; -- no CASCADE: unexpected dependencies must block
drop role mth_move_profile_transfer; -- active grants/memberships must be reviewed
commit;
