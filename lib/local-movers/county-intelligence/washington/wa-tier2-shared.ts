import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Washington Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA/NC/OH/IL/VA/AZ/MI/CO Tier 2).
 *
 * Intrastate: Washington Utilities and Transportation Commission (UTC) household goods permit.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode CO PUC, AZ ACC, ICC, NCUC, NJ BPU, FDACS, TxDMV, BHGS, or other-state credentials.
 */

export const WA_TIER2_REG_BULLET = {
  title: 'Washington UTC household goods permit vs interstate FMCSA',
  detail:
    'Moves entirely within Washington by household goods carriers generally require a valid Utilities and Transportation Commission (UTC) household goods permit — operating without one is illegal under UTC consumer guidance. Match the legal name on the estimate to UTC permitted-mover tools before you deposit, and ask for required consumer moving guide materials. Any out-of-state leg (Oregon, Idaho, British Columbia, California, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A UTC household goods permit alone does not authorize interstate delivery, and a USDOT alone is not Washington intrastate permission.',
} as const;

export const WA_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'WA UTC — Household goods carriers',
    href: 'https://www.utc.wa.gov/MovingCompanies',
    external: true,
    note: 'Intrastate household goods permit framework',
  },
  {
    label: 'WA UTC — Choosing a licensed mover',
    href: 'https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state',
    external: true,
    note: 'Consumer guidance for in-state moves',
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
    label: 'All Washington local mover guides',
    href: '/local-movers/washington',
  },
];

/** Default ISO date when packs omit lastReviewed (prevents "Invalid Date" in UI). */
export const WA_TIER2_DEFAULT_LAST_REVIEWED = '2026-07-25';

export type WaTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a Washington Tier 2 pack with locked contract defaults. */
export function finalizeWaTier2Pack(pack: WaTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[wa-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[wa-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[wa-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[wa-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[wa-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...WA_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  const lastReviewed =
    pack.lastReviewed &&
    /^\d{4}-\d{2}-\d{2}/.test(pack.lastReviewed) &&
    !Number.isNaN(Date.parse(pack.lastReviewed))
      ? pack.lastReviewed
      : WA_TIER2_DEFAULT_LAST_REVIEWED;

  return {
    ...pack,
    stateSlug: 'washington',
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
        'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state Washington moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
