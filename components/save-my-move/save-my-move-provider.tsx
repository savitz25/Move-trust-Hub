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
import type { SaveMyMoveContext } from '@/lib/save-my-move/types';

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

export function SaveMyMoveProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/my-move');
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

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser && hasLocalDataToMerge() && !isMergeDismissedForSession()) {
        setShowMerge(true);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const openSaveModal = useCallback(
    (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => {
      setRedirectPath(opts?.redirectPath ?? window.location.pathname);
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
      />
      {user && (
        <LocalMergeDialog open={showMerge} onOpenChange={setShowMerge} />
      )}
    </Ctx.Provider>
  );
}