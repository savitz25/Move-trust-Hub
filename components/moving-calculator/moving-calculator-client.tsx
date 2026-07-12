'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calculator } from 'lucide-react';
import { toast } from 'sonner';

import { TrustBadges } from '@/components/trust/trust-badges';
import { MovingCalculatorSeoSections } from '@/components/moving-calculator-seo-sections';
import { OnboardingStrip } from '@/components/moving-calculator/onboarding-strip';
import { InventoryBuilder } from '@/components/moving-calculator/inventory-builder';
import { MoveBasketSummary } from '@/components/moving-calculator/move-basket-summary';
import { useCalculatorStore, type InventoryItem } from '@/store/calculator-store';
import {
  getMoveRecommendation,
  estimateWeight,
} from '@/lib/moving-calculator/estimates';
import {
  decodeShareParam,
  getShareParamFromUrl,
} from '@/lib/moving-calculator/share-url';
import {
  trackCalculatorStart,
  trackCalculatorComplete,
} from '@/components/ga-events';

export function MovingCalculatorClient() {
  const searchParams = useSearchParams();
  const {
    mode,
    inventory,
    movePreset,
    updateQuantity,
    removeItem,
    clearInventory,
    addSuggestedBoxes,
    loadFromShare,
    undo,
  } = useCalculatorStore();

  const [mobileBasketOpen, setMobileBasketOpen] = useState(false);
  const calculatorStarted = useRef(false);
  const calculatorCompleted = useRef(false);
  const savedLoadDone = useRef(false);
  const shareLoaded = useRef(false);

  const totalVolume = useMemo(
    () => inventory.reduce((sum, item) => sum + item.volume * item.quantity, 0),
    [inventory]
  );
  const totalItems = useMemo(
    () => inventory.reduce((sum, item) => sum + item.quantity, 0),
    [inventory]
  );
  const totalWeight = useMemo(() => estimateWeight(totalVolume), [totalVolume]);
  const recommendation = useMemo(() => getMoveRecommendation(totalVolume), [totalVolume]);

  const groupedByRoom = useMemo(() => {
    const groups: Record<string, InventoryItem[]> = {};
    inventory.forEach((item) => {
      const room = item.room || 'Unassigned';
      if (!groups[room]) groups[room] = [];
      groups[room].push(item);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [inventory]);

  const markCalculatorStarted = useCallback(
    (interaction: string) => {
      if (calculatorStarted.current) return;
      calculatorStarted.current = true;
      trackCalculatorStart({ interaction, mode });
    },
    [mode]
  );

  const showUndoToast = useCallback(
    (message: string) => {
      toast.success(message, {
        action: { label: 'Undo', onClick: () => undo() },
      });
    },
    [undo]
  );

  // Load saved inventory from account (?load=id)
  useEffect(() => {
    const loadId = searchParams.get('load');
    if (!loadId || savedLoadDone.current) return;
    savedLoadDone.current = true;
    fetch(`/api/save-my-move/inventory/${loadId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.inventory) return;
        loadFromShare(
          data.inventory,
          data.mode ?? 'room',
          data.move_preset ?? null
        );
        toast.success(`Loaded "${data.name}"`, {
          description: 'Adjust quantities or add items as needed.',
        });
        markCalculatorStarted('saved_inventory');
      })
      .catch(() => {});
  }, [searchParams, loadFromShare, markCalculatorStarted]);

  // Load shared inventory from URL (?inv=)
  useEffect(() => {
    if (savedLoadDone.current || shareLoaded.current) return;
    const param = getShareParamFromUrl(searchParams.toString());
    if (!param) return;
    const shared = decodeShareParam(param);
    if (!shared) return;
    shareLoaded.current = true;
    loadFromShare(
      shared.inventory,
      shared.mode,
      shared.preset as Parameters<typeof loadFromShare>[2]
    );
    toast.success('Shared inventory loaded', {
      description: 'Adjust quantities or add items as needed.',
    });
    markCalculatorStarted('share_link');
  }, [searchParams, loadFromShare, markCalculatorStarted]);

  // Track completion milestone
  useEffect(() => {
    if (totalVolume <= 0 || totalItems <= 0 || calculatorCompleted.current) return;
    calculatorCompleted.current = true;
    trackCalculatorComplete({
      volume: Math.round(totalVolume),
      weight: totalWeight,
      truck_size: recommendation.truck,
      move_size: recommendation.label,
      item_count: totalItems,
      mode,
    });
  }, [totalVolume, totalItems, totalWeight, recommendation, mode]);

  return (
    <div className="w-full">
      {/* Trust strip */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
          <Calculator className="h-3.5 w-3.5" />
          Free · Instant · No signup · We never sell your info
        </div>
        <TrustBadges variant="compact" className="text-xs" />
      </div>

      {/* Onboarding */}
      <div className="mb-6">
        <OnboardingStrip onPresetSelect={() => markCalculatorStarted('preset')} />
      </div>

      {/* Three-zone layout: 65% builder / 35% summary */}
      <div className="grid lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] gap-5 lg:gap-6 items-start">
        <section aria-label="Inventory builder">
          <InventoryBuilder
            onInteraction={markCalculatorStarted}
            showUndoToast={showUndoToast}
          />
        </section>

        <section aria-label="Move basket summary" className="hidden lg:block">
          <MoveBasketSummary
            inventory={inventory}
            groupedByRoom={groupedByRoom}
            totalVolume={totalVolume}
            totalItems={totalItems}
            movePreset={movePreset}
            mode={mode}
            onUpdateQty={updateQuantity}
            onRemove={removeItem}
            onClear={clearInventory}
            onAddBoxes={addSuggestedBoxes}
          />
        </section>
      </div>

      {/* Mobile sticky basket */}
      <MoveBasketSummary
        inventory={inventory}
        groupedByRoom={groupedByRoom}
        totalVolume={totalVolume}
        totalItems={totalItems}
        movePreset={movePreset}
        mode={mode}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
        onClear={clearInventory}
        onAddBoxes={addSuggestedBoxes}
        mobileCollapsed={!mobileBasketOpen}
        onToggleMobile={() => setMobileBasketOpen((v) => !v)}
      />

      <MovingCalculatorSeoSections />

      <section className="mt-8 max-w-3xl rounded-xl border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-3">
          Next Steps After You Estimate Your Move
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Volumes use industry-standard averages (7 lbs per cu ft for weight).
          Export your inventory as a PDF and give the same list to every mover for comparable quotes.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
          <Link href="/resources/move-size-weight" className="text-primary hover:underline">
            Why move size matters
          </Link>
          <Link href="/companies" className="text-primary hover:underline">
            Browse interstate movers
          </Link>
          <Link href="/compare" className="text-primary hover:underline">
            Compare movers
          </Link>
          <Link href="/resources/how-to-choose" className="text-primary hover:underline">
            How to choose a mover
          </Link>
          <Link href="/resources/scams" className="text-primary hover:underline">
            Avoid moving scams
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          This calculator is for estimation only. Actual space and weight may vary based on packing style and item sizes.
        </p>
      </section>
    </div>
  );
}