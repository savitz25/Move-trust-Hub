import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { DirectoryPlaceMatch } from '@/lib/directory/resolve-place-query';

type Props = {
  place: DirectoryPlaceMatch;
  compact?: boolean;
};

export function PlaceCoverageBanner({ place, compact = false }: Props) {
  return (
    <section
      className="mb-4 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5"
      aria-label={place.headline}
    >
      <div className="flex gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight text-foreground">{place.headline}</p>
          {compact ? null : (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{place.detail}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {place.countyHref ? (
              <Link
                href={place.countyHref}
                className="inline-flex rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
              >
                {place.countyName
                  ? `${place.countyName} County, ${place.stateCode}`
                  : 'County local movers'}
              </Link>
            ) : null}
            <Link
              href={place.stateHref}
              className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
            >
              {place.stateName} local movers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
