'use client';

import React, { useState } from 'react';
import {
  addToMyTrustHubActive,
  buildContractSaveRequest,
  createMockAsk,
  type ContractEnv,
  type MemoryStore,
} from '@/lib/my-trusthub/b2-session-reconcile';

/**
 * Add to My TrustHub. The slot renders this only when the flag is on.
 * The click reads one device key and does not remove it.
 */
function browserStore(): MemoryStore {
  return {
    getItem(key) {
      return window.localStorage.getItem(key);
    },
    setItem(key, value) {
      window.localStorage.setItem(key, value);
    },
  };
}

export function AddToMyTrustHubButton({
  deviceKey,
  env,
  store,
  ask = createMockAsk(),
}: {
  deviceKey: string;
  env: ContractEnv;
  store?: MemoryStore;
  ask?: ReturnType<typeof createMockAsk>;
}) {
  const [note, setNote] = useState('');
  if (!addToMyTrustHubActive(env)) return null;
  const source = store ?? browserStore();

  async function onAdd() {
    const raw = source.getItem(deviceKey);
    const built = await buildContractSaveRequest(deviceKey, raw, env);
    if (built.outcome === 'refused') {
      setNote(
        built.reason === 'schema_not_approved'
          ? 'Saved on this device. This schema is still a proposal and was not sent.'
          : 'Saved on this device. Nothing was sent.'
      );
      return;
    }
    const receipt = await ask.save(built.request);
    setNote(
      receipt.outcome === 'saved' || receipt.outcome === 'replayed'
        ? 'Added for My TrustHub. The copy on this device was kept.'
        : 'Saved on this device. Nothing was sent.'
    );
  }

  return (
    <div data-add-to-my-trusthub={deviceKey}>
      <button type="button" onClick={() => void onAdd()}>
        Add to My TrustHub
      </button>
      {note ? <p role="status">{note}</p> : null}
    </div>
  );
}
