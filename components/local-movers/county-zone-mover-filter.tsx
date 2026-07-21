'use client';

import { useMemo, useState } from 'react';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import type { CountyIntelligenceZone } from '@/lib/local-movers/county-intelligence/types';
import type { LocalMover } from '@/lib/local-movers/types';
import { cn } from '@/lib/utils';

type Props = {
  movers: LocalMover[];
  zones: CountyIntelligenceZone[];
  countyLabel: string;
  stateCode: string;
  profileReturnPath: string;
  directoryHint?: string;
};

function moverMatchesZone(mover: LocalMover, zone: CountyIntelligenceZone): boolean {
  const hay = `${mover.city} ${mover.name} ${mover.shortDescription}`.toLowerCase();
  return zone.cityKeywords.some((k) => hay.includes(k.toLowerCase()));
}

/**
 * Soft zone filter for county mover lists when a hyper-local pack defines zones.
 */
export function CountyZoneMoverFilter({
  movers,
  zones,
  countyLabel,
  stateCode,
  profileReturnPath,
  directoryHint,
}: Props) {
  const [zoneId, setZoneId] = useState<string | 'all'>('all');

  const filtered = useMemo(() => {
    if (zoneId === 'all') return movers;
    const zone = zones.find((z) => z.id === zoneId);
    if (!zone) return movers;
    const hit = movers.filter((m) => moverMatchesZone(m, zone));
    // If no HQ match, still show full list with a note rather than empty.
    return hit.length ? hit : movers;
  }, [movers, zoneId, zones]);

  const emptyMatch =
    zoneId !== 'all' &&
    filtered.length === movers.length &&
    !movers.some((m) => {
      const z = zones.find((x) => x.id === zoneId);
      return z ? moverMatchesZone(m, z) : false;
    });

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter movers by zone">
        <button
          type="button"
          onClick={() => setZoneId('all')}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
            zoneId === 'all'
              ? 'border-primary bg-primary/10 text-foreground'
              : 'bg-background text-muted-foreground hover:border-primary/40'
          )}
        >
          All zones
        </button>
        {zones.map((z) => (
          <button
            key={z.id}
            type="button"
            onClick={() => setZoneId(z.id)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              zoneId === z.id
                ? 'border-primary bg-primary/10 text-foreground'
                : 'bg-background text-muted-foreground hover:border-primary/40'
            )}
          >
            {z.shortName}
          </button>
        ))}
      </div>

      {directoryHint ? (
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{directoryHint}</p>
      ) : null}

      {emptyMatch ? (
        <p className="text-xs text-amber-800 dark:text-amber-200 mb-3 rounded-lg border border-amber-200/80 bg-amber-50/50 px-3 py-2 dark:border-amber-900/40 dark:bg-amber-950/30">
          No listed movers currently match that zone by city name — showing the full county list.
          Confirm service area with each company.
        </p>
      ) : null}

      <ol className="space-y-4 list-none p-0 m-0">
        {filtered.map((mover, index) => (
          <li key={mover.id}>
            <LocalMoverCard
              mover={mover}
              rank={index + 1}
              countyLabel={countyLabel}
              stateCode={stateCode}
              profileReturnPath={profileReturnPath}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
