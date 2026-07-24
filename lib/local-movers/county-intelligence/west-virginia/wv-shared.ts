import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const WV_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared West Virginia regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Public Service Commission of West Virginia (PSC) Motor Carrier
 * Section — Certificate of Convenience and Necessity for common carriers of
 * household goods.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode OH PUCO, PA PUC, VA DMV, KYTC, MD, NJ credentials.
 */
export const WV_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Public Service Commission of West Virginia',
    href: 'http://www.psc.state.wv.us/',
    external: true,
    note: 'PSC Motor Carrier Section household goods certificate frameworks',
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
    label: 'All West Virginia local mover guides',
    href: '/local-movers/west-virginia',
  },
];

export const WV_REG_BULLET = {
  title: 'Intrastate WV PSC household goods certificate vs interstate FMCSA',
  detail:
    'Household goods movers operating for hire within West Virginia generally need Certificate of Convenience and Necessity authority through the Public Service Commission of West Virginia (PSC) Motor Carrier Section for common carriers of household goods. Match the legal name on the estimate to active PSC Motor Carrier household goods certificate status before you deposit, and insist on written estimates that address hills, long carries, stairs, and packing. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A WV PSC household goods certificate alone does not authorize interstate delivery, and a USDOT alone is not West Virginia intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 WV defaults. */
export function finalizeWvPack(
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
    ...WV_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'west-virginia',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? WV_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify WV PSC Motor Carrier household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
