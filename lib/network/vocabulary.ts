/**
 * Shared network vocabulary for UI labels.
 * Keep short; vertical methodology pages carry depth.
 */

import {
  ASK_NETWORK_OWNERSHIP_SHORT,
  ASK_NETWORK_STANDARD_LABEL,
} from '@/lib/network/standard-version';

export const NETWORK_VOCAB = {
  standardName: ASK_NETWORK_STANDARD_LABEL,
  /** @deprecated Prefer ownershipShort — kept as alias for gradual cleanup */
  independentlyOperated: ASK_NETWORK_OWNERSHIP_SHORT,
  ownershipShort: ASK_NETWORK_OWNERSHIP_SHORT,
  noPaidPlacements: 'No paid placements',
  verifyPrimaryRegulator: 'Verify with the primary regulator',
  relatedResearch: 'Related research in the Ask Trust Hub network',
} as const;

export type NetworkVocabKey = keyof typeof NETWORK_VOCAB;
