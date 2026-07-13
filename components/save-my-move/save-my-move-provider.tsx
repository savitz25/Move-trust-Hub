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
  getSavedMoverSlugsAction,
  saveComparisonAction,
  saveInventoryAction,
  saveMoverAction,
} from '@/actions/save-my-move';
import {
  trackSaveMyMoveComparison,
  trackSaveMyMoveInventory,
  trackSaveMyMoveMover,
} from '@/components/ga-events';
import { emailMoverDetailsClient } from '@/lib/save-my-move/email-mover-client';
import { toast } from 'sonner';

type SaveMyMoveContextValue = {
  user: User | null;
  loading: boolean;
  savedMoverSlugs: ReadonlySet<string>;
  isMoverSaved: (companySlug: string) => boolean;
  markMoverSaved: (companySlug: string) => void;
  openSaveModal: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => void;
  requireAuth: (opts?: { redirectPath?: string; context?: SaveMyMoveContext }) => boolean;
};

const Ctx = createContext<SaveMyMoveContextValue | null>(null);

export function useSaveMyMove() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSaveMyMove must be used within SaveMyMoveProvider');
  return ctx;
}

/** Safe for navbar chrome while DeferredSaveMyMove hydrates — returns null outside provider. */
export function useSaveMyMoveOptional() {
  return useContext(Ctx);
}

export function SaveMyMoveProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedMoverSlugs, setSavedMoverSlugs] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/my-move');
  const [modalContext, setModalContext] = useState<SaveMyMoveContext>('dashboard');
  const [showMerge, setShowMerge] = useState(false);

  const markMoverSaved = useCallback((companySlug: string) => {
    setSavedMoverSlugs((prev) => new Set(prev).add(companySlug));
  }, []);

  const isMoverSaved = useCallback(
    (companySlug: string) => savedMoverSlugs.has(companySlug),
    [savedMoverSlugs]
  );

  const executePendingSaveAction = useCallback(async () => {
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
          markMoverSaved(pending.payload.companySlug);
          trackSaveMyMoveMover({ company_slug: pending.payload.companySlug });
          if (pending.payload.sendEmail) {
            const emailResult = await emailMoverDetailsClient(pending.payload.companySlug);
            if (emailResult.success) {
              toast.success(`We emailed you details about ${pending.payload.companyName}`);
            } else {
              toast.success(`${pending.payload.companyName} saved to your shortlist`);
              toast.error(emailResult.error ?? 'Could not send email');
            }
          } else {
            toast.success(`${pending.payload.companyName} saved to your shortlist`);
          }
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
  }, [markMoverSaved]);

  useEffect(() => {
    if (!user) {
      setSavedMoverSlugs(new Set());
      return;
    }

    let cancelled = false;
    getSavedMoverSlugsAction()
      .then((slugs) => {
        if (!cancelled) setSavedMoverSlugs(new Set(slugs));
      })
      .catch(() => {
        if (!cancelled) setSavedMoverSlugs(new Set());
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

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
  }, [executePendingSaveAction]);

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
      if (loading) return false;
      if (user) return true;
      openSaveModal(opts);
      return false;
    },
    [loading, user, openSaveModal]
  );

  // Resume a stashed save if auth resolved after the user clicked save during loading.
  useEffect(() => {
    if (!loading && user) {
      void executePendingSaveAction();
    }
  }, [loading, user, executePendingSaveAction]);

  const value = useMemo(
    () => ({
      user,
      loading,
      savedMoverSlugs,
      isMoverSaved,
      markMoverSaved,
      openSaveModal,
      requireAuth,
    }),
    [user, loading, savedMoverSlugs, isMoverSaved, markMoverSaved, openSaveModal, requireAuth]
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