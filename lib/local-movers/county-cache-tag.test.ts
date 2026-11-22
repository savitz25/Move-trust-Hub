import assert from 'node:assert/strict';
import { test } from 'node:test';
import { countyCacheTag, countyRevalidationPaths } from './county-cache-tag';

import { rejectedPaths } from './county-cache-tag.fixtures';

test('county tag uses the exact county path and is distinct for different counties', () => {
  assert.equal(countyCacheTag('/local-movers/florida/miami-dade'), 'county-florida-miami-dade');
  assert.equal(countyCacheTag('/local-movers/florida/orange'), 'county-florida-orange');
});

for (const path of rejectedPaths) {
  test(`reject literal path ${JSON.stringify(path)}`, () => {
    assert.equal(countyCacheTag(path), null);
    assert.equal(countyRevalidationPaths({ paths: ['/local-movers/florida/orange', path] }), null);
  });
}

test('body validation rejects missing, empty and non-string paths; deduplicates valid paths', () => {
  for (const body of [null, [], {}, { paths: [] }, { paths: 'bad' }, { paths: [null] }, { paths: [123] }]) {
    assert.equal(countyRevalidationPaths(body), null);
  }
  assert.deepEqual(countyRevalidationPaths({ paths: [
    '/local-movers/florida/orange', '/local-movers/florida/orange',
  ] }), ['/local-movers/florida/orange']);
});


