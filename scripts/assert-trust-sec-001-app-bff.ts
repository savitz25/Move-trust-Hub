/**
 * TRUST-SEC-001 static call-site lock (Move).
 * Fails if revoked D1/D2 RPCs are reachable from browser/anon paths.
 *
 * Run: npm run assert:trust-sec-001-app-bff
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

const failures: string[] = [];
function assert(cond: unknown, msg: string) {
  if (!cond) failures.push(msg);
}

const SKIP_DIR = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'coverage',
  'docs',
  'supabase',
]);

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkTsFiles(full, acc);
      continue;
    }
    if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(name)) continue;
    acc.push(full);
  }
  return acc;
}

const files = walkTsFiles(root);
const rel = (abs: string) => relative(root, abs).replaceAll('\\', '/');

const CONSUME = 'consume_network_auth_handoff';
const PUBLISH = 'mth_publish_directory_company';
const GET_DIR = 'mth_get_directory_company';
const CANARY = 'local_canary_movers_for_county';
const TABLE = 'network_auth_handoffs';

const consumeAllowed = new Set([
  'lib/network/sso-handoff.ts',
  'app/api/auth/network-handoff/health/route.ts',
  'scripts/assert-trust-sec-001-app-bff.ts',
  'scripts/probe-trust-sec-001-app-bff.ts',
]);

const publishAllowed = new Set([
  'lib/suggestions/publish-company-rpc.ts',
  'scripts/assert-trust-sec-001-app-bff.ts',
  'scripts/probe-trust-sec-001-app-bff.ts',
]);

const tableAllowed = new Set([
  'lib/network/sso-handoff.ts',
  'app/api/auth/network-handoff/health/route.ts',
  'scripts/migrate-supabase-uvq-to-are-remaining.ts',
  'scripts/assert-trust-sec-001-app-bff.ts',
  'scripts/probe-trust-sec-001-app-bff.ts',
]);

const getDirAllowed = new Set([
  'lib/suggestions/publish-company-rpc.ts',
  'scripts/assert-trust-sec-001-app-bff.ts',
  'scripts/probe-trust-sec-001-app-bff.ts',
]);

const canaryAllowed = new Set([
  'lib/local-movers/canary-county-movers.ts',
  'scripts/apply-task-011d3-migration.ts',
  'scripts/assert-trust-sec-001-app-bff.ts',
  'scripts/probe-trust-sec-001-app-bff.ts',
]);

function usesClientDirective(src: string): boolean {
  return /^['"]use client['"]/m.test(src);
}

for (const abs of files) {
  const path = rel(abs);
  if (path.startsWith('scripts/assert-trust-sec-001-app-bff')) continue;
  const src = readFileSync(abs, 'utf8');

  if (src.includes(CONSUME) && !consumeAllowed.has(path)) {
    failures.push(`${CONSUME} appears outside allow-list: ${path}`);
  }
  if (src.includes(PUBLISH) && !publishAllowed.has(path)) {
    failures.push(`${PUBLISH} appears outside allow-list: ${path}`);
  }
  if (src.includes(`'${TABLE}'`) || src.includes(`"${TABLE}"`) || src.includes(`.from('${TABLE}')`)) {
    if (!tableAllowed.has(path)) {
      failures.push(`${TABLE} table access outside allow-list: ${path}`);
    }
  }
  if (src.includes(GET_DIR) && !getDirAllowed.has(path)) {
    failures.push(`${GET_DIR} appears outside allow-list: ${path}`);
  }
  if (src.includes(CANARY) && !canaryAllowed.has(path)) {
    failures.push(`${CANARY} appears outside allow-list: ${path}`);
  }

  if (usesClientDirective(src)) {
    for (const needle of [CONSUME, PUBLISH, GET_DIR, CANARY, TABLE]) {
      if (src.includes(needle)) {
        failures.push(`Client Component must not reference ${needle}: ${path}`);
      }
    }
    if (src.includes('.rpc(')) {
      failures.push(`Client Component must not call supabase.rpc: ${path}`);
    }
  }
}

const required = [
  'lib/network/sso-handoff.ts',
  'lib/network/handoff-start-core.ts',
  'app/auth/network-handoff/route.ts',
  'app/api/auth/network-handoff/start/route.ts',
  'app/api/auth/network-handoff/health/route.ts',
  'components/network/network-handoff-link.tsx',
  'lib/suggestions/publish-company-rpc.ts',
  'lib/suggestions/insert-company.ts',
  'lib/supabase/queries/companies.ts',
  'lib/local-movers/canary-county-movers.ts',
  'docs/security/TRUST-SEC-001-APP-BFF-PROBE.md',
];
for (const path of required) {
  assert(existsSync(join(root, path)), `missing ${path}`);
}

const sso = read('lib/network/sso-handoff.ts');
assert(sso.includes("import 'server-only'"), 'sso-handoff.ts must be server-only');
assert(sso.includes('createAdminClient'), 'sso-handoff.ts must use createAdminClient');
assert(sso.includes(CONSUME), 'sso-handoff.ts must call consume RPC');
assert(!sso.includes('getSupabaseAnonKey'), 'sso-handoff must not use anon key for DB');

const complete = read('app/auth/network-handoff/route.ts');
assert(complete.includes('consumeNetworkHandoff'), 'complete route consumes via helper');
assert(complete.includes('isSupabaseAdminConfigured'), 'complete route requires service_role');
assert(!complete.includes(CONSUME), 'complete route must not call PostgREST RPC string with anon');

const start = read('app/api/auth/network-handoff/start/route.ts');
assert(start.includes('runHandoffStart'), 'start route uses BFF core');
assert(!start.includes(CONSUME), 'start route does not consume');

const health = read('app/api/auth/network-handoff/health/route.ts');
assert(health.includes('createAdminClient'), 'health uses admin');
assert(health.includes(CONSUME), 'health probes consume RPC as service_role');

const link = read('components/network/network-handoff-link.tsx');
assert(link.includes("'use client'"), 'NetworkHandoffLink is a client component');
assert(link.includes('/api/auth/network-handoff/start'), 'link posts to BFF');
assert(link.includes('getSession'), 'link reads browser session only');
assert(!link.includes('.rpc('), 'link must not rpc');
assert(!link.includes(CONSUME), 'link must not name consume RPC');

const publish = read('lib/suggestions/publish-company-rpc.ts');
assert(publish.includes("import 'server-only'"), 'publish-company-rpc.ts must be server-only');
assert(publish.includes(PUBLISH), 'publish helper calls D2 RPC');
assert(publish.includes(GET_DIR), 'get helper calls D3 RPC');

const insert = read('lib/suggestions/insert-company.ts');
assert(insert.includes("import 'server-only'"), 'insert-company.ts must be server-only');
assert(insert.includes('publishCompanyViaRpc'), 'insert uses publish helper');
assert(insert.includes('admin:'), 'insert takes admin client');

const companies = read('lib/supabase/queries/companies.ts');
assert(companies.includes("import 'server-only'"), 'companies queries are server-only');
assert(companies.includes('createAnonSupabaseClient'), 'profile lookup uses server anon client');
assert(companies.includes('getDirectoryCompanyViaRpc'), 'profile fallback uses D3 RPC');
assert(!companies.includes(PUBLISH), 'directory read path must not publish');

const canary = read('lib/local-movers/canary-county-movers.ts');
assert(canary.includes("import 'server-only'"), 'canary RPC is server-only');
assert(canary.includes('getSupabaseAnonKey'), 'canary uses PUBLIC_READ anon key (D3)');
assert(canary.includes(CANARY), 'canary calls local_canary_movers_for_county');
assert(!canary.includes('getSupabaseServiceRoleKey'), 'canary must stay PUBLIC_READ, not service_role');

const dataClient = read('lib/data.ts');
assert(!dataClient.includes(CONSUME), 'browser data.ts must not consume handoff');
assert(!dataClient.includes(PUBLISH), 'browser data.ts must not publish directory');
assert(!dataClient.includes(TABLE), 'browser data.ts must not touch handoff table');

if (failures.length) {
  console.error('TRUST-SEC-001 app/BFF call-site lock FAILED:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('TRUST-SEC-001 app/BFF call-site lock OK');
console.log('  D1 consume: BFF + service_role only');
console.log('  D2 publish: server admin only');
console.log('  D3 reads: Next server + anon (PUBLIC_READ)');
console.log('  Live branch probes: run npm run probe:trust-sec-001-app-bff');
