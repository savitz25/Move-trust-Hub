import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const SD_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const SD_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'South Dakota consumer moving guidance',
    href: 'https://consumer.sd.gov/fastfacts/moving.aspx',
    external: true,
    note: 'Consumer protection tips for local and interstate moves',
  },
  {
    label: 'SD DOR — Motor Carrier Services',
    href: 'https://dor.sd.gov/businesses/motor-vehicle/motor-carrier-services/',
    external: true,
    note: 'Commercial motor carrier frameworks',
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
    label: 'All South Dakota local mover guides',
    href: '/local-movers/south-dakota',
  },
];

export function finalizeSdPack(
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
    ...SD_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'south-dakota',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? SD_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. South Dakota does not use a dedicated household-goods certificate board like North Dakota — insist on insurance and written estimates for in-state jobs, and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
