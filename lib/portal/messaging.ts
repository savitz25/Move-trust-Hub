/** Brand-aligned copy for the Verified Mover Portal. */

export const PORTAL_NAME = 'Verified Mover Portal';
export const PORTAL_TAGLINE = "You've earned your reputation. Now own it.";

export const PORTAL_PROMISES = [
  'Free forever',
  'No lead fees',
  'No paid placements',
  'Verified owners can respond to reviews and keep their listing accurate',
] as const;

export const PORTAL_CANNOT = [
  'Pay for higher rankings or placement',
  'Edit your reputation score',
  'Remove legitimate customer reviews',
] as const;

export const CLAIM_CTA_LABEL = 'Is this your company? Claim this profile';
export const CLAIM_CTA_SHORT = 'Claim profile';

export const OWNER_RESPONSE_BADGE = 'Verified Owner';
export const DISPUTE_UNDER_REVIEW_TAG = 'Under Review';

export const DISPUTE_CATEGORIES = [
  {
    id: 'mistaken_identity' as const,
    label: 'Mistaken identity',
    description: 'This review is about a different company or person.',
  },
  {
    id: 'fraud' as const,
    label: 'Fraud or fake review',
    description: 'Clear evidence the review is fabricated or coordinated.',
  },
  {
    id: 'harassment' as const,
    label: 'Harassment or threats',
    description: 'Content that harasses, threatens, or doxxes staff.',
  },
  {
    id: 'not_a_customer' as const,
    label: 'Not a customer',
    description: 'Reviewer never hired this company for a move.',
  },
  {
    id: 'other_policy' as const,
    label: 'Other policy violation',
    description: 'Clear violation of Move Trust Hub review policy.',
  },
] as const;

export type DisputeCategoryId = (typeof DISPUTE_CATEGORIES)[number]['id'];

export const REPUTATION_SYNC_COOLDOWN_DAYS = 30;
export const REPUTATION_AUTO_QUARTERLY_DAYS = 90;
