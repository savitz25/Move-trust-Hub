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
};

const badgeTierClass: Record<string, string> = {
  high: 'border-sky-200 bg-sky-50 text-[#004a8a]',
  medium: 'border-slate-200 bg-slate-50 text-slate-800',
  low: 'border-amber-200 bg-amber-50 text-amber-900',
  zero: 'border-slate-200 bg-slate-100 text-slate-600',
};

/**
 * State county grid card: name + seat, yellow accent bar, optional “X Movers” badge.
 */
export function CountyGridCard({
  href,
  name,
  seat,
  moverCount,
}: CountyGridCardProps) {
  const showBadge = moverCount !== undefined && moverCount !== null;
  const count = moverCount ?? 0;
  const tier = getMoverCountBadgeTier(count);
  const label = formatMoverCountLabel(count);

  return (
    <Link
      href={href}
      className="group flex min-h-[72px] overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
      aria-label={
        showBadge ? `${name} County — ${label}` : `${name} County`
      }
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3.5 pr-3">
        <div className="text-sm font-bold tracking-tight transition-colors group-hover:text-primary">
          {name}
        </div>
        {seat ? (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{seat}</span>
          </div>
        ) : null}
      </div>

      {/* Brand yellow accent bar */}
      <div
        className="w-1 shrink-0 self-stretch bg-gradient-to-b from-amber-300 to-amber-500"
        aria-hidden="true"
      />

      {showBadge ? (
        <div className="flex items-center bg-gradient-to-r from-amber-50/50 to-transparent px-2.5">
          <span
            className={cn(
              'inline-flex min-w-[64px] items-center justify-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold tabular-nums leading-none',
              badgeTierClass[tier]
            )}
          >
            {label}
          </span>
        </div>
      ) : (
        <div className="w-2 shrink-0" aria-hidden="true" />
      )}
    </Link>
  );
}
