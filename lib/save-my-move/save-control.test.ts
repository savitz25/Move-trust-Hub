import test from 'node:test';
import assert from 'node:assert/strict';
import { canarySlugs, keepAllowed, keepControlVisible, planSave, planUnsave, saveControlDisabled } from './save-control';
import { addLocalSavedMover, isLocalMoverSaved, removeLocalSavedMover } from './local-shortlist';

// Device shortlist helpers read window/localStorage lazily per call, so a
// minimal shim installed before the first call is sufficient.
const storage = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = globalThis;
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => { storage.set(k, v); },
  removeItem: (k: string) => { storage.delete(k); }, clear: () => storage.clear(), key: () => null, length: 0,
} as Storage;

const SLUG = 'hindman-isaacs-moving-storage-inc';
const pending = { loading: true, user: false };
const pendingWithStaleUser = { loading: true, user: true };
const guest = { loading: false, user: false };
const signedIn = { loading: false, user: true };

test('A. auth pending, unsaved: Save is enabled and the click writes the device shortlist only', () => {
  assert.equal(saveControlDisabled(null), false);
  const plan = planSave({ saved: false, busy: null, auth: pending });
  assert.deepEqual(plan, { kind: 'local_only', reason: 'auth_pending' });
  storage.clear();
  addLocalSavedMover({ companySlug: SLUG, companyName: 'Hindman & Isaacs' });
  assert.equal(isLocalMoverSaved(SLUG), true);
});

test('B. auth pending, saved: Unsave is enabled and the click clears the device shortlist', () => {
  assert.equal(saveControlDisabled(null), false);
  assert.deepEqual(planUnsave({ saved: true, busy: null, auth: pending }), { kind: 'local_only' });
  addLocalSavedMover({ companySlug: SLUG, companyName: 'Hindman & Isaacs' });
  removeLocalSavedMover(SLUG);
  assert.equal(isLocalMoverSaved(SLUG), false);
});

test('C. auth pending, canary Hindman admitted: a device Save shows Keep this in My TrustHub', () => {
  const env = { parentSaveEnabled: true, canarySlugs: canarySlugs(SLUG) };
  assert.equal(keepAllowed(SLUG, env), true);
  assert.equal(keepAllowed('some-other-mover', env), false);
  assert.equal(keepControlVisible({ localSaved: true, keepAllowed: keepAllowed(SLUG, env) }), true);
  assert.equal(keepControlVisible({ localSaved: false, keepAllowed: keepAllowed(SLUG, env) }), false);
  // Flags off (production today): no Keep for anyone.
  assert.equal(keepAllowed(SLUG, { parentSaveEnabled: false, canarySlugs: canarySlugs(SLUG) }), false);
  assert.equal(canarySlugs(' a , b ,, ').join(), 'a,b');
});

test('D. auth pending: no legacy cloud Save or Unsave is ever planned', () => {
  for (const auth of [pending, pendingWithStaleUser]) {
    assert.notEqual(planSave({ saved: false, busy: null, auth }).kind, 'local_then_cloud');
    assert.notEqual(planUnsave({ saved: true, busy: null, auth }).kind, 'local_then_cloud');
  }
});

test('E. resolved behaviour is unchanged: guest guidance, signed-in cloud sync, busy and state guards', () => {
  assert.deepEqual(planSave({ saved: false, busy: null, auth: guest }), { kind: 'local_guest' });
  assert.deepEqual(planSave({ saved: false, busy: null, auth: signedIn }), { kind: 'local_then_cloud' });
  assert.deepEqual(planUnsave({ saved: true, busy: null, auth: guest }), { kind: 'local_only' });
  assert.deepEqual(planUnsave({ saved: true, busy: null, auth: signedIn }), { kind: 'local_then_cloud' });
  assert.deepEqual(planSave({ saved: true, busy: null, auth: signedIn }), { kind: 'skip' });
  assert.deepEqual(planUnsave({ saved: false, busy: null, auth: signedIn }), { kind: 'skip' });
  assert.deepEqual(planSave({ saved: false, busy: 'save', auth: signedIn }), { kind: 'skip' });
  assert.deepEqual(planUnsave({ saved: true, busy: 'unsave', auth: signedIn }), { kind: 'skip' });
  assert.equal(saveControlDisabled('save'), true);
  assert.equal(saveControlDisabled('unsave'), true);
});
