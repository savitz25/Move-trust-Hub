/**
 * Crawl hub URLs from registries + nav config and report non-200 responses.
 *
 *   npx tsx scripts/audit-hub-404s.ts
 *   npx tsx scripts/audit-hub-404s.ts --base=https://www.movetrusthub.com
 *   npx tsx scripts/audit-hub-404s.ts --base https://www.movetrusthub.com
 *   AUDIT_BASE_URL=https://localhost:3000 npx tsx scripts/audit-hub-404s.ts
 */
import { ARTICLES } from '../lib/insurance/resources/articles';
import { INSURANCE_RESOURCE_SLUG_ALIASES } from '../lib/insurance/resources/slug-aliases';
import { DESTINATION_STATES } from '../lib/insurance/destinations/data';
import { getAllHubParams } from '../lib/insurance/hubs/registry';
import { getAllClusterParams } from '../lib/lender/clusters/registry';
import { HUBS } from '../lib/hub/config';
import { hubPath } from '../lib/hub/paths';

const args = process.argv.slice(2);

function parseBaseUrl(argv: string[]): string {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--base=')) {
      return arg.slice('--base='.length).replace(/\/$/, '');
    }
    if (arg === '--base' && argv[i + 1]) {
      return argv[i + 1].replace(/\/$/, '');
    }
  }
  const fromEnv = process.env.AUDIT_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return 'http://localhost:3000';
}

const BASE = parseBaseUrl(args);
const REQUEST_TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS ?? 20_000);
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY ?? 8);
const MAX_RETRIES = Number(process.env.AUDIT_RETRIES ?? 2);

type AuditResult = {
  url: string;
  status: number;
  finalUrl: string;
  bucket: string;
  error?: string;
};

function collectUrls(): { url: string; bucket: string }[] {
  const urls: { url: string; bucket: string }[] = [];

  const push = (path: string, bucket: string) => {
    urls.push({ url: `${BASE}${path}`, bucket });
  };

  push('/insurance', 'insurance-home');
  push('/lender', 'lender-home');

  for (const article of ARTICLES) {
    push(hubPath('insurance', `/resources/${article.slug}`), 'insurance-article');
  }
  for (const alias of Object.keys(INSURANCE_RESOURCE_SLUG_ALIASES)) {
    push(hubPath('insurance', `/resources/${alias}`), 'insurance-article-alias');
    push(`/resources/${alias}`, 'bare-resource-alias');
  }

  push(hubPath('insurance', '/resources'), 'insurance-section');
  push(hubPath('insurance', '/calculators'), 'insurance-section');
  push(hubPath('insurance', '/directory'), 'insurance-section');
  push(hubPath('insurance', '/destinations'), 'insurance-section');
  push(hubPath('insurance', '/hubs'), 'insurance-section');
  push(hubPath('insurance', '/hubs/health-insurance'), 'insurance-specialty');
  push(hubPath('insurance', '/hubs/medicare'), 'insurance-specialty');
  push(hubPath('insurance', '/hubs/aca'), 'insurance-specialty');
  push(hubPath('insurance', '/resources/medicare-advantage-vs-medigap'), 'insurance-comparison');

  for (const state of DESTINATION_STATES) {
    push(hubPath('insurance', `/destinations/${state.slug}`), 'insurance-state');
  }

  for (const { state, slug } of getAllHubParams()) {
    push(hubPath('insurance', `/hubs/${state}/${slug}`), 'insurance-hub');
  }

  push(hubPath('lender', '/calculators'), 'lender-section');
  push(hubPath('lender', '/local-lenders'), 'lender-section');
  push('/calculators/mortgage-payment', 'bare-lender-calc');
  push('/calculators/premium-estimator', 'bare-insurance-calc');

  for (const { state, cluster } of getAllClusterParams()) {
    push(hubPath('lender', `/local-lenders/${state}/${cluster}`), 'lender-cluster');
  }

  for (const hub of ['move', 'lender', 'insurance'] as const) {
    const config = HUBS[hub];
    push(hubPath(hub, '/about'), 'nav-footer');
    push(hubPath(hub, '/contact'), 'nav-footer');
    push(config.legalLinks.privacy, 'nav-footer');
    push(config.legalLinks.terms, 'nav-footer');
    for (const link of config.navLinks) {
      if (!link.external) push(link.href, 'nav-footer');
    }
    for (const col of config.footerColumns) {
      for (const link of col.links) {
        if (!link.external) push(link.href, 'nav-footer');
      }
    }
  }

  return urls;
}

async function probeOnce(url: string): Promise<{ status: number; finalUrl: string; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'move-trust-hub-audit/1.0' },
    });
    return { status: res.status, finalUrl: res.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: 0, finalUrl: message, error: message };
  } finally {
    clearTimeout(timer);
  }
}

async function probe(url: string): Promise<{ status: number; finalUrl: string; error?: string }> {
  let last = await probeOnce(url);
  for (let attempt = 1; attempt <= MAX_RETRIES && last.status === 0; attempt++) {
    await new Promise((r) => setTimeout(r, 500 * attempt));
    last = await probeOnce(url);
  }
  return last;
}

async function preflight(base: string): Promise<void> {
  const healthUrl = `${base}/insurance`;
  const result = await probeOnce(healthUrl);
  if (result.status >= 200 && result.status < 500) {
    console.log(`Preflight OK: ${result.status} ${healthUrl}\n`);
    return;
  }

  console.error('\n=== Server preflight FAILED ===');
  console.error(`Base URL: ${base}`);
  console.error(`Probe:    ${healthUrl}`);
  console.error(`Status:   ${result.status || 'unreachable'}`);
  if (result.error) console.error(`Error:    ${result.error}`);
  console.error('\nTips:');
  console.error('  • Local:  npm run build && npm run start');
  console.error('  • Then:   npm run verify:hub -- --base=http://localhost:3000');
  console.error('  • Prod:   npm run verify:hub -- --base=https://www.movetrusthub.com');
  console.error('  • Skip preflight (not recommended): AUDIT_SKIP_PREFLIGHT=1\n');
  process.exit(2);
}

async function runPool<T>(items: T[], worker: (item: T) => Promise<void>, concurrency: number) {
  let index = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function main() {
  if (process.env.AUDIT_SKIP_PREFLIGHT !== '1') {
    await preflight(BASE);
  }

  const unique = new Map<string, string>();
  for (const entry of collectUrls()) {
    unique.set(entry.url, entry.bucket);
  }

  const entries = [...unique.entries()].map(([url, bucket]) => ({ url, bucket }));

  console.log(`Auditing ${entries.length} URLs against ${BASE}`);
  console.log(`Timeout: ${REQUEST_TIMEOUT_MS}ms | Concurrency: ${CONCURRENCY} | Retries: ${MAX_RETRIES}\n`);

  const failures: AuditResult[] = [];
  const redirects: AuditResult[] = [];

  await runPool(
    entries,
    async ({ url, bucket }) => {
      const { status, finalUrl, error } = await probe(url);
      const result: AuditResult = { url, status, finalUrl, bucket, error };

      if (status === 0 || status >= 400) {
        failures.push(result);
      } else if (finalUrl !== url) {
        redirects.push(result);
      }

      const icon = status >= 200 && status < 400 ? '✓' : '✗';
      process.stdout.write(`${icon} ${status} ${url}\n`);
    },
    CONCURRENCY
  );

  console.log('\n--- Summary ---');
  console.log(`Base:      ${BASE}`);
  console.log(`Total:     ${entries.length}`);
  console.log(`Failures:  ${failures.length}`);
  console.log(`Redirects: ${redirects.length}`);

  if (failures.length) {
    console.log('\n--- Failures ---');
    for (const f of failures) {
      console.log(`[${f.bucket}] ${f.status} ${f.url}`);
      if (f.error) console.log(`  error: ${f.error}`);
      if (f.finalUrl !== f.url && f.status !== 0) console.log(`  → ${f.finalUrl}`);
    }
    process.exit(1);
  }

  console.log('\nAll hub URLs returned 2xx/3xx.');
}

main().catch((err) => {
  console.error('\nAudit script crashed:', err);
  process.exit(3);
});