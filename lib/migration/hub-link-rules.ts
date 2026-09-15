/**
 * Slug/path data feeding the redirect-migration source of truth (hub-redirects.ts).
 */

/** Move marketing resources live at /resources/* (not /insurance/resources). */
export const MOVE_RESOURCE_SLUGS = new Set([
  'move-size-weight',
  'interstate-moving-costs',
  'best-time-to-move',
  'how-to-choose',
  'packing-checklist',
  'checklist',
  'carrier-vs-broker',
  'interstate-moving-insurance',
  'fmcsa',
  'scams',
  'routes',
]);

export const INSURANCE_CALCULATOR_SLUGS = new Set([
  'premium-estimator',
  'medicare-gap',
  'aca-subsidy',
]);

export const LENDER_CALCULATOR_SLUG_MAP: Record<string, string> = {
  'mortgage-payment': 'payment',
  payment: 'payment',
  piti: 'payment',
  affordability: 'affordability',
  refinance: 'refinance',
  va: 'payment',
  amortization: 'amortization',
  'rent-vs-buy': 'rent-vs-buy',
  heloc: 'heloc',
  'down-payment': 'down-payment',
  rental: 'rental',
  dti: 'dti',
  closing: 'closing',
  compare: 'compare',
};
