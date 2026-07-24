import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const NH_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared New Hampshire regulatory resources for Tier-1 county packs.
 * Intrastate HHG: New Hampshire Department of Safety / Bureau household goods
 * carrier authority under RSA 359-T (permit or certificate pathways; written
 * estimates on customer request; annual HHG vehicle registration with DMV).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode MA DPU, VT, ME BMV-as-HHG-cert, CT CTDOT, NJ credentials.
 */
export const NH_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'NH.gov — Department of Safety / DMV',
    href: 'https://www.dmv.nh.gov/',
    external: true,
    note: 'Department of Safety Division of Motor Vehicles context',
  },
  {
    label: 'New Hampshire Department of Transportation',
    href: 'https://www.nh.gov/dot/',
    external: true,
    note: 'State transportation context',
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
    label: 'All New Hampshire local mover guides',
    href: '/local-movers/new-hampshire',
  },
];

export const NH_REG_BULLET = {
  title: 'Intrastate NH household goods carrier authority vs interstate FMCSA',
  detail:
    'Household goods movers operating for hire within New Hampshire generally need Household Goods Carrier authority (permit or certificate pathways) under RSA 359-T frameworks administered through the New Hampshire Department of Safety Bureau of common carriers rules. Updated guidance emphasizes written estimates on customer request, fitness-to-perform evaluations for new authority, and annual registration with the Division of Motor Vehicles for vehicles used in household goods service. Match the legal name on the estimate to active New Hampshire household goods carrier authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. New Hampshire household goods authority alone does not authorize interstate delivery, and a USDOT alone is not New Hampshire intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 NH defaults. */
export function finalizeNhPack(
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
    ...NH_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'new-hampshire',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? NH_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
