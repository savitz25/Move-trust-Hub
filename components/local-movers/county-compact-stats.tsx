type Props = {
  countyLabel: string;
  /** Total movers listed as serving this county */
  moverCount: number;
  /** Movers with a displayable USDOT on file */
  usdotCount: number;
  /** Local / in-state segment size */
  localCount: number;
  /** National / long-distance segment size */
  nationalCount: number;
  className?: string;
};

/**
 * Honest market strip — never labels all listings as “verified” without counts.
 */
export function CountyCompactStats({
  countyLabel,
  moverCount,
  usdotCount,
  localCount,
  nationalCount,
  className,
}: Props) {
  if (moverCount === 0) return null;

  return (
    <div className={className} aria-label={`${countyLabel} listing snapshot`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Serving {countyLabel.replace(/ County$/i, '')}
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{moverCount}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">movers on this page</div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            USDOT / FMCSA
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">
            {usdotCount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">
            of {moverCount} with records on file
          </div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Local / in-state
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{localCount}</div>
        </div>
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            National / LD
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{nationalCount}</div>
        </div>
      </div>
    </div>
  );
}
