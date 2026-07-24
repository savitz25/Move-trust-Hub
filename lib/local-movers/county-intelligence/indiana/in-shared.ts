import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const IN_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Indiana regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Indiana DOR Motor Carrier Services Certificate of Public Convenience and Necessity (IC 8-2.1-22).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode OH PUCO / IL ICC / MI MSP / NJ credentials.
 */
export const IN_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Indiana DOR — Intrastate household goods operating authority',
    href: 'https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/',
    external: true,
    note: 'Certificate of Public Convenience and Necessity (IC 8-2.1-22)',
  },
  {
    label: 'Indiana DOR — Motor Carrier Services',
    href: 'https://www.in.gov/dor/motor-carrier-services/',
    external: true,
    note: 'Forms, insurance, and carrier resources',
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
    label: 'All Indiana local mover guides',
    href: '/local-movers/indiana',
  },
];

export const IN_REG_BULLET = {
  title: 'Intrastate Indiana DOR HHG authority vs interstate FMCSA',
  detail:
    'Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Indiana operating authority alone does not authorize interstate delivery, and a USDOT alone is not Indiana intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 IN defaults. */
export function finalizeInPack(
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
    ...IN_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'indiana',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? IN_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
