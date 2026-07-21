import Link from 'next/link';
import { BadgeCheck, Calendar, Shield, User } from 'lucide-react';
import { getSeoYear } from '@/lib/local-movers/index';

export const COUNTY_INDEX_POLICY_UPDATED = '2026-07-01';

export const CALIFORNIA_COUNTY_CONTENT_UPDATED = '2026-07-21';
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
export const MICHIGAN_COUNTY_CONTENT_UPDATED = '2026-06-30';
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
export const HAWAII_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const ALASKA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const WASHINGTON_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const OREGON_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const NEVADA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const ARIZONA_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const NEW_MEXICO_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const UTAH_COUNTY_CONTENT_UPDATED = '2026-06-24';
export const COLORADO_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const IDAHO_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const MONTANA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const WYOMING_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const NORTH_DAKOTA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const SOUTH_DAKOTA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const NEBRASKA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const IOWA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const MINNESOTA_COUNTY_CONTENT_UPDATED = '2026-06-25';
export const WISCONSIN_COUNTY_CONTENT_UPDATED = '2026-06-25';

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
        This {countyLabel}, {stateName} guide is researched by our local markets team. Every
        listed carrier is screened for valid USDOT/MC numbers against{' '}
        <a
          href="https://safer.fmcsa.dot.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
        >
          FMCSA SAFER
        </a>
        . Review schema appears only for directory-linked movers with named, attributable
        Google reviews — never fabricated testimonials.{' '}
        <Link href="/resources/how-to-choose#reputation-score" className="text-primary font-medium hover:underline">
          See how we score movers
        </Link>
        .
      </p>
      <p className="text-xs text-muted-foreground mt-3">
        Last reviewed: {formatted}. Licensing status changes — verify current FMCSA authority on{' '}
        <Link href="/verify-dot" className="text-primary hover:underline">
          our USDOT lookup tool
        </Link>{' '}
        before paying deposits.
      </p>
    </section>
  );
}