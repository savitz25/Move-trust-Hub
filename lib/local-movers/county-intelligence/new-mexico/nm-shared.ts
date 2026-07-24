import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const NM_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const NM_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'NMDOT TRB — Household goods moving',
    href: 'https://www.dot.nm.gov/trb/household-goods-moving/',
    external: true,
    note: 'Intrastate household goods / motor carrier consumer regulation',
  },
  {
    label: 'NMDOT — Transportation Regulation Bureau',
    href: 'https://www.dot.nm.gov/trb/',
    external: true,
    note: 'Statewide TRB motor carrier / HHG framework',
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
    label: 'All New Mexico local mover guides',
    href: '/local-movers/new-mexico',
  },
];

export function finalizeNmPack(
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
    ...NM_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'new-mexico',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? NM_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
