import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { PostgresTransferStore } from './postgres-transfer-store';
import { bindSourceCapability, createIsolatedSourcePool, SOURCE_CAPABILITY, SOURCE_LOGIN, SOURCE_POOLER_USER, SOURCE_PROJECT_REF, SOURCE_SEARCH_PATH, type IsolatedPoolConfig } from './source-pool';
import { TRANSFER_VERSION_V3, manifestDigest, type GuestStageInput } from './vendor/v2-3-profile-transfer';
import type { TransferRecord } from './profile-save-adapter';

const approved={sourceBackend:'fixture-isolated',databaseHost:'isolated.invalid',databaseName:'postgres',databaseUser:SOURCE_LOGIN,sessionAffinity:'dedicated' as const};
const databaseUrl=`postgresql://${SOURCE_POOLER_USER}@isolated.invalid:5432/postgres`;
const env={VERCEL_ENV:'preview',NODE_ENV:'production',MTH_MOVE_PARENT_SAVE_MODE:'isolated',MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED:'true',
  MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND:'fixture-isolated',MTH_MOVE_PARENT_SAVE_DATABASE_URL:databaseUrl,
  MTH_MOVE_PARENT_SAVE_DATABASE_CA:'FIXTURE NOT A CERTIFICATE'};

function idlePool(seen: IsolatedPoolConfig[]) {
  return (config: IsolatedPoolConfig) => {
    seen.push(config);
    return { async connect() { throw Error('checkout_not_expected'); }, async end() {} };
  };
}

test('S09 lazy source pool admits only mth_move_v23_preview and does not connect', async () => {
  const seen: IsolatedPoolConfig[] = [];
  const pool = createIsolatedSourcePool(env, approved, idlePool(seen));
  assert.ok(pool);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].max, 2);
  assert.equal(seen[0].ssl.rejectUnauthorized, true);
  assert.equal(seen[0].connectionTimeoutMillis, 5000);
  assert.equal(seen[0].query_timeout, 5000);
  assert.equal(seen[0].statement_timeout, 5000);
  assert.equal(seen[0].lock_timeout, 3000);
  assert.equal(seen[0].connectionString, databaseUrl);
  assert.equal(SOURCE_POOLER_USER, `${SOURCE_LOGIN}.${SOURCE_PROJECT_REF}`);
  assert.equal(SOURCE_PROJECT_REF, 'zvoijbohtyuhqfuvteoy');
  await pool.end();
  const rejectedUrls = [
    env.MTH_MOVE_PARENT_SAVE_DATABASE_URL + '?sslmode=disable',
    env.MTH_MOVE_PARENT_SAVE_DATABASE_URL + '#fragment',
    `postgresql://${SOURCE_LOGIN}@isolated.invalid:5432/postgres`,
    `postgresql://${SOURCE_LOGIN}.otherrefotherrefoth@isolated.invalid:5432/postgres`,
    `postgresql://${SOURCE_LOGIN}.arepfylnilkjmyduhwbz@isolated.invalid:5432/postgres`,
    `postgresql://${SOURCE_LOGIN}.tzzcogaricohtezsugjr@isolated.invalid:5432/postgres`,
    `postgresql://${SOURCE_LOGIN}.qvvxvbcdmbjzrgvwjatw@isolated.invalid:5432/postgres`,
    `postgresql://${SOURCE_POOLER_USER}@isolated.invalid:6543/postgres`,
    `postgresql://${SOURCE_POOLER_USER}@isolated.invalid/postgres`,
    `postgresql://${SOURCE_POOLER_USER}@isolated.invalid:5433/postgres`,
    `postgresql://${SOURCE_POOLER_USER}@other.invalid:5432/postgres`,
    `postgresql://${SOURCE_POOLER_USER}@isolated.invalid:5432/other`,
    `postgresql://${SOURCE_POOLER_USER}:tzzcogaricohtezsugjr@isolated.invalid:5432/postgres`,
  ];
  for (const databaseUrl of rejectedUrls) {
    const attempts: IsolatedPoolConfig[] = [];
    assert.equal(createIsolatedSourcePool({ ...env, MTH_MOVE_PARENT_SAVE_DATABASE_URL: databaseUrl }, approved, idlePool(attempts)), null, databaseUrl);
    assert.equal(attempts.length, 0);
  }
  for (const patch of [{ VERCEL_ENV: 'production' }, { VERCEL_ENV: undefined }, { MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED: 'false' },
    { MTH_MOVE_PARENT_SAVE_DATABASE_CA: undefined }, { MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND: 'other' }]) {
    const attempts: IsolatedPoolConfig[] = [];
    assert.equal(createIsolatedSourcePool({ ...env, ...patch }, approved, idlePool(attempts)), null);
    assert.equal(attempts.length, 0);
  }
  for (const databaseUser of ['postgres', 'service_role', 'supabase_admin', 'source_login', 'mth_move_profile_transfer', SOURCE_POOLER_USER]) {
    const attempts: IsolatedPoolConfig[] = [];
    assert.equal(createIsolatedSourcePool(env, { ...approved, databaseUser }, idlePool(attempts)), null, databaseUser);
    assert.equal(attempts.length, 0);
  }
});

type Proof = { login: string; active_role: string; search_path: string };
const goodProof = (): Proof => ({ login: SOURCE_LOGIN, active_role: SOURCE_CAPABILITY, search_path: SOURCE_SEARCH_PATH });

function harness(options: { proof?: () => Proof | Promise<Proof>; failAt?: 'search_path' | 'set_role' | 'proof' } = {}) {
  const events: string[] = [];
  const releases: Array<boolean | undefined> = [];
  let exposed = false;
  const client = {
    async query(sql: string, values?: unknown[]) {
      if (sql.includes("set_config('search_path'")) {
        events.push('search_path');
        assert.deepEqual(values, [SOURCE_SEARCH_PATH]);
        if (options.failAt === 'search_path') throw Error('search_path_failed');
        return { rows: [] };
      }
      if (sql.startsWith('SET ROLE ')) {
        events.push('set_role');
        assert.equal(sql, `SET ROLE ${SOURCE_CAPABILITY}`);
        if (options.failAt === 'set_role') throw Error('set_role_failed');
        return { rows: [] };
      }
      if (sql.includes('session_user')) {
        events.push('proof');
        if (options.failAt === 'proof') throw Error('proof_query_failed');
        const row = await (options.proof ?? goodProof)();
        return { rows: [row] };
      }
      events.push(`app:${sql}`);
      return { rows: [], rowCount: 1 };
    },
    release(destroy?: boolean) { releases.push(destroy); },
  };
  const inner = {
    async connect() { events.push('checkout'); return client; },
    async end() {},
    on() { throw Error('pool_connect_event_forbidden'); },
  };
  const pool = bindSourceCapability(inner);
  return { pool, events, releases, markExposed() { exposed = true; }, wasExposed: () => exposed };
}

async function expectDestroyed(run: () => Promise<unknown>, events: string[], releases: Array<boolean | undefined>, wasExposed: () => boolean) {
  await assert.rejects(run);
  assert.equal(wasExposed(), false);
  assert.deepEqual(releases, [true]);
  assert.equal(events.includes('app:insert'), false);
}

test('checkout sets search_path, switches role, proves identity, then allows the application query', async () => {
  const { pool, events, releases, markExposed } = harness();
  const db = await pool.connect();
  markExposed();
  await db.query('insert into mth_profile_transfer.stages values ($1)', ['ticket']);
  db.release(false);
  assert.deepEqual(events, ['checkout', 'search_path', 'set_role', 'proof', 'app:insert into mth_profile_transfer.stages values ($1)']);
  assert.deepEqual(releases, [true]);
});

test('role-binding failures destroy the client and never return it', async () => {
  const setRole = harness({ failAt: 'set_role' });
  await expectDestroyed(async () => { const db = await setRole.pool.connect(); setRole.markExposed(); return db; }, setRole.events, setRole.releases, setRole.wasExposed);
  assert.deepEqual(setRole.events, ['checkout', 'search_path', 'set_role']);

  const session = harness({ proof: () => ({ ...goodProof(), login: 'postgres' }) });
  await expectDestroyed(async () => { const db = await session.pool.connect(); session.markExposed(); return db; }, session.events, session.releases, session.wasExposed);

  const current = harness({ proof: () => ({ ...goodProof(), active_role: SOURCE_LOGIN }) });
  await expectDestroyed(async () => { const db = await current.pool.connect(); current.markExposed(); return db; }, current.events, current.releases, current.wasExposed);

  const path = harness({ proof: () => ({ ...goodProof(), search_path: 'public' }) });
  await expectDestroyed(async () => { const db = await path.pool.connect(); path.markExposed(); return db; }, path.events, path.releases, path.wasExposed);

  const proof = harness({ failAt: 'proof' });
  await expectDestroyed(async () => { const db = await proof.pool.connect(); proof.markExposed(); return db; }, proof.events, proof.releases, proof.wasExposed);
  assert.deepEqual(proof.events, ['checkout', 'search_path', 'set_role', 'proof']);

  const search = harness({ failAt: 'search_path' });
  await expectDestroyed(async () => { const db = await search.pool.connect(); search.markExposed(); return db; }, search.events, search.releases, search.wasExposed);
  assert.deepEqual(search.events, ['checkout', 'search_path']);
});

test('the store insert cannot run before the capability role is proven', async () => {
  const { pool, events, releases } = harness();
  const ref = (c: string) => c.repeat(43);
  const digest = (s: string) => createHash('sha256').update(s).digest('hex');
  const manifest: GuestStageInput = { version: TRANSFER_VERSION_V3, sourceHub: 'move', audience: 'ask', selected: [{
    localItemId: 'hindman-isaacs-moving-storage-inc', revision: 'a'.repeat(64), digest: 'a'.repeat(64),
    profile: { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' } }], returnTask: { kind: 'profile', hub: 'move',
    canonicalSlug: 'hindman-isaacs-moving-storage-inc', returnPath: '/companies/hindman-isaacs-moving-storage-inc',
    profile: { hub: 'move', nativeId: 'usdot-1002530', profileClass: 'mover' } } };
  const record: TransferRecord = { browserHash: digest(ref('b')), manifest, parentStage: { transferRef: ref('t'), manifestDigest: manifestDigest(manifest), expiresAt: 500000 },
    continuationRef: ref('c'), requestPrefix: ref('r'), expiresAt: 500000 };
  const store = new PostgresTransferStore(pool, 'dedicated', () => 1000);
  await store.putIfAbsent(digest('ticket'), record);
  const app = events.findIndex((event) => event.startsWith('app:'));
  assert.ok(app > events.indexOf('proof'));
  assert.deepEqual(events.slice(0, 4), ['checkout', 'search_path', 'set_role', 'proof']);
  assert.match(events[app], /^app:insert into mth_profile_transfer\.stages/);
  assert.deepEqual(releases, [true]);
});

test('source pool does not bind the role on a pool connect event', () => {
  const source = readFileSync('lib/my-trusthub/source-pool.ts', 'utf8');
  assert.doesNotMatch(source, /\.on\(\s*['"]connect['"]/);
  assert.doesNotMatch(source, /pooler\.supabase\.com|aws-0-/);
  assert.match(source, /never exposed until capability-role identity/);
  assert.match(source, /max:2/);
});
