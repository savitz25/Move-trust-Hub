import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyIntelligenceSectionId,
} from '@/lib/local-movers/county-intelligence/types';

export const HI_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/**
 * Shared Hawaii regulatory resources for Tier-1 county packs.
 * Intrastate / inter-island HHG: Hawaii Public Utilities Commission (PUC)
 * Motor Carrier Certificate of Public Convenience and Necessity covering the
 * household goods classification.
 * Mainland / interstate: FMCSA USDOT/MC.
 * Do not hardcode CA BHGS, WA UTC, NJ credentials.
 */
export const HI_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Hawaii PUC — Motor carriers',
    href: 'https://puc.hawaii.gov/motor_carriers/',
    external: true,
    note: 'Hawaii Public Utilities Commission motor carrier / household goods frameworks',
  },
  {
    label: 'FMCSA SAFER — interstate authority',
    href: 'https://safer.fmcsa.dot.gov/',
    external: true,
    note: 'Required for mainland / interstate legs',
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
    label: 'All Hawaii local mover guides',
    href: '/local-movers/hawaii',
  },
];

export const HI_REG_BULLET = {
  title: 'Intrastate HI PUC household goods CPCN vs interstate FMCSA',
  detail:
    'Companies moving household goods within Hawaii — including inter-island work — generally must hold a Hawaii Public Utilities Commission (PUC) Motor Carrier Certificate of Public Convenience and Necessity covering the household goods classification for the islands and commodity classes they serve. Match the legal name and PUC certificate details on the estimate to active Hawaii PUC motor carrier status before you deposit, and insist on written estimates that address elevators, humidity packing, pier schedules, and inter-island barge or air components when relevant. Any mainland or other out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Hawaii PUC motor carrier certificate alone does not authorize mainland interstate delivery, and a USDOT alone is not Hawaii intrastate permission.',
} as const;

/** Wrap a county-specific pack with locked Tier-1 HI defaults. */
export function finalizeHiPack(
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
    ...HI_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'hawaii',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? HI_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Hawaii PUC household goods motor carrier certificate status for in-state and inter-island moves and FMCSA for mainland legs before deposits.',
      items: merged,
    },
  };
}
