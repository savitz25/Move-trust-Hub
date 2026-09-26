-- Read-only structural checks; target identity and platform PUBLIC privileges
-- must also be certified by the separately authorized hosted apply packet.
do $$ begin
  if not exists(select 1 from pg_roles where rolname='mth_move_profile_transfer') then raise exception 'Missing source capability'; end if;
  if (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='mth_profile_transfer' and c.relkind='r' and c.relrowsecurity and c.relforcerowsecurity) <> 4 then
    raise exception 'Expected four forced-RLS source tables';
  end if;
  if exists(select 1 from pg_roles where rolname='mth_move_profile_transfer' and
    (rolcanlogin or rolsuper or rolcreaterole or rolcreatedb or rolreplication or rolbypassrls)) then raise exception 'Unsafe source capability'; end if;
  if has_schema_privilege('anon','mth_profile_transfer','USAGE') or has_schema_privilege('authenticated','mth_profile_transfer','USAGE') then
    raise exception 'Source schema exposed';
  end if;
  if (select count(*) from pg_tables where schemaname='mth_profile_transfer')<>4 then raise exception 'Unexpected source table'; end if;
  if not exists(select 1 from pg_roles where rolname='mth_move_profile_transfer_preview' and rolcanlogin and not rolinherit
    and not rolsuper and not rolcreaterole and not rolcreatedb and not rolreplication and not rolbypassrls and rolconnlimit=4) then
    raise exception 'Unsafe or missing source login'; end if;
  if (select count(*) from pg_auth_members where member='mth_move_profile_transfer_preview'::regrole)<>1 or
    not exists(select 1 from pg_auth_members where member='mth_move_profile_transfer_preview'::regrole
      and roleid='mth_move_profile_transfer'::regrole and set_option and not inherit_option and not admin_option) then
    raise exception 'Unexpected source membership'; end if;
  if exists(select 1 from pg_extension where extname='pg_net') or exists(select 1 from pg_namespace where nspname='net') then
    raise exception 'Isolated network extension gate unresolved'; end if;
  if exists(select 1 from pg_namespace n where n.nspname not like 'pg_%' and n.nspname<>'information_schema'
      and has_schema_privilege('mth_move_profile_transfer_preview',n.oid,'CREATE')) or
    exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace where
      n.nspname not like 'pg_%' and n.nspname not in('information_schema','mth_profile_transfer') and c.relkind in('r','v','m','p')
      and has_table_privilege('mth_move_profile_transfer_preview',c.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')) or
    exists(select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where p.prosecdef and
      n.nspname not like 'pg_%' and n.nspname not in('information_schema','mth_profile_transfer') and
      has_function_privilege('mth_move_profile_transfer_preview',p.oid,'EXECUTE')) then
    raise exception 'Source login has unrelated platform capability'; end if;
end $$;
select 'MOVE_V23_SOURCE_PACKET_ASSERTIONS_PASS' as marker;
