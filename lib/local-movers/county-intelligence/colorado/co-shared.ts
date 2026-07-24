import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const CO_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Colorado regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Colorado Public Utilities Commission (PUC) household goods permit (HHG)
 * under Title 40, Article 10.1, C.R.S.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/CA/FL/TX/NY/GA/NC/IL/VA/PA/OH credentials.
 */
export const CO_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Colorado PUC — Household goods movers',
    href: 'https://puc.colorado.gov/movers',
    external: true,
    note: 'Intrastate household goods permit framework',
  },
  {
    label: 'Colorado PUC — Consumer info for movers',
    href: 'https://puc.colorado.gov/household-goods-movers-consumer-info',
    external: true,
    note: 'Written estimate & consumer guidance',
  },
  {
    label: 'Colorado PUC — Permit search',
    href: 'https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form',
    external: true,
    note: 'Verify active HHG permit by legal name',
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
    label: 'All Colorado local mover guides',
    href: '/local-movers/colorado',
  },
];

export const CO_REG_BULLET = {
  title: 'Intrastate Colorado PUC HHG permit vs interstate FMCSA',
  detail:
    'Moves entirely within Colorado by household goods carriers generally require a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit under Title 40, Article 10.1, C.R.S. Match the legal name on the estimate to the Colorado PUC permit search before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Colorado PUC HHG permit alone does not authorize interstate delivery, and a USDOT alone is not Colorado intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 CO defaults. */
export function finalizeCoPack(
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
    ...CO_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ City and County$/, '');

  return {
    ...pack,
    stateSlug: 'colorado',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? CO_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
