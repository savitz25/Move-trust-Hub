-- PREPARED ONLY. Requires the approved source target + platform ACL baseline.
-- Does NOT assign a password or reuse any parent/production credential.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then raise exception 'Isolated approval required'; end if;
end $$;
create role mth_move_profile_transfer_preview login noinherit nosuperuser nocreatedb nocreaterole noreplication nobypassrls connection limit 4;
grant mth_move_profile_transfer to mth_move_profile_transfer_preview with inherit false, set true, admin false;
alter role mth_move_profile_transfer_preview set statement_timeout='5s';
alter role mth_move_profile_transfer_preview set lock_timeout='3s';
alter role mth_move_profile_transfer_preview set idle_in_transaction_session_timeout='5s';
commit;
