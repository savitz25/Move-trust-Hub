import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const AK_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Alaska regulatory resources for Tier-1 borough/municipality packs.
 * Intrastate: Alaska does not maintain a dedicated household-goods carrier
 * certificate program comparable to WA UTC or OR ODOT. Businesses still need
 * a State of Alaska business license; consumers should insist on written
 * estimates and insurance certificates.
 * Interstate / Outside: FMCSA USDOT/MC.
 * Do not hardcode WA UTC, OR ODOT, ID IPUC, or NJ credentials.
 */
export const AK_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'State of Alaska — Business licensing',
    href: 'https://www.commerce.alaska.gov/web/cbpl/BusinessLicensing.aspx',
    external: true,
    note: 'Alaska business license context for commercial operators',
  },
  {
    label: 'Alaska DMV — commercial vehicle information',
    href: 'https://doa.alaska.gov/dmv/',
    external: true,
    note: 'Division of Motor Vehicles commercial context',
  },
  {
    label: 'FMCSA SAFER — interstate authority',
    href: 'https://safer.fmcsa.dot.gov/',
    external: true,
    note: 'Required for Outside / interstate legs',
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
    label: 'All Alaska local mover guides',
    href: '/local-movers/alaska',
  },
];

export const AK_REG_BULLET = {
  title: 'Intrastate Alaska consumer controls vs interstate FMCSA',
  detail:
    'Alaska does not maintain a dedicated statewide household-goods mover certificate program comparable to Washington UTC permits or Oregon ODOT household goods certificates. Moving companies operating in Alaska still need a State of Alaska business license and should carry appropriate cargo and liability insurance. For pure in-state Alaska jobs, insist on written estimates matching the legal business name, certificates of insurance, and clear inventory terms before you deposit. Any Outside or interstate leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent an Alaska household goods certificate number that does not exist, and do not treat a USDOT alone as automatic in-state consumer protection. Ferry schedules, freeze-up, and air-dependent communities add logistics complexity beyond licensing.',
} as const;

/** Wrap a borough/municipality pack with locked Tier-1 AK defaults. */
export function finalizeAkPack(
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
    ...AK_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ Borough$/, '')
    .replace(/ Municipality$/, '');

  return {
    ...pack,
    stateSlug: 'alaska',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? AK_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. For pure in-state Alaska moves insist on written estimates, Alaska business license details, and insurance certificates; verify FMCSA for Outside/interstate legs before deposits.',
      items: merged,
    },
  };
}
