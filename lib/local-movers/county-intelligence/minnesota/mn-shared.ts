import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MN_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Minnesota regulatory resources for Tier-1 county packs.
 * Intrastate HHG: MnDOT Household Goods Mover Permit (OFCVO / Minn. Stat. §221.121).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode WI / IL ICC / WA UTC / NJ / OR ODOT / ND / SD credentials.
 */
export const MN_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'MnDOT — Household goods movers',
    href: 'https://www.dot.state.mn.us/cvo/household-goods.html',
    external: true,
    note: 'Minnesota HHG permit framework (OFCVO)',
  },
  {
    label: 'MnDOT OFCVO — Carrier search tools',
    href: 'https://mnitservices.my.site.com/license/MCISSearchBox?AgencyVar=OFCVO',
    external: true,
    note: 'Confirm active household goods permit status',
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
    label: 'All Minnesota local mover guides',
    href: '/local-movers/minnesota',
  },
];

export const MN_REG_BULLET = {
  title: 'Intrastate MnDOT household goods permit vs interstate FMCSA',
  detail:
    'Moves entirely within Minnesota by for-hire household goods carriers generally require a current Household Goods Mover Permit from the Minnesota Department of Transportation (MnDOT) Office of Freight and Commercial Vehicle Operations under Minn. Stat. §221.121 frameworks. Match the legal name on the estimate to MnDOT OFCVO carrier-search tools before you deposit, and confirm insurance and tariff disclosures as required. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Minnesota HHG permit alone does not authorize interstate delivery, and a USDOT alone is not Minnesota intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MN defaults. */
export function finalizeMnPack(
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
    ...MN_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'minnesota',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MN_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify MnDOT household goods mover permit status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
