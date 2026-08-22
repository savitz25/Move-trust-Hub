import assert from 'node:assert/strict';
import { test } from 'node:test';
import { shouldApplyMiddlewareHtmlCache } from '@/lib/cache/control';

test('middleware does not CDN-cache company profile HTML', () => {
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/gentletouch-moving-company'), false);
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/allied-van-lines'), false);
});

test('middleware still caches directory index and share-og', () => {
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies'), true);
  assert.equal(shouldApplyMiddlewareHtmlCache('/companies/allied-van-lines/share-og'), true);
  assert.equal(shouldApplyMiddlewareHtmlCache('/'), true);
});
