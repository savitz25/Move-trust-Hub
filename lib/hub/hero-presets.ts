import type { HubId } from '@/lib/hub/types';

export type HubHeroPreset = {
  sectionLabel: string;
  iconSrc: string;
  iconAlt: string;
  accentText: string;
  ringGradient: string;
};

export const HUB_HERO_PRESETS: Record<HubId, HubHeroPreset> = {
  move: {
    sectionLabel: 'Moving Trust Hub',
    iconSrc: '/logo-icon.jpg',
    iconAlt: 'Moving Trust Hub emblem',
    accentText: 'text-primary',
    ringGradient: 'from-brand-blue/25 via-white to-brand-cyan/20',
  },
  lender: {
    sectionLabel: 'Lending Trust Hub',
    iconSrc: '/lender/brand/lender-trust-hub-icon-192.png',
    iconAlt: 'Lending Trust Hub emblem',
    accentText: 'text-[#3B82F6]',
    ringGradient: 'from-[#3B82F6]/20 via-white to-emerald-400/15',
  },
  insurance: {
    sectionLabel: 'Insurance Trust Hub',
    iconSrc: '/insurance/brand/insurance-trust-hub-icon-192.png',
    iconAlt: 'Insurance Trust Hub emblem',
    accentText: 'text-emerald-600',
    ringGradient: 'from-emerald-500/20 via-white to-teal-400/15',
  },
};