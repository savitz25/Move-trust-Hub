export const MA_MOVE_INTEL_VERSION = 'move-ma-state-intel-v1' as const;
export const MA_MOVE_PUBLIC_PATH = '/massachusetts' as const;
export const MA_MOVE_PUBLIC_FINGERPRINT =
  '4d716b593ec05ba56cdf69c87a33d307aa941ead0bf3967074b8dacc1a7d92ff';

export const MASSACHUSETTS_INTELLIGENCE_GATE = {
  path: MA_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'Massachusetts Moving & Household Goods Intelligence | MoveTrustHub',
  description:
    'Research the Massachusetts DPU list of regulated household-goods movers and their filed tariffs. A DPU certificate is intrastate authority, not FMCSA interstate authority. Not a ranking or Trust Score.',
} as const;

export const MA_DPU_LIST =
  'https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu';
export const MA_DPU_GUIDE = 'https://www.mass.gov/guides/moving-within-massachusetts';
export const MA_DPU_COMPLAINT_FORM =
  'https://www.mass.gov/forms/file-a-complaint-against-a-bus-moving-or-towing-company';
export const MA_DPU_DIVISION = 'https://www.mass.gov/orgs/transportation-oversight-division';
