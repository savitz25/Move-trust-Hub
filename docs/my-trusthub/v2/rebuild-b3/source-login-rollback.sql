-- PREPARED ONLY: disable/drain login before schema rollback; secret revocation
-- is an operator step under separate authorization, never a web-handler action.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then raise exception 'Isolated approval required'; end if;
  if exists(select 1 from pg_stat_activity where usename='mth_move_profile_transfer_preview') then raise exception 'Drain source runtime first'; end if;
end $$;
revoke mth_move_profile_transfer from mth_move_profile_transfer_preview;
drop role mth_move_profile_transfer_preview;
commit;
