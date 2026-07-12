'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { saveMoverAction } from '@/actions/save-my-move';
import { stashPendingSaveAction } from '@/lib/save-my-move/pending-action';
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
  const { requireAuth, user } = useSaveMyMove();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      stashPendingSaveAction({
        type: 'mover',
        payload: { companySlug, companyName },
      });
    }

    if (!requireAuth({ context: 'mover', redirectPath: `/companies/${companySlug}` })) return;
    setSaving(true);
    try {
      await saveMoverAction({ companySlug });
      trackSaveMyMoveMover({ company_slug: companySlug });
      toast.success(`${companyName} saved to your shortlist`);
    } catch {
      toast.error('Could not save mover');
    } finally {
      setSaving(false);
    }
  };

  if (variant === 'button') {
    return (
      <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className={className}>
        <Heart className="h-3.5 w-3.5 mr-1" />
        {saving ? 'Saving…' : 'Save mover'}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saving}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-1.5 text-muted-foreground',
        'hover:text-primary hover:bg-primary/10 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
      aria-label={`Save ${companyName} to your shortlist`}
      title="Save to My Move"
    >
      <Heart className="h-4 w-4" />
    </button>
  );
}