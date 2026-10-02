-- MY TRUSTHUB V2 PRODUCTION HANDOFF — MOVE RUNTIME LOGIN.
-- Target arepfylnilkjmyduhwbz. Operator session; requires 01 and
--   select set_config('mth.v23_production','approved',false);
-- No password is generated, embedded or logged here. After COMMIT, set it in
-- the SAME session through a non-echoing channel (psql: \password mth_move_v23_prod).
-- The value goes only into the Move production Vercel secret
-- MTH_MOVE_PARENT_SAVE_DATABASE_URL (Supavisor session URI, port 5432, user
-- mth_move_v23_prod.arepfylnilkjmyduhwbz, database postgres).
begin;
do $$ begin
  if current_setting('mth.v23_production', true) is distinct from 'approved' then
    raise exception 'Production target approval required';
  end if;
  if to_regrole('mth_move_profile_transfer') is null then raise exception '01 required'; end if;
  if to_regrole('mth_move_v23_prod') is not null then raise exception 'login already exists; review, do not re-create'; end if;
end $$;
create role mth_move_v23_prod login noinherit nosuperuser nobypassrls nocreatedb nocreaterole noreplication
  connection limit 4 password null;
-- The login has no rights of its own; the application SET ROLEs into the capability.
grant mth_move_profile_transfer to mth_move_v23_prod with admin false, inherit false, set true;
alter role mth_move_v23_prod set statement_timeout='5s';
alter role mth_move_v23_prod set lock_timeout='3s';
alter role mth_move_v23_prod set idle_in_transaction_session_timeout='10s';
do $$ begin raise notice 'MTH_PROD_RUNTIME_LOGIN_APPLIED'; end $$;
commit;
