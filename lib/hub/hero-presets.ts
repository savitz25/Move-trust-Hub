import type { HubId } from '@/lib/hub/types';

export type HubHeroPreset = {
  sectionLabel: string;
  iconLabel: string;
  accentText: string;
  ringGradient: string;
};

export const HUB_HERO_PRESETS: Record<HubId, HubHeroPreset> = {
  move: {
    sectionLabel: 'Moving Trust Hub',
    iconLabel: 'Interstate moving illustration',
    accentText: 'text-primary',
    ringGradient: 'from-brand-blue/25 via-white to-brand-cyan/20',
  },
  lender: {
    sectionLabel: 'Lending Trust Hub',
    iconLabel: 'Mortgage lending illustration',
    accentText: 'text-[#3B82F6]',
    ringGradient: 'from-[#3B82F6]/20 via-white to-emerald-400/15',
  },
  insurance: {
    sectionLabel: 'Insurance Trust Hub',
    iconLabel: 'Insurance protection illustration',
    accentText: 'text-emerald-600',
    ringGradient: 'from-emerald-500/20 via-white to-teal-400/15',
  },
};