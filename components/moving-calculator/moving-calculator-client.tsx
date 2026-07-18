'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calculator } from 'lucide-react';
import { toast } from 'sonner';


import { MovingCalculatorSeoSections } from '@/components/moving-calculator-seo-sections';
import { OnboardingStrip } from '@/components/moving-calculator/onboarding-strip';
import { InventoryBuilder } from '@/components/moving-calculator/inventory-builder';
import { MobileInventoryBuilder } from '@/components/moving-calculator/mobile-inventory-builder';
import { MoveBasketSummary } from '@/components/moving-calculator/move-basket-summary';
import { MobileStickySummary } from '@/components/moving-calculator/mobile-sticky-summary';
import { useCalculatorStore, type InventoryItem } from '@/store/calculator-store';
import {
  getMoveRecommendation,
  estimateWeight,
} from '@/lib/moving-calculator/estimates';
import {
  decodeShareParam,
  getShareParamFromUrl,
} from '@/lib/moving-calculator/share-url';
import { readCalculatorPrefill } from '@/lib/moving-calculator/url-prefill';
import {
  isCalculatorFromPlan,
  pushCalculatorInventoryIntoPlan,
  seedCalculatorFromPlan,
} from '@/lib/my-move-plan/calculator-bridge';
import {
  ReturnToPlanBanner,
  ReturnToPlanBottomPanel,
} from '@/components/moving-calculator/return-to-plan-actions';
import {
  trackCalculatorStart,
  trackCalculatorComplete,
} from '@/components/ga-events';

function asInventory(value: unknown): InventoryItem[] {
  return Array.isArray(value) ? (value as InventoryItem[]) : [];
}

export function MovingCalculatorClient() {
  const searchParams = useSearchParams();
  const {
    mode,
    inventory: rawInventory,
    movePreset,
    updateQuantity,
    removeItem,
    clearInventory,
    addSuggestedBoxes,
    loadFromShare,
    loadPreset,
    undo,
  } = useCalculatorStore();

  const inventory = asInventory(rawInventory);

  const [mobileBasketOpen, setMobileBasketOpen] = useState(false);
  const [storeReady, setStoreReady] = useState(false);
  const calculatorStarted = useRef(false);
  const calculatorCompleted = useRef(false);
  const savedLoadDone = useRef(false);
  const shareLoaded = useRef(false);
  const presetFromUrlLoaded = useRef(false);
  const planSeeded = useRef(false);

  const prefill = useMemo(
    () => readCalculatorPrefill(searchParams),
    [searchParams]
  );
  const fromPlan = useMemo(() => isCalculatorFromPlan(searchParams), [searchParams]);
  const { fromZip, toZip, fromCity, toCity, preset: urlPreset } = prefill;

  const totalVolume = useMemo(
    () =>
      inventory.reduce(
        (sum, item) =>
          sum + (Number(item.volume) || 0) * (Number(item.quantity) || 0),
        0
      ),
    [inventory]
  );
  const totalItems = useMemo(
    () => inventory.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    [inventory]
  );
  const totalWeight = useMemo(() => estimateWeight(totalVolume), [totalVolume]);
  const recommendation = useMemo(
    () => getMoveRecommendation(totalVolume),
    [totalVolume]
  );

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
      try {
        trackCalculatorStart({ interaction, mode });
      } catch {
        // analytics must never break the calculator
      }
    },
    [mode]
  );

  const showUndoToast = useCallback(
    (message: string) => {
      try {
        toast.success(message, {
          action: { label: 'Undo', onClick: () => undo() },
        });
      } catch {
        // ignore toast failures
      }
    },
    [undo]
  );

  // Wait for Zustand persist rehydration before applying URL / share loads
  useEffect(() => {
    const api = useCalculatorStore.persist;
    if (api?.hasHydrated?.()) {
      setStoreReady(true);
      return;
    }
    const unsub = api?.onFinishHydration?.(() => setStoreReady(true));
    // Fallback if persist API is missing or already hydrated without callback
    const t = window.setTimeout(() => setStoreReady(true), 0);
    return () => {
      unsub?.();
      window.clearTimeout(t);
    };
  }, []);

  // Load saved inventory from account (?load=id)
  useEffect(() => {
    if (!storeReady) return;
    const loadId = searchParams.get('load');
    if (!loadId || savedLoadDone.current) return;
    savedLoadDone.current = true;
    fetch(`/api/save-my-move/inventory/${encodeURIComponent(loadId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.inventory || !Array.isArray(data.inventory)) return;
        loadFromShare(
          data.inventory,
          data.mode ?? 'room',
          data.move_preset ?? null
        );
        try {
          toast.success(`Loaded "${data.name || 'inventory'}"`, {
            description: 'Adjust quantities or add items as needed.',
          });
        } catch {
          // ignore
        }
        markCalculatorStarted('saved_inventory');
      })
      .catch(() => {
        // keep page usable if saved inventory fails
      });
  }, [storeReady, searchParams, loadFromShare, markCalculatorStarted]);

  // Load shared inventory from URL (?inv=)
  useEffect(() => {
    if (!storeReady) return;
    if (savedLoadDone.current || shareLoaded.current) return;
    try {
      const param = getShareParamFromUrl(searchParams.toString());
      if (!param) return;
      const shared = decodeShareParam(param);
      if (!shared?.inventory?.length) return;
      shareLoaded.current = true;
      loadFromShare(
        shared.inventory,
        shared.mode,
        shared.preset as Parameters<typeof loadFromShare>[2]
      );
      try {
        toast.success('Shared inventory loaded', {
          description: 'Adjust quantities or add items as needed.',
        });
      } catch {
        // ignore
      }
      markCalculatorStarted('share_link');
    } catch {
      // malformed share param — ignore and show empty calculator
    }
  }, [storeReady, searchParams, loadFromShare, markCalculatorStarted]);

  // My Move Plan → calculator: ensure plan inventory is in the store
  useEffect(() => {
    if (!storeReady || !fromPlan || planSeeded.current) return;
    planSeeded.current = true;
    const seeded = seedCalculatorFromPlan({ loadFromShare });
    if (seeded) {
      markCalculatorStarted('my_move_plan');
      try {
        toast.success('Inventory loaded from your Move Plan', {
          description: 'Edit freely, then return to your report when ready.',
        });
      } catch {
        // ignore
      }
    }
  }, [storeReady, fromPlan, loadFromShare, markCalculatorStarted]);

  // Keep Move Plan session inventory in sync while refining from the calculator
  useEffect(() => {
    if (!storeReady || !fromPlan) return;
    if (inventory.length === 0) return;
    const t = window.setTimeout(() => {
      pushCalculatorInventoryIntoPlan({
        inventory,
        movePreset,
        step: 'report',
      });
    }, 600);
    return () => window.clearTimeout(t);
  }, [storeReady, fromPlan, inventory, movePreset]);

  // Homepage route flow: ?preset=… pre-selects move size
  useEffect(() => {
    if (!storeReady) return;
    if (savedLoadDone.current || shareLoaded.current || presetFromUrlLoaded.current) {
      return;
    }
    if (fromPlan) return; // plan inventory takes priority over generic preset
    if (!urlPreset) return;

    presetFromUrlLoaded.current = true;
    try {
      loadPreset(urlPreset);
      markCalculatorStarted('homepage_preset');
      try {
        toast.success('Move size loaded from your route', {
          description: fromZip
            ? `Route ${fromZip}${toZip ? ` → ${toZip}` : ''} · adjust inventory anytime.`
            : 'Fine-tune quantities anytime.',
        });
      } catch {
        // ignore toast failures
      }
    } catch {
      // preset load failed — leave calculator empty/usable
      presetFromUrlLoaded.current = false;
    }
  }, [
    storeReady,
    urlPreset,
    loadPreset,
    markCalculatorStarted,
    fromZip,
    toZip,
  ]);

  // Track completion milestone
  useEffect(() => {
    if (totalVolume <= 0 || totalItems <= 0 || calculatorCompleted.current) return;
    calculatorCompleted.current = true;
    try {
      trackCalculatorComplete({
        volume: Math.round(totalVolume),
        weight: totalWeight,
        truck_size: recommendation.truck,
        move_size: recommendation.label,
        item_count: totalItems,
        mode,
      });
    } catch {
      // ignore
    }
  }, [totalVolume, totalItems, totalWeight, recommendation, mode]);

  const showRouteBanner = Boolean(fromZip || toZip || fromCity || toCity);

  return (
    <div className="w-full">
      {fromPlan ? <ReturnToPlanBanner /> : null}
      <div className="mb-6 max-md:mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
          <Calculator className="h-3.5 w-3.5" />
          Free · Instant · No signup
        </div>
      </div>

      {showRouteBanner ? (
        <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          <span className="font-semibold text-foreground">Your route: </span>
          <span className="text-muted-foreground">
            {fromCity || fromZip || 'Pickup'}
            {fromZip ? ` (${fromZip})` : ''}
            {' → '}
            {toCity || toZip || 'Delivery'}
            {toZip ? ` (${toZip})` : ''}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Prefills from the homepage planner. Confirm move size below if you haven&apos;t already.
          </span>
        </div>
      ) : null}

      {/* Onboarding */}
      <div className="mb-6">
        <OnboardingStrip onPresetSelect={() => markCalculatorStarted('preset')} />
      </div>

      {/*
        Layout breakpoints:
        - < md (768px): MobileInventoryBuilder + MobileStickySummary (phone-native UX)
        - md–lg: InventoryBuilder + tablet sticky basket (unchanged iPad portrait flow)
        - lg+: two-column grid with sidebar summary (unchanged desktop)
      */}
      <div className="grid lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] gap-5 lg:gap-6 items-start">
        <section aria-label="Inventory builder" className="min-w-0">
          {/* MOBILE (<768px): step-by-step rooms + bottom-sheet item picker */}
          <div className="md:hidden w-full max-w-full overflow-x-hidden">
            <MobileInventoryBuilder
              onInteraction={markCalculatorStarted}
              showUndoToast={showUndoToast}
            />
          </div>
          {/* TABLET + DESKTOP (≥768px): original inventory builder — unchanged */}
          <div className="hidden md:block">
            <InventoryBuilder
              onInteraction={markCalculatorStarted}
              showUndoToast={showUndoToast}
            />
          </div>
        </section>

        <section aria-label="Move basket summary" className="hidden lg:block">
          <MoveBasketSummary
            inventory={inventory}
            groupedByRoom={groupedByRoom}
            totalVolume={totalVolume}
            totalItems={totalItems}
            movePreset={movePreset}
            mode={mode}
            fromPlan={fromPlan}
            onUpdateQty={updateQuantity}
            onRemove={removeItem}
            onClear={clearInventory}
            onAddBoxes={addSuggestedBoxes}
          />
        </section>
      </div>

      {/* MOBILE (<768px): sticky summary bar + full summary bottom sheet */}
      <MobileStickySummary
        inventory={inventory}
        groupedByRoom={groupedByRoom}
        totalVolume={totalVolume}
        totalItems={totalItems}
        movePreset={movePreset}
        mode={mode}
        fromPlan={fromPlan}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
        onClear={clearInventory}
        onAddBoxes={addSuggestedBoxes}
      />

      {/* TABLET (768–1023px): original collapsible sticky basket — unchanged */}
      <MoveBasketSummary
        inventory={inventory}
        groupedByRoom={groupedByRoom}
        totalVolume={totalVolume}
        totalItems={totalItems}
        movePreset={movePreset}
        mode={mode}
        fromPlan={fromPlan}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
        onClear={clearInventory}
        onAddBoxes={addSuggestedBoxes}
        mobileCollapsed={!mobileBasketOpen}
        onToggleMobile={() => setMobileBasketOpen((v) => !v)}
      />

      {!fromPlan ? <MovingCalculatorSeoSections /> : null}

      {fromPlan ? (
        <ReturnToPlanBottomPanel />
      ) : (
        <section className="mt-8 max-w-3xl rounded-xl border bg-muted/30 p-6 sm:p-8 max-md:mb-4">
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
      )}
    </div>
  );
}
