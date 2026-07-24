import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const WA_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Washington regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Washington Utilities and Transportation Commission (UTC) household goods permit.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/CA/FL/TX/NY/GA/NC/IL/VA/PA/OH/CO/OR credentials.
 */
export const WA_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'WA UTC — Household goods carriers',
    href: 'https://www.utc.wa.gov/MovingCompanies',
    external: true,
    note: 'Intrastate household goods permit framework',
  },
  {
    label: 'WA UTC — Choosing a licensed mover',
    href: 'https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state',
    external: true,
    note: 'Consumer guidance for in-state moves',
  },
  {
    label: 'Washington Utilities and Transportation Commission',
    href: 'https://www.utc.wa.gov/',
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
    label: 'All Washington local mover guides',
    href: '/local-movers/washington',
  },
];

export const WA_REG_BULLET = {
  title: 'Intrastate Washington UTC household goods permit vs interstate FMCSA',
  detail:
    'Moves entirely within Washington by household goods carriers generally require a valid Utilities and Transportation Commission (UTC) household goods permit — operating without one is illegal under UTC consumer guidance. Match the legal name on the estimate to UTC permitted-mover tools before you deposit, and ask for required consumer moving guide materials. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A UTC household goods permit alone does not authorize interstate delivery, and a USDOT alone is not Washington intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 WA defaults. */
export function finalizeWaPack(
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
    ...WA_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'washington',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? WA_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
