import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const WI_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Wisconsin regulatory resources for Tier-1 county packs.
 * Intrastate: Wisconsin does not operate a dedicated household-goods certificate
 * program comparable to Minnesota or Illinois. Consumers should verify written
 * estimates, cargo/liability insurance, business identity, and — when applicable —
 * WisDOT for-hire motor carrier credentials for property carriers.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode MN MnDOT HHG, IL ICC, MI MSP, NJ, OH PUCO credentials.
 */
export const WI_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'WisDOT — Motor carrier operating authority',
    href: 'https://wisconsindot.gov/Pages/dmv/com-drv-vehs/mtr-car-trkr/mc-authority.aspx',
    external: true,
    note: 'Intrastate for-hire property authority framework when applicable',
  },
  {
    label: 'WisDOT — Motor carriers & trucking hub',
    href: 'https://wisconsindot.gov/Pages/dmv/com-drv-vehs/mtr-car-trkr/default.aspx',
    external: true,
    note: 'Insurance, credentials & carrier resources',
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
    note: 'Interstate household goods consumer guidance',
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
    label: 'All Wisconsin local mover guides',
    href: '/local-movers/wisconsin',
  },
];

export const WI_REG_BULLET = {
  title: 'Intrastate Wisconsin consumer controls vs interstate FMCSA',
  detail:
    'Wisconsin generally does not operate a dedicated household-goods state certificate program comparable to several neighboring states. For moves entirely within Wisconsin, insist on a written estimate matching the legal business name, cargo and liability insurance certificates, and clear inventory terms — and ask whether WisDOT for-hire motor carrier credentials apply to the carrier. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Wisconsin business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic permission for every local Wisconsin access rule (city parking, elevators, HOAs).',
} as const;

/** Wrap a county-specific pack with locked Tier-1 WI defaults. */
export function finalizeWiPack(
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
    ...WI_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'wisconsin',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? WI_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
      items: merged,
    },
  };
}
