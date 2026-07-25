import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Pennsylvania Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY Tier 2).
 *
 * Intrastate: Pennsylvania Public Utility Commission (PUC) household goods
 * mover authority for pure in-state Pennsylvania moves.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode NJ BPU, NYSDOT, FDACS, TxDMV, CA BHGS, or other-state credentials.
 */

export const PA_TIER2_REG_BULLET = {
  title: 'Pennsylvania PUC household goods vs interstate FMCSA',
  detail:
    'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household-goods mover authority and consumer protections for intrastate household goods transportation. Match the legal name on the estimate to the carrier you hired. Any out-of-state leg (New Jersey, New York, Maryland, Ohio, West Virginia, Delaware, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A USDOT alone is not Pennsylvania intrastate permission, and PA PUC authority alone does not authorize interstate delivery.',
} as const;

export const PA_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Pennsylvania Public Utility Commission (PUC)',
    href: 'https://www.puc.pa.gov/',
    external: true,
    note: 'Intrastate household goods mover authority & consumer resources',
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
    label: 'All Pennsylvania local mover guides',
    href: '/local-movers/pennsylvania',
  },
];

export type PaTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a Pennsylvania Tier 2 pack with locked contract defaults. */
export function finalizePaTier2Pack(pack: PaTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[pa-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[pa-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[pa-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[pa-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[pa-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...PA_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'pennsylvania',
    contentTier: 'tier2',
    // Default review stamp when authors omit it — prevents "Invalid Date" in hub UI.
    lastReviewed: pack.lastReviewed || '2026-07-25',
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
        'Official links first; directory listings are independent, not endorsements. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
