import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { canarySlugs, keepAllowed } from './save-control';
import { addLocalSavedMover, isLocalMoverSaved, removeLocalSavedMover } from './local-shortlist';
import { isParentSaveCanarySlug, PARENT_SAVE_CANARY_SLUGS } from './parent-save-canary';

const storage = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = globalThis;
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => storage.clear(),
  key: () => null,
  length: 0,
} as Storage;

test('the production canary list has one source and three reviewed slugs', () => {
  assert.deepEqual([...PARENT_SAVE_CANARY_SLUGS], [
    'hindman-isaacs-moving-storage-inc',
    'gentle-giant-moving',
    'caraway-moving-inc',
  ]);
  assert.equal(isParentSaveCanarySlug('gentle-giant-moving'), true);
  assert.equal(isParentSaveCanarySlug('qa-any-mover-local'), false);
  const origin = readFileSync(new URL('../../components/my-trusthub/my-trusthub-origin.tsx', import.meta.url), 'utf8');
  assert.equal(origin.includes('NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS'), true);
  assert.equal(origin.includes('parent-save-canary'), false);
});

test('a local list admits any mover slug without widening the production canary', () => {
  const localSlug = 'qa-any-mover-local';
  const localList = canarySlugs(localSlug);
  assert.equal(keepAllowed(localSlug, { parentSaveEnabled: true, canarySlugs: localList }), true);
  assert.equal(
    keepAllowed(localSlug, { parentSaveEnabled: true, canarySlugs: PARENT_SAVE_CANARY_SLUGS }),
    false
  );
  assert.equal(keepAllowed(localSlug, { parentSaveEnabled: false, canarySlugs: localList }), false);
  storage.clear();
  addLocalSavedMover({ companySlug: localSlug, companyName: 'QA Any Mover' });
  assert.equal(isLocalMoverSaved(localSlug), true);
  assert.equal(isLocalMoverSaved(PARENT_SAVE_CANARY_SLUGS[0]), false);
  removeLocalSavedMover(localSlug);
  assert.equal(isLocalMoverSaved(localSlug), false);
});
