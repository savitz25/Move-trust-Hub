const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const { resolve } = require('node:path');
const ts = require('typescript');

// Execute the real component and store with synthetic hooks/ports. No network.
function fixture({ saved = false, failWrite = false, cloudFails = false, direct = false } = {}) {
  const storage = new Map();
  const slug = 'synthetic-mover';
  if (saved) storage.set('mth-local-saved-movers', JSON.stringify([{ companySlug: slug, companyName: 'Synthetic', savedAt: '2026-01-01' }]));
  const notices = [], calls = [];
  let fail = failWrite, providerSaved = saved, index = 0;
  const state = [];
  const localStorage = { getItem: k => storage.get(k) ?? null, setItem(k, v) { if (fail) throw Error('quota'); storage.set(k, v); } };
  const compile = (file, mocks = {}) => {
    const context = { exports: {}, window: {}, localStorage, sessionStorage: { removeItem() { calls.push('ticket-remove'); } }, console: { warn() {}, error() {} }, require: name => {
      assert.ok(name in mocks, `Unexpected import: ${name}`); return mocks[name];
    }};
    vm.runInNewContext(ts.transpileModule(readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, context);
    return context.exports;
  };
  const store = compile(resolve(__dirname, '../../lib/save-my-move/local-shortlist.ts'));
  const controls = compile(resolve(__dirname, '../../lib/save-my-move/save-control.ts'));
  const jsx = (type, props) => ({ type, props });
  const component = compile(__dirname + '/save-mover-button.tsx', {
    react: { useState(value) { const i = index++; if (!(i in state)) state[i] = typeof value === 'function' ? value() : value; return [state[i], v => { state[i] = v; }]; }, useRef: value => ({ current: value }), useEffect() {} },
    'react/jsx-runtime': { jsx, jsxs: jsx }, 'react-dom': { createPortal: x => x },
    'next/navigation': { usePathname: () => '/companies/' + slug }, 'lucide-react': { Heart: 'Heart' },
    '@/components/ui/button': { Button: 'Button' },
    '@/components/save-my-move/save-my-move-provider': { useSaveMyMove: () => ({ user: {}, loading: false, isMoverSaved: () => providerSaved, markMoverSaved() { calls.push('mark-save'); providerSaved = true; }, markMoverUnsaved() { calls.push('mark-unsave'); providerSaved = false; }, openSaveModal() {} }) },
    '@/actions/save-my-move': { saveMoverAction: async () => { calls.push('cloud-save'); if (cloudFails) throw Error('offline'); return { ok: true, cloud: true }; }, removeSavedMoverBySlugAction: async () => { calls.push('cloud-unsave'); if (cloudFails) throw Error('offline'); return { ok: true }; } },
    '@/lib/save-my-move/local-shortlist': store, '@/lib/save-my-move/save-control': controls,
    '@/lib/my-trusthub/direct-save': { browserDirectPorts: () => ({}), parentSync: () => direct ? {} : null, startDirect: async () => { calls.push('parent'); return 'unavailable'; }, resumeDirect: async () => null },
    '@/components/ga-events': { trackSaveMyMoveMover() { calls.push('analytics'); } },
    '@/components/analytics/posthog-beacons': { captureMyTrustHubSaveIntent() {}, captureMyTrustHubSaveFailed() {}, captureMyTrustHubSaveConfirmed() {} },
    sonner: { toast: Object.fromEntries(['success', 'error', 'message', 'warning'].map(kind => [kind, text => notices.push({ kind, text })])) },
    '@/lib/utils': { cn: () => '' },
    '@/components/my-trusthub/my-trusthub-origin': { ONE_ACCOUNT_ENABLED: direct, keepAllowedForSlug: () => direct, useMyTrustHubHref: () => '/my/saved' },
  });
  const render = () => { index = 0; return component.SaveMoverButton({ companySlug: slug, companyName: 'Synthetic', variant: 'button' }); };
  return { notices, calls, store, slug, setFailure: v => { fail = v; }, render, async click() { render().props.children[0].props.onClick(); await new Promise(resolve => setImmediate(resolve)); } };
}

for (const direct of [false, true]) {
  test(`failed Save keeps unsaved and skips all follow-up writes (direct=${direct})`, async () => {
    const f = fixture({ failWrite: true, direct }); await f.click();
    assert.equal(f.render().props['data-save-state'], 'unsaved');
    assert.equal(f.store.isLocalMoverSaved(f.slug), false);
    assert.equal(f.notices.at(-1).kind, 'error'); assert.deepEqual(f.calls, []);
    f.setFailure(false); await f.click();
    assert.equal(f.store.isLocalMoverSaved(f.slug), true); assert.equal(f.render().props['data-save-state'], 'saved');
  });
  test(`failed Unsave retains row/state/ticket and skips cloud (direct=${direct})`, async () => {
    const f = fixture({ saved: true, failWrite: true, direct }); await f.click();
    assert.equal(f.store.isLocalMoverSaved(f.slug), true); assert.equal(f.render().props['data-save-state'], 'saved');
    assert.equal(f.notices.at(-1).kind, 'error'); assert.deepEqual(f.calls, []);
    f.setFailure(false); await f.click();
    assert.equal(f.store.isLocalMoverSaved(f.slug), false); assert.equal(f.render().props['data-save-state'], 'unsaved');
  });
}
test('successful device Save remains truthful when optional cloud sync throws', async () => {
  const f = fixture({ cloudFails: true }); await f.click();
  assert.equal(f.store.isLocalMoverSaved(f.slug), true);
  assert.equal(f.notices.at(-1).kind, 'success'); assert.match(f.notices.at(-1).text, /on this device/);
});
test('successful device Unsave remains truthful when optional cloud sync throws', async () => {
  const f = fixture({ saved: true, cloudFails: true }); await f.click();
  assert.equal(f.store.isLocalMoverSaved(f.slug), false);
  assert.equal(f.notices.at(-1).kind, 'success'); assert.match(f.notices.at(-1).text, /from this device/);
});
