-- PREPARED/NOT RUN. Only after isolated migration and role review. Rolls back fixtures.
begin;
do $$ begin
  perform set_config('mth.v23_isolated', 'denied', true);
  begin
    if current_setting('mth.v23_isolated', true) is distinct from 'approved' then
      raise exception 'Isolated target approval required';
    end if;
    raise exception 'Unapproved isolated target unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm <> 'Isolated target approval required' then raise; end if;
  end;
  perform set_config('mth.v23_isolated', 'approved', true);
  if current_setting('mth.v23_isolated', true) is distinct from 'approved' then
    raise exception 'Isolated target required';
  end if;
end $$;
do $$
declare
  role_name text;
  relation_name text;
  function_name text;
begin
  if has_schema_privilege('public', 'mth_profile_transfer', 'USAGE')
     or has_schema_privilege('public', 'mth_profile_transfer', 'CREATE')
     or has_schema_privilege('anon', 'mth_profile_transfer', 'USAGE')
     or has_schema_privilege('anon', 'mth_profile_transfer', 'CREATE')
     or has_schema_privilege('authenticated', 'mth_profile_transfer', 'USAGE')
     or has_schema_privilege('authenticated', 'mth_profile_transfer', 'CREATE')
     or has_schema_privilege('service_role', 'mth_profile_transfer', 'USAGE')
     or has_schema_privilege('service_role', 'mth_profile_transfer', 'CREATE') then
    raise exception 'Schema privilege leak';
  end if;
  foreach role_name in array ARRAY['public','anon','authenticated','service_role'] loop
    foreach relation_name in array ARRAY['stages','quota','assertion_nonces'] loop
      if has_table_privilege(role_name, 'mth_profile_transfer.' || relation_name, 'SELECT')
         or has_table_privilege(role_name, 'mth_profile_transfer.' || relation_name, 'INSERT')
         or has_table_privilege(role_name, 'mth_profile_transfer.' || relation_name, 'UPDATE')
         or has_table_privilege(role_name, 'mth_profile_transfer.' || relation_name, 'DELETE') then
        raise exception 'Table privilege leak for % on %', role_name, relation_name;
      end if;
    end loop;
    foreach function_name in array ARRAY[
      'mth_profile_transfer.guard_stage_update()',
      'mth_profile_transfer.claim_assertion_nonce(text,timestamptz)',
      'mth_profile_transfer.cleanup_assertion_nonces(integer)'
    ] loop
      if has_function_privilege(role_name, function_name, 'EXECUTE') then
        raise exception 'Function execute leak for % on %', role_name, function_name;
      end if;
    end loop;
  end loop;
  if not has_schema_privilege('mth_move_profile_transfer', 'mth_profile_transfer', 'USAGE')
     or has_schema_privilege('mth_move_profile_transfer', 'mth_profile_transfer', 'CREATE') then
    raise exception 'Capability schema privilege mismatch';
  end if;
  if not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.stages', 'SELECT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.stages', 'INSERT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.stages', 'UPDATE')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.stages', 'DELETE')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.quota', 'SELECT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.quota', 'INSERT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.quota', 'UPDATE')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.quota', 'DELETE')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.assertion_nonces', 'SELECT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.assertion_nonces', 'INSERT')
     or not has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.assertion_nonces', 'DELETE')
     or has_table_privilege('mth_move_profile_transfer', 'mth_profile_transfer.assertion_nonces', 'UPDATE') then
    raise exception 'Capability table privilege mismatch';
  end if;
  if (select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where n.nspname='mth_profile_transfer' and p.prokind in ('f','p')) <> 3 then
    raise exception 'Unexpected My TrustHub routine count';
  end if;
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid=p.pronamespace
    cross join (values ('public'),('anon'),('authenticated'),('service_role')) as roles(role_name)
    where n.nspname='mth_profile_transfer' and p.prokind in ('f','p')
      and has_function_privilege(roles.role_name, p.oid, 'EXECUTE')
  ) then
    raise exception 'Routine execute leak';
  end if;
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='mth_profile_transfer' and p.prokind in ('f','p')
      and (
        (p.proname in ('guard_stage_update','claim_assertion_nonce','cleanup_assertion_nonces')
          and not has_function_privilege('mth_move_profile_transfer', p.oid, 'EXECUTE'))
        or (p.proname not in ('guard_stage_update','claim_assertion_nonce','cleanup_assertion_nonces')
          and has_function_privilege('mth_move_profile_transfer', p.oid, 'EXECUTE'))
      )
  ) then
    raise exception 'Capability function privilege mismatch';
  end if;
  if exists(select 1 from pg_roles where rolname='mth_move_profile_transfer' and (rolcanlogin or rolbypassrls or rolsuper or rolinherit or rolcreatedb or rolcreaterole or rolreplication)) then
    raise exception 'Unsafe role';
  end if;
  if (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='mth_profile_transfer' and c.relname in ('stages','quota','assertion_nonces')
        and c.relrowsecurity and c.relforcerowsecurity) <> 3 then
    raise exception 'RLS missing';
  end if;
  if exists (
    select 1
    from pg_default_acl d
    join pg_namespace n on n.oid = d.defaclnamespace
    cross join lateral aclexplode(d.defaclacl) x
    left join pg_roles r on r.oid = x.grantee
    where n.nspname = 'mth_profile_transfer'
      and (x.grantee = 0 or r.rolname in ('anon','authenticated','service_role'))
  ) then
    raise exception 'Schema-scoped default ACL grants an unintended role';
  end if;
end $$;
do $$
declare mem record;
begin
  if session_user <> 'postgres' or current_user <> 'postgres' then
    raise exception 'Unexpected connector role';
  end if;

  select m.admin_option, m.inherit_option, m.set_option
    into strict mem
  from pg_auth_members m
  join pg_roles member_role on member_role.oid = m.member
  join pg_roles granted_role on granted_role.oid = m.roleid
  where member_role.rolname = current_user
    and granted_role.rolname = 'mth_move_profile_transfer';

  if mem.admin_option is not true
     or mem.inherit_option is not false
     or mem.set_option is not false then
    raise exception 'Unexpected membership options before test role switch';
  end if;
end $$;

grant mth_move_profile_transfer
  to current_user
  with inherit false, set true;

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
  begin
    update mth_profile_transfer.stages set ticket_hash=repeat('d',64) where ticket_hash=repeat('a',64);
    raise exception 'Ticket identity change unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
  begin
    update mth_profile_transfer.stages set browser_hash=repeat('e',64) where ticket_hash=repeat('a',64);
    raise exception 'Browser identity change unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
  begin
    update mth_profile_transfer.stages set continuation_hash=repeat('f',64) where ticket_hash=repeat('a',64);
    raise exception 'Continuation identity change unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
  begin
    update mth_profile_transfer.stages
      set record=jsonb_set(record, '{requestPrefix}', to_jsonb(repeat('q',43)))
      where ticket_hash=repeat('a',64);
    raise exception 'Request prefix change unexpectedly accepted';
  exception when raise_exception then
    if sqlerrm<>'Immutable source transfer or account context changed' then raise; end if;
  end;
end $$;
insert into mth_profile_transfer.quota(bucket, minute, count) values (repeat('ab',32), 1, 1);
do $$ begin
  begin
    insert into mth_profile_transfer.quota(bucket, minute, count) values ('not-a-digest', 1, 1);
    raise exception 'Malformed quota bucket accepted';
  exception when check_violation then null; end;
  begin
    insert into mth_profile_transfer.quota(bucket, minute, count) values (repeat('cd',32), 1, 0);
    raise exception 'Non-positive quota count accepted';
  exception when check_violation then null; end;
  begin
    insert into mth_profile_transfer.quota(bucket, count) values (repeat('ef',32), 1);
    raise exception 'Quota minute default unexpectedly accepted';
  exception when not_null_violation then null; end;
end $$;
do $$ begin
  if mth_profile_transfer.claim_assertion_nonce(repeat('ab',32), clock_timestamp()+interval '40 seconds') is not true then
    raise exception 'First nonce claim must succeed';
  end if;
  if mth_profile_transfer.claim_assertion_nonce(repeat('ab',32), clock_timestamp()+interval '40 seconds') is not false then
    raise exception 'Replayed nonce must be rejected';
  end if;
end $$;
insert into mth_profile_transfer.assertion_nonces(nonce_hash, expires_at)
values (repeat('11',32), clock_timestamp()-interval '2 minutes'),
       (repeat('22',32), clock_timestamp()-interval '1 minute'),
       (repeat('33',32), clock_timestamp()+interval '30 minutes');
do $$
declare removed integer;
begin
  removed := mth_profile_transfer.cleanup_assertion_nonces(1);
  if removed <> 1 then raise exception 'Bounded cleanup removed % rows', removed; end if;
  if (select count(*) from mth_profile_transfer.assertion_nonces where expires_at<=clock_timestamp()) <> 1 then
    raise exception 'Bounded cleanup did not leave the remaining expired nonce';
  end if;
  if not exists (select 1 from mth_profile_transfer.assertion_nonces where nonce_hash=repeat('33',32)) then
    raise exception 'Cleanup removed an unexpired nonce';
  end if;
  removed := mth_profile_transfer.cleanup_assertion_nonces(2);
  if removed <> 1 then raise exception 'Second cleanup removed % rows', removed; end if;
  if exists (select 1 from mth_profile_transfer.assertion_nonces where expires_at<=clock_timestamp()) then
    raise exception 'Expired nonce remained after the second bounded cleanup';
  end if;
  if not exists (select 1 from mth_profile_transfer.assertion_nonces where nonce_hash=repeat('33',32)) then
    raise exception 'Unexpired nonce was removed when spare batch capacity remained';
  end if;
  begin
    perform mth_profile_transfer.cleanup_assertion_nonces(501);
    raise exception 'Unbounded nonce cleanup accepted';
  exception when raise_exception then
    if sqlerrm<>'invalid_cleanup_limit' then raise; end if;
  end;
end $$;
rollback;
