import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  isUnresolvedCountySlug,
  unresolvedCountyCacheHeaders,
  UNRESOLVED_COUNTY_CACHE_CONTROL,
  UNRESOLVED_COUNTY_CDN_CACHE_CONTROL,
} from './county-unknown-slug';

test('fixture and invented county slugs are unresolved and no-store', () => {
  for (const slug of ['qa-cache-fixture', 'zz-not-a-county-b3']) {
    assert.equal(isUnresolvedCountySlug('florida', slug), true);
    assert.deepEqual(unresolvedCountyCacheHeaders(`/local-movers/florida/${slug}`), {
      cacheControl: UNRESOLVED_COUNTY_CACHE_CONTROL,
      cdnCacheControl: UNRESOLVED_COUNTY_CDN_CACHE_CONTROL,
    });
  }
  assert.equal(UNRESOLVED_COUNTY_CACHE_CONTROL.includes('86400'), false);
  assert.equal(UNRESOLVED_COUNTY_CDN_CACHE_CONTROL.includes('max-age'), false);
});

test('a real county and non-county paths keep the existing cache policy', () => {
  assert.equal(isUnresolvedCountySlug('florida', 'miami-dade'), false);
  assert.equal(unresolvedCountyCacheHeaders('/local-movers/florida/miami-dade'), null);
  assert.equal(unresolvedCountyCacheHeaders('/local-movers/florida'), null);
  assert.equal(unresolvedCountyCacheHeaders('/local-movers/florida/miami-dade/extra'), null);
  assert.equal(unresolvedCountyCacheHeaders('/companies/example'), null);
});

test('county generateMetadata calls notFound before returning metadata', () => {
  const source = readFileSync(
    new URL('../../app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx', import.meta.url),
    'utf8'
  );
  const start = source.indexOf('export async function generateMetadata');
  const end = source.indexOf('export default async function LocalMoversCountyPage');
  assert.ok(start >= 0 && end > start);
  const fn = source.slice(start, end);
  const notFoundAt = fn.indexOf('if (!seo) notFound();');
  const returnAt = fn.indexOf('return seo.metadata;');
  assert.ok(notFoundAt >= 0, 'generateMetadata must call notFound when seo is missing');
  assert.ok(returnAt > notFoundAt, 'metadata return must follow the notFound guard');
  assert.equal(fn.includes('return seo?.metadata ?? {}'), false);
});
