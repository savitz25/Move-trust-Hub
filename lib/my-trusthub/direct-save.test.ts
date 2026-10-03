import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { handoffTargetAllowed, parentSync, resumeDirect, startDirect, type DirectPorts } from './direct-save';
import { handleMoveProfileSave, type HttpDependencies } from './profile-save-http';
import type { MoveProfileSaveAdapter } from './profile-save-adapter';
import { isSelection } from './selection';
import { canarySlugs, directParentSync, keepAllowed, planSave, planUnsave, unsaveReachesParent } from '../save-my-move/save-control';
import { addLocalSavedMover, isLocalMoverSaved, removeLocalSavedMover } from '../save-my-move/local-shortlist';

// Device shortlist helpers read window/localStorage lazily per call.
const device = new Map<string, string>();
const keyValue = (map: Map<string, string>) => ({
  getItem: (k: string) => map.get(k) ?? null, setItem: (k: string, v: string) => { map.set(k, v); }, removeItem: (k: string) => { map.delete(k); },
});
(globalThis as unknown as { window: unknown }).window = globalThis;
(globalThis as unknown as { localStorage: unknown }).localStorage = { ...keyValue(device), clear: () => device.clear(), key: () => null, length: 0 };

const SLUG = 'hindman-isaacs-moving-storage-inc';
const NAME = 'Hindman & Isaacs Moving & Storage, INC.';
const TARGET = 'https://www.asktrusthub.com/my/profile-save';
const ref = (n: number) => createHash('sha256').update('ref' + n).digest('base64url');

/** Stand-in for the pair: the Move BFF (bootstrap / prepare / status) and the
 * Ask form the browser is handed to. The parent commits or removes only under a
 * verified session and acknowledges only what it did; Saved rows are keyed by
 * owner and entity exactly like the owner-scoped parent Save. `abandon` drops
 * the hand-off after it starts (the user clicked away mid-chain) and `refuse`
 * makes the account refuse the removal. */
function world() {
  let n = 0;
  const calls: string[] = [], submitted: Array<{ target: string; fields: Record<string, string> }> = [];
  const tickets = new Map<string, { continuationRef: string; acknowledged: boolean }>();
  const parent = { account: null as string | null, saved: new Set<string>(), watches: new Set<string>(), bffUp: true, statusUp: true, abandon: false, refuse: false, eligible: true };
  const ports: DirectPorts = {
    async post(body, csrf) {
      const b = body as { action: string; selected?: unknown; ticket?: string };
      calls.push(b.action);
      if (!parent.bffUp) throw Error('unavailable');
      if (b.action === 'bootstrap') return { csrf: 'c'.repeat(43) };
      assert.equal(csrf, 'c'.repeat(43));
      if (b.action === 'prepare') {
        assert.equal(isSelection(b.selected), true);
        // Not publicly publishable, unsupported class, or no exact accepted identity.
        if (!parent.eligible) return { state: 'local_only', capability: 'IDENTITY_REVIEW_REQUIRED', localCopy: 'keep' };
        const ticket = ref(++n), continuationRef = ref(++n);
        tickets.set(ticket, { continuationRef, acknowledged: false });
        return { state: 'continue', ticket, target: TARGET, fields: { continuationRef }, localCopy: 'keep' };
      }
      if (b.action === 'status') {
        if (!parent.statusUp) throw Error('unavailable');
        return { state: tickets.get(b.ticket!)?.acknowledged ? 'parent_acknowledged' : 'pending', localCopy: 'keep' };
      }
      throw Error('invalid');
    },
    digest: async text => createHash('sha256').update(text).digest('hex'),
    submit(target, fields) {
      submitted.push({ target, fields });
      const stage = [...tickets.values()].find(t => t.continuationRef === fields.continuationRef);
      if (!stage || parent.abandon) return;
      if (fields.intent === 'save_signin' && !parent.account) parent.account = 'owner-a'; // the user signs in on Ask
      if (!parent.account) return; // signed out: the parent returns without asking
      const row = parent.account + ':usdot-1002530';
      if (fields.intent === 'unsave') { if (parent.refuse) return; parent.saved.delete(row); stage.acknowledged = true; }
      else { parent.saved.add(row); stage.acknowledged = true; }
    },
    local: keyValue(device),
  };
  const pending = () => device.has('mth-direct:' + SLUG);
  return { ports, parent, pending, calls, submitted };
}

test('A. Save with a verified parent account: device Save first, then exactly one My TrustHub Saved row', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a';
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  assert.equal(isLocalMoverSaved(SLUG), true); assert.equal(w.calls.length, 0); // device write precedes any network call
  assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'navigating');
  assert.deepEqual(w.submitted.map(s => [s.target, Object.keys(s.fields).sort().join(), s.fields.intent]), [[TARGET, 'continuationRef,intent', 'save']]);
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'save', outcome: 'confirmed' });
  assert.deepEqual([...w.parent.saved], ['owner-a:usdot-1002530']);
  assert.equal(parentSync(w.ports.local, SLUG), 'synced');
  // The pending marker is consumed once: a reload reports nothing and calls nothing.
  const before = w.calls.length; assert.equal(await resumeDirect(w.ports, SLUG), null); assert.equal(w.calls.length, before);
});

test('B. repeated Save is idempotent: no duplicate parent row', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a';
  for (let i = 0; i < 3; i++) {
    const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
    assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'navigating');
    assert.equal((await resumeDirect(w.ports, SLUG))?.outcome, 'confirmed');
  }
  assert.equal(w.parent.saved.size, 1);
  assert.equal(planSave({ saved: true, busy: null, auth: { loading: false, user: false } }).kind, 'skip'); // a Saved control never re-saves
});

test('C. Unsave with a verified parent account: device row removed immediately, parent Saved row removed', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a';
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  await startDirect(w.ports, SLUG, 'save', row.savedAt); await resumeDirect(w.ports, SLUG);
  assert.equal(unsaveReachesParent({ direct: true, parentSync: parentSync(w.ports.local, SLUG) }), true);
  const calls = w.calls.length;
  removeLocalSavedMover(SLUG); assert.equal(isLocalMoverSaved(SLUG), false); assert.equal(w.calls.length, calls); // device removal precedes any network call
  assert.equal(await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString()), 'navigating');
  assert.equal(w.submitted.at(-1)!.fields.intent, 'unsave');
  assert.equal(w.parent.saved.size, 0);
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'unsave', outcome: 'confirmed' });
  assert.equal(parentSync(w.ports.local, SLUG), null); // control is back to Save, device-only
  // Another account's session never removes this owner's row.
  w.parent.saved.add('owner-a:usdot-1002530'); w.parent.account = 'owner-b';
  await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString());
  assert.deepEqual([...w.parent.saved], ['owner-a:usdot-1002530']);
});

test('C2. Unsave the parent did not complete is never reported as an account Unsave and stays retryable', async () => {
  // The production failure: the hand-off starts, then the user clicks away and
  // the chain is abandoned after the POST. Device row is gone; account row is not.
  device.clear(); const w = world(); w.parent.account = 'owner-a';
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  await startDirect(w.ports, SLUG, 'save', row.savedAt); await resumeDirect(w.ports, SLUG);
  removeLocalSavedMover(SLUG);
  w.parent.abandon = true;
  assert.equal(await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString()), 'navigating');
  assert.equal(w.parent.saved.size, 1);
  // The pending marker is on the device, not the tab: it is still there when
  // the profile is next opened, and that visit reports "not confirmed".
  assert.equal(w.pending(), true);
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'unsave', outcome: 'not_confirmed' });
  assert.equal(isLocalMoverSaved(SLUG), false);
  assert.equal(parentSync(w.ports.local, SLUG), 'synced'); // still believed to be in My TrustHub
  assert.equal(unsaveReachesParent({ direct: true, parentSync: parentSync(w.ports.local, SLUG) }), true);
  // "Try again" completes it, and only then is the account Unsave reported.
  w.parent.abandon = false;
  assert.equal(await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString()), 'navigating');
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'unsave', outcome: 'confirmed' });
  assert.equal(w.parent.saved.size, 0); assert.equal(parentSync(w.ports.local, SLUG), null);

  // Refused by the account, signed out on the parent, or outcome unreadable: same rule.
  for (const fault of ['refuse', 'signed_out', 'status_down'] as const) {
    device.clear(); const v = world(); v.parent.account = 'owner-a';
    const saved = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
    await startDirect(v.ports, SLUG, 'save', saved.savedAt); await resumeDirect(v.ports, SLUG);
    removeLocalSavedMover(SLUG);
    if (fault === 'refuse') v.parent.refuse = true;
    if (fault === 'signed_out') v.parent.account = null;
    assert.equal(await startDirect(v.ports, SLUG, 'unsave', new Date().toISOString()), 'navigating');
    if (fault === 'status_down') v.parent.statusUp = false;
    const outcome = (await resumeDirect(v.ports, SLUG))!.outcome;
    assert.equal(outcome, fault === 'status_down' ? 'unknown' : 'not_confirmed');
    assert.equal(parentSync(v.ports.local, SLUG), 'synced', fault);
  }

  // The user already left the profile when staging finished: nothing navigates,
  // nothing is pending, the belief is unchanged.
  device.clear(); const u = world(); u.parent.account = 'owner-a';
  const kept = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  await startDirect(u.ports, SLUG, 'save', kept.savedAt); await resumeDirect(u.ports, SLUG);
  const submits = u.submitted.length;
  assert.equal(await startDirect(u.ports, SLUG, 'unsave', new Date().toISOString(), () => false), 'unavailable');
  assert.equal(u.submitted.length, submits); assert.equal(u.pending(), false); assert.equal(parentSync(u.ports.local, SLUG), 'synced');
});

test('D. Save with the parent unavailable: device Save succeeds, nothing navigates, no account success is claimed', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a'; w.parent.bffUp = false;
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'unavailable');
  assert.equal(isLocalMoverSaved(SLUG), true); assert.equal(w.submitted.length, 0);
  assert.equal(w.pending(), false); assert.equal(parentSync(w.ports.local, SLUG), null); assert.equal(await resumeDirect(w.ports, SLUG), null);
  // Parent reached but its outcome cannot be read back: still not success, and Unsave stays offered to the parent.
  w.parent.bffUp = true; w.parent.statusUp = false;
  assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'navigating');
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'save', outcome: 'unknown' });
  assert.equal(parentSync(w.ports.local, SLUG), 'unknown');
  // A device-only Unsave is still immediate when the parent cannot be reached.
  w.parent.bffUp = false; removeLocalSavedMover(SLUG);
  assert.equal(await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString()), 'unavailable');
  assert.equal(isLocalMoverSaved(SLUG), false);
});

test('B/C/D/E/F. a profile that is not eligible stays a device Save: nothing navigates, nothing is pending, no account claim', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a'; w.parent.eligible = false;
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'not_eligible');
  assert.equal(isLocalMoverSaved(SLUG), true); assert.equal(w.submitted.length, 0); assert.equal(w.pending(), false);
  assert.equal(w.parent.saved.size, 0); assert.equal(parentSync(w.ports.local, SLUG), null); assert.equal(await resumeDirect(w.ports, SLUG), null);
  // Its Unsave is device-only: there is nothing in the account to remove.
  assert.equal(unsaveReachesParent({ direct: true, parentSync: parentSync(w.ports.local, SLUG) }), false);
});

test('E. signed-out Save: device Save succeeds; the optional sign-in continuation finishes the parent Save', async () => {
  device.clear(); const w = world();
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  assert.equal(await startDirect(w.ports, SLUG, 'save', row.savedAt), 'navigating');
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'save', outcome: 'not_confirmed' });
  assert.equal(isLocalMoverSaved(SLUG), true); assert.equal(w.parent.saved.size, 0); assert.equal(parentSync(w.ports.local, SLUG), null);
  // Signed out and never synced: Unsave is device-only, no parent attempt.
  assert.equal(unsaveReachesParent({ direct: true, parentSync: parentSync(w.ports.local, SLUG) }), false);
  // The user chooses "Sign in": no Keep, no Confirm Save, no second Save click.
  assert.equal(await startDirect(w.ports, SLUG, 'save_signin', row.savedAt), 'navigating');
  assert.deepEqual(await resumeDirect(w.ports, SLUG), { intent: 'save_signin', outcome: 'confirmed' });
  assert.deepEqual([...w.parent.saved], ['owner-a:usdot-1002530']);
});

test('F/G. Save and Unsave never create or touch a Watch', async () => {
  device.clear(); const w = world(); w.parent.account = 'owner-a'; w.parent.watches.add('owner-a:existing-watch');
  const row = addLocalSavedMover({ companySlug: SLUG, companyName: NAME });
  await startDirect(w.ports, SLUG, 'save', row.savedAt); await resumeDirect(w.ports, SLUG);
  await startDirect(w.ports, SLUG, 'unsave', new Date().toISOString()); await resumeDirect(w.ports, SLUG);
  assert.deepEqual([...w.parent.watches], ['owner-a:existing-watch']);
  assert.deepEqual([...new Set(w.calls)].sort(), ['bootstrap', 'prepare', 'status']);
  assert.equal(w.submitted.every(s => Object.keys(s.fields).sort().join() === 'continuationRef,intent' && ['save', 'unsave'].includes(s.fields.intent!)), true);
  for (const file of ['lib/my-trusthub/direct-save.ts', 'components/save-my-move/save-mover-button.tsx'])
    assert.doesNotMatch(readFileSync(file, 'utf8'), /watch/i);
});

test('H. non-canary mover and non-profile surfaces: no parent-save attempt', () => {
  const canary = { parentSaveEnabled: true, canarySlugs: canarySlugs(SLUG) };
  const direct = (slug: string, pathname: string | null, env = canary) => directParentSync({ keepAllowed: keepAllowed(slug, env), pathname, slug });
  assert.equal(direct(SLUG, '/companies/' + SLUG), true);
  assert.equal(direct('some-other-mover', '/companies/some-other-mover'), false);
  assert.equal(direct(SLUG, '/companies'), false); // directory card for the canary mover
  assert.equal(direct(SLUG, null), false);
  // Flags off (production today): no parent sync for anyone, Hindman included.
  assert.equal(direct(SLUG, '/companies/' + SLUG, { parentSaveEnabled: false, canarySlugs: canarySlugs(SLUG) }), false);
  assert.equal(unsaveReachesParent({ direct: false, parentSync: 'synced' }), false);
  // Their Save / Unsave plans are the existing device-first ones.
  assert.deepEqual(planSave({ saved: false, busy: null, auth: { loading: false, user: false } }), { kind: 'local_guest' });
  assert.deepEqual(planUnsave({ saved: true, busy: null, auth: { loading: false, user: false } }), { kind: 'local_only' });
});

test('the hand-off posts only to the production Ask form or a reviewed preview host', () => {
  assert.equal(handoffTargetAllowed(TARGET), true);
  for (const bad of ['https://www.asktrusthub.com/my/saved', 'https://asktrusthub.com/my/profile-save', TARGET + '?x=1', TARGET + '#x',
    'https://user@www.asktrusthub.com/my/profile-save', 'https://www.asktrusthub.com.evil.example/my/profile-save', 'javascript:alert(1)', '', null])
    assert.equal(handoffTargetAllowed(bad), false);
});

test('the Keep step is gone from the profile Save control', () => {
  const button = readFileSync('components/save-my-move/save-mover-button.tsx', 'utf8');
  assert.doesNotMatch(button, /KeepInMyTrustHub|Keep this in My TrustHub|Confirm Save/);
});

test('the profile Save control is one toggle: no separate Unsave control beside Saved', () => {
  const button = readFileSync('components/save-my-move/save-mover-button.tsx', 'utf8');
  // No element whose visible text or label is a standalone Unsave action.
  assert.doesNotMatch(button, />\s*Unsave\s*</); assert.doesNotMatch(button, /aria-label=\{`Unsave /);
  const start = button.indexOf("if (variant === 'button')"), profile = button.slice(start, button.indexOf('return (', start + 60));
  // Exactly one control in the profile variant, and it toggles on the saved state.
  assert.equal(profile.split('<Button').length - 1, 1);
  assert.equal(profile.split('<button').length - 1, 0);
  assert.match(profile, /onClick=\{\(\) => void \(saved \? handleUnsave\(\) : handleSave\(\)\)\}/);
  assert.match(profile, /aria-pressed=\{saved\}/);
  assert.match(button, /saved \? 'Saved' : busy === 'save' \? 'Saving…' : 'Save'/);
  // The toggle is disabled while the My TrustHub hand-off is in flight.
  assert.match(profile, /disabled=\{disabled \|\| syncing !== null\}/);
});

test('BFF status: CSRF-bound, browser-bound, presentation only', async () => {
  const origin = 'http://127.0.0.1:4321', url = origin + '/api/my-trusthub/profile-save';
  const asked: string[] = [];
  const deps: HttpDependencies = {
    config: { enabled: true, environment: 'isolated', verifiedIsolatedPair: true, moveOrigin: origin, parentOrigin: 'http://127.0.0.1:4322', parentFormPath: '/my/profile-save' },
    adapter: {} as MoveProfileSaveAdapter, allowRequest: async () => true,
    parentStatus: async (browser, ticket) => { asked.push(browser.binding); return ticket === ref(1) ? 'parent_acknowledged' : 'pending'; },
  };
  const base = { origin, 'sec-fetch-site': 'same-origin', 'content-type': 'application/json' };
  const call = (body: unknown, headers: Record<string, string> = base, d: HttpDependencies = deps) =>
    handleMoveProfileSave(new Request(url, { method: 'POST', headers, body: JSON.stringify(body) }), d);
  const { csrf } = await (await call({ action: 'bootstrap' })).json();
  const auth = { ...base, cookie: 'mth_move_profile_transfer=' + csrf, 'x-mth-csrf': csrf };
  assert.equal((await call({ action: 'status', ticket: ref(1) })).status, 403); // no CSRF
  assert.equal((await (await call({ action: 'status', ticket: ref(1) }, auth)).json()).state, 'parent_acknowledged');
  assert.equal((await (await call({ action: 'status', ticket: ref(2) }, auth)).json()).state, 'pending');
  assert.deepEqual(asked, [csrf, csrf]); // resolved for this browser binding only
  assert.equal((await call({ action: 'status', ticket: 'short' }, auth)).status, 503);
  assert.equal((await call({ action: 'status', ticket: ref(1), accountId: 'x' }, auth)).status, 400);
  assert.equal((await call({ action: 'status', ticket: ref(1) }, auth, { ...deps, parentStatus: undefined })).status, 503);
});
