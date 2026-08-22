'use client';

import { useSearchParams } from 'next/navigation';
import { parseAskSearchHandoff } from '@/lib/search-handoff/parse';
import { resolveAskSearchHandoff } from '@/lib/search-handoff/resolve';

/**
 * Consumer-facing Ask handoff chrome. Reads allowlisted query params only.
 * Never claims exact-city coverage when the match is county service-area.
 */
export function AskSearchContextBanner() {
  const params = useSearchParams();
  const ctx = parseAskSearchHandoff(params);
  if (!ctx) return null;

  const dest = resolveAskSearchHandoff(ctx);
  const countyOnly =
    dest.matchClass === 'county_service_area_match' ||
    dest.matchClass === 'county_service_area_via_zip_resolution';

  return (
    <div
      className="border-b bg-muted/40"
      data-ask-handoff="1"
      data-match-class={dest.matchClass || dest.status}
      data-entity={ctx.entityType || ''}
    >
      <div className="container mx-auto px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">From AskTrustHub</p>
        <p className="mt-1 text-sm font-medium text-foreground">{dest.bannerTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{dest.bannerBody}</p>
        {countyOnly ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Match reason: {dest.matchClass?.replace(/_/g, ' ')} — not an exact city listing.
          </p>
        ) : null}
      </div>
    </div>
  );
}
