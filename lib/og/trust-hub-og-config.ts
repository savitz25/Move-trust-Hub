export type OgVertical = 'move' | 'lender' | 'insurance';

export type TrustHubOgConfig = {
  vertical: OgVertical;
  alt: string;
  headline: string;
  subHeadline: string;
  supportingText: string;
  domain: string;
  trustBadges: string[];
};

export const MOVE_OG_CONFIG: TrustHubOgConfig = {
  vertical: 'move',
  alt: 'Move Trust Hub — Free Moving Calculator & FMCSA-Licensed Mover Directory',
  headline: 'Free Moving Calculator',
  subHeadline: 'Estimate Cubic Feet • Weight • Truck Size Instantly',
  supportingText: 'Compare FMCSA-Licensed Movers • Independent Directory • No Lead Fees',
  domain: 'www.movetrusthub.com',
  trustBadges: ['FMCSA', 'Google', 'BBB Verified', 'Attributed Reviews'],
};

export const LENDER_OG_CONFIG: TrustHubOgConfig = {
  vertical: 'lender',
  alt: 'Move Trust Hub Lender — Compare Trusted Mortgage Lenders',
  headline: 'Compare Trusted Lenders',
  subHeadline: 'Get the Best Rates & Fast Pre-Approval for Your Move',
  supportingText: 'Independent Lender Directory • Verified • Transparent Terms',
  domain: 'www.movetrusthub.com/lender',
  trustBadges: ['NMLS Verified', 'Transparent Terms', 'Independent'],
};

export const INSURANCE_OG_CONFIG: TrustHubOgConfig = {
  vertical: 'insurance',
  alt: 'Move Trust Hub Insurance — Protect Your Move & Home',
  headline: 'Protect Your Move & Home',
  subHeadline: 'Compare Comprehensive Insurance Options with Confidence',
  supportingText: 'Full-Value Protection • Verified Providers • Peace of Mind',
  domain: 'www.movetrusthub.com/insurance',
  trustBadges: ['Verified Providers', 'Full-Value Protection', 'Peace of Mind'],
};