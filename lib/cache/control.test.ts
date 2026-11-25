import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  COUNTY_HTML_CDN_SECONDS,
  FLORIDA_HTML_CDN_SECONDS,
  cdnCacheControl,
  countyHtmlCdnCacheControl,
  htmlCacheControl,
  htmlCacheSecondsForPath,
  isCountyHtmlPath,
  shouldApplyMiddlewareHtmlCache,
} from './control';

test('middleware does not CDN-cache company profile HTML', () => {
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/gentletouch-moving-company'), false);
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/allied-van-lines'), false);
});

test('middleware still caches directory index and share-og', () => {
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies'), true);
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/allied-van-lines/share-og'), true);
  assert.equal(shouldApplyMiddlewareHtmlCache('/'), true);
});

test('Florida HTML CDN TTL is 60s, not the 86400 default', () => {
  assert.equal(FLORIDA_HTML_CDN_SECONDS, 60);
  assert.equal(htmlCacheSecondsForPath('/florida', 86_400), 60);
  assert.equal(cdnCacheControl(htmlCacheSecondsForPath('/florida', 86_400)), 'max-age=60');
  assert.notEqual(htmlCacheSecondsForPath('/florida', 86_400), 86_400);
});

test('New Jersey HTML CDN TTL matches Florida force-dynamic snapshot pages', () => {
  assert.equal(htmlCacheSecondsForPath('/new-jersey', 86_400), 60);
});

test('homepage and other public HTML keep the default CDN TTL', () => {
  assert.equal(htmlCacheSecondsForPath('/', 86_400), 86_400);
  assert.equal(htmlCacheSecondsForPath('/resources/fmcsa', 86_400), 86_400);
  assert.equal(htmlCacheSecondsForPath('/companies', 86_400), 300);
});

test('known county HTML uses a 60s CDN TTL with a 60s stale window', () => {
  const county = '/local-movers/florida/miami-dade';
  assert.equal(isCountyHtmlPath(county), true);
  assert.equal(COUNTY_HTML_CDN_SECONDS, 60);
  assert.equal(htmlCacheSecondsForPath(county, 86_400), 60);
  assert.equal(
    htmlCacheControl(htmlCacheSecondsForPath(county, 86_400)),
    'public, max-age=0, s-maxage=60, stale-while-revalidate=604800'
  );
  assert.equal(countyHtmlCdnCacheControl(), 'max-age=60, stale-while-revalidate=60');
  assert.equal(countyHtmlCdnCacheControl().includes('86400'), false);
  assert.equal(htmlCacheSecondsForPath('/local-movers/florida', 86_400), 86_400);
  assert.equal(htmlCacheSecondsForPath('/local-movers/florida/miami-dade/extra', 86_400), 86_400);
  assert.equal(isCountyHtmlPath('/local-movers/florida'), false);
});

test('vercel.json pins /florida CDN-Cache-Control to 60s without Cache-Control conflict', () => {
  const raw = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../vercel.json'), 'utf8');
  const config = JSON.parse(raw) as {
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };
  const florida = config.headers.find((row) => row.source === '/florida');
  assert.ok(florida, '/florida header block missing');
  const cdn = florida.headers.find((h) => h.key === 'CDN-Cache-Control');
  const vercelCdn = florida.headers.find((h) => h.key === 'Vercel-CDN-Cache-Control');
  const cacheControl = florida.headers.find((h) => h.key === 'Cache-Control');
  assert.equal(cdn?.value, 'max-age=60');
  assert.equal(vercelCdn?.value, 'max-age=60');
  assert.equal(cacheControl, undefined);
  assert.doesNotMatch(cdn?.value ?? '', /86400/);
});
