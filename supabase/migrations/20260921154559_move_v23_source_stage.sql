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
-- public is the PostgreSQL PUBLIC pseudo-role, not schema public.
-- These revokes stay inside mth_profile_transfer and do not alter schema public.
revoke all on schema mth_profile_transfer from public, anon, authenticated, service_role;
-- Schema-scoped default revokes do not remove PostgreSQL's built-in global
-- PUBLIC EXECUTE default for functions. They only avoid extra schema-local grants.
-- Every function created below is revoked explicitly in this same transaction.
-- Any future function added to mth_profile_transfer must receive that same
-- explicit revoke from PUBLIC, anon, authenticated, and service_role before
-- any capability grant. Do not rely on an event trigger or a database-wide default.
alter default privileges in schema mth_profile_transfer revoke all on tables from public, anon, authenticated, service_role;
alter default privileges in schema mth_profile_transfer revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges in schema mth_profile_transfer revoke all on functions from public, anon, authenticated, service_role;
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
revoke all on function mth_profile_transfer.guard_stage_update() from public, anon, authenticated, service_role;
grant execute on function mth_profile_transfer.guard_stage_update() to mth_move_profile_transfer;
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
revoke all on all tables in schema mth_profile_transfer from public, anon, authenticated, service_role;
grant usage on schema mth_profile_transfer to mth_move_profile_transfer;
grant select,insert,update,delete on mth_profile_transfer.stages,mth_profile_transfer.quota to mth_move_profile_transfer;
create policy source_service_only on mth_profile_transfer.stages to mth_move_profile_transfer using(true) with check(true);
create policy source_service_only on mth_profile_transfer.quota to mth_move_profile_transfer using(true) with check(true);
-- Durable assertion replay. The stored value is SHA-256(iss:kid:jti), never the raw jti.
create table mth_profile_transfer.assertion_nonces (
  nonce_hash text primary key check(nonce_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null
);
create index assertion_nonces_expiry on mth_profile_transfer.assertion_nonces(expires_at);
alter table mth_profile_transfer.assertion_nonces enable row level security;
alter table mth_profile_transfer.assertion_nonces force row level security;
revoke all on mth_profile_transfer.assertion_nonces from public, anon, authenticated, service_role;
grant select, insert, delete on mth_profile_transfer.assertion_nonces to mth_move_profile_transfer;
create policy source_service_only on mth_profile_transfer.assertion_nonces to mth_move_profile_transfer using(true) with check(true);
create function mth_profile_transfer.claim_assertion_nonce(p_nonce_hash text, p_expires_at timestamptz) returns boolean
language plpgsql security invoker set search_path=pg_catalog as $$
declare inserted integer;
begin
  if p_nonce_hash !~ '^[a-f0-9]{64}$' or p_expires_at is null or p_expires_at<=clock_timestamp() then
    return false;
  end if;
  insert into mth_profile_transfer.assertion_nonces(nonce_hash, expires_at)
  values (p_nonce_hash, p_expires_at)
  on conflict (nonce_hash) do nothing;
  get diagnostics inserted = row_count;
  return inserted = 1;
end $$;
create function mth_profile_transfer.cleanup_assertion_nonces(batch_limit integer) returns integer
language plpgsql security invoker set search_path=pg_catalog as $$
declare removed integer;
begin
  if batch_limit is null or batch_limit < 1 or batch_limit > 500 then
    raise exception 'invalid_cleanup_limit';
  end if;
  delete from mth_profile_transfer.assertion_nonces where nonce_hash in (
    select nonce_hash from mth_profile_transfer.assertion_nonces
    where expires_at<=clock_timestamp() order by expires_at limit batch_limit);
  get diagnostics removed = row_count;
  return removed;
end $$;
revoke all on function mth_profile_transfer.claim_assertion_nonce(text, timestamptz) from public, anon, authenticated, service_role;
revoke all on function mth_profile_transfer.cleanup_assertion_nonces(integer) from public, anon, authenticated, service_role;
grant execute on function mth_profile_transfer.claim_assertion_nonce(text, timestamptz) to mth_move_profile_transfer;
grant execute on function mth_profile_transfer.cleanup_assertion_nonces(integer) to mth_move_profile_transfer;
-- NO login, membership, password, service_role grant, scheduler or backend connection.
-- A separately approved dedicated connection must use this one narrow capability.
commit;
