import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const IA_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Iowa regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Iowa DOT Intrastate Motor Carrier Permit covering household goods
 * (tariffs on file with Office of Motor Carrier Services).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode IL ICC, MN MnDOT, NE, WI, NJ credentials.
 */
export const IA_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Iowa DOT — Motor carriers',
    href: 'https://iowadot.gov/motor-carriers',
    external: true,
    note: 'Intrastate travel authority & motor carrier services',
  },
  {
    label: 'Iowa DOT — Intrastate for-hire authority guide',
    href: 'https://iowadot.gov/media/1143/download?inline',
    external: true,
    note: 'Household goods permits and tariff requirements',
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
    label: 'All Iowa local mover guides',
    href: '/local-movers/iowa',
  },
];

export const IA_REG_BULLET = {
  title: 'Intrastate Iowa DOT household goods permit vs interstate FMCSA',
  detail:
    'For-hire motor carriers transporting household goods from one point in Iowa to another generally need an Intrastate Motor Carrier Permit from the Iowa DOT Office of Motor Carrier Services, with household goods tariffs filed, posted, and approved under Iowa motor carrier rules. Match the legal name on the estimate to Iowa DOT permit resources and insist on written rate clarity before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An Iowa intrastate household goods permit alone does not authorize interstate delivery, and a USDOT alone is not Iowa intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 IA defaults. */
export function finalizeIaPack(
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
    ...IA_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'iowa',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? IA_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
