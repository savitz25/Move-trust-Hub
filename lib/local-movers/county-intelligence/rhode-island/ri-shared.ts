import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const RI_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Rhode Island regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Rhode Island Division of Public Utilities and Carriers (DPUC)
 * Motor Carriers Division household goods certificate; Bill of Lading required.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode MA DPU, CT CTDOT, NH RSA 359-T, ME BMV, NJ credentials.
 */
export const RI_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'RI DPUC — Moving information',
    href: 'https://ripuc.ri.gov/utility-information/motor-carriers/moving-information',
    external: true,
    note: 'Consumer moving information and licensed-mover guidance',
  },
  {
    label: 'RI DPUC — Motor Carriers Division jurisdiction',
    href: 'https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division',
    external: true,
    note: 'Motor Carriers Division responsibilities and jurisdiction',
  },
  {
    label: 'FMCSA SAFER — interstate authority',
    href: 'https://safer.fmcsa.dot.gov/',
    external: true,
    note: 'Required when the move crosses state lines',
  },
  {
    label: 'FMCSA — Protect Your Move',
    href: 'https://www.fmcsa.dot.gov/protect-your-move',
    external: true,
    note: 'Federal consumer protection for interstate household goods',
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
    label: 'All Rhode Island local mover guides',
    href: '/local-movers/rhode-island',
  },
];

export const RI_REG_BULLET = {
  title: 'Intrastate RI DPUC household goods certificate vs interstate FMCSA',
  detail:
    'Household goods movers operating for hire within Rhode Island generally need a certificate from the Rhode Island Division of Public Utilities and Carriers (DPUC) Motor Carriers Division. Applicants must prove fitness, willingness, and ability to provide the proposed service. DPUC publishes licensed moving company lists and consumer moving information; carriers must provide a Bill of Lading as receipt and contract for household goods transportation. Match the legal name on the estimate to active DPUC licensed household goods carrier status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery, and a USDOT alone is not Rhode Island intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 RI defaults. */
export function finalizeRiPack(
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
    ...RI_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'rhode-island',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? RI_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
