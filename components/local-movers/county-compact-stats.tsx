import type { ReactNode } from 'react';

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

  // Phase 2: omit zero-value primary metrics rather than decorating “0” as a feature.
  const cells: Array<{ key: string; node: ReactNode }> = [
    {
      key: 'total',
      node: (
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Serving {countyLabel.replace(/ County$/i, '')}
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{moverCount}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">movers on this page</div>
        </div>
      ),
    },
  ];

  if (usdotCount > 0) {
    cells.push({
      key: 'usdot',
      node: (
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            USDOT / FMCSA
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{usdotCount}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">
            of {moverCount} with records on file
          </div>
        </div>
      ),
    });
  }

  cells.push({
    key: 'local',
    node: (
      <div className="rounded-xl border bg-card px-3 py-2.5">
        <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Local (HQ nearby)
        </div>
        {localCount > 0 ? (
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{localCount}</div>
        ) : (
          <>
            <div className="text-sm font-medium text-muted-foreground mt-0.5">None listed</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">not padded as local</div>
          </>
        )}
      </div>
    ),
  });

  if (nationalCount > 0) {
    cells.push({
      key: 'regional',
      node: (
        <div className="rounded-xl border bg-card px-3 py-2.5">
          <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Regional / out-of-area
          </div>
          <div className="text-lg sm:text-xl font-semibold tabular-nums">{nationalCount}</div>
        </div>
      ),
    });
  }

  return (
    <div className={className} aria-label={`${countyLabel} listing snapshot`}>
      <div
        className={`grid grid-cols-2 gap-2 sm:gap-3 ${
          cells.length >= 4 ? 'sm:grid-cols-4' : cells.length === 3 ? 'sm:grid-cols-3' : ''
        }`}
      >
        {cells.map((c) => (
          <div key={c.key}>{c.node}</div>
        ))}
      </div>
    </div>
  );
}
