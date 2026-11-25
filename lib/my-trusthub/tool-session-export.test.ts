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
  assert.equal(TOOL_SESSION_SCHEMAS.some((row) => 'schemaKey' in row), false);
  const schemaSource = readFileSync(new URL('./tool-session-schemas.ts', import.meta.url), 'utf8');
  const exportSource = readFileSync(new URL('./tool-session-export.ts', import.meta.url), 'utf8');
  assert.equal(schemaSource.includes('move.tool.'), false);
  assert.equal(exportSource.includes('move.tool.'), false);
});

test('the superseded tool-session handoff stays closed and emits no schema key', async () => {
  const off = await buildToolSessionHandoff({ snapshot: fullSnapshot() });
  const forced = await buildToolSessionHandoff({ enabled: true, snapshot: fullSnapshot() });
  assert.equal(off.outcome, 'disabled');
  assert.equal(forced.outcome, 'disabled');
  const serialized = JSON.stringify(forced);
  assert.equal(serialized.includes('Book box'), false);
  assert.equal(serialized.includes('move.tool.'), false);
  assert.equal(serialized.includes('schemaKey'), false);
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
  const planBefore = session.data.get(TOOL_SESSION_DEVICE_KEYS.plan);
  const restored = await applyToolSessionResume({
    enabled: true,
    handoff: {
      version: 'move-tool-session/1',
      hub: 'move',
      schemaKey: 'move.inventory/v1',
      deviceKey: TOOL_SESSION_DEVICE_KEYS.plan,
      storage: 'session',
      legacyTable: null,
      requestKey: 'raw',
      resumeRef: 'raw',
      payload: { step: 'inventory', name: 'Book box' },
      raw: '{"name":"Book box"}',
    },
    local,
    session,
  });
  assert.deepEqual(restored, { restored: false, reason: 'raw_payload_refused' });
  assert.equal(session.data.get(TOOL_SESSION_DEVICE_KEYS.plan), planBefore);
  assert.equal(session.data.get(TOOL_SESSION_DEVICE_KEYS.quoteCheck), quoteRaw);
  assert.equal(local.data.get('unrelated-report'), '{"ok":true}');
  assert.equal(local.data.get(TOOL_SESSION_DEVICE_KEYS.inventory), inventoryRaw);
  assert.equal(local.removed.length, 0);
  assert.equal(session.removed.length, 0);
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
