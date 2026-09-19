'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from './save-my-move-context';
import { isLocalMoverSaved } from '@/lib/save-my-move/local-shortlist';
import { trackSaveMyMoveMover } from '@/components/ga-events';
import { cn } from '@/lib/utils';

type SaveMoverButtonProps = {
  companySlug: string;
  companyName: string;
  variant?: 'icon' | 'button';
  className?: string;
};

export function SaveMoverButton(props: SaveMoverButtonProps) {
  // A new identity gets a fresh operation and state, even when React reuses the slot.
  const pathname = usePathname();
  return <ProfileSave key={`${pathname}:${props.companySlug}`} {...props} />;
}

function ProfileSave({ companySlug, companyName, variant = 'icon', className }: SaveMoverButtonProps) {
  const { user, loading, isMoverAccountSaved, markMoverSaved } = useSaveMyMove();
  const operation = useRef<AbortController | null>(null);
  const completed = useRef(false);
  const [saving, setSaving] = useState(false);
  const [localSaved, setLocalSaved] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);
  const statusId = useId();
  // Local storage and the provider's merged shortlist are not account receipts.
  const accountSaved = isMoverAccountSaved(companySlug) || Boolean(confirmedUserId && (loading || user?.id === confirmedUserId));
  const saved = accountSaved || localSaved;
  const statusMessage = !saving && accountSaved
    ? `${companyName} saved to your Move account shortlist.`
    : message || (localSaved ? `${companyName} saved on this device. My TrustHub account sync has not been confirmed.` : '');

  useEffect(() => {
    setLocalSaved(isLocalMoverSaved(companySlug));
    return () => { operation.current?.abort(); };
  }, [companySlug]);

  const handleSave = async () => {
    // The ref closes the gap before React commits the disabled/pending state.
    if (operation.current || completed.current || saved) return;
    const controller = new AbortController();
    operation.current = controller;
    setSaving(true);
    setFailed(false);
    setMessage(`Saving ${companyName}…`);
    const timeout = window.setTimeout(() => {
      if (operation.current !== controller) return;
      controller.abort();
      operation.current = null;
      setSaving(false);
      setFailed(!completed.current);
      setMessage(completed.current
        ? `${companyName} saved on this device. Account sync could not be confirmed.`
        : 'Save took too long. Please try again.');
    }, 15_000);
    controller.signal.addEventListener('abort', () => window.clearTimeout(timeout), { once: true });

    try {
      const { saveMoverOnDemand } = await import('@/lib/save-my-move/save-mover-runtime');
      controller.signal.throwIfAborted();
      const result = await saveMoverOnDemand(
        { companySlug, companyName }, controller.signal,
        loading ? undefined : user?.id ?? null,
        () => {
          completed.current = true;
          setLocalSaved(true);
          markMoverSaved(companySlug);
          setMessage(`${companyName} saved on this device. Finishing Save…`);
        },
      );
      if (controller.signal.aborted) return;
      if (result.destination === 'account') setConfirmedUserId(result.confirmedUserId);
      setMessage(result.destination === 'account'
        ? ''
        : `${companyName} saved on this device.${result.cloudFailed ? ' Account sync unavailable.' : ''}`);
      trackSaveMyMoveMover({ company_slug: companySlug });
    } catch {
      if (controller.signal.aborted) return;
      setFailed(true);
      setMessage('Could not save. Check your connection and browser storage, then try again or reload this page.');
    } finally {
      window.clearTimeout(timeout);
      if (operation.current === controller) {
        operation.current = null;
        setSaving(false);
      }
    }
  };

  const accessibility = {
    'aria-pressed': saved,
    'aria-busy': saving,
    'aria-describedby': statusId,
  };
  return <span className="inline-flex min-w-0 flex-col items-start gap-1">
    {variant === 'button' ? <Button
      type="button"
      variant={saved ? 'secondary' : 'outline'} size="sm"
      onClick={() => void handleSave()} disabled={saving || saved}
      className={className} {...accessibility}
    >
      <Heart aria-hidden="true" className={cn('h-3.5 w-3.5 mr-1', saved && 'fill-current text-primary')} />
      {saving ? 'Saving…' : saved ? 'Saved' : failed ? 'Try Save again' : 'Save mover'}
    </Button> : <button
      type="button" onClick={() => void handleSave()} disabled={saving || saved}
      className={cn('inline-flex items-center justify-center rounded-full p-1.5 transition-colors',
        saved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40', className)}
      aria-label={saved ? statusMessage : saving ? `Saving ${companyName}` : `Save ${companyName} to your shortlist`}
      {...accessibility}
    >
      <Heart aria-hidden="true" className={cn('h-4 w-4', saved && 'fill-current')} />
    </button>}
    <span id={statusId} role="status" aria-live="polite" aria-atomic="true"
      className={cn('max-w-64 text-xs break-words', failed ? 'text-destructive' : 'text-muted-foreground')}>
      {statusMessage}
    </span>
  </span>;
}
