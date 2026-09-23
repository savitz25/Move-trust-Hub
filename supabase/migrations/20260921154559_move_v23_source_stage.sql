-- V2-3A2: PREPARED ONLY, NOT APPLIED. Isolated source backend only.
-- Operator must explicitly attest the isolated target in this session first.
begin;
do $$ begin
  if current_setting('mth.v23_isolated', true) is distinct from 'approved' then
    raise exception 'Isolated target approval required';
  end if;
end $$;
-- Intentionally fail on collisions; never repurpose another schema/role.
create schema mth_profile_transfer;
revoke all on schema mth_profile_transfer from public, anon, authenticated;
create role mth_move_profile_transfer nologin noinherit nosuperuser nocreatedb nocreaterole noreplication nobypassrls;
create table mth_profile_transfer.stages (
  ticket_hash text primary key check(ticket_hash ~ '^[a-f0-9]{64}$'),
  browser_hash text not null check(browser_hash ~ '^[a-f0-9]{64}$'),
  continuation_hash text not null unique check(continuation_hash ~ '^[a-f0-9]{64}$'),
  record jsonb not null check(jsonb_typeof(record)='object' and octet_length(record::text)<=131072),
  created_at timestamptz not null default clock_timestamp(),
  expires_at timestamptz not null,
  receipt_retry_until timestamptz not null,
  check(expires_at>created_at and expires_at<=created_at+interval '10 minutes'),
  check(receipt_retry_until>=expires_at and receipt_retry_until<=created_at+interval '1 day'),
  check(record - array['browserHash','manifest','parentStage','continuationRef','requestPrefix','expiresAt','accountContextRef','projectRef'] = '{}'::jsonb),
  check(record->>'browserHash'=browser_hash),
  check(record->>'continuationRef' ~ '^[A-Za-z0-9_-]{43}$'),
  check(record->>'requestPrefix' ~ '^[A-Za-z0-9_-]{43}$'),
  check(not(record ? 'accountContextRef') or record->>'accountContextRef' ~ '^[A-Za-z0-9_-]{43}$'),
  check(not(record ? 'projectRef') or (record ? 'accountContextRef' and record->>'projectRef' ~ '^[A-Za-z0-9_-]{43}$'))
);
create index stages_retry_expiry on mth_profile_transfer.stages(receipt_retry_until);
create function mth_profile_transfer.guard_stage_update() returns trigger
language plpgsql security invoker set search_path=pg_catalog as $$
begin
  if new.ticket_hash<>old.ticket_hash or new.browser_hash<>old.browser_hash or
     new.continuation_hash<>old.continuation_hash or new.created_at<>old.created_at or
     new.expires_at<>old.expires_at or new.receipt_retry_until<>old.receipt_retry_until or
     (new.record-array['accountContextRef','projectRef']) is distinct from (old.record-array['accountContextRef','projectRef']) or
     ((old.record ? 'accountContextRef') and
       (new.record->'accountContextRef' is distinct from old.record->'accountContextRef' or new.record->'projectRef' is distinct from old.record->'projectRef')) then
    raise exception 'Immutable source transfer or account context changed';
  end if;
  return new;
end $$;
revoke all on function mth_profile_transfer.guard_stage_update() from public,anon,authenticated;
create trigger stages_immutable before update on mth_profile_transfer.stages
for each row execute function mth_profile_transfer.guard_stage_update();
create table mth_profile_transfer.quota (
  bucket text primary key check(bucket ~ '^[a-f0-9]{64}$'),
  minute bigint not null,
  count bigint not null check(count>0)
);
create index quota_expiry on mth_profile_transfer.quota(minute);
alter table mth_profile_transfer.stages enable row level security;
alter table mth_profile_transfer.stages force row level security;
alter table mth_profile_transfer.quota enable row level security;
alter table mth_profile_transfer.quota force row level security;
revoke all on all tables in schema mth_profile_transfer from public,anon,authenticated;
grant usage on schema mth_profile_transfer to mth_move_profile_transfer;
grant select,insert,update,delete on mth_profile_transfer.stages,mth_profile_transfer.quota to mth_move_profile_transfer;
create policy source_service_only on mth_profile_transfer.stages to mth_move_profile_transfer using(true) with check(true);
create policy source_service_only on mth_profile_transfer.quota to mth_move_profile_transfer using(true) with check(true);
-- NO login, membership, password, service_role grant, scheduler or backend connection.
-- A separately approved dedicated connection must use this one narrow capability.
commit;
