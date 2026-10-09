import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { mock, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  FMCSA_REFRESH_PAUSE_REASON,
  FMCSA_REFRESH_PAUSED,
  fmcsaRefreshPause,
} from './pause';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

const invocations = { runner: 0, supabase: 0 };
let adminCookie = false;
const ADMIN_COOKIE = 'mth_admin_session';
const CRON_SECRET = 'th-dpr-001-pause-test';

delete process.env.SUPABASE_SERVICE_ROLE_KEY;
delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
delete process.env.FMCSA_WEB_KEY;
process.env.CRON_SECRET = CRON_SECRET;
process.env.ADMIN_SECRET = 'th-dpr-001-admin-test';

mock.module('@/lib/fmcsa/refresh/runner', {
  namedExports: {
    async runFmcsaRefresh() {
      invocations.runner += 1;
      throw new Error('runFmcsaRefresh invoked');
    },
  },
});

mock.module('@/lib/supabase/admin', {
  namedExports: {
    createAdminClient() {
      invocations.supabase += 1;
      throw new Error('createAdminClient invoked');
    },
  },
});

mock.module('@supabase/supabase-js', {
  namedExports: {
    createClient() {
      invocations.supabase += 1;
      throw new Error('supabase createClient invoked');
    },
  },
});

mock.module('next/headers', {
  namedExports: {
    async cookies() {
      return {
        get(name: string) {
          if (adminCookie && name === ADMIN_COOKIE) {
            return { name, value: process.env.ADMIN_SECRET };
          }
          return undefined;
        },
      };
    },
  },
});

const routePromise = import('@/app/api/refresh/fmcsa/route');
const runnerPromise = import('@/lib/fmcsa/refresh/runner');
const adminPromise = import('@/lib/supabase/admin');

const EXPECTED_REASON = 'FMCSA refresh paused: TH-DPR-001 R2 stuck-run fix pending';

function assertUntouched() {
  assert.equal(invocations.runner, 0, 'runFmcsaRefresh was invoked');
  assert.equal(invocations.supabase, 0, 'Supabase client was invoked');
}

async function assertPaused(response: Response, mode: 'full' | 'incremental') {
  assert.equal(response.status, 200);
  const body: unknown = await response.json();
  assert.deepEqual(body, {
    skipped: true,
    paused: true,
    mode,
    status: 'paused',
    skipReason: EXPECTED_REASON,
  });
  // GitHub Actions: jq -e '.status != "failed"' must stay exit 0.
  assert.equal(
    typeof body === 'object' && body !== null && 'status' in body && body.status !== 'failed',
    true
  );
  assertUntouched();
}

test('TH-DPR-001 R2 pause is a code constant, not an env flag', () => {
  assert.equal(FMCSA_REFRESH_PAUSED, true);
  assert.equal(FMCSA_REFRESH_PAUSE_REASON, EXPECTED_REASON);
  assert.deepEqual(fmcsaRefreshPause('incremental'), { paused: true, reason: EXPECTED_REASON });
  assert.deepEqual(fmcsaRefreshPause('full'), { paused: true, reason: EXPECTED_REASON });
  const source = read('lib/fmcsa/refresh/pause.ts');
  assert.match(source, /export const FMCSA_REFRESH_PAUSED = true/);
  assert.doesNotMatch(source, /process\.env/);
});

test('route pauses after auth and before the runner', () => {
  const route = read('app/api/refresh/fmcsa/route.ts');
  const authAt = route.indexOf('verifyRefreshAuth(');
  const pauseAt = route.indexOf('fmcsaRefreshPause(');
  const runAt = route.indexOf('runFmcsaRefresh(');
  assert.ok(authAt >= 0 && pauseAt > authAt && runAt > pauseAt);
  assert.doesNotMatch(route, /force\s*&&/);
  assert.doesNotMatch(route, /if\s*\(\s*force\s*\)/);
});

test('scheduled triggers stay in place and treat paused as success', () => {
  const workflow = read('.github/workflows/fmcsa-refresh.yml');
  assert.match(workflow, /jq -e '\.status != "failed"'/);
  assert.match(workflow, /cron: '15 6 \* \* \*'/);
  assert.match(workflow, /cron: '15 5 \* \* 0'/);
  const vercel = read('vercel.json');
  assert.match(vercel, /"path": "\/api\/refresh\/fmcsa\?mode=incremental"/);
  assert.match(vercel, /"schedule": "0 6 \* \* \*"/);
  assert.match(vercel, /"path": "\/api\/refresh\/fmcsa\?mode=full"/);
  assert.match(vercel, /"schedule": "0 5 \* \* 0"/);
});

test('runner and Supabase mocks are the modules the route loads', async () => {
  const runner = await runnerPromise;
  const admin = await adminPromise;
  assert.match(String(runner.runFmcsaRefresh), /runFmcsaRefresh invoked/);
  assert.match(String(admin.createAdminClient), /createAdminClient invoked/);
  assertUntouched();
});

test('both modes return paused and force does not bypass', async () => {
  const { GET, POST } = await routePromise;
  adminCookie = false;

  const cases: Array<{ method: 'GET' | 'POST'; mode: 'full' | 'incremental'; force: boolean; github: boolean }> = [
    { method: 'GET', mode: 'incremental', force: false, github: false },
    { method: 'GET', mode: 'full', force: false, github: false },
    { method: 'GET', mode: 'incremental', force: true, github: false },
    { method: 'GET', mode: 'full', force: true, github: false },
    { method: 'POST', mode: 'incremental', force: true, github: true },
    { method: 'POST', mode: 'full', force: true, github: true },
    { method: 'POST', mode: 'incremental', force: false, github: true },
    { method: 'POST', mode: 'full', force: false, github: false },
  ];

  for (const item of cases) {
    const url = new URL('https://www.movetrusthub.com/api/refresh/fmcsa');
    url.searchParams.set('mode', item.mode);
    if (item.force) url.searchParams.set('force', 'true');
    const headers = new Headers({
      authorization: `Bearer ${CRON_SECRET}`,
      'content-type': 'application/json',
    });
    if (item.github) headers.set('x-github-action', 'true');
    const request = new Request(url, {
      method: item.method,
      headers,
      body:
        item.method === 'POST'
          ? JSON.stringify({ mode: item.mode, force: item.force })
          : undefined,
    });
    const response = item.method === 'GET' ? await GET(request) : await POST(request);
    await assertPaused(response, item.mode);
  }
});

test('admin session and a missing mode are paused without touching the database', async () => {
  const { GET, POST } = await routePromise;

  adminCookie = true;
  const adminResponse = await POST(
    new Request('https://www.movetrusthub.com/api/refresh/fmcsa', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mode: 'full', force: true }),
    })
  );
  await assertPaused(adminResponse, 'full');

  adminCookie = false;
  const defaultMode = new Date().getUTCDay() === 0 ? 'full' : 'incremental';
  const cronResponse = await GET(
    new Request('https://www.movetrusthub.com/api/refresh/fmcsa', {
      headers: { authorization: `Bearer ${CRON_SECRET}` },
    })
  );
  await assertPaused(cronResponse, defaultMode);
});

test('unauthorized calls stay 401 and still do not invoke the runner', async () => {
  const { GET, POST } = await routePromise;
  adminCookie = false;
  const response = await POST(
    new Request('https://www.movetrusthub.com/api/refresh/fmcsa?mode=incremental&force=true', {
      method: 'POST',
      headers: { authorization: 'Bearer wrong', 'content-type': 'application/json' },
      body: JSON.stringify({ mode: 'incremental', force: true }),
    })
  );
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: 'Unauthorized' });
  assertUntouched();
});
