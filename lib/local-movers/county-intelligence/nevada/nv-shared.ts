import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const NV_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Nevada regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Nevada Transportation Authority (NTA) Certificate of Public
 * Convenience and Necessity (CPCN) under NRS/NAC 706.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode AZ, UT, CA BHGS, CO PUC, NJ credentials.
 */
export const NV_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Nevada Transportation Authority',
    href: 'https://nta.nv.gov/',
    external: true,
    note: 'NTA household goods CPCN framework',
  },
  {
    label: 'NTA — Tariffs and certificates',
    href: 'https://nta.nv.gov/about/tariffs-and-certificates/',
    external: true,
    note: 'Verify active NTA household goods certificates',
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
    label: 'All Nevada local mover guides',
    href: '/local-movers/nevada',
  },
];

export const NV_REG_BULLET = {
  title: 'Intrastate NTA household goods CPCN vs interstate FMCSA',
  detail:
    'Moves entirely within Nevada by household goods carriers generally require a Certificate of Public Convenience and Necessity (CPCN) from the Nevada Transportation Authority under NRS/NAC 706 frameworks. Match the legal name on the estimate to NTA certificate/tariff resources before you deposit, and insist on written estimates consistent with certificated tariffs where applicable. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An NTA household goods CPCN alone does not authorize interstate delivery, and a USDOT alone is not Nevada intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 NV defaults. */
export function finalizeNvPack(
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
    ...NV_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ City$/, '');

  return {
    ...pack,
    stateSlug: 'nevada',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? NV_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
