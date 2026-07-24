import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const KS_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Kansas regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Kansas Corporation Commission (KCC) Certificate of Public
 * Convenience and Necessity + household goods tariff frameworks.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode MO, OK OCC, NE, CO PUC, IA DOT, NJ credentials.
 */
export const KS_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'KCC — Transportation',
    href: 'https://www.kcc.ks.gov/transportation',
    external: true,
    note: 'Kansas Corporation Commission motor carrier oversight',
  },
  {
    label: 'KCC — Household goods tariffs',
    href: 'https://www.kcc.ks.gov/transportation/transportation-quick-links/household-goods-tariffs',
    external: true,
    note: 'Intrastate household goods tariff resources',
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
    label: 'All Kansas local mover guides',
    href: '/local-movers/kansas',
  },
];

export const KS_REG_BULLET = {
  title: 'Intrastate KCC household goods authority vs interstate FMCSA',
  detail:
    'Household goods movers operating for hire within Kansas generally need a Certificate of Public Convenience and Necessity from the Kansas Corporation Commission (KCC) Transportation Division, with household goods tariff frameworks under commission oversight. Match the legal name on the estimate to KCC Transportation authority resources and insist on written estimates before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. KCC household goods authority alone does not authorize interstate delivery, and a USDOT alone is not Kansas intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 KS defaults. */
export function finalizeKsPack(
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
    ...KS_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'kansas',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? KS_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify KCC household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
