import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Colorado Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA/NC/OH/IL/VA/AZ Tier 2).
 *
 * Intrastate: Colorado Public Utilities Commission (PUC) household goods (HHG) permit
 * under Title 40, Article 10.1, C.R.S.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode ACC, ICC, NCUC, PA PUC-as-PA, NJ BPU, FDACS, TxDMV, BHGS, or other-state credentials.
 */

export const CO_TIER2_REG_BULLET = {
  title: 'Colorado PUC HHG permit vs interstate FMCSA',
  detail:
    'Moves entirely within Colorado by household goods carriers generally require a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit under Title 40, Article 10.1, C.R.S. Match the legal name on the estimate to the Colorado PUC permit search before you deposit. Any out-of-state leg (Wyoming, Utah, New Mexico, Nebraska, Kansas, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A Colorado PUC HHG permit alone does not authorize interstate delivery, and a USDOT alone is not Colorado intrastate permission.',
} as const;

export const CO_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Colorado PUC — Household goods movers',
    href: 'https://puc.colorado.gov/movers',
    external: true,
    note: 'Intrastate household goods permit framework',
  },
  {
    label: 'Colorado PUC — Permit search',
    href: 'https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form',
    external: true,
    note: 'Verify active HHG permit by legal name',
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
    label: 'All Colorado local mover guides',
    href: '/local-movers/colorado',
  },
];

/** Default ISO date when packs omit lastReviewed (prevents "Invalid Date" in UI). */
export const CO_TIER2_DEFAULT_LAST_REVIEWED = '2026-07-25';

export type CoTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a Colorado Tier 2 pack with locked contract defaults. */
export function finalizeCoTier2Pack(pack: CoTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[co-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[co-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[co-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[co-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[co-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...CO_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '')
    .replace(/ City and County$/, '');

  const lastReviewed =
    pack.lastReviewed &&
    /^\d{4}-\d{2}-\d{2}/.test(pack.lastReviewed) &&
    !Number.isNaN(Date.parse(pack.lastReviewed))
      ? pack.lastReviewed
      : CO_TIER2_DEFAULT_LAST_REVIEWED;

  return {
    ...pack,
    stateSlug: 'colorado',
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
        'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state Colorado moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
