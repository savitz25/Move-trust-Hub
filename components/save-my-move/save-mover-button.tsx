'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { saveMoverAction } from '@/actions/save-my-move';
import {
  addLocalSavedMover,
  isLocalMoverSaved,
} from '@/lib/save-my-move/local-shortlist';
import { trackSaveMyMoveMover } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SaveMoverButtonProps = {
  companySlug: string;
  companyName: string;
  variant?: 'icon' | 'button';
  className?: string;
};

export function SaveMoverButton({
  companySlug,
  companyName,
  variant = 'icon',
  className,
}: SaveMoverButtonProps) {
  const { user, loading, isMoverSaved, markMoverSaved, openSaveModal } = useSaveMyMove();
  const [saving, setSaving] = useState(false);
  const [localSaved, setLocalSaved] = useState(() =>
    typeof window !== 'undefined' ? isLocalMoverSaved(companySlug) : false
  );
  const saved = isMoverSaved(companySlug) || localSaved;

  const handleSave = async () => {
    if (loading || saved) return;
    setSaving(true);
    try {
      // Always persist on device first — never leave the user with only a red toast
      addLocalSavedMover({ companySlug, companyName });
      setLocalSaved(true);
      markMoverSaved(companySlug);
      trackSaveMyMoveMover({ company_slug: companySlug });

      if (!user) {
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
      setSaving(false);
    }
  };

  if (variant === 'button') {
    return (
      <Button
        variant={saved ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => void handleSave()}
        disabled={saving || saved || loading}
        className={className}
        aria-pressed={saved}
      >
        <Heart className={cn('h-3.5 w-3.5 mr-1', saved && 'fill-current text-primary')} />
        {saved ? 'Saved' : saving ? 'Saving…' : 'Save mover'}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void handleSave()}
      disabled={saving || saved || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1.5 transition-colors',
        saved
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-primary hover:bg-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
      aria-label={
        saved ? `${companyName} saved to your shortlist` : `Save ${companyName} to your shortlist`
      }
      aria-pressed={saved}
      title={saved ? 'Saved to My Move' : 'Save to My Move'}
    >
      <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
    </button>
  );
}
