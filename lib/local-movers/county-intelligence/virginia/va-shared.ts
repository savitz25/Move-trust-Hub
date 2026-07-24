import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const VA_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Virginia regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Virginia DMV Motor Carrier Services — Household Goods Carrier /
 * Certificate of Fitness for longer in-state moves (commonly ~31+ road miles) and
 * Property Carrier framing for shorter local moves (commonly ~30 miles or less).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/CA/FL/TX/NY/GA/NC/SC/TN credentials.
 */
export const VA_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Virginia DMV — Household goods carrier',
    href: 'https://www.dmv.virginia.gov/businesses/motor-carriers/intrastate/house-goods',
    external: true,
    note: 'Intrastate household goods carrier requirements',
  },
  {
    label: 'Virginia DMV — Motor carriers',
    href: 'https://www.dmv.virginia.gov/businesses/motor-carriers',
    external: true,
    note: 'Motor carrier services & consumer guidance',
  },
  {
    label: 'Code of Virginia — Household goods carriers (Article 4)',
    href: 'https://law.lis.virginia.gov/vacodefull/title46.2/chapter21/article4/',
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
    label: 'All Virginia local mover guides',
    href: '/local-movers/virginia',
  },
];

export const VA_REG_BULLET = {
  title: 'Intrastate VA DMV household goods authority vs interstate FMCSA',
  detail:
    'Moves entirely within Virginia are generally regulated through Virginia DMV Motor Carrier Services. Longer in-state household goods hauls (commonly described around 31+ road miles) typically require Household Goods Carrier authority / Certificate of Fitness frameworks; shorter local jobs (commonly described around 30 miles or less) may fall under Property Carrier-style authority. Confirm which Virginia DMV authorization covers your exact origin, destination, and road miles — distance can change the framework. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority. Match the legal name on the estimate to DMV credentials for in-state work and FMCSA SAFER for interstate work. Do not treat a USDOT alone as Virginia intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 VA defaults. */
export function finalizeVaPack(
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
    ...VA_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ City$/, '');

  return {
    ...pack,
    stateSlug: 'virginia',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? VA_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves (distance can change which framework applies) and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
