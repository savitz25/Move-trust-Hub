/**
 * Task 009A.2 production/local QA for cutover.
 * Usage: npx tsx --require ./scripts/stub-server-only-next-cache.cjs scripts/task-009a2-production-qa.ts
 * Optional: TASK_009A2_PROD_BASE=https://www.movetrusthub.com
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

async function main() {
  delete process.env.DIRECTORY_QUERY_ENGINE;
  const { queryDirectoryPage } = await import('../lib/directory/query-directory-page');
  const { getLastDbDirectoryDiagnostics } = await import(
    '../lib/directory/query-db-directory-page'
  );
  const { resolveDirectoryQueryEngine } = await import(
    '../lib/directory/directory-query-engine'
  );

  const checks: Array<Record<string, unknown>> = [];

  checks.push({
    name: 'default_engine',
    engine: resolveDirectoryQueryEngine(),
    ok: resolveDirectoryQueryEngine() === 'db',
  });

  const defaultPage = await queryDirectoryPage({ offset: 0, limit: 24, filters: {} });
  const diag = getLastDbDirectoryDiagnostics();
  checks.push({
    name: 'default_page',
    total: defaultPage.total,
    returned: defaultPage.companies.length,
    materialized: diag?.materializedIntoNode,
    path: diag?.path,
    ok:
      defaultPage.companies.length <= 24 &&
      defaultPage.total >= 3500 &&
      defaultPage.total <= 4000 &&
      (diag?.materializedIntoNode ?? 9999) < 500,
  });

  const protectedUsdots = [
    '76235',
    '125563',
    '125550',
    '70719',
    '49922',
    '76628',
    '70851',
  ];
  for (const usdot of protectedUsdots) {
    const page = await queryDirectoryPage({
      offset: 0,
      limit: 5,
      filters: { search: usdot },
    });
    const hit = page.companies.some(
      (c) => (c.usdotNumber || '').replace(/\D/g, '') === usdot
    );
    checks.push({ name: `protected-${usdot}`, hit, ok: hit });
  }

  for (const name of ['Allied Van Lines', 'Mayflower', 'Gomuverz', 'Atlas']) {
    const page = await queryDirectoryPage({
      offset: 0,
      limit: 10,
      filters: { search: name },
    });
    checks.push({
      name: `search-${name}`,
      total: page.total,
      first: page.companies[0]?.name ?? null,
      firstUsdot: page.companies[0]?.usdotNumber ?? null,
      ok: page.total >= 1,
    });
  }

  for (const role of ['Carrier', 'Broker', 'Carrier / Broker', 'Local Mover']) {
    const page = await queryDirectoryPage({
      offset: 0,
      limit: 24,
      filters: { services: [role] },
    });
    checks.push({
      name: `role-${role}`,
      total: page.total,
      returned: page.companies.length,
      ok: page.total > 0 && page.companies.length <= 24,
    });
  }

  for (const sort of [
    'reputation',
    'rating',
    'reviews',
    'price-low',
    'price-high',
    'years',
    'complaints',
  ]) {
    const page = await queryDirectoryPage({
      offset: 0,
      limit: 24,
      filters: { sort: sort as never },
    });
    checks.push({
      name: `sort-${sort}`,
      total: page.total,
      returned: page.companies.length,
      ok: page.total === defaultPage.total && page.companies.length <= 24,
    });
  }

  const p2 = await queryDirectoryPage({ offset: 24, limit: 24, filters: {} });
  const deep = await queryDirectoryPage({ offset: 1000, limit: 24, filters: {} });
  const ids1 = new Set(defaultPage.companies.map((c) => c.id));
  const overlap = p2.companies.filter((c) => ids1.has(c.id));
  checks.push({
    name: 'pagination',
    page2: p2.companies.length,
    deep: deep.companies.length,
    overlap: overlap.length,
    ok: overlap.length === 0 && deep.total === defaultPage.total,
  });

  // Review_required must not appear
  const badPub = defaultPage.companies.filter((c) =>
    ['REVIEW_REQUIRED', 'INACTIVE', 'INGESTED', 'CLASSIFIED'].includes(
      String(c.publicationState || '')
    )
  );
  checks.push({ name: 'fail_closed_publication', bad: badPub.length, ok: badPub.length === 0 });

  const failed = checks.filter((c) => c.ok === false);
  const report = {
    generatedAt: new Date().toISOString(),
    task: '009A.2',
    googlePlacesRequests: 0,
    defaultEngine: resolveDirectoryQueryEngine(),
    checks,
    failed: failed.length,
    passed: failed.length === 0,
  };

  const outDir = resolve(process.cwd(), 'docs');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'task-009a2-production-qa.json');
  writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ wrote: outPath, passed: report.passed, failed: report.failed }));
  if (!report.passed) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
