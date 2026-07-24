import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const KY_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Kentucky regulatory resources for Tier-1 county packs.
 * Intrastate HHG: Kentucky Transportation Cabinet (KYTC) Division of Motor Carriers
 * household goods certificate (DMT/DVR license number).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode OH PUCO, IN DOR, TN, WV, NJ credentials.
 */
export const KY_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'KYTC — Household goods movers',
    href: 'https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx',
    external: true,
    note: 'Kentucky intrastate household goods licensing (Division of Motor Carriers)',
  },
  {
    label: 'KYTC — Motor carriers hub',
    href: 'https://drive.ky.gov/Motor-Carriers/Pages/default.aspx',
    external: true,
    note: 'Intrastate authority certificates & carrier programs',
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
    label: 'All Kentucky local mover guides',
    href: '/local-movers/kentucky',
  },
];

export const KY_REG_BULLET = {
  title: 'Intrastate KYTC household goods certificate vs interstate FMCSA',
  detail:
    'Moves of household goods entirely within Kentucky generally require a licensed household goods mover under the Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers (often referenced with a KY DMT/DVR household goods license number). Match the legal name on the estimate to KYTC consumer resources, request a written estimate, and confirm insurance before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Kentucky household goods certificate alone does not authorize interstate delivery, and a USDOT alone is not Kentucky intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 KY defaults. */
export function finalizeKyPack(
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
    ...KY_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'kentucky',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? KY_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
