import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const UT_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const UT_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'UDOT — Motor carrier registration & credentials',
    href: 'https://connect.udot.utah.gov/business/motor-carriers/motor-carrier-registration-credentials/',
    external: true,
    note: 'Intrastate motor carrier registration frameworks',
  },
  {
    label: 'UDOT — Motor carrier insurance requirements',
    href: 'https://connect.udot.utah.gov/business/motor-carriers/motor-carrier-registration-credentials/motor-carrier-insurance-requirements-mcs-90/',
    external: true,
    note: 'Insurance / MCS-90 consumer-facing resources',
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
    label: 'All Utah local mover guides',
    href: '/local-movers/utah',
  },
];

export function finalizeUtPack(
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
    ...UT_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'utah',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? UT_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify UDOT motor carrier credentials and insurance for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
