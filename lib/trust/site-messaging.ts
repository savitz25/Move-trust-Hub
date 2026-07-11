import { getSiteAttributableReviewCount } from '@/lib/trust/review-display-policy';

/** Canonical header pill shown in nav bars across Move, Lender, and Insurance hubs. */
export const HEADER_TRUST_BADGE = 'INDEPENDENT & VERIFIED DIRECTORY';

/** Hero eyebrow — same core message with transparency qualifiers. */
export const HERO_TRUST_EYEBROW =
  'INDEPENDENT & VERIFIED DIRECTORY · NO LEAD FEES · NO PAID PLACEMENTS';

export const CTA_BROWSE_VERIFIED_MOVERS = 'Browse Verified Movers';
export const CTA_COMPARE_MOVERS = 'Compare Movers';
export const CTA_COMPARE_TRUSTED_MOVERS = 'Compare Trusted Movers';

export const DIRECTORY_INDEPENDENCE_TAGLINE =
  'Independent directory — not affiliated with listed movers. We do not sell leads or match you with carriers.';

export const ATTRIBUTED_REVIEWS_EXPLANATION =
  'Named Google reviews published on Move Trust Hub for verified movers — not industry-wide or inflated totals.';

/** User-facing label for the verified on-site review count (footers, trust bars, badges). */
export function formatAttributedReviewsLabel(count?: number): string {
  const n = count ?? getSiteAttributableReviewCount();
  if (n === 0) return '0 Attributed Reviews from Verified Movers';
  if (n === 1) return '1 Attributed Review from Verified Movers';
  return `${n} Attributed Reviews from Verified Movers`;
}

export const VERIFICATION_BADGE_LEGEND = [
  {
    id: 'directory',
    label: 'Directory Verified',
    description:
      'Listed in our independent directory with a verifiable USDOT/MC record and editorial review — not a paid placement.',
  },
  {
    id: 'fmcsa',
    label: 'FMCSA Verified',
    description:
      'Active operating authority and satisfactory FMCSA safety rating based on our most recent public SAFER check.',
  },
  {
    id: 'fmcsa-warning',
    label: 'FMCSA Warning',
    description:
      'Conditional or unsatisfactory FMCSA safety rating — review the official SAFER record before booking.',
  },
  {
    id: 'fmcsa-critical',
    label: 'Authority Alert',
    description: 'Out-of-service or inactive authority flagged on the latest FMCSA check.',
  },
  {
    id: 'fmcsa-unknown',
    label: 'FMCSA Unverified',
    description: 'FMCSA record not yet refreshed or incomplete — verify licensing yourself on FMCSA.gov.',
  },
  {
    id: 'google',
    label: 'Google Rating',
    description: 'Public Google Business rating snapshot — confirm independently on Google Maps.',
  },
] as const;