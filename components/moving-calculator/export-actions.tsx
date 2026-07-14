'use client';

import { useState } from 'react';
import { Download, Printer, Copy, Mail, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaveMyMove } from '@/components/save-my-move/save-my-move-provider';
import { generateInventoryPdf } from '@/lib/moving-calculator/pdf-export';
import { encodeShareUrl } from '@/lib/moving-calculator/share-url';
import { formatItemDisplayName, isSpecialHandlingItem } from '@/lib/moving-calculator/display-names';
import {
  estimateWeight,
  getMoveRecommendation,
  LBS_PER_CU_FT,
} from '@/lib/moving-calculator/estimates';
import type { InventoryItem } from '@/store/calculator-store';
import {
  trackPdfDownloaded,
  trackInventoryShared,
} from '@/components/ga-events';
import { toast } from 'sonner';

type ExportActionsProps = {
  inventory: InventoryItem[];
  groupedByRoom: [string, InventoryItem[]][];
  totalVolume: number;
  totalItems: number;
  mode: string;
  movePreset: string | null;
  presetLabel?: string | null;
};

export function ExportActions({
  inventory,
  groupedByRoom,
  totalVolume,
  totalItems,
  mode,
  movePreset,
  presetLabel,
}: ExportActionsProps) {
  const { requireAuth, user, loading } = useSaveMyMove();
  const [emailing, setEmailing] = useState(false);
  const recommendation = getMoveRecommendation(totalVolume);
  const totalWeight = estimateWeight(totalVolume);

  const buildSummaryText = () => {
    const lines = [
      'MOVE TRUST HUB — MOVING INVENTORY',
      `Date: ${new Date().toLocaleDateString()}`,
      '',
      `Total Volume: ${Math.round(totalVolume)} cu ft`,
      `Est. Weight: ${totalWeight.toLocaleString()} lbs (${LBS_PER_CU_FT} lbs/cu ft)`,
      `Items: ${totalItems}`,
      `Truck: ${recommendation.truck}`,
      `Crew: ${recommendation.movers} · ${recommendation.duration}`,
      '',
      'Give this same inventory to every mover for comparable quotes.',
      'Insist on a binding or not-to-exceed estimate.',
      '',
    ];

    for (const [room, items] of groupedByRoom) {
      lines.push(`── ${room} ──`);
      for (const item of items) {
        lines.push(
          `  ${formatItemDisplayName(item.name)} × ${item.quantity} (${Math.round(item.volume * item.quantity)} cu ft)`
        );
      }
      lines.push('');
    }

    const special = inventory.filter((i) => isSpecialHandlingItem(i.name));
    if (special.length > 0) {
      lines.push('SPECIAL HANDLING:');
      special.forEach((i) => lines.push(`  • ${formatItemDisplayName(i.name)} × ${i.quantity}`));
      lines.push('');
    }

    lines.push('Verify carrier DOT at movetrusthub.com/companies');
    lines.push('Move Trust Hub — We never sell your information.');
    return lines.join('\n');
  };

  const handlePdf = () => {
    if (inventory.length === 0) {
      toast.error('Add items before exporting');
      return;
    }
    generateInventoryPdf({
      inventory,
      groupedByRoom,
      totalVolume,
      totalItems,
      presetLabel,
    });
    trackPdfDownloaded({ volume: Math.round(totalVolume), item_count: totalItems });
    toast.success('PDF downloaded');
  };

  const handlePrint = () => {
    if (inventory.length === 0) {
      toast.error('Add items before printing');
      return;
    }
    const text = buildSummaryText();
    const win = window.open('', '_blank');
    if (!win) {
      toast.error('Pop-up blocked — allow pop-ups to print');
      return;
    }
    win.document.write(`<pre style="font-family:system-ui,sans-serif;padding:2rem;white-space:pre-wrap">${text}</pre>`);
    win.document.close();
    win.print();
    trackInventoryShared({ method: 'print' });
  };

  const handleCopy = async () => {
    if (inventory.length === 0) {
      toast.error('Add items before copying');
      return;
    }
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      toast.success('Summary copied to clipboard');
      trackInventoryShared({ method: 'copy' });
    } catch {
      toast.error('Could not copy — try again');
    }
  };

  const handleEmail = async () => {
    if (inventory.length === 0) {
      toast.error('Add items before emailing');
      return;
    }
    if (loading || emailing) return;

    if (!requireAuth({ context: 'inventory', redirectPath: '/moving-calculator' })) {
      return;
    }

    const name =
      totalVolume > 0
        ? `Move — ${Math.round(totalVolume)} cu ft`
        : 'My Move Inventory';

    setEmailing(true);
    try {
      const res = await fetch('/api/save-my-move/email-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ inventory, name, movePreset }),
      });
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        if (res.status === 401) {
          requireAuth({ context: 'inventory', redirectPath: '/moving-calculator' });
          return;
        }
        toast.error(payload?.error ?? 'Could not send email');
        return;
      }

      toast.success('Inventory emailed successfully');
      trackInventoryShared({ method: 'email' });
    } catch {
      toast.error('Could not send email. Check your connection and try again.');
    } finally {
      setEmailing(false);
    }
  };

  const handleShareLink = async () => {
    if (inventory.length === 0) {
      toast.error('Add items before sharing');
      return;
    }
    const url = encodeShareUrl({
      inventory: inventory.map((i) => ({
        name: i.name,
        volume: i.volume,
        quantity: i.quantity,
        room: i.room,
      })),
      mode: mode as 'room' | 'quick',
      preset: presetLabel,
    });
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Shareable link copied', {
        description: 'Anyone with this link can view your inventory.',
      });
      trackInventoryShared({ method: 'link' });
    } catch {
      toast.error('Could not copy link');
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      <Button variant="default" size="sm" onClick={handlePdf} className="gap-1.5">
        <Download className="h-3.5 w-3.5" /> PDF
      </Button>
      <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
        <Printer className="h-3.5 w-3.5" /> Print
      </Button>
      <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
        <Copy className="h-3.5 w-3.5" /> Copy
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleEmail}
        className="gap-1.5"
        disabled={emailing || loading}
        aria-busy={emailing}
        aria-label={
          user
            ? `Email inventory to ${user.email ?? 'your account'}`
            : 'Email inventory — sign in required'
        }
      >
        <Mail className="h-3.5 w-3.5" /> Email me
      </Button>
      <Button variant="outline" size="sm" onClick={handleShareLink} className="gap-1.5 col-span-2 sm:col-span-1">
        <Link2 className="h-3.5 w-3.5" /> Share link
      </Button>
    </div>
  );
}