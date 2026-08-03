/**
 * Shared network vocabulary for UI labels (Step 4.6).
 * Keep short; vertical methodology pages carry depth.
 */

export const NETWORK_VOCAB = {
  standardName: 'Ask Trust Hub Standard',
  independentlyOperated: 'Independently operated',
  noPaidPlacements: 'No paid placements',
  verifyPrimaryRegulator: 'Verify with the primary regulator',
  relatedResearch: 'Related research in the Ask Trust Hub network',
} as const;

export type NetworkVocabKey = keyof typeof NETWORK_VOCAB;
