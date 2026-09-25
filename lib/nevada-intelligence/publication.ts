export const NV_MOVE_INTEL_VERSION = 'move-nv-state-intel-v1' as const;
export const NV_MOVE_PUBLIC_PATH = '/nevada' as const;
export const NV_MOVE_PUBLIC_FINGERPRINT =
  '4a8af0569b5d5d023dbdcd7b37ac30842158282d11e45fd7ffbfd8cfa43d4f80';

export const NEVADA_INTELLIGENCE_GATE = {
  path: NV_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'Nevada Moving & Household Goods Intelligence | MoveTrustHub',
  description:
    'Research Nevada Transportation Authority household-goods movers: CPCN numbers, status as NTA prints it, and carrier-filed tariffs. A CPCN is intrastate authority, not a USDOT or MC number. Not a ranking or Trust Score.',
} as const;

export const NV_NTA_DIRECTORY = 'https://nta.nv.gov/Carriers/Tariffs-Certificates/';
export const NV_NTA_ACTIVE_MOVERS = 'http://tsa1.nv.gov/ActiveCertificatesTable.asp?nNo=5';
export const NV_NTA_COMPLAINTS = 'https://nta.nv.gov/Forms/Complaints/';
export const NV_NTA_HHG_COMPLAINT_FORM = 'http://hal.nv.gov/form/NTA/Household_Goods_Mover_Complaint';
export const NV_NTA_NOTICES = 'https://nta.nv.gov/About/Notices/2026/2026_Notices/';
export const FMCSA_PROTECT_YOUR_MOVE = 'https://www.fmcsa.dot.gov/protect-your-move';
export const FMCSA_COMPLAINTS = 'https://nccdb.fmcsa.dot.gov/';
