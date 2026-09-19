# Source staging persistence — UNAPPLIED proposal

No SQL below was executed. Not an automatic migration. No hosted branch, role,
credentials or permission grants created. The deployed adapter has no store
binding and returns unavailable. A future approved isolated implementation must
generate its migration with the repository's CLI workflow after schema review.

The existing legacy Save tables/localStorage are not suitable for one-time
profile-transfer state. `TransferStore` requires durable atomic insertion and
per-ticket locking; a process Map is permitted only in deterministic tests.

Proposed private metadata (profile-only projection; no notes/tools/consumer ID):

```sql
-- PROPOSAL ONLY. Check existing schema ownership before applying anywhere.
create schema if not exists mth_profile_transfer;
revoke all on schema mth_profile_transfer from public;
create table mth_profile_transfer.stages (
  ticket_hash text primary key check (ticket_hash ~ '^[a-f0-9]{64}$'),
  browser_hash text not null check (browser_hash ~ '^[a-f0-9]{64}$'),
  record jsonb not null check (jsonb_typeof(record) = 'object'
    and octet_length(record::text) <= 131072),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  receipt_retry_until timestamptz not null,
  check (expires_at > created_at and expires_at <= created_at + interval '10 minutes'),
  check (receipt_retry_until >= expires_at and receipt_retry_until <= created_at + interval '1 day')
);
alter table mth_profile_transfer.stages enable row level security;
alter table mth_profile_transfer.stages force row level security;
revoke all on mth_profile_transfer.stages from public;
create index stages_retry_expiry on mth_profile_transfer.stages(receipt_retry_until);
```

This deliberately creates NO usable application access: scoped execution role,
policies, connection ownership and rate-limiter persistence must be reviewed
with the parent runtime owner. Do not attach service_role or grant broad table
access to browsers/BFFs. Authenticate browser cookie/CSRF and service scope before
loading rows. Raw ticket and browser cookie are never stored; request references
needed for parent retries remain private server data and never enter URLs/logs.

`withRecord` must serialize work for one ticket (including absent-key handling),
persist the first account-context binding even after a lost parent response,
and never rebind it to a different account/Project. Parent idempotency remains
authoritative; a source transaction failure must not fabricate a parent rollback.
Use bounded lock/statement timeouts and retry via exact parent receipt lookup.
Server-side quota/TTL cleanup require separate reviewed infrastructure, no cron
invocation in this ticket. Parent grants currently expire after 10 minutes;
retaining source metadata longer does not authorize receipt reauthentication.

Tests executed: deterministic store contract and disk-backed LOCAL SQLite source
transaction + actual parent runtime receipt/lost-response/account-switch cases.
PostgreSQL migration, policies/RLS, role grants, cleanup and multiprocess locking
are NOT RUN and remain enablement gates.

Rollback: turn off only the new Move conversion/adapter gate; keep all legacy
research and parent Saves. Stop new stages while retaining authorized retry
metadata until its reviewed retention expiry. Do not blindly DROP this schema or
restore a stale database snapshot. After proving no other objects/consumers exist
and expiry has completed, a separately approved reversal may remove this one
table/index; leave a pre-existing schema intact. No rollback executed.
