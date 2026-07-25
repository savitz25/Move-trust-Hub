import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Illinois Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA/NC Tier 2).
 *
 * Intrastate: Illinois Commerce Commission (ICC) Household Goods license
 * for pure in-state Illinois moves.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode NCUC, PA PUC, NJ BPU, NYSDOT, FDACS, TxDMV, BHGS, or other-state credentials.
 */

export const IL_TIER2_REG_BULLET = {
  title: 'Illinois ICC household goods vs interstate FMCSA',
  detail:
    'Moves entirely within Illinois by for-hire household goods carriers generally require an Illinois Commerce Commission (ICC) Household Goods license. Match the legal name on the estimate to ICC motor carrier / household goods search tools before you deposit. Any out-of-state leg (Indiana, Wisconsin, Iowa, Missouri, Kentucky, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. An ICC household goods license alone does not authorize interstate delivery, and a USDOT alone is not Illinois intrastate permission.',
} as const;

export const IL_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Illinois Commerce Commission (ICC)',
    href: 'https://www.icc.illinois.gov/',
    external: true,
    note: 'Intrastate household goods mover authority',
  },
  {
    label: 'ICC motor carrier / household goods search',
    href: 'https://www.icc.illinois.gov/emdb/mcis/search',
    external: true,
    note: 'Search licensed household goods movers',
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
    label: 'All Illinois local mover guides',
    href: '/local-movers/illinois',
  },
];

/** Default ISO date when packs omit lastReviewed (prevents "Invalid Date" in UI). */
export const IL_TIER2_DEFAULT_LAST_REVIEWED = '2026-07-25';

export type IlTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap an Illinois Tier 2 pack with locked contract defaults. */
export function finalizeIlTier2Pack(pack: IlTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[il-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[il-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[il-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[il-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[il-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
    );
  }

  relocModules = relocModules.filter(
    (m) => /school|education/i.test(m.title) || /hospital|health/i.test(m.title)
  );

  const parentCompare = pack.parentCompare
    ? {
        ...pack.parentCompare,
        title: /^Compared with/i.test(pack.parentCompare.title)
          ? pack.parentCompare.title
          : `Compared with ${pack.parentCompare.parentLabel}`,
      }
    : pack.parentCompare;

  const localResources = pack.resources?.items ?? [];
  const seen = new Set(localResources.map((r) => r.href));
  const merged = [
    ...localResources,
    ...IL_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  const lastReviewed =
    pack.lastReviewed &&
    /^\d{4}-\d{2}-\d{2}/.test(pack.lastReviewed) &&
    !Number.isNaN(Date.parse(pack.lastReviewed))
      ? pack.lastReviewed
      : IL_TIER2_DEFAULT_LAST_REVIEWED;

  return {
    ...pack,
    stateSlug: 'illinois',
    contentTier: 'tier2',
    parentCompare,
    lastReviewed,
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? TIER2_INTELLIGENCE_SECTION_ORDER,
    relocation: pack.relocation
      ? {
          title: 'Schools & hospitals for relocators',
          intro:
            pack.relocation.intro?.includes('Compressed') ||
            pack.relocation.intro?.includes('move-relevant')
              ? pack.relocation.intro
              : 'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
          modules: relocModules.slice(0, 2),
        }
      : pack.relocation,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
