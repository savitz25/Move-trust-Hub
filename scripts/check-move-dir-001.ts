import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import evidence from '../data/fmcsa/auto-transport-evidence.json';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { queryDbDirectoryPage } from '../lib/directory/query-db-directory-page';
import { hasSourceBackedAutoTransportEvidence } from '../lib/directory/auto-transport-evidence';

async function main() {
  const serviceFilter = readFileSync(resolve('lib/directory/service-filter.ts'), 'utf8');
  const query = readFileSync(resolve('lib/directory/query-db-directory-page.ts'), 'utf8');
  const sitemap = readFileSync(resolve('app/sitemap.ts'), 'utf8');

  assert.equal(evidence.source.datasetId, 'az4n-8mr2');
  assert.equal(evidence.records.length, 268);
  assert.ok(serviceFilter.includes("service === 'Auto Transport'"));
  assert.ok(serviceFilter.includes('hasSourceBackedAutoTransportEvidence'));
  assert.ok(!serviceFilter.includes('company.name'));
  assert.ok(!serviceFilter.includes('company.slug'));
  assert.ok(query.includes("path: 'source-auto'"));
  assert.ok(query.includes('total: filtered.length'));
  assert.ok(!sitemap.includes('Auto+Transport'));
  loadEnvLocal();
  const first = await queryDbDirectoryPage({
  limit: 24,
  offset: 0,
  filters: { services: ['Auto Transport'] },
  });
  const second = await queryDbDirectoryPage({
  limit: 24,
  offset: 24,
  filters: { services: ['Auto Transport'] },
  });
  assert.equal(first.total, 268);
  assert.equal(first.companies.length, 24);
  assert.equal(second.companies.length, 24);
  assert.equal(first.hasMore, true);
  assert.equal(first.companies.some((row) => second.companies.some((next) => next.id === row.id)), false);
  assert.ok(first.companies.every((row) => hasSourceBackedAutoTransportEvidence(row)));
  console.log('MOVE-DIR-001 source contract: PASS');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
