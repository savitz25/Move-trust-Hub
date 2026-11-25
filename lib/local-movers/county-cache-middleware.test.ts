import assert from 'node:assert/strict';
import { mock, test } from 'node:test';
import { NextRequest } from 'next/server';

// An integration test of the real middleware response, with no DB/network access.
mock.module('@/lib/supabase/middleware', {
  namedExports: { updateSession: () => { throw new Error('Unexpected auth session'); } },
});
const middlewareModule = import('@/middleware');

test('county HTML keeps the existing TTL and does not get a middleware cache tag', async () => {
  const { middleware } = await middlewareModule;
  const response = await middleware(new NextRequest('https://www.movetrusthub.com/local-movers/florida/miami-dade', {
    headers: { host: 'www.movetrusthub.com', accept: 'text/html' },
  }));
  assert.equal(response.headers.get('Cache-Tag'), null);
  assert.equal(response.headers.get('Vercel-Cache-Tag'), null);
  assert.equal(response.headers.get('CDN-Cache-Control'), 'max-age=86400');
});

test('actual middleware does not tag state hubs, unrelated pages, RSC or redirects', async () => {
  const { middleware } = await middlewareModule;
  for (const path of ['/local-movers', '/local-movers/florida', '/companies', '/compare', '/sitemap-local']) {
    const response = await middleware(new NextRequest(`https://www.movetrusthub.com${path}`, {
      headers: { host: 'www.movetrusthub.com' },
    }));
    assert.equal(response.headers.get('Cache-Tag'), null);
    assert.equal(response.headers.get('Vercel-Cache-Tag'), null);
  }
  const requestHeaders: HeadersInit[] = [
    { host: 'www.movetrusthub.com', rsc: '1' },
    { host: 'www.insurancetrusthub.com' },
    { host: 'www.movetrusthub.com', 'x-forwarded-proto': 'http' },
  ];
  for (const headers of requestHeaders) {
    const response = await middleware(new NextRequest('https://www.movetrusthub.com/local-movers/florida/miami-dade', { headers }));
    assert.equal(response.headers.get('Cache-Tag'), null);
    assert.equal(response.headers.get('Vercel-Cache-Tag'), null);
  }
});
