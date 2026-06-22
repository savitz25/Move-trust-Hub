import Link from 'next/link';
import { BadgeCheck, Calendar, Shield, User } from 'lucide-react';
import { getSeoYear } from '@/lib/local-movers/index';

export const FLORIDA_COUNTY_CONTENT_UPDATED = '2026-06-21';
export const NEW_JERSEY_COUNTY_CONTENT_UPDATED = '2026-06-30';

type Props = {
  countyLabel: string;
  stateName: string;
  lastUpdated?: string;
};

export function CountyEditorialTrust({
  countyLabel,
  stateName,
  lastUpdated = FLORIDA_COUNTY_CONTENT_UPDATED,
}: Props) {
  const formatted = new Date(lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section
      className="mb-10 rounded-2xl border bg-muted/20 p-6"
      aria-labelledby="editorial-trust-heading"
    >
      <h2 id="editorial-trust-heading" className="text-lg font-semibold mb-3">
        Editorial standards &amp; trust
      </h2>
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium">
          <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          FMCSA-verified listings
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium">
          <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Curated {getSeoYear()} rankings
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium">
          <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Updated {formatted}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="inline-flex items-center gap-1 font-medium text-foreground">
          <User className="h-3.5 w-3.5" aria-hidden="true" />
          Move Trust Hub Editorial Team
        </span>
        {' — '}
        This {countyLabel}, {stateName} guide is researched and maintained by our moving
        industry editors. We verify USDOT/MC licensing, compare customer ratings, and
        update cost ranges and local tips when market conditions change.{' '}
        <Link href="/resources/how-to-choose" className="text-primary font-medium hover:underline">
          See our methodology
        </Link>
        .
      </p>
      <p className="text-xs text-muted-foreground mt-3">
        Last reviewed: {formatted}. Always confirm current FMCSA authority before booking.
      </p>
    </section>
  );
}