import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyCountyCacheTags, countyCacheTag, countyRevalidationPaths } from './county-cache-tag';

import { rejectedPaths } from './county-cache-tag.fixtures';

test('county tag uses the exact county path and is distinct for different counties', () => {
  assert.equal(countyCacheTag('/local-movers/florida/miami-dade'), 'county-florida-miami-dade');
  assert.equal(countyCacheTag('/local-movers/florida/orange'), 'county-florida-orange');
});

for (const path of rejectedPaths) {
  test(`reject literal path ${JSON.stringify(path)}`, () => {
    assert.equal(countyCacheTag(path), null);
    assert.equal(countyRevalidationPaths({ paths: ['/local-movers/florida/orange', path] }), null);
    const headers = new Headers();
    applyCountyCacheTags(headers, path, new Request('https://example.invalid'));
    assert.equal(headers.get('Cache-Tag'), null);
    assert.equal(headers.get('Vercel-Cache-Tag'), null);
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

test('HTML header emission adds both county tags without changing TTLs', () => {
  for (const method of ['GET', 'HEAD']) {
    const headers = new Headers({ 'CDN-Cache-Control': 'max-age=86400', 'Cache-Control': 'public' });
    applyCountyCacheTags(headers, '/local-movers/florida/miami-dade', new Request('https://example.invalid', { method }));
    assert.equal(headers.get('Cache-Tag'), 'county-florida-miami-dade');
    assert.equal(headers.get('Vercel-Cache-Tag'), 'county-florida-miami-dade');
    assert.equal(headers.get('CDN-Cache-Control'), 'max-age=86400');
    assert.equal(headers.get('Cache-Control'), 'public');
  }
});

test('POST and RSC requests do not get HTML tags', () => {
  for (const init of [{ method: 'POST' }, { headers: { rsc: '1' } }]) {
    const headers = new Headers();
    applyCountyCacheTags(headers, '/local-movers/florida/miami-dade', new Request('https://example.invalid', init));
    assert.equal(headers.get('Cache-Tag'), null);
    assert.equal(headers.get('Vercel-Cache-Tag'), null);
  }
});
