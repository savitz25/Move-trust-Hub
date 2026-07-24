import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MI_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Michigan regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Michigan motor carrier / household goods authority via MSP CVED (Motor Carrier Act).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/OH PUCO/IL ICC/PA PUC/CO PUC/WA UTC credentials.
 */
export const MI_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Michigan MSP CAP — authority search',
    href: 'https://mspcapsearch.state.mi.us/',
    external: true,
    note: 'Verify active Michigan motor carrier / household goods authority',
  },
  {
    label: 'MSP CVED — motor carrier regulatory resources',
    href: 'https://www.michigan.gov/msp/divisions/cved/regulatory',
    external: true,
    note: 'Intrastate household goods / motor carrier consumer guidance',
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
    label: 'All Michigan local mover guides',
    href: '/local-movers/michigan',
  },
];

export const MI_REG_BULLET = {
  title: 'Intrastate Michigan motor carrier authority vs interstate FMCSA',
  detail:
    'Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Michigan intrastate authority alone does not authorize interstate delivery, and a USDOT alone is not Michigan intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MI defaults. */
export function finalizeMiPack(
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
    ...MI_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'michigan',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MI_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
