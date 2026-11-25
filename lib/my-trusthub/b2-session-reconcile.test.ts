import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AddToMyTrustHubButton } from '@/components/my-trusthub/add-to-my-trusthub';
import { AddToMyTrustHubSlot } from '@/components/my-trusthub/add-to-my-trusthub-slot';
import {
  APPROVED_SCHEMA_KEY,
  DEVICE_CONTRACTS,
  MOVE_INVENTORY_RESUME_HREF,
  addToMyTrustHubActive,
  buildContractSaveRequest,
  createMockAsk,
  importSelectedDeviceCopies,
  inventoryContractPayload,
  validateInventoryResume,
  type ContractSaveRequest,
  type MemoryStore,
} from '@/lib/my-trusthub/b2-session-reconcile';
import { PARENT_SAVE_CANARY_SLUGS, isParentSaveCanarySlug } from '@/lib/save-my-move/parent-save-canary';
import { TOOL_SESSION_DEVICE_KEYS } from '@/lib/my-trusthub/tool-session-schemas';

const qa = { flag: '1', projectId: 'prj_local_m4', projectName: 'move-m4-local' };
const inventoryRaw = JSON.stringify({
  state: {
    inventory: [
      { id: 'box-1', name: 'Book box', volume: 1.5, quantity: 40, room: 'Living Room' },
      { id: 'sofa', name: 'Sofa', volume: 60, quantity: 1, room: 'Bedroom' },
    ],
  },
  version: 2,
});

function memoryStore(seed: Record<string, string> = {}): MemoryStore & { removed: string[] } {
  const data = new Map(Object.entries(seed));
  const removed: string[] = [];
  return {
    removed,
    getItem: (key) => (data.has(key) ? data.get(key)! : null),
    setItem: (key, value) => {
      data.set(key, value);
    },
    removeItem: (key) => {
      removed.push(key);
      data.delete(key);
    },
  };
}

test('the control stays off for production and for any flag other than exact 1', () => {
  assert.equal(addToMyTrustHubActive(), false);
  assert.equal(addToMyTrustHubActive({ ...qa, flag: '1 ' }), false);
  assert.equal(addToMyTrustHubActive({ flag: '1', projectId: 'prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0', projectName: 'move-m4-local' }), false);
  assert.equal(addToMyTrustHubActive({ flag: '1', projectId: 'prj_local_m4', projectName: 'move-trust-hub' }), false);
  assert.equal(addToMyTrustHubActive(qa), true);
  assert.equal(renderToStaticMarkup(React.createElement(AddToMyTrustHubSlot, { deviceKey: TOOL_SESSION_DEVICE_KEYS.inventory })), '');
});

test('approved inventory saves through the mock and a second save replays', async () => {
  const store = memoryStore({ [TOOL_SESSION_DEVICE_KEYS.inventory]: inventoryRaw });
  const built = await buildContractSaveRequest(TOOL_SESSION_DEVICE_KEYS.inventory, inventoryRaw, qa);
  assert.equal(built.outcome, 'ready');
  if (built.outcome !== 'ready') return;
  assert.equal(built.request.schemaKey, APPROVED_SCHEMA_KEY);
  assert.equal(built.request.localCopy, 'keep');
  assert.deepEqual(built.request.payload, { room_counts: { total: 2 }, estimated_cubic_feet: 120 });
  assert.equal(built.request.summary.primary_value, 120);
  assert.equal(built.request.summary.unit, 'estimated cubic feet');
  assert.equal(built.request.summary.label, '2 rooms');
  assert.match(
    built.request.idempotencyKey,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  const serialized = JSON.stringify(built.request);
  assert.equal(serialized.includes('Book box'), false);
  assert.equal(serialized.includes('Sofa'), false);
  assert.equal(serialized.includes('move.tool.'), false);
  assert.equal(serialized.includes('deviceKey'), false);
  assert.equal(inventoryContractPayload({ deviceKey: 'move-calculator-inventory', body: {} }), false);
  const ask = createMockAsk();
  const first = await ask.save(built.request);
  const second = await ask.save(built.request);
  assert.equal(first.outcome, 'saved');
  assert.equal(second.outcome, 'replayed');
  assert.equal(second.sessionRef, first.sessionRef);
  const resume = await ask.resume(first.sessionRef ?? '');
  assert.equal(resume.outcome, 'valid');
  if (resume.outcome === 'valid') {
    assert.equal(resume.href, MOVE_INVENTORY_RESUME_HREF);
    assert.equal(resume.href.includes(first.sessionRef ?? 'missing'), false);
    assert.equal(resume.crossHub, 'unavailable');
  }
  assert.equal((await ask.resume('not-a-ref')).reason, 'resume_ref');
  assert.equal(
    validateInventoryResume({
      resumeRef: first.sessionRef ?? '',
      schemaKey: APPROVED_SCHEMA_KEY,
      schemaVersion: 1,
      payload: { ...built.request.payload, name: 'Book box' },
    }).reason,
    'payload'
  );
  const changed: ContractSaveRequest = {
    ...built.request,
    payload: { room_counts: { total: 2 }, estimated_cubic_feet: 400 },
  };
  const conflict = await ask.save(changed);
  assert.equal(conflict.outcome, 'conflict');
  assert.deepEqual(store.removed, []);
  assert.equal(store.getItem(TOOL_SESSION_DEVICE_KEYS.inventory), inventoryRaw);
});

test('an inventory below the registered bounds stays on the device', async () => {
  const tiny = JSON.stringify({
    state: { inventory: [{ id: 'cup', name: 'Cup', volume: 1, quantity: 1, room: 'Kitchen' }] },
    version: 2,
  });
  const refused = await buildContractSaveRequest(TOOL_SESSION_DEVICE_KEYS.inventory, tiny, qa);
  assert.equal(refused.outcome, 'refused');
  if (refused.outcome === 'refused') assert.equal(refused.reason, 'payload_out_of_contract');
  assert.equal(refused.localCopy, 'keep');
});

test('proposed schemas are withheld and an empty import selection writes nothing', async () => {
  const plan = await buildContractSaveRequest(TOOL_SESSION_DEVICE_KEYS.plan, '{"step":"inventory"}', qa);
  assert.equal(plan.outcome, 'refused');
  if (plan.outcome === 'refused') assert.equal(plan.reason, 'schema_not_approved');
  const proposed = DEVICE_CONTRACTS.filter((row) => row.contractStatus === 'proposed').map((row) => row.schemaKey);
  assert.deepEqual(proposed, ['move.plan/v1', 'move.worksheet/v1', 'move.comparison/v1', 'move.comparison/v2']);
  const store = memoryStore({ [TOOL_SESSION_DEVICE_KEYS.plan]: 'kept' });
  const empty = importSelectedDeviceCopies(store, [{ deviceKey: TOOL_SESSION_DEVICE_KEYS.plan, raw: 'new' }], []);
  assert.equal(empty.outcome, 'refused');
  assert.equal(store.getItem(TOOL_SESSION_DEVICE_KEYS.plan), 'kept');
  const selected = importSelectedDeviceCopies(
    store,
    [
      { deviceKey: TOOL_SESSION_DEVICE_KEYS.plan, raw: 'chosen' },
      { deviceKey: TOOL_SESSION_DEVICE_KEYS.planLibrary, raw: 'other' },
    ],
    [TOOL_SESSION_DEVICE_KEYS.plan]
  );
  assert.deepEqual(selected.written, [TOOL_SESSION_DEVICE_KEYS.plan]);
  assert.equal(store.getItem(TOOL_SESSION_DEVICE_KEYS.plan), 'chosen');
  assert.equal(store.getItem(TOOL_SESSION_DEVICE_KEYS.planLibrary), null);
  assert.deepEqual(store.removed, []);
});

test('the button offers Add to My TrustHub only when the flag is on', () => {
  const store = memoryStore();
  const off = renderToStaticMarkup(
    React.createElement(AddToMyTrustHubButton, { deviceKey: TOOL_SESSION_DEVICE_KEYS.inventory, env: { flag: undefined }, store })
  );
  const on = renderToStaticMarkup(
    React.createElement(AddToMyTrustHubButton, { deviceKey: TOOL_SESSION_DEVICE_KEYS.inventory, env: qa, store })
  );
  assert.equal(off, '');
  assert.match(on, /Add to My TrustHub/);
});

test('a non-canary mover is not added to the production canary list', () => {
  assert.equal(isParentSaveCanarySlug('local-non-canary-mover'), false);
  assert.equal(PARENT_SAVE_CANARY_SLUGS.includes('local-non-canary-mover' as never), false);
  assert.equal(PARENT_SAVE_CANARY_SLUGS.length, 3);
});

test('consumer pages mount the slot and the module does not fetch or clear storage', () => {
  const root = join(__dirname, '..', '..');
  const pages = [
    'app/(move)/moving-calculator/page.tsx',
    'app/(move)/compare/page.tsx',
    'app/(move)/my-move/plans/[planId]/page.tsx',
    'app/(move)/tools/move-quote-check/compare/page.tsx',
  ];
  for (const page of pages) {
    assert.equal(readFileSync(join(root, page), 'utf8').includes('AddToMyTrustHubSlot'), true, page);
  }
  const source = readFileSync(join(__dirname, 'b2-session-reconcile.ts'), 'utf8');
  assert.equal(source.includes('fetch('), false);
  assert.equal(source.includes('removeItem('), false);
});
