'use client';

import { useEffect, useState } from 'react';
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
import { browserDirectPorts, parentSync, resumeDirect, startDirect } from '@/lib/my-trusthub/direct-save';
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

  const signInToSync = () => {
    const savedAt = listLocalSavedMovers().find((row) => row.companySlug === companySlug)?.savedAt ?? new Date().toISOString();
    void startDirect(browserDirectPorts(), companySlug, 'save_signin', savedAt).then((result) => {
      if (result === 'unavailable') toast.message('My TrustHub is unavailable right now', { description: 'Your Save stays on this device.' });
    });
  };

  // Back from My TrustHub after a one-click Save or Unsave: report what the
  // parent acknowledged. The pending marker is consumed once, so a reload or a
  // later visit never repeats this.
  useEffect(() => {
    if (!direct) return;
    let active = true;
    void resumeDirect(browserDirectPorts(), companySlug).then((result) => {
      if (!active || !result) return;
      if (result.intent === 'unsave') {
        toast.success(`${companyName} removed from your saved movers`);
      } else if (result.outcome === 'synced') {
        toast.success(`${companyName} saved to My TrustHub`);
      } else if (result.outcome === 'device_only') {
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
        if (plan.kind === 'local_then_cloud') {
          const res = await saveMoverAction({ companySlug }).catch(() => null);
          if (!res?.ok) console.warn('[SaveMoverButton] cloud soft-fail', res);
        }
        if ((await startDirect(browserDirectPorts(), companySlug, 'save', row.savedAt)) === 'navigating') return;
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
      // Local already written above; still treat as soft success
      toast.success(`${companyName} saved on this device`, {
        description: 'Cloud sync failed — shortlist kept on this device.',
      });
    } finally {
      setBusy(null);
    }
  };

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
      if (plan.kind === 'local_then_cloud') {
        const res = await removeSavedMoverBySlugAction(companySlug);
        if (!res.ok) console.warn('[SaveMoverButton] cloud unsave soft-fail', res);
      }
      // The device removal above is already complete. The parent removes its
      // owner-scoped Saved row only under a verified My TrustHub session.
      if (reachParent && (await startDirect(browserDirectPorts(), companySlug, 'unsave', new Date().toISOString())) === 'navigating') return;
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
      toast.success(`${companyName} removed from this device`);
    } finally {
      setBusy(null);
    }
  };

  const label = saved ? 'Saved' : busy === 'save' ? 'Saving…' : 'Save mover';

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
    </span>
  );
}
