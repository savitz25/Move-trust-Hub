'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { mergeLocalDataAction } from '@/actions/save-my-move';
import {
  getLocalMergePayload,
  dismissMergeForSession,
  clearLocalMergeStorage,
} from '@/lib/save-my-move/local-merge';
import { trackSaveMyMoveMerge } from '@/components/ga-events';
import { toast } from 'sonner';

type LocalMergeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LocalMergeDialog({ open, onOpenChange }: LocalMergeDialogProps) {
  const [merging, setMerging] = useState(false);
  const payload = getLocalMergePayload();
  const hasInventory = Boolean(payload.inventory?.inventory.length);
  const hasCompare = Boolean(payload.compareSlugs?.length);

  const handleMerge = async () => {
    setMerging(true);
    try {
      await mergeLocalDataAction({
        inventory: payload.inventory,
        compareSlugs: payload.compareSlugs,
      });
      trackSaveMyMoveMerge({ merged_inventory: hasInventory, merged_compare: hasCompare });
      clearLocalMergeStorage();
      toast.success('Saved to your account');
      onOpenChange(false);
    } catch {
      toast.error('Could not save local data');
    } finally {
      setMerging(false);
    }
  };

  const handleSkip = () => {
    dismissMergeForSession();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Save data from this device?</DialogTitle>
        </DialogHeader>
        <p className="px-6 text-sm text-muted-foreground -mt-1 mb-2">
          We found a moving inventory or comparison saved locally on this browser.
        </p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          {hasInventory && (
            <li>
              • Inventory ({payload.inventory!.totalItems} items,{' '}
              {Math.round(payload.inventory!.totalVolume)} cu ft)
            </li>
          )}
          {hasCompare && <li>• Comparison ({payload.compareSlugs!.length} movers)</li>}
        </ul>
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" onClick={handleMerge} disabled={merging}>
            {merging ? 'Saving…' : 'Save to my account'}
          </Button>
          <Button variant="outline" onClick={handleSkip} disabled={merging}>
            Skip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}