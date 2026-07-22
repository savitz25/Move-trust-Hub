import type { CountyMarketInsights } from '@/lib/local-movers/county-market-insights';

type Props = {
  countyLabel: string;
  insights: CountyMarketInsights;
  className?: string;
};

/**
 * Lightweight trust/market strip for the hero — full narrative lives in the guide accordion.
 */
export function CountyCompactStats({ countyLabel, insights, className }: Props) {
  if (insights.moverCount === 0) return null;

  return (
    <div
      className={className}
      aria-label={`${countyLabel} market snapshot`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Verified
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">
            {insights.moverCount}
          </div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Avg rating
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">
            {insights.avgRating > 0 ? `${insights.avgRating}★` : '—'}
          </div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            USDOT
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">
            {insights.usdotVerifiedCount}/{insights.moverCount}
          </div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Reviews
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">
            {insights.attributableReviewCount}
          </div>
        </div>
      </div>
    </div>
  );
}
