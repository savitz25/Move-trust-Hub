'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { saveMoverAction } from '@/actions/save-my-move';
import { addLocalSavedMover } from './local-shortlist';
import { saveMoverIntent, type MoverSaveInput } from './save-mover-intent';
import { legacyClientDisabled } from '@/lib/my-trusthub/preview-isolation';

/** Loaded by an explicit Save, independently of the deferred dashboard provider. */
export async function saveMoverOnDemand(
  input: MoverSaveInput, signal: AbortSignal, expectedUserId?: string | null,
  onLocalSaved?: () => void,
) {
  return saveMoverIntent(input, signal, {
    resolveUser: async () => {
      if (legacyClientDisabled()) return null;
      const client = createBrowserSupabaseClient();
      if (!client) return null; // Existing unconfigured/local guest mode.
      let observedUserId: string | null | undefined = expectedUserId;
      let changed = false;
      const { data: subscription } = client.auth.onAuthStateChange((_event, session) => {
        const id = session?.user.id ?? null;
        if (observedUserId !== undefined && observedUserId !== id) changed = true;
        observedUserId = id;
      });
      const unsubscribe = () => subscription.subscription.unsubscribe();
      signal.addEventListener('abort', unsubscribe, { once: true });
      try {
        const { data, error } = await client.auth.getUser();
        if (error && error.name !== 'AuthSessionMissingError') {
          throw new Error('Could not check your session. Please try Save again.');
        }
        if (changed || (observedUserId !== undefined && observedUserId !== (data.user?.id ?? null))) {
          throw new Error('Your session changed. Please try Save again.');
        }
        return data.user;
      } finally {
        signal.removeEventListener('abort', unsubscribe);
        unsubscribe();
      }
    },
    persistLocal: addLocalSavedMover,
    saveCloud: saveMoverAction,
    onLocalSaved,
  });
}
