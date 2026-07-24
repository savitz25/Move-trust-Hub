import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const AL_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const AL_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'APSC — Motor Carrier Services',
    href: 'https://psc.alabama.gov/motor-carrier-section/',
    external: true,
    note: 'Intrastate household goods / motor carrier authority',
  },
  {
    label: 'APSC — Intrastate authority applications & forms',
    href: 'https://psc.alabama.gov/motor-carrier-applications-forms/',
    external: true,
    note: 'Certificate and application resources',
  },
  {
    label: 'FMCSA SAFER — interstate authority',
    href: 'https://safer.fmcsa.dot.gov/',
    external: true,
    note: 'Required when the move crosses state lines',
  },
  {
    label: 'Move Trust Hub — verify a USDOT',
    href: '/verify-dot',
    note: 'Cross-check interstate licensing before deposits',
  },
  {
    label: 'Free moving calculator',
    href: '/moving-calculator',
    note: 'Inventory-based volume for local or long-distance',
  },
  {
    label: 'All Alabama local mover guides',
    href: '/local-movers/alabama',
  },
];

export function finalizeAlPack(
  pack: Omit<
    CountyIntelligencePack,
    'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder'
  > &
    Partial<Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder'>>
): CountyIntelligencePack {
  const localResources = pack.resources?.items ?? [];
  const seen = new Set(localResources.map((r) => r.href));
  const merged = [
    ...localResources,
    ...AL_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'alabama',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? AL_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
