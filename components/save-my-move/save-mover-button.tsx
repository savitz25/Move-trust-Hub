'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { removeSavedMoverBySlugAction, saveMoverAction } from '@/actions/save-my-move';
import {
  addLocalSavedMover,
  isLocalMoverSaved,
  listLocalSavedMovers,
  removeLocalSavedMover,
} from '@/lib/save-my-move/local-shortlist';
import { directParentSync, planSave, planUnsave, saveControlDisabled, unsaveReachesParent, type SaveBusy } from '@/lib/save-my-move/save-control';
import { browserDirectPorts, parentSync, resumeDirect, startDirect, type DirectIntent } from '@/lib/my-trusthub/direct-save';
import { trackSaveMyMoveMover } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ONE_ACCOUNT_ENABLED, keepAllowedForSlug, useMyTrustHubHref } from '@/components/my-trusthub/my-trusthub-origin';

type SaveMoverButtonProps = {
  companySlug: string;
  companyName: string;
  variant?: 'icon' | 'button';
  className?: string;
};

/**
 * Save → Saved → Unsave. Device-first: the local shortlist is written or
 * cleared immediately and never waits for the auth provider. The legacy cloud
 * shortlist is an optional soft sync attempted only when auth has resolved to a
 * signed-in user. The control is disabled only while its own operation runs.
 * Saved is a live state, never a dead end.
 *
 * One click is the whole Save. On an admitted profile's own page the same click
 * also syncs My TrustHub (the one account): after the device write it stages
 * the secure Move → Ask continuation and the parent commits under the verified
 * session, with no second control and no confirmation step. Unsave mirrors it.
 * Parent sync is additive and never gates or delays the device change.
 *
 * The parent hand-off is a chain of browser navigations that a click elsewhere
 * on the page abandons part-way. While it runs the page shows a blocking
 * progress notice, and an Unsave the parent did not acknowledge is never
 * reported as an account Unsave: the control says it may still be saved in My
 * TrustHub and offers the removal again.
 */
export function SaveMoverButton({
  companySlug,
  companyName,
  variant = 'icon',
  className,
}: SaveMoverButtonProps) {
  const { user, loading, isMoverSaved, markMoverSaved, markMoverUnsaved, openSaveModal } = useSaveMyMove();
  const [busy, setBusy] = useState<SaveBusy>(null);
  const [localSaved, setLocalSaved] = useState(() =>
    typeof window !== 'undefined' ? isLocalMoverSaved(companySlug) : false
  );
  const mySavedHref = useMyTrustHubHref('/my/saved');
  const saved = isMoverSaved(companySlug) || localSaved;
  const auth = { loading, user: Boolean(user) };
  const pathname = usePathname();
  const direct = directParentSync({ keepAllowed: keepAllowedForSlug(companySlug), pathname, slug: companySlug });
  const keepGuidance = ONE_ACCOUNT_ENABLED || keepAllowedForSlug(companySlug);
  const disabled = saveControlDisabled(busy);
  // Parent hand-off in flight (blocking notice) and whether this device still
  // believes the profile is in My TrustHub.
  const [syncing, setSyncing] = useState<'save' | 'unsave' | null>(null);
  const [parentHeld, setParentHeld] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    if (!syncing) return;
    // The notice ends with the page. If the navigation never happens, or the
    // page is restored from the back/forward cache, release it.
    const release = () => setSyncing(null);
    const timer = window.setTimeout(release, 30_000);
    window.addEventListener('pageshow', release);
    return () => { window.clearTimeout(timer); window.removeEventListener('pageshow', release); };
  }, [syncing]);

  /** Stage and hand the browser to My TrustHub. Nothing navigates once the
   * user has left this profile. */
  const handOff = async (intent: DirectIntent, savedAt: string) => {
    setSyncing(intent === 'unsave' ? 'unsave' : 'save');
    const result = await startDirect(browserDirectPorts(), companySlug, intent, savedAt, () => mounted.current);
    if (result !== 'navigating') setSyncing(null);
    return result;
  };

  const signInToSync = () => {
    const savedAt = listLocalSavedMovers().find((row) => row.companySlug === companySlug)?.savedAt ?? new Date().toISOString();
    void handOff('save_signin', savedAt).then((result) => {
      if (result === 'unavailable') toast.message('My TrustHub is unavailable right now', { description: 'Your Save stays on this device.' });
    });
  };

  const retryParentUnsave = () => {
    void handOff('unsave', new Date().toISOString()).then((result) => {
      if (result === 'unavailable') toast.error('My TrustHub could not be reached', { description: 'It may still be saved there. Try again in a moment.' });
    });
  };
  const notConfirmedUnsave = (description: string) => {
    setParentHeld(true);
    toast.warning(`${companyName} removed from this device`, {
      description,
      duration: 15_000,
      action: { label: 'Try again', onClick: retryParentUnsave },
    });
  };

  // Back from My TrustHub after a one-click Save or Unsave: report what the
  // parent acknowledged. The pending marker is consumed once, so a reload or a
  // later visit never repeats this.
  useEffect(() => {
    if (!direct) return;
    let active = true;
    void resumeDirect(browserDirectPorts(), companySlug).then((result) => {
      if (!active) return;
      setParentHeld(parentSync(localStorage, companySlug) !== null);
      if (!result) return;
      if (result.intent === 'unsave') {
        // Only the parent's own acknowledgement counts as an account Unsave.
        if (result.outcome === 'confirmed') toast.success(`${companyName} removed from this device and My TrustHub`);
        else notConfirmedUnsave('My TrustHub did not confirm the removal, so it may still be saved there.');
      } else if (result.outcome === 'confirmed') {
        toast.success(`${companyName} saved to My TrustHub`);
      } else if (result.outcome === 'not_confirmed') {
        toast.success('Saved on this device', {
          description: 'Sign in to My TrustHub to sync across devices.',
          action: { label: 'Sign in', onClick: signInToSync },
        });
      } else {
        toast.success(`${companyName} saved on this device`);
      }
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direct, companySlug]);

  const handleSave = async () => {
    const plan = planSave({ saved, busy, auth });
    if (plan.kind === 'skip') return;
    setBusy('save');
    try {
      // Always persist on device first — never leave the user with only a red toast
      const row = addLocalSavedMover({ companySlug, companyName });
      setLocalSaved(true);
      markMoverSaved(companySlug);
      trackSaveMyMoveMover({ company_slug: companySlug });

      if (direct) {
        // The device Save above is already complete. My TrustHub sync is additive.
        setSyncing('save');
        if (plan.kind === 'local_then_cloud') {
          const res = await saveMoverAction({ companySlug }).catch(() => null);
          if (!res?.ok) console.warn('[SaveMoverButton] cloud soft-fail', res);
        }
        if ((await handOff('save', row.savedAt)) === 'navigating') return;
        toast.success(`${companyName} saved on this device`, {
          description: 'My TrustHub sync is unavailable right now.',
        });
        return;
      }

      if (plan.kind === 'local_only') {
        // Auth is still initializing: device success only, no cloud attempt.
        toast.success(`${companyName} saved on this device`);
        return;
      }

      if (plan.kind === 'local_guest') {
        if (keepGuidance) {
          toast.success(`${companyName} saved on this device`);
          return;
        }
        toast.success(`${companyName} saved on this device`, {
          description: 'Sign in anytime to sync your shortlist across devices.',
          action: {
            label: 'Sign in',
            onClick: () => openSaveModal({ context: 'mover', redirectPath: `/companies/${companySlug}` }),
          },
        });
        return;
      }

      const res = await saveMoverAction({ companySlug });
      if (res.ok && res.cloud) {
        toast.success(`${companyName} saved to your shortlist`);
        return;
      }

      console.warn('[SaveMoverButton] cloud soft-fail', res);
      toast.success(`${companyName} saved on this device`, {
        description:
          res.ok === false
            ? 'Cloud sync unavailable — local shortlist kept.'
            : 'Local shortlist updated.',
      });
    } catch (err) {
      console.error('[SaveMoverButton]', err);
      setSyncing(null);
      // Local already written above; still treat as soft success
      toast.success(`${companyName} saved on this device`, {
        description: 'Cloud sync failed — shortlist kept on this device.',
      });
    } finally {
      setBusy(null);
    }
  };
  // (The blocking notice outlives `busy` on purpose: it stays until the page unloads.)

  const handleUnsave = async () => {
    const plan = planUnsave({ saved, busy, auth });
    if (plan.kind === 'skip') return;
    setBusy('unsave');
    try {
      const reachParent = unsaveReachesParent({ direct, parentSync: direct ? parentSync(localStorage, companySlug) : null });
      // Device row and Keep ticket are cleared immediately, regardless of auth state.
      removeLocalSavedMover(companySlug);
      setLocalSaved(false);
      markMoverUnsaved(companySlug);
      try {
        sessionStorage.removeItem(`mth-profile-transfer:${companySlug}`);
      } catch {
        // storage unavailable — nothing to clear
      }
      if (reachParent) setSyncing('unsave');
      if (plan.kind === 'local_then_cloud') {
        const res = await removeSavedMoverBySlugAction(companySlug);
        if (!res.ok) console.warn('[SaveMoverButton] cloud unsave soft-fail', res);
      }
      // The device removal above is already complete. The parent removes its
      // owner-scoped Saved row only under a verified My TrustHub session, and
      // only its acknowledgement (read on return) counts as an account Unsave.
      if (reachParent) {
        setParentHeld(true);
        if ((await handOff('unsave', new Date().toISOString())) === 'navigating') return;
        notConfirmedUnsave('My TrustHub could not be reached, so it may still be saved there.');
        return;
      }
      toast.success(`${companyName} removed from this device`, keepGuidance
        ? {
            description: 'Saved it to My TrustHub? Manage it there under Saved.',
            action: {
              label: 'Open My TrustHub',
              onClick: () => window.open(mySavedHref, '_blank', 'noopener'),
            },
          }
        : undefined);
    } catch (err) {
      console.error('[SaveMoverButton] unsave', err);
      setSyncing(null);
      toast.success(`${companyName} removed from this device`);
    } finally {
      setBusy(null);
    }
  };

  const label = saved ? 'Saved' : busy === 'save' ? 'Saving…' : 'Save mover';
  const progress = syncing && typeof document !== 'undefined'
    ? createPortal(
        <div role="status" aria-live="assertive" data-mth-sync={syncing} className="fixed inset-0 z-[200] flex items-center justify-center bg-background/70 p-4">
          <div className="max-w-xs rounded-lg border border-border bg-background px-5 py-4 text-center text-sm font-semibold text-foreground shadow-lg">
            {syncing === 'unsave' ? 'Removing from My TrustHub…' : 'Saving to My TrustHub…'}
            <span className="mt-1 block text-xs font-normal text-muted-foreground">Keep this page open. This takes a few seconds.</span>
          </div>
        </div>,
        document.body
      )
    : null;
  // Device copy is gone but the account removal was never acknowledged.
  const parentNotice = direct && !saved && parentHeld && !busy && !syncing ? (
    <span className="text-xs text-muted-foreground" data-mth-parent-held="true">
      May still be saved in My TrustHub.{' '}
      <button type="button" onClick={retryParentUnsave} className="font-medium underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
        Remove it there
      </button>
    </span>
  ) : null;

  if (variant === 'button') {
    return (
      <span className="inline-flex min-w-0 flex-col items-start gap-1.5" data-save-state={saved ? 'saved' : 'unsaved'} data-save-auth={loading ? 'pending' : 'resolved'}>
        <span className="inline-flex min-w-0 flex-wrap items-center gap-1.5">
          <Button
            variant={saved ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => void (saved ? handleUnsave() : handleSave())}
            disabled={disabled}
            className={className}
            aria-pressed={saved}
            aria-label={saved ? `${companyName} saved — select to unsave` : `Save ${companyName}`}
            title={saved ? 'Saved on this device — select to unsave' : 'Save to your shortlist'}
          >
            <Heart className={cn('mr-1 h-3.5 w-3.5', saved && 'fill-current text-primary')} aria-hidden="true" />
            {busy === 'unsave' ? 'Removing…' : label}
          </Button>
          {saved ? (
            <button
              type="button"
              onClick={() => void handleUnsave()}
              disabled={disabled}
              className="min-h-11 rounded-md px-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60"
              aria-label={`Unsave ${companyName}`}
            >
              Unsave
            </button>
          ) : null}
        </span>
        {parentNotice}
        {progress}
      </span>
    );
  }

  return (
    <span className="inline-flex min-w-0 flex-col items-start gap-1" data-save-state={saved ? 'saved' : 'unsaved'} data-save-auth={loading ? 'pending' : 'resolved'}>
      <button
        type="button"
        onClick={() => void (saved ? handleUnsave() : handleSave())}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full p-1.5 transition-colors',
          saved
            ? 'text-primary bg-primary/10 hover:bg-primary/15'
            : 'text-muted-foreground hover:text-primary hover:bg-primary/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          className
        )}
        aria-label={saved ? `Unsave ${companyName}` : `Save ${companyName} to your shortlist`}
        aria-pressed={saved}
        title={saved ? 'Saved — select to unsave' : 'Save to your shortlist'}
      >
        <Heart className={cn('h-4 w-4', saved && 'fill-current')} aria-hidden="true" />
      </button>
      {parentNotice}
      {progress}
    </span>
  );
}
