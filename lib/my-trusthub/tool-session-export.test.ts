import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { COMPARE_STORAGE_KEY } from '@/store/compare-store';
import { COMPARE_HANDOFF_KEY } from '@/lib/move-quote-check/compare-engine';
import { MY_MOVE_PLAN_STORAGE_KEY } from '@/lib/my-move-plan/types';
import { PLAN_LIBRARY_KEY } from '@/lib/my-move-plan/plan-library';
import { addLocalSavedMover, isLocalMoverSaved, removeLocalSavedMover } from '@/lib/save-my-move/local-shortlist';
import { TOOL_SESSION_DEVICE_KEYS, TOOL_SESSION_SCHEMAS } from '@/lib/my-trusthub/tool-session-schemas';
import {
  TOOL_SESSION_EXPORT_ENABLED,
  applyToolSessionResume,
  buildToolSessionHandoff,
  collectDeviceToolSessions,
  type ToolSessionHandoff,
  type ToolSessionStore,
} from '@/lib/my-trusthub/tool-session-export';

function memoryStore(seed: Record<string, string> = {}) {
  const data = new Map(Object.entries(seed));
  const removed: string[] = [];
  const store: ToolSessionStore & { removed: string[]; data: Map<string, string> } = {
    data,
    removed,
    getItem(key) {
      return data.has(key) ? data.get(key)! : null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    removeItem(key: string) {
      removed.push(key);
      data.delete(key);
    },
  };
  return store;
}

const inventoryRaw = JSON.stringify({
  state: {
    inventory: [{ id: 'box-1', name: 'Book box', volume: 1.5, quantity: 2 }],
    mode: 'room',
  },
  version: 2,
});
const planRaw = JSON.stringify({
  step: 'inventory',
  fromPlace: null,
  toPlace: null,
  drivingMiles: null,
  shortlist: [],
  preset: null,
  inventory: [],
  updatedAt: '2026-11-25T00:00:00.000Z',
});
const libraryRaw = JSON.stringify([
  { id: 'plan-1', plan: { step: 'route' } },
]);
const quoteRaw = JSON.stringify({ estimateA: { total: 100 } });
const compareRaw = JSON.stringify({ state: { selectedSlugs: ['qa-any-mover-local'] } });
const moversRaw = JSON.stringify([
  { companySlug: 'qa-any-mover-local', companyName: 'QA Any Mover', savedAt: '2026-11-25T00:00:00.000Z' },
]);

function fullSnapshot() {
  return {
    [TOOL_SESSION_DEVICE_KEYS.inventory]: inventoryRaw,
    [TOOL_SESSION_DEVICE_KEYS.plan]: planRaw,
    [TOOL_SESSION_DEVICE_KEYS.planLibrary]: libraryRaw,
    [TOOL_SESSION_DEVICE_KEYS.quoteCheck]: quoteRaw,
    [TOOL_SESSION_DEVICE_KEYS.compareStorage]: compareRaw,
    [TOOL_SESSION_DEVICE_KEYS.savedMovers]: moversRaw,
  };
}

test('device keys stay the signed-out keys', () => {
  assert.equal(TOOL_SESSION_EXPORT_ENABLED, false);
  assert.equal(TOOL_SESSION_DEVICE_KEYS.inventory, 'move-calculator-inventory');
  assert.equal(TOOL_SESSION_DEVICE_KEYS.plan, MY_MOVE_PLAN_STORAGE_KEY);
  assert.equal(TOOL_SESSION_DEVICE_KEYS.planLibrary, PLAN_LIBRARY_KEY);
  assert.equal(TOOL_SESSION_DEVICE_KEYS.quoteCheck, COMPARE_HANDOFF_KEY);
  assert.equal(TOOL_SESSION_DEVICE_KEYS.compareStorage, COMPARE_STORAGE_KEY);
  assert.equal(TOOL_SESSION_DEVICE_KEYS.savedMovers, 'mth-local-saved-movers');
  const calculator = readFileSync(new URL('../../store/calculator-store.ts', import.meta.url), 'utf8');
  const shortlist = readFileSync(new URL('../save-my-move/local-shortlist.ts', import.meta.url), 'utf8');
  assert.match(calculator, /name: 'move-calculator-inventory'/);
  assert.match(shortlist, /mth-local-saved-movers/);
  assert.deepEqual(
    TOOL_SESSION_SCHEMAS.map((row) => row.schemaKey),
    [
      'move.tool.inventory.v1',
      'move.tool.plan.v1',
      'move.tool.plan-library.v1',
      'move.tool.comparison.v1',
      'move.tool.compare-storage.v1',
      'move.tool.saved-movers.v1',
    ]
  );
});

test('export is off unless a caller enables it, and a repeat export keeps the same request key', async () => {
  const off = await buildToolSessionHandoff({ snapshot: fullSnapshot() });
  assert.equal(off.outcome, 'disabled');
  const first = await buildToolSessionHandoff({ enabled: true, snapshot: fullSnapshot() });
  const second = await buildToolSessionHandoff({ enabled: true, snapshot: fullSnapshot() });
  assert.equal(first.outcome, 'ready');
  assert.equal(second.outcome, 'ready');
  if (first.outcome !== 'ready' || second.outcome !== 'ready') return;
  assert.equal(first.rejected.length, 0);
  assert.equal(first.sessions.length, 6);
  assert.deepEqual(
    first.sessions.map((row) => row.requestKey),
    second.sessions.map((row) => row.requestKey)
  );
  assert.equal(first.sessions.every((row) => row.resumeRef === row.requestKey), true);
  const changed = await buildToolSessionHandoff({
    enabled: true,
    snapshot: { ...fullSnapshot(), [TOOL_SESSION_DEVICE_KEYS.savedMovers]: JSON.stringify([{ companySlug: 'other-mover' }]) },
  });
  assert.equal(changed.outcome, 'ready');
  if (changed.outcome !== 'ready') return;
  const before = first.sessions.find((row) => row.deviceKey === TOOL_SESSION_DEVICE_KEYS.savedMovers);
  const after = changed.sessions.find((row) => row.deviceKey === TOOL_SESSION_DEVICE_KEYS.savedMovers);
  assert.notEqual(before?.requestKey, after?.requestKey);
});

test('collect and resume do not delete device keys', async () => {
  const local = memoryStore({
    [TOOL_SESSION_DEVICE_KEYS.inventory]: inventoryRaw,
    [TOOL_SESSION_DEVICE_KEYS.savedMovers]: moversRaw,
    'unrelated-report': '{"ok":true}',
  });
  const session = memoryStore({
    [TOOL_SESSION_DEVICE_KEYS.plan]: planRaw,
    [TOOL_SESSION_DEVICE_KEYS.quoteCheck]: quoteRaw,
  });
  const snapshot = collectDeviceToolSessions({ local, session });
  assert.equal(local.removed.length, 0);
  assert.equal(session.removed.length, 0);
  assert.equal(snapshot[TOOL_SESSION_DEVICE_KEYS.inventory], inventoryRaw);
  const built = await buildToolSessionHandoff({ enabled: true, snapshot });
  assert.equal(built.outcome, 'ready');
  if (built.outcome !== 'ready') return;
  const plan = built.sessions.find((row) => row.deviceKey === TOOL_SESSION_DEVICE_KEYS.plan);
  assert.ok(plan);
  session.data.set(TOOL_SESSION_DEVICE_KEYS.plan, '{"step":"route"}');
  const restored = await applyToolSessionResume({ enabled: true, handoff: plan as ToolSessionHandoff, local, session });
  assert.deepEqual(restored, { restored: true, deviceKey: TOOL_SESSION_DEVICE_KEYS.plan });
  assert.equal(session.data.get(TOOL_SESSION_DEVICE_KEYS.plan), plan?.raw);
  assert.equal(session.data.get(TOOL_SESSION_DEVICE_KEYS.quoteCheck), quoteRaw);
  assert.equal(local.data.get('unrelated-report'), '{"ok":true}');
  assert.equal(local.data.get(TOOL_SESSION_DEVICE_KEYS.inventory), inventoryRaw);
  assert.equal(local.removed.length, 0);
  assert.equal(session.removed.length, 0);
  const mismatch = await applyToolSessionResume({
    enabled: true,
    handoff: { ...(plan as ToolSessionHandoff), resumeRef: '0'.repeat(64) },
    local,
    session,
  });
  assert.deepEqual(mismatch, { restored: false, reason: 'digest_mismatch' });
  assert.equal(session.data.get(TOOL_SESSION_DEVICE_KEYS.plan), plan?.raw);
  const disabled = await applyToolSessionResume({ handoff: plan as ToolSessionHandoff, local, session });
  assert.deepEqual(disabled, { restored: false, reason: 'disabled' });
});

test('signed-out saved movers still round-trip on the device key', () => {
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
  storage.clear();
  addLocalSavedMover({ companySlug: 'qa-any-mover-local', companyName: 'QA Any Mover' });
  assert.equal(isLocalMoverSaved('qa-any-mover-local'), true);
  assert.equal(storage.has('mth-local-saved-movers'), true);
  removeLocalSavedMover('qa-any-mover-local');
  assert.equal(isLocalMoverSaved('qa-any-mover-local'), false);
});

test('the export module does not fetch, query Supabase, or clear device storage', () => {
  const source = readFileSync(new URL('./tool-session-export.ts', import.meta.url), 'utf8');
  assert.equal(source.includes('fetch('), false);
  assert.equal(source.includes('supabase'), false);
  assert.equal(source.includes('removeItem'), false);
  assert.equal(source.includes('clearLocalMergeStorage'), false);
  assert.equal(source.includes('localStorage'), false);
  assert.equal(source.includes('sessionStorage'), false);
});
