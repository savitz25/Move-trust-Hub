/** Single source of truth for Reputation Score methodology (E-E-A-T). */

export const REPUTATION_SCORE_FACTORS = [
  {
    id: 'reviews',
    label: 'Review volume & recency',
    weight: '30%',
    detail:
      'Named, attributable reviews with enough volume to be meaningful. We prioritize recent feedback from the last 24 months.',
  },
  {
    id: 'fmcsa',
    label: 'FMCSA safety & complaints',
    weight: '25%',
    detail:
      'USDOT authority status, safety rating, and complaint-to-shipment ratio from public FMCSA records.',
  },
  {
    id: 'longevity',
    label: 'Years in business',
    weight: '15%',
    detail:
      'Operating history and stability for interstate household goods moves.',
  },
  {
    id: 'bbb',
    label: 'BBB accreditation',
    weight: '15%',
    detail:
      'Accreditation status and letter grade where publicly available.',
  },
  {
    id: 'trend',
    label: 'Customer trend signals',
    weight: '15%',
    detail:
      'Recent rating trajectory and consistency across review sources.',
  },
] as const;

export const REPUTATION_SCORE_THRESHOLD = 85;

export const REPUTATION_SCORE_SUMMARY =
  'Our Reputation Score is an editorial composite (0–100) — not a simple star average. Scores above 85 generally indicate safer interstate choices. We never fabricate reviews or inflate ratings.';