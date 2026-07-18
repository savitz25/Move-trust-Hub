import type { CityHubContent } from '@/lib/destinations/types';

type CostRow = CityHubContent['costTableRows'][number];

type Props = {
  destinationLabel: string;
  rows: CostRow[];
  /** Matches existing ogImageAlt for accessibility / SEO continuity */
  ariaLabel: string;
};

/**
 * Data-driven cost summary for city hubs.
 * Renders from costTableRows so pages never depend on broken/missing SVG assets.
 */
export function DestinationCostVisual({ destinationLabel, rows, ariaLabel }: Props) {
  if (!rows?.length) return null;

  return (
    <figure
      className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b1629] text-white shadow-lg"
      aria-label={ariaLabel}
    >
      <div className="border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-300/90">
          2026 cost overview
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          Moving to {destinationLabel}
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Estimated interstate ranges by home size (Northeast / Midwest origins)
        </p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {rows.map((row) => (
          <div
            key={row.homeSize}
            className="rounded-xl border border-white/10 bg-[#132337] px-4 py-4"
          >
            <div className="text-xs font-medium uppercase tracking-wide text-sky-300/90">
              {row.homeSize}
            </div>
            <div className="mt-2 text-lg font-semibold tabular-nums tracking-tight sm:text-xl">
              {row.costRange}
            </div>
            <div className="mt-2 space-y-0.5 text-xs text-slate-400">
              <div>{row.cubicFt} cu ft</div>
              <div>{row.transitDays} transit days</div>
            </div>
          </div>
        ))}
      </div>

      <figcaption className="border-t border-white/10 px-5 py-3 text-xs text-slate-500 sm:px-6">
        Independent directory · compare FMCSA-verified movers · movetrusthub.com
      </figcaption>
    </figure>
  );
}