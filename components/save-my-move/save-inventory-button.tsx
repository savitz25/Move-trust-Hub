'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { saveInventoryAction } from '@/actions/save-my-move';
import { stashPendingSaveAction } from '@/lib/save-my-move/pending-action';
import type { InventoryItem } from '@/store/calculator-store';
import { trackSaveMyMoveInventory } from '@/components/ga-events';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SaveInventoryButtonProps = {
  inventory: InventoryItem[];
  mode: string;
  movePreset: string | null;
  totalVolume: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  /** Button label (default: "Save this inventory") */
  label?: string;
};

export function SaveInventoryButton({
  inventory,
  mode,
  movePreset,
  totalVolume,
  variant = 'outline',
  size = 'sm',
  className,
  label = 'Save this inventory',
}: SaveInventoryButtonProps) {
  const { requireAuth, user, loading } = useSaveMyMove();
  const [saving, setSaving] = useState(false);

  if (inventory.length === 0) return null;

  const handleSave = async () => {
    if (loading) return;
    const name =
      totalVolume > 0
        ? `Move — ${Math.round(totalVolume)} cu ft`
        : 'My Move Inventory';

    if (!user) {
      stashPendingSaveAction({
        type: 'inventory',
        payload: { name, inventory, mode, movePreset },
      });
    }

    if (!requireAuth({ context: 'inventory', redirectPath: '/moving-calculator' })) return;
    setSaving(true);
    try {
      await saveInventoryAction({
        name,
        inventory,
        mode,
        movePreset,
      });
      trackSaveMyMoveInventory({ item_count: inventory.reduce((s, i) => s + i.quantity, 0) });
      toast.success('Inventory saved', {
        description: 'View it anytime in My Move.',
        action: { label: 'Open', onClick: () => { window.location.href = '/my-move'; } },
      });
    } catch {
      toast.error('Could not save inventory');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSave}
      disabled={saving || loading}
    >
      <Bookmark className={cn('shrink-0', size === 'lg' ? 'h-4 w-4 mr-2' : 'h-3.5 w-3.5 mr-1.5')} />
      {saving ? 'Saving…' : label}
    </Button>
  );
}