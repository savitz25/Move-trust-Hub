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

export {
  ATTRIBUTED_REVIEWS_EXPLANATION,
  formatAttributedReviewsLabel,
  METHODOLOGY_PAGE_PATH,
  methodologyHref,
} from '@/lib/trust/site-stats';

export const VERIFICATION_BADGE_LEGEND = [
  {
    id: 'directory',
    label: 'Directory Verified',
    description:
      'Listed with an active FMCSA-licensed USDOT/MC record from our DOT data sync — not a paid placement.',
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
    id: 'bbb-verified',
    label: 'BBB Verified',
    description:
      'Confirmed BBB business listing from our most recent public scrape or BBB API check — includes rating when available. When no BBB listing is confirmed, no BBB badge is shown.',
  },
  {
    id: 'google',
    label: 'Google Rating',
    description: 'Public Google Business rating snapshot — confirm independently on Google Maps.',
  },
] as const;