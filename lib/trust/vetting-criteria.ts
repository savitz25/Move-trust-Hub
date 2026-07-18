/**
 * Public mover vetting criteria — what we actually check before listing.
 * Keep factual; only claim filters the product applies.
 */
export type VettingCriterion = {
  id: string;
  title: string;
  detail: string;
};

/** Canonical public explainer (hash matches METHODOLOGY_ANCHORS.vetting). */
export const HOW_WE_VET_HREF = '/about/how-we-score-movers#how-we-vet';

export const MOVER_VETTING_CRITERIA: readonly VettingCriterion[] = [
  {
    id: 'usdot-mc',
    title: 'Valid USDOT and MC numbers',
    detail:
      'We require a real USDOT number that passes format checks. Placeholder, sequential, or fabricated numbers are excluded from the public directory.',
  },
  {
    id: 'authority',
    title: 'Active operating authority',
    detail:
      'For verified listings we confirm the carrier shows active interstate authority in public FMCSA SAFER data (not revoked or inactive).',
  },
  {
    id: 'insurance',
    title: 'Insurance on file (FMCSA)',
    detail:
      'Interstate authority generally requires cargo and liability insurance on file with FMCSA. We surface safety/authority status from SAFER so you can re-check before booking.',
  },
  {
    id: 'out-of-service',
    title: 'No active federal out-of-service order',
    detail:
      'Carriers flagged out of service or with critical authority alerts are not presented as “FMCSA Verified.” Serious SAFER flags are highlighted when we detect them.',
  },
  {
    id: 'curated-not-scraped',
    title: 'Curated listings — not a raw scrape',
    detail:
      'We do not dump every name from public web scrapes. Listings must pass license checks; many region placeholders and generated template IDs are filtered out of public rankings.',
  },
  {
    id: 'reviews',
    title: 'Attributed reviews kept separate',
    detail:
      'Named Google review excerpts we publish are counted honestly and never mixed with industry-wide review totals from third-party sites.',
  },
] as const;

export const HOW_WE_VET_LABEL = 'See how we vet our movers';

export const HOW_WE_VET_INTRO =
  'Move Trust Hub is a curated research directory. Before a mover earns a verified listing, we apply the checks below using public FMCSA data and editorial filters.';
