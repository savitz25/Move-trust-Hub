import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { parseCountyKey, countyKeyToLabel } from '@/lib/destinations/county-keys';
import type { Market } from '@/lib/destinations/types';

type Props = {
  market: Market;
  height?: number;
};

export function DestinationMapSnippet({ market, height = 280 }: Props) {
  const descriptionId = `map-desc-${market.slug}`;
  const mapDescription =
    market.mapDescription ??
    `Map of ${market.displayName}, ${market.stateCode} service area and linked counties for local and interstate mover research.`;

  return (
    <div className="space-y-3">
      <div
        className="rounded-xl border overflow-hidden bg-muted/20 flex flex-col justify-center"
        style={{ minHeight: height }}
        role="img"
        aria-describedby={descriptionId}
      >
        <div className="p-5 md:p-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {market.displayName} service area
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {market.lat.toFixed(2)}°N, {Math.abs(market.lng).toFixed(2)}°W · ZIP{' '}
            {market.defaultToZip}
          </p>
          {market.primaryCounties.length > 0 && (
            <ul className="flex flex-wrap gap-2" role="list">
              {market.primaryCounties.map((countyKey) => {
                const parsed = parseCountyKey(countyKey);
                if (!parsed) return null;
                return (
                  <li key={countyKey}>
                    <Link
                      href={`/local-movers/${parsed.stateSlug}/${parsed.countySlug}`}
                      className="inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {countyKeyToLabel(countyKey)}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <p id={descriptionId} className="sr-only">
        {mapDescription}
      </p>
    </div>
  );
}