import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const OR_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Oregon regulatory resources for Tier-1 county packs.
 * Intrastate HHG: ODOT Commerce & Compliance Division certificate of authority (ORS 825).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode WA UTC / CA BHGS / CO PUC / NJ credentials.
 */
export const OR_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'ODOT — Household goods mover application & authority',
    href: 'https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx',
    external: true,
    note: 'Oregon intrastate household goods certificate framework (ORS 825)',
  },
  {
    label: 'ODOT CCD — Motor carrier FAQs',
    href: 'https://www.oregon.gov/odot/mct/pages/frequently-asked-questions.aspx',
    external: true,
    note: 'Commerce and Compliance Division consumer & carrier guidance',
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
    label: 'All Oregon local mover guides',
    href: '/local-movers/oregon',
  },
];

export const OR_REG_BULLET = {
  title: 'Intrastate ODOT household goods certificate vs interstate FMCSA',
  detail:
    'Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An ODOT certificate alone does not authorize interstate delivery, and a USDOT alone is not Oregon intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 OR defaults. */
export function finalizeOrPack(
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
    ...OR_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'oregon',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? OR_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} County resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
