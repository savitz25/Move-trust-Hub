import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  collectReviewSitemapPages,
  type ReviewSitemapRow,
} from './review-sitemap-page';

const UPDATED_AT = '2026-01-01T00:00:00.000Z';

function rows(call: number, count: number): ReviewSitemapRow[] {
  return Array.from({ length: count }, (_, index) => ({
    slug: `p${call}-r${index}`,
    updated_at: UPDATED_AT,
  }));
}

function sliceFrom(source: string, start: string, end: string | null): string {
  const at = source.indexOf(start);
  assert.ok(at >= 0, start);
  const after = at + start.length;
  const stop = end ? source.indexOf(end, after) : source.length;
  assert.ok(stop > at, end ?? 'end');
  return source.slice(at, stop);
}

test('pages of 1000 and a short page stops', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    if (calls.length > 3) throw new Error('fourth page');
    const count = calls.length === 3 ? 1 : 1000;
    return { data: rows(calls.length - 1, count), error: null };
  });

  assert.deepEqual(calls, [
    [0, 999],
    [1000, 1999],
    [2000, 2999],
  ]);
  assert.equal(result.length, 2001);
  assert.equal(result[0].slug, 'p0-r0');
  assert.equal(result[999].slug, 'p0-r999');
  assert.equal(result[1000].slug, 'p1-r0');
  assert.equal(result[1999].slug, 'p1-r999');
  assert.equal(result[2000].slug, 'p2-r0');
  assert.equal(result[0].updated_at, UPDATED_AT);
});

test('stops at 20000 after 20 full pages', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    return { data: rows(calls.length - 1, to - from + 1), error: null };
  });

  assert.equal(calls.length, 20);
  assert.deepEqual(calls[0], [0, 999]);
  assert.deepEqual(calls[1], [1000, 1999]);
  assert.deepEqual(calls[19], [19000, 19999]);
  assert.equal(result.length, 20000);
  assert.equal(result[0].slug, 'p0-r0');
  assert.equal(result[19000].slug, 'p19-r0');
  assert.equal(result[19999].slug, 'p19-r999');
});

test('timeout keeps collected rows and continues', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    if (calls.length === 1) return { data: rows(0, 1000), error: null };
    return { data: null, error: { name: 'AbortError', message: 'timeout' } };
  });

  assert.deepEqual(calls, [
    [0, 999],
    [1000, 1999],
  ]);
  assert.equal(result.length, 1000);
  assert.equal(result[0].slug, 'p0-r0');
  assert.equal(result[999].slug, 'p0-r999');
});

test('thrown abort keeps collected rows', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    if (calls.length === 1) return { data: rows(0, 1000), error: null };
    const abort = new Error('The operation was aborted');
    abort.name = 'AbortError';
    throw abort;
  });

  assert.equal(calls.length, 2);
  assert.equal(result.length, 1000);
  assert.equal(result[999].slug, 'p0-r999');
});

test('first page error returns no rows', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    return { data: null, error: { message: 'fail' } };
  });
  assert.deepEqual(calls, [[0, 999]]);
  assert.deepEqual(result, []);
});

test('missing data returns no rows', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    return { data: null, error: null };
  });
  assert.deepEqual(calls, [[0, 999]]);
  assert.deepEqual(result, []);
});

test('blank slug is dropped and a short page stops', async () => {
  const calls: Array<[number, number]> = [];
  const result = await collectReviewSitemapPages(async (from, to) => {
    calls.push([from, to]);
    return {
      data: [
        { slug: '   ', updated_at: UPDATED_AT },
        { slug: ' dot-1 ', updated_at: UPDATED_AT },
      ],
      error: null,
    };
  });
  assert.deepEqual(calls, [[0, 999]]);
  assert.deepEqual(result, [{ slug: ' dot-1 ', updated_at: UPDATED_AT }]);
});

test('review sitemap query orders by id and uses the paged read', () => {
  const source = readFileSync('lib/reviews/bridge.ts', 'utf8');
  const slice = sliceFrom(source, 'export async function getMovingCompanySlugsForSitemap', null);
  assert.match(slice, /\.order\(\s*'id'\s*,\s*\{\s*ascending:\s*true\s*\}\s*\)/);
  assert.match(slice, /\.gt\(\s*'approved_review_count'\s*,\s*0\s*\)/);
  assert.match(slice, /\.select\(\s*'slug,\s*updated_at'\s*\)/);
  assert.match(slice, /collectReviewSitemapPages/);
  assert.match(slice, /\.range\(\s*from\s*,\s*to\s*\)/);
  assert.equal(slice.includes('.limit(500)'), false);
  assert.equal(/\.order\(\s*'updated_at'/.test(slice), false);
});

test('review sitemap lastmod uses the row timestamp', () => {
  const source = readFileSync('app/sitemap.ts', 'utf8');
  const slice = sliceFrom(source, 'const reviewCompanyPages', 'return [');
  assert.match(slice, /getMovingCompanySlugsForSitemap/);
  assert.match(slice, /lastModified:\s*row\.updated_at/);
  assert.equal(slice.includes('new Date('), false);
});
