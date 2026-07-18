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
import { cn } from '@/lib/utils';

function asInventory(value: unknown): InventoryItem[] {
  return Array.isArray(value) ? (value as InventoryItem[]) : [];
}

export function useReturnToMyMovePlan() {
  const router = useRouter();
  const rawInventory = useCalculatorStore((s) => s.inventory);
  const movePreset = useCalculatorStore((s) => s.movePreset);
  const inventory = asInventory(rawInventory);

  function returnToPlan(target: 'report' | 'inventory' = 'report') {
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

  return { returnToPlan, inventoryCount: inventory.length };
}

/** Top-of-page banner when calculator opened from My Move Plan. */
export function ReturnToPlanBanner() {
  const { returnToPlan } = useReturnToMyMovePlan();

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
            onClick={() => returnToPlan('report')}
          >
            Return to My Move Report
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <button
            type="button"
            className="text-center text-xs font-medium text-muted-foreground hover:text-primary hover:underline"
            onClick={() => returnToPlan('inventory')}
          >
            Save &amp; continue plan (inventory step)
          </button>
        </div>
      </div>
    </div>
  );
}

/** Compact primary CTA for basket sidebar / bottom of page. */
export function ReturnToPlanPrimaryButton({
  className,
  size = 'lg',
  label = 'Return to My Move Plan',
}: {
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  label?: string;
}) {
  const { returnToPlan } = useReturnToMyMovePlan();

  return (
    <Button
      type="button"
      size={size}
      className={cn(
        'w-full gap-2 rounded-xl bg-emerald-600 font-semibold shadow-md hover:bg-emerald-700',
        size === 'lg' && 'h-12',
        className
      )}
      onClick={() => returnToPlan('report')}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Button>
  );
}

/** Full-width bottom section when in plan context. */
export function ReturnToPlanBottomPanel() {
  const { returnToPlan } = useReturnToMyMovePlan();

  return (
    <section className="mt-8 max-w-3xl rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-background p-6 sm:p-8 max-md:mb-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <FileCheck2 className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Done refining your inventory?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Continue to your Move Report so every shortlisted mover quotes this same load. Your
            updates are saved into My Move Plan automatically.
          </p>
          <Button
            type="button"
            size="lg"
            className="mt-5 h-14 w-full gap-2 rounded-2xl bg-emerald-600 text-base font-semibold shadow-md hover:bg-emerald-700 sm:max-w-md"
            onClick={() => returnToPlan('report')}
          >
            Continue to Move Report
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
