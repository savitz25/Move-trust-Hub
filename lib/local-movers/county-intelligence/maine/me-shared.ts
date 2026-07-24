import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const ME_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Maine regulatory resources for Tier-1 county packs.
 * Intrastate: Maine does not maintain a dedicated household-goods consumer
 * certificate program comparable to Massachusetts DPU or New Hampshire HHG
 * carrier authority. BMV Motor Carrier Services handles commercial motor-carrier
 * frameworks (IRP, IFTA, UCR, for-hire insurance). Consumers should insist on
 * written estimates, insurance certificates, and clear legal names.
 * Interstate: FMCSA USDOT/MC.
 * Do not invent NH HHG certificates, MA DPU, VT, CT CTDOT, or NJ credentials on ME pages.
 */
export const ME_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Maine BMV — Motor Carrier Services',
    href: 'https://www.maine.gov/sos/bmv/vehicles/commercial-vehicles-motor-carrier-services',
    external: true,
    note: 'Maine Bureau of Motor Vehicles motor carrier one-stop (IRP, IFTA, UCR, for-hire insurance)',
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
    label: 'All Maine local mover guides',
    href: '/local-movers/maine',
  },
];

export const ME_REG_BULLET = {
  title: 'Intrastate Maine consumer controls vs interstate FMCSA',
  detail:
    'Maine does not maintain a dedicated statewide household-goods mover certificate program comparable to Massachusetts DPU operating certificates or New Hampshire household goods carrier authority under RSA 359-T. Maine Bureau of Motor Vehicles (BMV) Motor Carrier Services is the motor-carrier one-stop for IRP, IFTA, UCR, for-hire insurance filings, and related commercial frameworks — not a consumer-facing HHG permit directory like those stronger-state programs. For pure in-state Maine jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a Maine household goods certificate number that does not exist, and do not treat a USDOT alone as automatic in-state consumer protection.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 ME defaults. */
export function finalizeMePack(
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
    ...ME_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'maine',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? ME_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
