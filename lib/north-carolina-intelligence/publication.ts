export const NC_MOVE_INTEL_VERSION = 'move-nc-state-intel-v1' as const;
export const NC_MOVE_PUBLIC_PATH = '/north-carolina' as const;
export const NC_MOVE_PUBLIC_FINGERPRINT =
  '9b4becfd1d99f78abdbe79daabb0ba61571e6b6fc3e13f8fb1dc439661e46bec';

export const NORTH_CAROLINA_INTELLIGENCE_GATE = {
  path: NC_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'North Carolina Moving & Household Goods Intelligence | MoveTrustHub',
  description:
    'Research NCUC Certificate of Exemption C-numbers, T-number company/docket identities, the monthly household-goods carrier list, Maximum Rate Tariff, and insurance requirements. NCUC authority is not FMCSA interstate authority. Not a ranking or Trust Score.',
} as const;

export const NC_NCUC_HHG_LIST = 'https://www.ncuc.gov/industries/documents/carriers.pdf';
export const NC_NCUC_TRANSCAR = 'https://www.ncuc.gov/Industries/transcar.aspx';
export const NC_NCUC_MRT = 'https://www.ncuc.gov/industries/documents/maxrate.pdf';
export const NC_NCUC_MOVING_GUIDE = 'https://www.ncuc.gov/industries/transportation/movingguide.html';
export const NC_NCUC_TRANSPORTATION = 'https://www.ncuc.gov/Industries/transportation/transportation.html';
