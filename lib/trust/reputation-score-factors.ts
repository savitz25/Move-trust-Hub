/** Single source of truth for the mover evidence explainer (E-E-A-T). */

export const REPUTATION_SCORE_FACTORS = [
  {
    id: 'reviews',
    label: 'Review volume & recency',
    detail:
      'Named, attributable reviews with enough volume to be meaningful. We prioritize recent feedback from the last 24 months. Shown as an attributed snapshot, never converted into a TrustHub point value.',
  },
  {
    id: 'fmcsa',
    label: 'FMCSA safety & complaints',
    detail:
      'USDOT authority status, safety rating, and complaint-to-shipment ratio from public FMCSA records. Presented as source evidence — not a pass/fail grade.',
  },
  {
    id: 'longevity',
    label: 'Years in business',
    detail:
      'Operating history for interstate household goods moves, when on file.',
  },
  {
    id: 'bbb',
    label: 'BBB accreditation',
    detail:
      'Accreditation status and letter grade only when a confirmed public BBB listing exists. We do not invent BBB grades or show accreditation for companies that are not listed.',
  },
  {
    id: 'trend',
    label: 'Customer trend signals',
    detail:
      'Recent rating trajectory and consistency across review sources, shown as context — not a score input.',
  },
] as const;

export const REPUTATION_SCORE_SUMMARY =
  'We do not calculate a TrustHub score, grade, or "safer choice" ranking for movers. What you see here is the underlying evidence itself — FMCSA authority and safety records, attributed reviews, BBB status when confirmed, and business tenure — each labeled with its source. We never fabricate reviews or inflate ratings.';