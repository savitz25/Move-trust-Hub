export const PA_MOVE_INTEL_VERSION = 'move-pa-state-intel-v1' as const;
export const PA_MOVE_PUBLIC_PATH = '/pennsylvania' as const;
export const PA_MOVE_PUBLIC_FINGERPRINT =
  '1f8b97db78233d0a89fcab02bb92c8ff51633ba69da993ecc6eea79c985d88b3';

export const PENNSYLVANIA_INTELLIGENCE_GATE = {
  path: PA_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'Pennsylvania Moving & Household Goods Intelligence | MoveTrustHub',
  description:
    'Research Pennsylvania PUC active Household Goods carriers, Utility Code versus Carrier ID, insurance filings, and docket metadata. PA PUC authority is not FMCSA interstate authority. Not a ranking or Trust Score.',
} as const;

export const PA_PUC_HHG_LIST =
  'https://www.puc.pa.gov/motor-carrier/limos-taxis-movers/';
export const PA_PUC_INSURANCE = 'https://www.puc.pa.gov/motor-carrier/insurance/';
export const PA_PUC_COMPLAINTS = 'https://www.puc.pa.gov/complaints/';
export const PA_PUC_MOTOR = 'https://www.puc.pa.gov/motor-carrier/';
