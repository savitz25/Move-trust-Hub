import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * New York Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ Tier 2).
 *
 * Intrastate: New York State Department of Transportation (NYSDOT) household goods
 * mover frameworks for pure in-state New York moves.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode NJ BPU, FDACS, BHGS, TxDMV, or other-state credentials into NY packs.
 */

export const NY_TIER2_REG_BULLET = {
  title: 'New York NYSDOT household goods vs interstate FMCSA',
  detail:
    'Moves entirely within New York are generally subject to New York State Department of Transportation (NYSDOT) household-goods mover frameworks and consumer protections for intrastate household goods transportation. Match the legal name on the estimate to the carrier you hired. Any out-of-state leg (New Jersey, Connecticut, Pennsylvania, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A USDOT alone is not New York intrastate permission, and NYSDOT authorization alone does not authorize interstate delivery.',
} as const;

export const NY_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'NYS Department of Transportation',
    href: 'https://www.dot.ny.gov/',
    external: true,
    note: 'New York household-goods / motor carrier consumer frameworks',
  },
  {
    label: 'NYS DMV — Business & commercial',
    href: 'https://dmv.ny.gov/',
    external: true,
    note: 'Related commercial vehicle and business resources',
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
    label: 'All New York local mover guides',
    href: '/local-movers/new-york',
  },
];

export type NyTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a New York Tier 2 pack with locked contract defaults. */
export function finalizeNyTier2Pack(pack: NyTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[ny-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[ny-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[ny-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[ny-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[ny-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...NY_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'new-york',
    contentTier: 'tier2',
    parentCompare,
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
        'Official links first; directory listings are independent, not endorsements. Verify NYSDOT household-goods frameworks for in-state New York moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
