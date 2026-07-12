'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { saveComparisonAction } from '@/actions/save-my-move';
import { stashPendingSaveAction } from '@/lib/save-my-move/pending-action';
import { trackSaveMyMoveComparison } from '@/components/ga-events';
import { toast } from 'sonner';

type SaveComparisonButtonProps = {
  companySlugs: string[];
  className?: string;
};

export function SaveComparisonButton({ companySlugs, className }: SaveComparisonButtonProps) {
  const { requireAuth, user } = useSaveMyMove();
  const [saving, setSaving] = useState(false);

  if (companySlugs.length === 0) return null;

  const handleSave = async () => {
    if (!user) {
      stashPendingSaveAction({
        type: 'comparison',
        payload: { companySlugs },
      });
    }

    if (!requireAuth({ context: 'comparison', redirectPath: '/compare' })) return;
    setSaving(true);
    try {
      await saveComparisonAction({ companySlugs });
      trackSaveMyMoveComparison({ mover_count: companySlugs.length });
      toast.success('Comparison saved to My Move');
    } catch {
      toast.error('Could not save comparison');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className={className}>
      <Bookmark className="h-3.5 w-3.5 mr-1.5" />
      {saving ? 'Saving…' : 'Save this comparison'}
    </Button>
  );
}