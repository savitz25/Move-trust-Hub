import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const MD_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Maryland regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Maryland Department of Labor household goods mover registration.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode VA DMV / PA PUC / NJ / OR ODOT / WA UTC credentials.
 */
export const MD_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Maryland Labor — Household goods movers registration',
    href: 'https://labor.maryland.gov/license/hgm/',
    external: true,
    note: 'Intrastate household goods mover registration framework',
  },
  {
    label: 'Maryland Labor — HHG consumer complaints & info',
    href: 'https://labor.maryland.gov/license/hgm/hhmcon.shtml',
    external: true,
    note: 'Consumer resources for household goods moves',
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
    label: 'All Maryland local mover guides',
    href: '/local-movers/maryland',
  },
];

export const MD_REG_BULLET = {
  title: 'Intrastate Maryland HHG registration vs interstate FMCSA',
  detail:
    'Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Maryland registration alone does not authorize interstate delivery, and a USDOT alone is not Maryland intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 MD defaults. */
export function finalizeMdPack(
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
    ...MD_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ City$/, '');

  return {
    ...pack,
    stateSlug: 'maryland',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? MD_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
