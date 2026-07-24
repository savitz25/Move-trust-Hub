import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MS_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Mississippi regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Mississippi Department of Transportation (MDOT) household goods
 * Certificate of Public Convenience and Necessity pathways (Motor Carrier Division).
 * Interstate: FMCSA USDOT/MC.
 * Aligns with state resource hub MDOT framing (not AL APSC / LA LPSC / NJ).
 */
export const MS_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'MDOT — Household goods and passenger carriers guidelines',
    href: 'https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Guidelines.pdf',
    external: true,
    note: 'Intrastate HHG Certificate of Convenience and Necessity pathways',
  },
  {
    label: 'Mississippi Department of Transportation',
    href: 'https://mdot.ms.gov/',
    external: true,
    note: 'Motor carrier programs and traveler resources',
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
    label: 'All Mississippi local mover guides',
    href: '/local-movers/mississippi',
  },
];

export const MS_REG_BULLET = {
  title: 'Intrastate MDOT household goods authority vs interstate FMCSA',
  detail:
    'Carriers transporting household goods within Mississippi generally must complete Mississippi Department of Transportation (MDOT) household goods carrier application frameworks and hold appropriate Certificate of Public Convenience and Necessity authority with required insurance documentation. Match the legal name on the estimate to MDOT household goods authority resources and insist on written estimates before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Mississippi household goods authority alone does not authorize interstate delivery, and a USDOT alone is not Mississippi intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MS defaults. */
export function finalizeMsPack(
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
    ...MS_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'mississippi',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MS_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify MDOT household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
