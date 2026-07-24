import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MO_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Missouri regulatory resources for Tier-1 county packs.
 * Intrastate HHG: MoDOT Motor Carrier Services household goods operating authority.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode IL ICC, KS, TN, AR, NJ, MN, SC Class E credentials.
 */
export const MO_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'MoDOT — Household goods transport',
    href: 'https://www.modot.org/HHGoods',
    external: true,
    note: 'Missouri HHG operating authority framework (MCS)',
  },
  {
    label: 'MoDOT — Motor Carrier Services',
    href: 'https://www.modot.org/mcs',
    external: true,
    note: 'Intrastate authority & carrier programs',
  },
  {
    label: 'MoDOT — Intrastate operating authority',
    href: 'https://www.modot.org/MOPA',
    external: true,
    note: 'How carriers obtain Missouri authority',
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
    label: 'All Missouri local mover guides',
    href: '/local-movers/missouri',
  },
];

export const MO_REG_BULLET = {
  title: 'Intrastate MoDOT household goods authority vs interstate FMCSA',
  detail:
    'Moves entirely within Missouri by household goods carriers generally require operating authority from MoDOT Motor Carrier Services before operating in or between Missouri municipalities and related intrastate household goods service. Match the legal name on the estimate to MoDOT MCS household goods resources and insist on free written estimates before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. MoDOT household goods authority alone does not authorize interstate delivery, and a USDOT alone is not Missouri intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MO defaults. */
export function finalizeMoPack(
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
    ...MO_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'missouri',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MO_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify MoDOT household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
