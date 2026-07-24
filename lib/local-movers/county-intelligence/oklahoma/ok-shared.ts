import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const OK_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Oklahoma regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Oklahoma Corporation Commission (OCC) Household Goods Certificate
 * (even for shipments wholly within city limits).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode TX, KS, AR, MO, NJ credentials.
 */
export const OK_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'OCC — Household goods movers',
    href: 'https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html',
    external: true,
    note: 'Intrastate Household Goods Certificate framework',
  },
  {
    label: 'Oklahoma Corporation Commission — Transportation',
    href: 'https://oklahoma.gov/occ/divisions/transportation.html',
    external: true,
    note: 'Intrastate authority & trucking programs',
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
    label: 'All Oklahoma local mover guides',
    href: '/local-movers/oklahoma',
  },
];

export const OK_REG_BULLET = {
  title: 'Intrastate OCC household goods certificate vs interstate FMCSA',
  detail:
    'Intrastate carriers of household goods in Oklahoma — even motor carriers transporting shipments wholly within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission (OCC) Transportation Division. Match the legal name on the estimate to OCC household goods resources before you deposit, and confirm vehicle certificate/stamp requirements as applicable. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An OCC household goods certificate alone does not authorize interstate delivery, and a USDOT alone is not Oklahoma intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 OK defaults. */
export function finalizeOkPack(
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
    ...OK_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'oklahoma',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? OK_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify OCC Household Goods Certificate status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
