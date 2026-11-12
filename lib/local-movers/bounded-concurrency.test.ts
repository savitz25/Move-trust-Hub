import assert from 'node:assert/strict';
import test from 'node:test';
import { dedupeInflight, mapWithConcurrency, settleWithin } from '@/lib/local-movers/bounded-concurrency';

test('county work stays inside the concurrency bound', async () => {
  let active = 0;
  let peak = 0;
  const items = Array.from({ length: 20 }, (_, index) => index);
  const results = await mapWithConcurrency(items, 4, async (item) => {
    active += 1;
    peak = Math.max(peak, active);
    await new Promise((resolve) => setTimeout(resolve, 15));
    active -= 1;
    return item;
  });
  assert.deepEqual(results, items);
  assert.ok(peak <= 4);
  assert.ok(peak >= 2);
});

test('a slow load is a timeout, not an empty success', async () => {
  const settled = await settleWithin(
    new Promise<string[]>((resolve) => setTimeout(() => resolve(['dallas']), 200)),
    30
  );
  assert.equal(settled.status, 'failed');
  if (settled.status === 'failed') {
    assert.equal(settled.reason, 'timeout');
    assert.equal('value' in settled, false);
  }
});

test('a rejected load is an error, not an empty list', async () => {
  const settled = await settleWithin(Promise.reject(new Error('db down')), 50);
  assert.equal(settled.status, 'failed');
  if (settled.status === 'failed') assert.equal(settled.reason, 'error');
});

test('concurrent callers share one state load', async () => {
  const inflight = new Map<string, Promise<number>>();
  let calls = 0;
  const start = () => {
    calls += 1;
    return new Promise<number>((resolve) => setTimeout(() => resolve(14), 40));
  };
  const results = await Promise.all(
    Array.from({ length: 12 }, () => dedupeInflight(inflight, 'texas', start))
  );
  assert.equal(calls, 1);
  assert.deepEqual(results, Array.from({ length: 12 }, () => 14));
});
