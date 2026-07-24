import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const SC_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared South Carolina regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Class E certificate under ORS / PSC transportation framework.
 * Interstate: FMCSA USDOT/MC. Do not hardcode NJ/CA/FL/TX/NY/GA/NC credentials.
 */
export const SC_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'SC ORS — Class E (household goods)',
    href: 'https://ors.sc.gov/regulated-utilities/transportation/class-e',
    external: true,
    note: 'Intrastate household goods Class E certificate framework',
  },
  {
    label: 'SC ORS — Transportation FAQs',
    href: 'https://ors.sc.gov/consumers/transportation/transportation-faqs',
    external: true,
    note: 'Consumer verification & complaint guidance',
  },
  {
    label: 'SC ORS — Transportation',
    href: 'https://ors.sc.gov/regulated-utilities/transportation',
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
    label: 'All South Carolina local mover guides',
    href: '/local-movers/south-carolina',
  },
];

export const SC_REG_BULLET = {
  title: 'Intrastate SC Class E authority vs interstate FMCSA',
  detail:
    'Moves entirely within South Carolina are generally subject to Class E household-goods certification under the Office of Regulatory Staff (ORS) / PSC transportation framework. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority. Match the legal name on the estimate to ORS Class E records for in-state jobs and FMCSA SAFER for interstate jobs — do not treat a USDOT alone as SC intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 SC defaults. */
export function finalizeScPack(
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
    ...SC_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const countyLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'south-carolina',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? SC_SECTION_ORDER,
    resources: {
      title:
        pack.resources?.title ?? `Useful ${countyLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
