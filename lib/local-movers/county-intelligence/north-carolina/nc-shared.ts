import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const NC_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const NC_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'North Carolina Utilities Commission (NCUC)',
    href: 'https://www.ncuc.gov/',
    external: true,
    note: 'Intrastate household goods mover certification & consumer resources',
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
    label: 'All North Carolina local mover guides',
    href: '/local-movers/north-carolina',
  },
];

/** Wrap a county-specific pack with locked Tier-1 NC defaults. */
export function finalizeNcPack(
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
    ...NC_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  return {
    ...pack,
    stateSlug: 'north-carolina',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? NC_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${pack.hubTitle.replace(/ Moving Intelligence Hub$/, '')} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify NCUC certification for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
