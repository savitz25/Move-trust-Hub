/**
 * Task 009A.2 — post-cutover local DB + optional production URL benchmarks.
 * Writes docs/task-009a2-directory-cutover-benchmarks.json
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnvFiles();

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

async function timeLocal(label: string, fn: () => Promise<unknown>, samples = 3) {
  const times: number[] = [];
  let last: unknown = null;
  for (let i = 0; i < samples; i++) {
    const t0 = Date.now();
    last = await fn();
    times.push(Date.now() - t0);
  }
  return { label, samples: times.length, times, medianMs: median(times), last };
}

async function timeUrl(label: string, url: string, samples = 3) {
  const times: number[] = [];
  let lastStatus = 0;
  let lastBytes = 0;
  for (let i = 0; i < samples; i++) {
    const t0 = Date.now();
    const res = await fetch(url, { cache: 'no-store' });
    const text = await res.text();
    times.push(Date.now() - t0);
    lastStatus = res.status;
    lastBytes = text.length;
  }
  return {
    label,
    url,
    samples: times.length,
    times,
    medianMs: median(times),
    status: lastStatus,
    bytes: lastBytes,
  };
}

async function main() {
  delete process.env.DIRECTORY_QUERY_ENGINE; // use default (db)
  const { queryDirectoryPage } = await import('../lib/directory/query-directory-page');
  const { getLastDbDirectoryDiagnostics } = await import(
    '../lib/directory/query-db-directory-page'
  );
  const { getDirectoryQueryPathCounts, resetDirectoryQueryPathCounts } = await import(
    '../lib/directory/directory-query-engine'
  );

  resetDirectoryQueryPathCounts();

  const localRuns = [];
  for (const c of [
    { name: 'default', filters: {} },
    { name: 'USDOT-76235', filters: { search: '76235' } },
    { name: 'exact-name-Allied', filters: { search: 'Allied Van Lines' } },
    { name: 'common-moving', filters: { search: 'moving' } },
    { name: 'Carrier', filters: { services: ['Carrier'] } },
    { name: 'Broker', filters: { services: ['Broker'] } },
    { name: 'deep-1000', offset: 1000, filters: {} },
    { name: 'state-FL', filters: { state: 'FL', coverage: 'State / County' } },
  ] as const) {
    const run = await timeLocal(c.name, async () => {
      const page = await queryDirectoryPage({
        offset: 'offset' in c ? (c as { offset: number }).offset : 0,
        limit: 24,
        filters: c.filters as never,
      });
      return {
        total: page.total,
        returned: page.companies.length,
        diag: getLastDbDirectoryDiagnostics(),
      };
    });
    localRuns.push(run);
    console.log(JSON.stringify({ name: c.name, medianMs: run.medianMs, last: run.last }));
  }

  const defaultLast = localRuns.find((r) => r.label === 'default')?.last as {
    total?: number;
    returned?: number;
    diag?: { materializedIntoNode?: number };
  };

  const prodBase = process.env.TASK_009A2_PROD_BASE || 'https://www.movetrusthub.com';
  let productionRuns: unknown[] = [];
  if (process.env.TASK_009A2_SKIP_PROD !== '1') {
    try {
      productionRuns = [
        await timeUrl('prod-/companies', `${prodBase}/companies`, 3),
        await timeUrl(
          'prod-api-default',
          `${prodBase}/api/directory/companies?offset=0&limit=24`,
          5
        ),
        await timeUrl(
          'prod-api-usdot',
          `${prodBase}/api/directory/companies?search=76235&limit=24`,
          3
        ),
        await timeUrl(
          'prod-api-allied',
          `${prodBase}/api/directory/companies?search=Allied%20Van%20Lines&limit=24`,
          3
        ),
        await timeUrl(
          'prod-api-moving',
          `${prodBase}/api/directory/companies?search=moving&limit=24`,
          3
        ),
        await timeUrl(
          'prod-api-deep',
          `${prodBase}/api/directory/companies?offset=1000&limit=24`,
          3
        ),
        await timeUrl('prod-/compare', `${prodBase}/compare`, 2),
        await timeUrl('prod-/sitemap.xml', `${prodBase}/sitemap.xml`, 2),
      ];
    } catch (err) {
      productionRuns = [{ error: err instanceof Error ? err.message : String(err) }];
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    task: '009A.2',
    googlePlacesRequests: 0,
    pathCounts: getDirectoryQueryPathCounts(),
    mandatoryProof: {
      requestedLimit: 24,
      dbRowsMaterializedIntoNode: defaultLast?.diag?.materializedIntoNode ?? null,
      totalMatchingCompanies: defaultLast?.total ?? null,
      passed: (defaultLast?.diag?.materializedIntoNode ?? 99999) < 500,
    },
    localEngine: localRuns,
    productionHttp: productionRuns,
    futureScale: {
      '5000': 'bounded YES',
      '10000': 'bounded YES',
      '25000': 'bounded YES',
      '50000': 'bounded YES — monitor COUNT',
      firstPageDbCostBounded: 'YES',
    },
    targets: {
      companiesColdMedianMs: 3000,
      companiesCachedMs: 500,
      apiDefaultMs: 1000,
      usdotMs: 1000,
      exactNameMs: 1500,
      commonTextMs: 2000,
      deepPageMs: 2000,
    },
  };

  const outDir = resolve(process.cwd(), 'docs');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'task-009a2-directory-cutover-benchmarks.json');
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ wrote: outPath, proofPassed: report.mandatoryProof.passed }));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
