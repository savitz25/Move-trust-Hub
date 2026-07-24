import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const AR_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const AR_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'ArDOT — Arkansas Intrastate Authority',
    href: 'https://ardot.gov/divisions/legal/arkansas-intrastate-authority/',
    external: true,
    note: 'Intrastate for-hire motor carrier / household goods authority',
  },
  {
    label: 'ArDOT — Intrastate authority applications',
    href: 'https://ardot.gov/divisions/legal/arkansas-intrastate-authority/applications/',
    external: true,
    note: 'Application and certificate resources',
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
    label: 'All Arkansas local mover guides',
    href: '/local-movers/arkansas',
  },
];

export function finalizeArPack(
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
    ...AR_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];
  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'arkansas',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? AR_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify ArDOT Arkansas Intrastate Operating Authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
