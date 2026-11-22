import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mock, test } from 'node:test';

const pathCalls: unknown[][] = [];
const tagCalls: unknown[][] = [];
mock.module('next/cache', {
  namedExports: {
    revalidatePath: (...args: unknown[]) => { pathCalls.push(args); },
    revalidateTag: (...args: unknown[]) => { tagCalls.push(args); },
  },
});
const route = import('@/app/api/revalidate-county-paths/route');
const secret = randomUUID(); // Disposable, in-process only; never printed.
const good = ['/local-movers/florida/miami-dade', '/local-movers/florida/orange'];

function request(body: unknown, authorization?: string, query = '') {
  return new Request(`https://example.invalid/api/revalidate-county-paths${query}`, {
    method: 'POST', headers: authorization ? { authorization } : {}, body: JSON.stringify(body),
  });
}

test('actual POST route authenticates and validates the whole batch before isolated invalidation', async (t) => {
  const { POST } = await route;
  // No real secret is read or retained by this test process.
  delete process.env.REVALIDATE_SECRET;
  t.after(() => { delete process.env.REVALIDATE_SECRET; });
  await t.test('unset secret returns 503', async () => {
    assert.equal((await POST(request({ paths: good }))).status, 503);
  });
  process.env.REVALIDATE_SECRET = secret;
  for (const authorization of [undefined, 'Bearer incorrect', 'Basic incorrect']) {
    await t.test('missing or wrong bearer returns 401', async () => {
      const response = await POST(request({ paths: good }, authorization));
      assert.equal(response.status, 401);
      assert.equal((await response.text()).includes(secret), false);
    });
  }
  await t.test('query-only secret cannot authenticate', async () => {
    assert.equal((await POST(request({ paths: good }, undefined, `?secret=${secret}`))).status, 401);
  });
  await t.test('malformed JSON returns 400', async () => {
    assert.equal((await POST(new Request('https://example.invalid/api/revalidate-county-paths', {
      method: 'POST', headers: { authorization: `Bearer ${secret}` }, body: '{',
    }))).status, 400);
  });
  const { rejectedPaths } = await import('./county-cache-tag.fixtures');
  for (const invalid of [...rejectedPaths, null, 42]) {
    await t.test('invalid member rejects whole batch with no invalidation', async () => {
      const response = await POST(request({ paths: [good[0], invalid] }, `Bearer ${secret}`));
      assert.equal(response.status, 400);
      assert.deepEqual(pathCalls, []);
      assert.deepEqual(tagCalls, []);
    });
  }
  for (const body of [null, [], {}, { paths: [] }, { paths: good[0] }]) {
    assert.equal((await POST(request(body, `Bearer ${secret}`))).status, 400);
  }
  assert.deepEqual(pathCalls, []);
  assert.deepEqual(tagCalls, []);
  await t.test('success calls only exact county pages, never either shared tag', async () => {
    const response = await POST(request({ paths: [...good, good[0]] }, `Bearer ${secret}`));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, paths: good });
    assert.deepEqual(pathCalls, good.map((path) => [path, 'page']));
    assert.deepEqual(tagCalls, [], 'No tag calls, including approved-county-movers or companies-directory');
  });
});
