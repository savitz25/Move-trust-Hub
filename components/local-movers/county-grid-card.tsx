import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  formatMoverCountLabel,
  getMoverCountBadgeTier,
} from '@/lib/local-movers/county-market-mover-counts';

type CountyGridCardProps = {
  href: string;
  name: string;
  seat?: string;
  /** Market estimate or curated listing count; omit to hide badge */
  moverCount?: number | null;
  /** Tier 1 full guide vs Tier 2 limited coverage */
  guideBadge?: string;
};

/**
 * Uniform premium county card for state directory grids.
 * Fixed height, left brand accent, scanable mover-count pill.
 */
export function CountyGridCard({
  href,
  name,
  seat,
  moverCount,
  guideBadge,
}: CountyGridCardProps) {
  const showBadge = moverCount !== undefined && moverCount !== null;
  const count = moverCount ?? 0;
  const tier = getMoverCountBadgeTier(count);
  const label = formatMoverCountLabel(count);

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex min-h-[96px] items-stretch overflow-hidden rounded-2xl',
        'border border-slate-200/90 bg-white',
        'shadow-[0_1px_2px_rgb(15_23_42/0.04),0_1px_3px_rgb(15_23_42/0.03)]',
        'transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:scale-[1.015]',
        'hover:border-primary/35 hover:shadow-[0_10px_24px_-8px_rgb(0_119_212/0.18),0_4px_10px_-4px_rgb(15_23_42/0.08)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2'
      )}
      aria-label={showBadge ? `${name} County — ${label}` : `${name} County`}
    >
      {/* Brand teal/blue left accent */}
      <span
        className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#1E9FFF] via-[#0077D4] to-[#005FA8]"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 items-center gap-3 pl-4 pr-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-primary">
            {name}
          </div>
          {seat ? (
            <div className="mt-1 flex items-center gap-1.5 text-[12px] leading-none text-slate-500">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-primary/70"
                aria-hidden="true"
              />
              <span className="truncate">{seat}</span>
            </div>
          ) : (
            <div className="mt-1 h-3.5" aria-hidden="true" />
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          {guideBadge ? (
            <span
              className={cn(
                'inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold leading-none ring-1 ring-inset',
                guideBadge === 'Limited'
                  ? 'bg-amber-50 text-amber-800 ring-amber-200/80'
                  : 'bg-emerald-50 text-emerald-800 ring-emerald-200/80'
              )}
            >
              {guideBadge}
            </span>
          ) : null}
          {showBadge ? (
            <span
              className={cn(
                'inline-flex h-7 items-center justify-center rounded-full px-2.5',
                'text-[11px] font-semibold tabular-nums tracking-tight leading-none',
                'ring-1 ring-inset transition-colors',
                tier === 'high' &&
                  'bg-sky-50 text-[#004a8a] ring-sky-200/80',
                tier === 'medium' &&
                  'bg-slate-100 text-slate-700 ring-slate-200/90',
                tier === 'low' &&
                  'bg-slate-50 text-slate-600 ring-slate-200/80',
                tier === 'zero' &&
                  'bg-slate-50 text-slate-500 ring-slate-200/70'
              )}
            >
              {count > 0 ? (
                <>
                  <span className="font-bold">{count}</span>
                  <span className="ml-1 font-medium opacity-90">
                    {count === 1 ? 'Mover' : 'Movers'}
                  </span>
                </>
              ) : (
                <span className="font-medium">Building</span>
              )}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
