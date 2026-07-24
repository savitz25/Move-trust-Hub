import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const TN_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

export const TN_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Tennessee Department of Revenue — motor carrier / intrastate',
    href: 'https://www.tn.gov/revenue.html',
    external: true,
    note: 'Intrastate for-hire motor carrier authority & consumer resources',
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
    label: 'All Tennessee local mover guides',
    href: '/local-movers/tennessee',
  },
];

/** Wrap a county-specific pack with locked Tier-1 TN defaults. */
export function finalizeTnPack(
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
    ...TN_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  return {
    ...pack,
    stateSlug: 'tennessee',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? TN_SECTION_ORDER,
    resources: {
      title:
        pack.resources?.title ??
        `Useful ${pack.hubTitle.replace(/ Moving Intelligence Hub$/, '')} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Tennessee intrastate motor carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
