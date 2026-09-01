import assert from 'node:assert/strict';
import { queryDbDirectoryPage, getLastDbDirectoryDiagnostics } from '@/lib/directory/query-db-directory-page';
import { directoryFiltersFromSearchParams } from '@/lib/directory/build-directory-api-query';
import { extractStateCodeFromHeadquarters } from '@/lib/directory/coverage-filter';

async function main() {
const baseline = await queryDbDirectoryPage({
  offset: 0,
  limit: 5000,
  filters: directoryFiltersFromSearchParams({ services: 'Auto Transport' }),
});
assert.equal(baseline.total, 268, 'accepted MOVE-DIR-001 cohort must remain 268');

const stateCounts: Record<string, number> = {};
for (const state of ['NY', 'FL', 'TX', 'CA', 'NJ', 'WA', 'IL']) {
  stateCounts[state] = baseline.companies.filter(
    (company) => extractStateCodeFromHeadquarters(company.headquarters) === state
  ).length;
}
assert.equal(stateCounts.NY, 6);

const ny = await queryDbDirectoryPage({
  offset: 0,
  limit: 24,
  filters: directoryFiltersFromSearchParams({ search: 'auto transport new york', services: 'Auto Transport' }),
});
assert.equal(ny.total, stateCounts.NY);
assert.ok(ny.companies.every((company) => extractStateCodeFromHeadquarters(company.headquarters) === 'NY'));

const nyCarrier = await queryDbDirectoryPage({
  offset: 0,
  limit: 24,
  filters: directoryFiltersFromSearchParams({ search: 'auto transport carrier new york' }),
});
assert.equal(nyCarrier.total, 6);
assert.ok(nyCarrier.companies.every((company) => company.entityType === 'Carrier'));

const serving = directoryFiltersFromSearchParams({ search: 'auto transport serving new york' });
assert.equal(serving.recordedHqState, null);
assert.equal(serving.search, '');

const diagnostics = getLastDbDirectoryDiagnostics();
assert.equal(diagnostics?.path, 'source-auto');
assert.ok((diagnostics?.materializedIntoNode ?? 999) <= 268);

console.log(JSON.stringify({
  status: 'PASS',
  databaseWrites: 0,
  publicationDelta: 0,
  baseline: baseline.total,
  stateCounts,
  nyRoleCounts: { Carrier: nyCarrier.total, Broker: 0, 'Carrier/Broker': 0, Unknown: 0 },
  diagnostics,
}, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
