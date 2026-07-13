'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronUp, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedNumber } from '@/components/moving-calculator/animated-number';
import { MobileBottomSheet } from '@/components/moving-calculator/mobile-bottom-sheet';
import { MoveSummaryBody, type MoveSummaryBodyProps } from '@/components/moving-calculator/move-summary-body';
import { estimateWeight, getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import { cn } from '@/lib/utils';

type MobileStickySummaryProps = MoveSummaryBodyProps;

/**
 * Mobile-only (< md) sticky footer: compact totals + tap-to-expand full summary sheet.
 * Desktop/tablet uses the sidebar MoveBasketSummary instead.
 */
export function MobileStickySummary(props: MobileStickySummaryProps) {
  const { totalVolume, totalItems } = props;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const recommendation = getMoveRecommendation(totalVolume);
  const totalWeight = estimateWeight(totalVolume);

  // Keep sticky bar above the on-screen keyboard (iOS/Android).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const gap = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setKeyboardOffset(gap > 80 ? gap : 0);
    };

    vv.addEventListener('resize', onResize);
    vv.addEventListener('scroll', onResize);
    return () => {
      vv.removeEventListener('resize', onResize);
      vv.removeEventListener('scroll', onResize);
    };
  }, []);

  return (
    <>
      <div
        className="md:hidden fixed inset-x-0 z-40 border-t bg-card/95 backdrop-blur-md shadow-trust-lg"
        style={{
          bottom: keyboardOffset,
          paddingBottom: keyboardOffset > 0 ? 0 : 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 min-h-[72px] text-left active:bg-muted/40 transition-colors"
          aria-expanded={sheetOpen}
          aria-label="View full move summary"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Truck className="h-5 w-5" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Your move estimate
            </p>
            <p className="text-base font-bold tabular-nums leading-tight">
              <AnimatedNumber value={Math.round(totalVolume)} /> cu ft
              <span className="text-sm font-semibold text-muted-foreground mx-1.5">·</span>
              <AnimatedNumber value={totalWeight} /> lbs
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {recommendation.truck}
              {totalItems > 0 ? ` · ${totalItems} items` : ''}
            </p>
          </div>
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        </button>

        {totalVolume > 0 && (
          <div className="flex gap-2 px-4 pb-3">
            <Button size="lg" className="flex-1 min-h-12 text-sm font-semibold" asChild>
              <Link href="/companies">Get free quotes</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-h-12 px-4" asChild>
              <Link href="/compare">Compare</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Spacer so content is not hidden behind sticky bar */}
      <div
        className={cn('md:hidden shrink-0', totalVolume > 0 ? 'h-[148px]' : 'h-[76px]')}
        aria-hidden
      />

      <MobileBottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Your Move Basket"
        description="Live estimate · auto-saved on this device"
      >
        <MoveSummaryBody {...props} touchFriendly />
      </MobileBottomSheet>
    </>
  );
}