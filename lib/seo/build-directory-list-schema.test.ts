import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildCompaniesDirectorySchemaGraph } from '@/lib/seo/build-directory-list-schema';

test('directory schema uses bounded ItemList and an explicit total', () => {
  const companies = [
    { name: 'A', slug: 'a', reputationScore: 10 },
    { name: 'B', slug: 'b', reputationScore: 90 },
  ] as never;
  const graph = buildCompaniesDirectorySchemaGraph(companies, { limit: 24, total: 2406 });
  const collection = (graph['@graph'] as Array<Record<string, unknown>>)[0]!;
  const list = (graph['@graph'] as Array<Record<string, unknown>>)[1]!;
  assert.equal(collection.numberOfItems, 2406);
  assert.equal(list.numberOfItems, 2);
});
