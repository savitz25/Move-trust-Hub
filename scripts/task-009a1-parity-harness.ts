/**
 * Task 009A.1 — legacy vs DB directory engine parity harness.
 * Dev/test only. Does not run both engines on production requests.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/task-009a1-parity-harness.ts
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

type CaseResult = {
  name: string;
  legacyTotal: number;
  dbTotal: number;
  legacyIds: string[];
  dbIds: string[];
  idOverlapFirstPage: number;
  orderMatchFirstN: number;
  exactPageMatch: boolean;
  notes: string[];
};

async function buildLegacyPage(options: {
  offset: number;
  limit: number;
  filters: Record<string, unknown>;
}) {
  // Bypass unstable_cache (requires Next runtime). Same merge + filter as legacy engine.
  const { activeDirectoryMovers } = await import('../data/active-directory-movers');
  const { localMoverToCompany } = await import('../lib/directory/local-mover-to-company');
  const { mergeDirectoryCompanies } = await import('../lib/directory/merge-directory');
  const {
    companyCountyLookupKeys,
    enrichDirectoryWithStaticCountyCoverage,
  } = await import('../lib/directory/enrich-static-county-coverage');
  const {
    getAssignmentCountiesByCompanyKey,
    mergeCoverageWithAssignments,
  } = await import('../lib/directory/load-assignment-counties');
  const { getCompaniesCached } = await import('../lib/supabase/queries/companies');
  const { isConsumerVisibleCompany } = await import('../lib/provider/publication');
  const { prepareCompaniesForDirectoryClient } = await import(
    '../lib/directory/directory-client-payload'
  );
  const { filterCompanies } = await import('../lib/directory/filter-companies');

  const [directoryCompanies, assignmentMap] = await Promise.all([
    getCompaniesCached(),
    getAssignmentCountiesByCompanyKey(),
  ]);
  const activeCatalogCompanies = Object.values(activeDirectoryMovers).map((mover) => {
    const company = localMoverToCompany(mover);
    return {
      ...company,
      authorityActive: true as const,
      outOfService: false,
      usdotStatus: 'ACTIVE' as const,
      isVerified: true,
      serviceScope: 'interstate' as const,
    };
  });
  const merged = mergeDirectoryCompanies(directoryCompanies, activeCatalogCompanies);
  const withDbAssignments = merged.map((company) => {
    let assigned = assignmentMap.get((company.slug || '').toLowerCase());
    if (!assigned?.length) assigned = assignmentMap.get((company.id || '').toLowerCase());
    if (!assigned?.length) {
      for (const key of companyCountyLookupKeys(company)) {
        const hit = assignmentMap.get(key);
        if (hit?.length) {
          assigned = hit;
          break;
        }
      }
    }
    if (!assigned?.length) return company;
    return {
      ...company,
      coverageCounties: mergeCoverageWithAssignments(company.coverageCounties, assigned),
    };
  });
  const all = prepareCompaniesForDirectoryClient(
    enrichDirectoryWithStaticCountyCoverage(withDbAssignments).filter(isConsumerVisibleCompany)
  );
  const filtered = filterCompanies(all, options.filters as never);
  const companies = filtered.slice(options.offset, options.offset + options.limit);
  return {
    companies,
    total: filtered.length,
    offset: options.offset,
    limit: options.limit,
    hasMore: options.offset + companies.length < filtered.length,
  };
}

async function main() {
  const { queryDbDirectoryPage, getLastDbDirectoryDiagnostics } = await import(
    '../lib/directory/query-db-directory-page'
  );

  const cases: Array<{
    name: string;
    offset?: number;
    limit?: number;
    filters: Record<string, unknown>;
  }> = [
    { name: 'default-page-1', offset: 0, limit: 24, filters: {} },
    { name: 'default-page-2', offset: 24, limit: 24, filters: {} },
    { name: 'deep-page-240', offset: 240, limit: 24, filters: {} },
    { name: 'search-Allied', filters: { search: 'Allied' } },
    { name: 'search-76235', filters: { search: '76235' } },
    { name: 'search-Mayflower', filters: { search: 'Mayflower' } },
    { name: 'search-125563', filters: { search: '125563' } },
    { name: 'search-Gomuverz', filters: { search: 'Gomuverz' } },
    { name: 'search-4525347', filters: { search: '4525347' } },
    { name: 'search-moving', filters: { search: 'moving' } },
    { name: 'search-van-lines', filters: { search: 'van lines' } },
    { name: 'search-transport', filters: { search: 'transport' } },
    { name: 'role-Carrier', filters: { services: ['Carrier'] } },
    { name: 'role-Broker', filters: { services: ['Broker'] } },
    { name: 'role-Carrier-Broker', filters: { services: ['Carrier / Broker'] } },
    { name: 'role-Local-Mover', filters: { services: ['Local Mover'] } },
    { name: 'state-FL', filters: { state: 'FL', coverage: 'State / County' } },
    { name: 'state-TX', filters: { state: 'TX', coverage: 'State / County' } },
    { name: 'state-CA', filters: { state: 'CA', coverage: 'State / County' } },
    { name: 'sort-reputation', filters: { sort: 'reputation' } },
    { name: 'sort-rating', filters: { sort: 'rating' } },
    { name: 'sort-reviews', filters: { sort: 'reviews' } },
    { name: 'sort-price-low', filters: { sort: 'price-low' } },
    { name: 'sort-price-high', filters: { sort: 'price-high' } },
    { name: 'sort-years', filters: { sort: 'years' } },
    { name: 'sort-complaints', filters: { sort: 'complaints' } },
    { name: 'verified', filters: { onlyVerified: true } },
    { name: 'full-service', filters: { onlyFullService: true } },
    { name: 'min-rating-4', filters: { minRating: 4 } },
    { name: 'max-price-5000', filters: { maxPrice: 5000 } },
    { name: 'bbb-A', filters: { bbbMin: 'A' } },
  ];

  const protectedUsdots = [
    '76235',
    '125563',
    '125550',
    '70719',
    '49922',
    '76628',
    '70851',
  ];

  const results: CaseResult[] = [];
  const diagnostics: unknown[] = [];

  for (const c of cases) {
    const offset = c.offset ?? 0;
    const limit = c.limit ?? 24;
    const filters = c.filters as never;

    const legacy = await buildLegacyPage({ offset, limit, filters });
    const db = await queryDbDirectoryPage({ offset, limit, filters });
    const diag = getLastDbDirectoryDiagnostics();
    diagnostics.push({ case: c.name, diag });

    const legacyIds = legacy.companies.map((x) => x.id);
    const dbIds = db.companies.map((x) => x.id);
    const legacySet = new Set(legacyIds);
    const overlap = dbIds.filter((id) => legacySet.has(id)).length;
    let orderMatch = 0;
    const n = Math.min(legacyIds.length, dbIds.length);
    for (let i = 0; i < n; i++) {
      if (legacyIds[i] === dbIds[i]) orderMatch += 1;
      else break;
    }

    const notes: string[] = [];
    if (Math.abs(legacy.total - db.total) > Math.max(5, legacy.total * 0.05)) {
      notes.push(`total delta ${legacy.total} vs ${db.total}`);
    }
    if (diag && (diag.materializedIntoNode ?? 0) >= 2000) {
      notes.push(`HIGH materialization ${diag.materializedIntoNode}`);
    }

    results.push({
      name: c.name,
      legacyTotal: legacy.total,
      dbTotal: db.total,
      legacyIds,
      dbIds,
      idOverlapFirstPage: overlap,
      orderMatchFirstN: orderMatch,
      exactPageMatch: JSON.stringify(legacyIds) === JSON.stringify(dbIds),
      notes,
    });

    console.log(
      JSON.stringify({
        case: c.name,
        legacyTotal: legacy.total,
        dbTotal: db.total,
        overlap,
        orderMatch,
        exact: JSON.stringify(legacyIds) === JSON.stringify(dbIds),
        materialized: diag?.materializedIntoNode,
        path: diag?.path,
      })
    );
  }

  // Protected identities: ensure USDOT search surfaces them in both engines
  const protectedChecks = [];
  for (const usdot of protectedUsdots) {
    const legacy = await buildLegacyPage({
      offset: 0,
      limit: 5,
      filters: { search: usdot },
    });
    const db = await queryDbDirectoryPage({
      offset: 0,
      limit: 5,
      filters: { search: usdot },
    });
    const legacyHit = legacy.companies.some(
      (c) => (c.usdotNumber || '').replace(/\D/g, '') === usdot
    );
    const dbHit = db.companies.some(
      (c) => (c.usdotNumber || '').replace(/\D/g, '') === usdot
    );
    protectedChecks.push({ usdot, legacyHit, dbHit });
  }

  const exactMatches = results.filter((r) => r.exactPageMatch).length;
  const summary = {
    generatedAt: new Date().toISOString(),
    cases: results.length,
    exactPageMatches: exactMatches,
    protectedChecks,
    knownDifferences: results
      .filter((r) => !r.exactPageMatch)
      .map((r) => ({
        name: r.name,
        legacyTotal: r.legacyTotal,
        dbTotal: r.dbTotal,
        overlap: r.idOverlapFirstPage,
        orderMatch: r.orderMatchFirstN,
        notes: r.notes,
      })),
    diagnostics,
  };

  const outDir = resolve(process.cwd(), 'docs');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, 'task-009a1-parity-harness.json');
  writeFileSync(outPath, JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ wrote: outPath, exactPageMatches: exactMatches, cases: results.length }));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
