'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalculatorStore, type InventoryItem } from '@/store/calculator-store';
import {
  pushCalculatorInventoryIntoPlan,
  returnToMyMoveReportPath,
} from '@/lib/my-move-plan/calculator-bridge';
import { toast } from 'sonner';

function asInventory(value: unknown): InventoryItem[] {
  return Array.isArray(value) ? (value as InventoryItem[]) : [];
}

/**
 * Prominent CTA when the calculator was opened from My Move Plan.
 * Saves current inventory into the plan and returns to Report Ready.
 */
export function ReturnToPlanBanner() {
  const router = useRouter();
  const rawInventory = useCalculatorStore((s) => s.inventory);
  const movePreset = useCalculatorStore((s) => s.movePreset);
  const inventory = asInventory(rawInventory);

  function handleReturn(target: 'report' | 'inventory') {
    if (inventory.length === 0) {
      toast.message('Add items first', {
        description: 'Build your inventory, then return to the Move Plan report.',
      });
      return;
    }

    pushCalculatorInventoryIntoPlan({
      inventory,
      movePreset,
      step: target === 'report' ? 'report' : 'inventory',
    });

    toast.success(
      target === 'report' ? 'Inventory saved to your Move Plan' : 'Inventory updated'
    );
    router.push(returnToMyMoveReportPath());
  }

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-sky-50 shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <FileCheck2 className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              My Move Plan
            </p>
            <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Refining your shared inventory
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
              When you&apos;re done, return to your report so shortlisted movers quote this same
              load.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-[220px]">
          <Button
            type="button"
            size="lg"
            className="h-12 w-full gap-2 rounded-xl bg-emerald-600 font-semibold shadow-md hover:bg-emerald-700"
            onClick={() => handleReturn('report')}
          >
            Return to My Move Report
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <button
            type="button"
            className="text-center text-xs font-medium text-muted-foreground hover:text-primary hover:underline"
            onClick={() => handleReturn('inventory')}
          >
            Save &amp; continue plan (inventory step)
          </button>
        </div>
      </div>
    </div>
  );
}
