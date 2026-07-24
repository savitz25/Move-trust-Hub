import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const LA_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const LA_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'LPSC — Household goods moving (consumers)',
    href: 'https://www.lpsc.louisiana.gov/Carrier_HGM',
    external: true,
    note: 'Intrastate household goods common carrier certificate framework',
  },
  {
    label: 'LPSC — Registered household goods mover search',
    href: 'https://lpscpubvalence.lpsc.louisiana.gov/portal/lpsc-web-portal',
    external: true,
    note: 'Verify active Louisiana registration / good standing',
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
    label: 'All Louisiana local mover guides',
    href: '/local-movers/louisiana',
  },
];

export function finalizeLaPack(
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
    ...LA_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ Parish$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'louisiana',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? LA_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} Parish resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
