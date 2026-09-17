/**
 * TRUST-SEC-001 live PostgREST (+ optional app HTTP) probe against a Wave 0
 * ephemeral branch. Does not invent a pass when env is missing.
 *
 * Required:
 *   SUPABASE_BRANCH_URL
 *   SUPABASE_BRANCH_ANON_KEY
 *   SUPABASE_BRANCH_SERVICE_ROLE_KEY
 *
 * Optional:
 *   MOVE_APP_BASE_URL  preview origin (not www.movetrusthub.com for M1 VERIFIED)
 *
 * Aliases: MOVE_SEC001_SUPABASE_URL / MOVE_SEC001_ANON_KEY / MOVE_SEC001_SERVICE_ROLE_KEY
 *
 * Refuses canonical production project arepfylnilkjmyduhwbz and legacy uvq.
 * Publish probe sends invalid payload {} so service_role cannot insert a row.
 *
 * Exit: 0 skipped (no env) or all expected checks passed
 *       1 probe ran and a security/regression check failed
 */
import { CANONICAL_SUPABASE_PROJECT_REF, FORBIDDEN_SUPABASE_PROJECT_REF } from '../lib/supabase/canonical-project';

type Role = 'anon' | 'service_role' | 'none';

type Row = {
  action: string;
  expected: string;
  actual: string;
  httpApi: string;
  role: Role;
  branch: string;
  regression: 'Y' | 'N' | 'UNKNOWN';
  contract: 'Y' | 'N' | 'UNKNOWN';
};

const PRODUCTION_APP_HOSTS = new Set(['www.movetrusthub.com', 'movetrusthub.com']);

function env(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v || undefined;
}

function extractRef(url: string): string | null {
  try {
    const host = new URL(url).hostname;
    const m = host.match(/^([a-z0-9]+)\.supabase\.co$/i);
    return m?.[1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

function isPermissionDenied(status: number, bodyText: string): boolean {
  if (status === 401 || status === 403) return true;
  const t = bodyText.toLowerCase();
  return (
    t.includes('permission denied') ||
    t.includes('not authorized') ||
    t.includes('pgrst301') ||
    t.includes('42501') ||
    (t.includes('jwt') && t.includes('invalid'))
  );
}

async function rest(
  baseUrl: string,
  key: string,
  path: string,
  init: { method?: string; json?: unknown } = {}
): Promise<{ status: number; text: string }> {
  const method = init.method ?? 'GET';
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: init.json === undefined ? undefined : JSON.stringify(init.json),
  });
  const text = await res.text();
  return { status: res.status, text: text.slice(0, 800) };
}

function printMatrix(rows: Row[]) {
  console.log('');
  console.log(
    [
      'route/action',
      'expected',
      'actual',
      'HTTP/API',
      'role',
      'branch/project',
      'regression',
      'contract',
    ].join(' | ')
  );
  console.log(rows.map((r) => Object.values(r).join(' | ')).join('\n'));
}

async function main() {
  const url =
    env('SUPABASE_BRANCH_URL') || env('MOVE_SEC001_SUPABASE_URL');
  const anon = env('SUPABASE_BRANCH_ANON_KEY') || env('MOVE_SEC001_ANON_KEY');
  const service =
    env('SUPABASE_BRANCH_SERVICE_ROLE_KEY') || env('MOVE_SEC001_SERVICE_ROLE_KEY');
  const appBase = env('MOVE_APP_BASE_URL');

  if (!url || !anon || !service) {
    console.log('TRUST-SEC-001 live probe SKIPPED — branch env not provided.');
    console.log('Set SUPABASE_BRANCH_URL, SUPABASE_BRANCH_ANON_KEY, SUPABASE_BRANCH_SERVICE_ROLE_KEY.');
    console.log('This is not a pass. Matrix actual remains UNKNOWN.');
    console.log('STATUS: PARTIAL');
    process.exit(0);
  }

  const ref = extractRef(url);
  if (!ref) {
    console.error('FAIL: SUPABASE_BRANCH_URL is not a supabase.co URL');
    process.exit(1);
  }
  if (ref === CANONICAL_SUPABASE_PROJECT_REF || ref === FORBIDDEN_SUPABASE_PROJECT_REF) {
    console.error(
      `FAIL: refused production/legacy project ref ${ref}. Probe ephemeral Wave 0 branches only.`
    );
    process.exit(1);
  }
  if (env('PROBE_ALLOW_PRODUCTION') === '1') {
    console.error('FAIL: PROBE_ALLOW_PRODUCTION is forbidden for TRUST-SEC-001.');
    process.exit(1);
  }

  const fakeHash = '0'.repeat(64);
  const rows: Row[] = [];
  const fail = (msg: string) => {
    console.error(`FAIL: ${msg}`);
  };
  let failed = false;

  // D1 anon consume must be denied
  {
    const r = await rest(url, anon, '/rest/v1/rpc/consume_network_auth_handoff', {
      method: 'POST',
      json: { p_code_hash: fakeHash, p_to_hub: 'move' },
    });
    const denied = isPermissionDenied(r.status, r.text);
    if (!denied) {
      failed = true;
      fail(`anon consume expected deny, got HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'anon consume_network_auth_handoff',
      expected: 'permission denied (D1 SERVICE_ROLE_ONLY)',
      actual: denied ? `DENIED HTTP ${r.status}` : `UNEXPECTED HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/consume_network_auth_handoff',
      role: 'anon',
      branch: ref,
      regression: denied ? 'N' : 'Y',
      contract: denied ? 'Y' : 'N',
    });
  }

  // D1 service_role consume must be executable (empty result for fake hash)
  {
    const r = await rest(url, service, '/rest/v1/rpc/consume_network_auth_handoff', {
      method: 'POST',
      json: { p_code_hash: fakeHash, p_to_hub: 'move' },
    });
    const denied = isPermissionDenied(r.status, r.text);
    const ok = !denied && r.status < 500;
    if (!ok) {
      failed = true;
      fail(`service_role consume expected executable, got HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'service_role consume_network_auth_handoff (impossible hash)',
      expected: 'executable; empty/invalid handoff, not permission denied',
      actual: ok ? `OK HTTP ${r.status}` : `UNEXPECTED HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/consume_network_auth_handoff',
      role: 'service_role',
      branch: ref,
      regression: ok ? 'N' : 'Y',
      contract: ok ? 'Y' : 'N',
    });
  }

  // Table grants
  {
    const r = await rest(url, anon, '/rest/v1/network_auth_handoffs?select=id&limit=1');
    const denied = isPermissionDenied(r.status, r.text);
    let empty = false;
    try {
      const parsed = JSON.parse(r.text) as unknown;
      empty = Array.isArray(parsed) && parsed.length === 0;
    } catch {
      empty = false;
    }
    const closed = denied || empty;
    if (!closed) {
      failed = true;
      fail(`anon network_auth_handoffs should not return rows, HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'anon SELECT network_auth_handoffs',
      expected: 'denied or zero rows (fail-closed)',
      actual: denied ? `DENIED HTTP ${r.status}` : empty ? `EMPTY HTTP ${r.status}` : `LEAK HTTP ${r.status}`,
      httpApi: 'GET /rest/v1/network_auth_handoffs',
      role: 'anon',
      branch: ref,
      regression: closed ? 'N' : 'Y',
      contract: closed ? 'Y' : 'N',
    });
  }

  {
    const r = await rest(url, service, '/rest/v1/network_auth_handoffs?select=id&limit=1');
    const denied = isPermissionDenied(r.status, r.text);
    const ok = !denied && r.status >= 200 && r.status < 300;
    if (!ok) {
      failed = true;
      fail(`service_role table head failed HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'service_role SELECT network_auth_handoffs',
      expected: 'readable',
      actual: ok ? `OK HTTP ${r.status}` : `UNEXPECTED HTTP ${r.status}`,
      httpApi: 'GET /rest/v1/network_auth_handoffs',
      role: 'service_role',
      branch: ref,
      regression: ok ? 'N' : 'Y',
      contract: ok ? 'Y' : 'N',
    });
  }

  // D2 anon publish denied; service_role validation error without insert
  {
    const r = await rest(url, anon, '/rest/v1/rpc/mth_publish_directory_company', {
      method: 'POST',
      json: { payload: {} },
    });
    const denied = isPermissionDenied(r.status, r.text);
    if (!denied) {
      failed = true;
      fail(`anon publish expected deny, got HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'anon mth_publish_directory_company',
      expected: 'permission denied (D2 SERVICE_ROLE_ONLY)',
      actual: denied ? `DENIED HTTP ${r.status}` : `UNEXPECTED HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/mth_publish_directory_company',
      role: 'anon',
      branch: ref,
      regression: denied ? 'N' : 'Y',
      contract: denied ? 'Y' : 'N',
    });
  }

  {
    const r = await rest(url, service, '/rest/v1/rpc/mth_publish_directory_company', {
      method: 'POST',
      json: { payload: {} },
    });
    const denied = isPermissionDenied(r.status, r.text);
    const validation =
      /payload requires|id, slug, and name/i.test(r.text) || (r.status >= 400 && r.status < 500 && !denied);
    const ok = !denied && validation;
    if (!ok) {
      failed = true;
      fail(`service_role publish expected validation error, got HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'service_role mth_publish_directory_company (invalid payload, no insert)',
      expected: 'validation error, not permission denied',
      actual: ok ? `VALIDATION HTTP ${r.status}` : `UNEXPECTED HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/mth_publish_directory_company',
      role: 'service_role',
      branch: ref,
      regression: ok ? 'N' : 'Y',
      contract: ok ? 'Y' : 'N',
    });
  }

  // D3 PUBLIC_READ still allowed after Wave 0
  {
    const r = await rest(url, anon, '/rest/v1/rpc/mth_get_directory_company', {
      method: 'POST',
      json: { p_key: '__sec001_nonexistent__' },
    });
    const denied = isPermissionDenied(r.status, r.text);
    const ok = !denied && r.status >= 200 && r.status < 500;
    if (!ok) {
      failed = true;
      fail(`anon mth_get_directory_company should remain PUBLIC_READ, HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'anon mth_get_directory_company',
      expected: 'allowed PUBLIC_READ (D3 / M2)',
      actual: ok ? `OK HTTP ${r.status}` : `DENIED/ERR HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/mth_get_directory_company',
      role: 'anon',
      branch: ref,
      regression: ok ? 'N' : 'Y',
      contract: ok ? 'Y' : 'N',
    });
  }

  {
    const r = await rest(url, anon, '/rest/v1/rpc/local_canary_movers_for_county', {
      method: 'POST',
      json: { p_state_code: 'FL', p_county_fips: '12099', p_limit: 1 },
    });
    const denied = isPermissionDenied(r.status, r.text);
    const ok = !denied && r.status >= 200 && r.status < 500;
    if (!ok) {
      failed = true;
      fail(`anon local_canary_movers_for_county should remain PUBLIC_READ, HTTP ${r.status} ${r.text}`);
    }
    rows.push({
      action: 'anon local_canary_movers_for_county',
      expected: 'allowed PUBLIC_READ (D3 / M2)',
      actual: ok ? `OK HTTP ${r.status}` : `DENIED/ERR HTTP ${r.status}`,
      httpApi: 'POST /rest/v1/rpc/local_canary_movers_for_county',
      role: 'anon',
      branch: ref,
      regression: ok ? 'N' : 'Y',
      contract: ok ? 'Y' : 'N',
    });
  }

  if (appBase) {
    let host = '';
    try {
      host = new URL(appBase).hostname;
    } catch {
      failed = true;
      fail('MOVE_APP_BASE_URL is not a valid URL');
    }
    const isProdHost = PRODUCTION_APP_HOSTS.has(host);
    if (isProdHost) {
      rows.push({
        action: 'MOVE_APP_BASE_URL',
        expected: 'preview/app wired to Wave 0 branch',
        actual: `REJECTED production host ${host}`,
        httpApi: 'n/a',
        role: 'none',
        branch: ref,
        regression: 'UNKNOWN',
        contract: 'UNKNOWN',
      });
      console.warn(
        'Skipping app HTTP probes: MOVE_APP_BASE_URL is production. That cannot verify Wave 0 branch compatibility.'
      );
    } else if (host) {
      const health = await fetch(`${appBase.replace(/\/$/, '')}/api/auth/network-handoff/health`);
      const healthText = await health.text();
      let rpc = false;
      try {
        const json = JSON.parse(healthText) as { rpc?: boolean };
        rpc = json.rpc === true;
      } catch {
        rpc = false;
      }
      if (!rpc) {
        failed = true;
        fail(`app health rpc !== true HTTP ${health.status} ${healthText.slice(0, 400)}`);
      }
      rows.push({
        action: 'GET /api/auth/network-handoff/health',
        expected: 'rpc true via service_role',
        actual: rpc ? `OK HTTP ${health.status}` : `FAIL HTTP ${health.status}`,
        httpApi: 'GET /api/auth/network-handoff/health',
        role: 'service_role',
        branch: `${ref} + ${host}`,
        regression: rpc ? 'N' : 'Y',
        contract: rpc ? 'Y' : 'N',
      });

      const start = await fetch(
        `${appBase.replace(/\/$/, '')}/api/auth/network-handoff/start?to=lender&next=/my-lending`,
        { redirect: 'manual' }
      );
      const loc = start.headers.get('location') || '';
      const flag = start.headers.get('x-network-handoff') || '';
      const guestOk =
        (start.status === 307 || start.status === 302) &&
        !loc.includes('code=') &&
        (flag.includes('skip:') || flag === '');
      if (!guestOk) {
        failed = true;
        fail(`guest start expected 307 without code, got ${start.status} loc=${loc} flag=${flag}`);
      }
      rows.push({
        action: 'GET /api/auth/network-handoff/start guest',
        expected: '307 without code=',
        actual: guestOk ? `OK ${start.status} ${flag || 'no-header'}` : `FAIL ${start.status}`,
        httpApi: 'GET /api/auth/network-handoff/start',
        role: 'none',
        branch: `${ref} + ${host}`,
        regression: guestOk ? 'N' : 'Y',
        contract: guestOk ? 'Y' : 'N',
      });
    }
  }

  printMatrix(rows);
  console.log('');
  if (failed) {
    console.log('STATUS: PARTIAL (live probe failed — do not restore anon EXECUTE)');
    process.exit(1);
  }
  console.log('STATUS: live PostgREST checks passed on branch', ref);
  console.log('M1 VERIFIED still requires this stdout attached to the ticket; production remains HOLD.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
