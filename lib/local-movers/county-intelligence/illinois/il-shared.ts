import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const IL_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Illinois regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Illinois Commerce Commission (ICC) Household Goods license.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/CA/FL/TX/NY/GA/NC/SC/TN/VA/PA credentials.
 */
export const IL_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Illinois — Household Goods Movers',
    href: 'https://www.illinois.gov/services/service.household-goods-movers.html',
    external: true,
    note: 'State service page for household goods movers',
  },
  {
    label: 'ICC motor carrier / household goods search',
    href: 'https://www.icc.illinois.gov/emdb/mcis/search',
    external: true,
    note: 'Search licensed household goods movers & related records',
  },
  {
    label: 'Illinois Commerce Commission',
    href: 'https://www.icc.illinois.gov/',
    external: true,
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
    label: 'All Illinois local mover guides',
    href: '/local-movers/illinois',
  },
];

export const IL_REG_BULLET = {
  title: 'Intrastate Illinois ICC household goods authority vs interstate FMCSA',
  detail:
    'Moves entirely within Illinois by for-hire household goods carriers generally require an Illinois Commerce Commission (ICC) Household Goods license. Match the legal name on the estimate to ICC motor carrier / household goods search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An ICC household goods license alone does not authorize interstate delivery, and a USDOT alone is not Illinois intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 IL defaults. */
export function finalizeIlPack(
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
    ...IL_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'illinois',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? IL_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
