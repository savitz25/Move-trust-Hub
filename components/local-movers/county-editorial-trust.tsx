import Link from 'next/link';
import { BadgeCheck, Calendar, Shield, User } from 'lucide-react';
import { getSeoYear } from '@/lib/local-movers/index';

export const CALIFORNIA_COUNTY_CONTENT_UPDATED = '2026-06-22';
export const FLORIDA_COUNTY_CONTENT_UPDATED = '2026-06-21';
export const NEW_JERSEY_COUNTY_CONTENT_UPDATED = '2026-06-22';
export const NEW_YORK_COUNTY_CONTENT_UPDATED = '2026-06-22';
export const TEXAS_COUNTY_CONTENT_UPDATED = '2026-06-22';
export const GEORGIA_COUNTY_CONTENT_UPDATED = '2026-06-22';
export const SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const NORTH_CAROLINA_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const TENNESSEE_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const ALABAMA_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const MISSISSIPPI_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const LOUISIANA_COUNTY_CONTENT_UPDATED = '2026-06-23';
/** Parish-specific alias — Louisiana uses parishes, not counties */
export const LOUISIANA_PARISH_CONTENT_UPDATED = LOUISIANA_COUNTY_CONTENT_UPDATED;
export const OKLAHOMA_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const ARKANSAS_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const KANSAS_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const MISSOURI_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const ILLINOIS_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const MICHIGAN_COUNTY_CONTENT_UPDATED = '2026-06-23';
export const INDIANA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const OHIO_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const KENTUCKY_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const WEST_VIRGINIA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const VIRGINIA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const DISTRICT_OF_COLUMBIA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const DELAWARE_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const MARYLAND_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const PENNSYLVANIA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const CONNECTICUT_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const MASSACHUSETTS_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const RHODE_ISLAND_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const VERMONT_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const NEW_HAMPSHIRE_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const MAINE_COUNTY_CONTENT_UPDATED = '2026-06-24';

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