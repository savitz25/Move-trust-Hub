export const GA_MOVE_INTEL_VERSION = 'move-ga-state-intel-v1' as const;
export const GA_MOVE_PUBLIC_PATH = '/georgia' as const;
export const GA_MOVE_PUBLIC_FINGERPRINT =
  '5619950c36c6cdd7b3f6df516585920c2c7aa245c2a2e82b4f03bc1ec4275e6b';

export const GEORGIA_INTELLIGENCE_GATE = {
  path: GA_MOVE_PUBLIC_PATH,
  robotsIndex: true,
  sitemap: true,
  title: 'Georgia Moving & Household Goods Intelligence | MoveTrustHub',
  description:
    'Research the Georgia DPS licensed household-goods movers list and Maximum Rate Tariff No. 7. A Georgia certificate is not FMCSA interstate authority. Not a ranking or Trust Score.',
} as const;

export const GA_DPS_LIST = 'https://regulatorycompliance.gamccd.net/public/';
export const GA_DPS_GUIDE = 'https://www.gamccd.net/HouseholdGoods.aspx';
export const GA_DPS_TARIFF = 'https://www.gamccd.net/Documents/Household%20Goods%20MRT%20No.7.pdf';
export const GA_DPS_RULES = 'https://rules.sos.ga.gov/gac/570-38-3';
