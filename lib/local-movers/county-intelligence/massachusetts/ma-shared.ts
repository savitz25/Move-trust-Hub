import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MA_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Massachusetts regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Massachusetts Department of Public Utilities (DPU) operating certificate.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ/CA/FL/TX/NY/GA/NC/IL/VA/PA/OH/CO/WA credentials.
 */
export const MA_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Mass.gov — Moving within Massachusetts',
    href: 'https://www.mass.gov/guides/moving-within-massachusetts',
    external: true,
    note: 'Consumer guide for in-state moves',
  },
  {
    label: 'Mass.gov — Moving companies regulated by DPU',
    href: 'https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu',
    external: true,
    note: 'DPU household goods licensing framework',
  },
  {
    label: 'Mass.gov — Apply as a household goods mover',
    href: 'https://www.mass.gov/how-to/apply-to-be-a-household-goods-mover-in-massachusetts',
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
    label: 'All Massachusetts local mover guides',
    href: '/local-movers/massachusetts',
  },
];

export const MA_REG_BULLET = {
  title: 'Intrastate Massachusetts DPU operating certificate vs interstate FMCSA',
  detail:
    'Moves entirely within Massachusetts by household goods carriers generally require a current Department of Public Utilities (DPU) operating certificate. Match the legal name on the estimate to Mass.gov DPU licensed-mover resources before you deposit, and confirm the bill of lading lists the company name, address, DPU license number, and phone. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Massachusetts DPU certificate alone does not authorize interstate delivery, and a USDOT alone is not Massachusetts intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MA defaults. */
export function finalizeMaPack(
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
    ...MA_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'massachusetts',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MA_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
