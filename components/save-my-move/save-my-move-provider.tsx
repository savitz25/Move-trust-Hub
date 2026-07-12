'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { SaveMyMoveModal } from '@/components/save-my-move/save-my-move-modal';
import { LocalMergeDialog } from '@/components/save-my-move/local-merge-dialog';
import {
  hasLocalDataToMerge,
  isMergeDismissedForSession,
} from '@/lib/save-my-move/local-merge';
import { consumePendingSaveAction } from '@/lib/save-my-move/pending-action';
import type { SaveMyMoveContext } from '@/lib/save-my-move/types';
import { getCurrentPathForRedirect, sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { usePostLoginRedirect } from '@/hooks/use-post-login-redirect';
import {
  saveComparisonAction,
  saveInventoryAction,
  saveMoverAction,
} from '@/actions/save-my-move';
import {
  trackSaveMyMoveComparison,
  trackSaveMyMoveInventory,
  trackSaveMyMoveMover,
} from '@/components/ga-events';
import { toast } from 'sonner';

type SaveMyMoveContextValue = {
  user: User | null;
  loading: boolean;
  openSaveModal: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => void;
  requireAuth: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => boolean;
};

const Ctx = createContext<SaveMyMoveContextValue | null>(null);

export function useSaveMyMove() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSaveMyMove must be used within SaveMyMoveProvider');
  return ctx;
}

async function executePendingSaveAction() {
  const pending = consumePendingSaveAction();
  if (!pending) return;

  try {
    switch (pending.type) {
      case 'inventory': {
        await saveInventoryAction(pending.payload);
        const itemCount = pending.payload.inventory.reduce((s, i) => s + i.quantity, 0);
        trackSaveMyMoveInventory({ item_count: itemCount });
        toast.success('Inventory saved', {
          description: 'View it anytime in My Move.',
          action: {
            label: 'Open',
            onClick: () => {
              window.location.href = '/my-move';
            },
          },
        });
        break;
      }
      case 'mover': {
        await saveMoverAction({ companySlug: pending.payload.companySlug });
        trackSaveMyMoveMover({ company_slug: pending.payload.companySlug });
        toast.success(`${pending.payload.companyName} saved to your shortlist`);
        break;
      }
      case 'comparison': {
        await saveComparisonAction({ companySlugs: pending.payload.companySlugs });
        trackSaveMyMoveComparison({ mover_count: pending.payload.companySlugs.length });
        toast.success('Comparison saved to My Move');
        break;
      }
    }
  } catch {
    toast.error('Could not complete your save — try again from the page');
  }
}

export function SaveMyMoveProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/my-move');
  const [modalContext, setModalContext] = useState<SaveMyMoveContext>('dashboard');
  const [showMerge, setShowMerge] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        void executePendingSaveAction();
        if (hasLocalDataToMerge() && !isMergeDismissedForSession()) {
          setShowMerge(true);
        }
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  usePostLoginRedirect(user);

  const openSaveModal = useCallback(
    (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => {
      const path = sanitizePostLoginPath(
        opts?.redirectPath ?? getCurrentPathForRedirect()
      );
      setRedirectPath(path);
      setModalContext(opts?.context ?? 'dashboard');
      setModalOpen(true);
    },
    []
  );

  const requireAuth = useCallback(
    (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => {
      if (user) return true;
      openSaveModal(opts);
      return false;
    },
    [user, openSaveModal]
  );

  const value = useMemo(
    () => ({ user, loading, openSaveModal, requireAuth }),
    [user, loading, openSaveModal, requireAuth]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <SaveMyMoveModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        redirectPath={redirectPath}
        context={modalContext}
      />
      {user && (
        <LocalMergeDialog open={showMerge} onOpenChange={setShowMerge} />
      )}
    </Ctx.Provider>
  );
}