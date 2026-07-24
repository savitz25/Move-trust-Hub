import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MT_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Montana regulatory resources for Tier-1 county packs.
 * Intrastate: Montana does not currently operate a consumer-facing dedicated
 * household-goods certificate regime comparable to Idaho IPUC or Nebraska PSC
 * after recent motor-carrier policy changes. MDT Motor Carrier Services remains
 * relevant for commercial vehicle safety and permits. Consumers should insist
 * on written estimates and insurance certificates.
 * Interstate: FMCSA USDOT/MC.
 * Do not invent a Montana HHG certificate number; do not hardcode ID IPUC, WY,
 * ND, SD, WA UTC, or NJ credentials as required for pure in-state MT jobs.
 */
export const MT_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'MDT — Motor Carrier Services',
    href: 'https://www.mdt.mt.gov/business/mcs/',
    external: true,
    note: 'Montana Department of Transportation Motor Carrier Services',
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
    label: 'All Montana local mover guides',
    href: '/local-movers/montana',
  },
];

export const MT_REG_BULLET = {
  title: 'Intrastate Montana consumer controls vs interstate FMCSA',
  detail:
    'Montana does not currently operate a consumer-facing household-goods permit regime comparable to Idaho IPUC or Nebraska PSC. Recent motor-carrier policy changes reduced dedicated HHG-specific licensing for many local operators — do not invent a Montana household goods certificate number that does not exist. Montana Department of Transportation (MDT) Motor Carrier Services remains relevant for commercial vehicle safety and related permits. For pure in-state Montana jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Montana business registration alone does not authorize interstate delivery, and a USDOT alone is not automatic in-state consumer protection.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MT defaults. */
export function finalizeMtPack(
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
    ...MT_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'montana',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MT_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
