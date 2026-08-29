import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  FLORIDA_HTML_CDN_SECONDS,
  cdnCacheControl,
  htmlCacheSecondsForPath,
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

test('homepage and other public HTML keep the default CDN TTL', () => {
  assert.equal(htmlCacheSecondsForPath('/', 86_400), 86_400);
  assert.equal(htmlCacheSecondsForPath('/resources/fmcsa', 86_400), 86_400);
  assert.equal(htmlCacheSecondsForPath('/companies', 86_400), 300);
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
