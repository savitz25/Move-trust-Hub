-- PREPARED/NOT RUN. Only after isolated migration and role review. Rolls back fixtures.
begin;
do $$ begin
  if current_setting('mth.v23_isolated',true) is distinct from 'approved' then raise exception 'Isolated target required'; end if;
  if has_table_privilege('anon','mth_profile_transfer.stages','select') or
     has_table_privilege('authenticated','mth_profile_transfer.stages','select') then raise exception 'Browser grant leak'; end if;
  if exists(select 1 from pg_roles where rolname='mth_move_profile_transfer' and (rolcanlogin or rolbypassrls or rolsuper)) then raise exception 'Unsafe role'; end if;
  if (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='mth_profile_transfer' and c.relname in ('stages','quota') and c.relrowsecurity and c.relforcerowsecurity)<>2 then raise exception 'RLS missing'; end if;
end $$;
set local role mth_move_profile_transfer;
insert into mth_profile_transfer.stages(ticket_hash,browser_hash,continuation_hash,record,expires_at,receipt_retry_until)
values(repeat('a',64),repeat('b',64),repeat('c',64),jsonb_build_object('browserHash',repeat('b',64),
  'continuationRef',repeat('c',43),'requestPrefix',repeat('r',43)),clock_timestamp()+interval '5 minutes',clock_timestamp()+interval '1 hour');
do $$ begin
  begin
    insert into mth_profile_transfer.stages select * from mth_profile_transfer.stages where ticket_hash=repeat('a',64);
    raise exception 'Duplicate insert accepted';
  exception when unique_violation then null; end;
end $$;
update mth_profile_transfer.stages set record=record||jsonb_build_object('accountContextRef',repeat('a',43)) where ticket_hash=repeat('a',64);
do $$ begin
  begin
    update mth_profile_transfer.stages set record=record||jsonb_build_object('accountContextRef',repeat('z',43)) where ticket_hash=repeat('a',64);
    raise exception 'Rebind unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
  begin
    update mth_profile_transfer.stages set expires_at=expires_at+interval '1 second' where ticket_hash=repeat('a',64);
    raise exception 'Expiry extension unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
end $$;
rollback;
