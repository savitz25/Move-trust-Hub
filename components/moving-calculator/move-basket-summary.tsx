'use client';

import { Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedNumber } from '@/components/moving-calculator/animated-number';
import { MoveSummaryBody, type MoveSummaryBodyProps } from '@/components/moving-calculator/move-summary-body';
import { getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import { cn } from '@/lib/utils';

type MoveBasketSummaryProps = MoveSummaryBodyProps & {
  mobileCollapsed?: boolean;
  onToggleMobile?: () => void;
};

export function MoveBasketSummary({
  mobileCollapsed,
  onToggleMobile,
  ...bodyProps
}: MoveBasketSummaryProps) {
  const { totalVolume, totalItems } = bodyProps;
  const recommendation = getMoveRecommendation(totalVolume);

  // Tablet-only sticky bar (md–lg). Phones use MobileStickySummary instead.
  if (mobileCollapsed !== undefined) {
    return (
      <>
        <div className="hidden md:block lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-card/95 backdrop-blur-sm shadow-trust-lg">
          <button
            type="button"
            onClick={onToggleMobile}
            className="w-full flex items-center justify-between px-4 py-3 min-h-[72px]"
            aria-expanded={!mobileCollapsed}
          >
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Your Move Basket</p>
              <p className="text-lg font-bold tabular-nums">
                <AnimatedNumber value={Math.round(totalVolume)} /> cu ft
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  · <AnimatedNumber value={totalItems} /> items
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">{recommendation.label}</Badge>
              {mobileCollapsed ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </button>

          <AnimatePresence>
            {!mobileCollapsed && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t max-h-[70vh] overflow-y-auto"
              >
                <div className="p-4">
                  <MoveSummaryBody {...bodyProps} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden md:block lg:hidden h-20" aria-hidden="true" />
      </>
    );
  }

  // Desktop sidebar (lg+)
  return (
    <Card className={cn('shadow-trust lg:sticky lg:top-4')}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          Your Move Basket
        </CardTitle>
        <p className="text-xs text-muted-foreground">Live estimate · auto-saved locally</p>
      </CardHeader>
      <CardContent>
        <MoveSummaryBody {...bodyProps} />
      </CardContent>
    </Card>
  );
}