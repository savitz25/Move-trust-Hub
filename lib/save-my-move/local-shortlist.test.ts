import test from 'node:test';
import assert from 'node:assert/strict';
import { addLocalSavedMover, listLocalSavedMovers, removeLocalSavedMover } from './local-shortlist';

const key = 'mth-local-saved-movers';
const input = { companySlug: 'b3-test-mover', companyName: 'B3 Test Mover' };

function storage(initial: string | null = null) {
  let value = initial;
  Object.assign(globalThis, { window: {}, localStorage: {
    getItem: (name: string) => { assert.equal(name, key); return value; },
    setItem: (name: string, next: string) => { assert.equal(name, key); value = next; },
  } });
  return () => value;
}

test('B3-02/B3-03: preserve storage contract, existing entries and duplicate notes', () => {
  storage();
  addLocalSavedMover({ companySlug: 'existing', companyName: 'Existing' });
  addLocalSavedMover({ ...input, notes: 'Keep my notes' });
  addLocalSavedMover(input);
  const rows = listLocalSavedMovers();
  assert.equal(rows.length, 2);
  assert.equal(rows.find(row => row.companySlug === input.companySlug)?.notes, 'Keep my notes');
});

test('B3-08: a failed write must not report local-save success', () => {
  storage();
  globalThis.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => addLocalSavedMover(input), /QuotaExceededError/);
});

test('B3-08: unreadable existing storage must not be overwritten', () => {
  const read = storage('{invalid-json');
  assert.throws(() => addLocalSavedMover(input));
  assert.equal(read(), '{invalid-json');
});

test('local removal preserves other saved movers',()=>{
  storage();addLocalSavedMover(input);addLocalSavedMover({companySlug:'another',companyName:'Another'});
  removeLocalSavedMover(input.companySlug);
  assert.deepEqual(listLocalSavedMovers().map(row=>row.companySlug),['another']);
});
