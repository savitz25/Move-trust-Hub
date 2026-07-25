import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Ohio Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA Tier 2).
 *
 * Intrastate: Public Utilities Commission of Ohio (PUCO) household-goods authority
 * for pure in-state Ohio moves.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode FDACS, NJ BPU, NYSDOT, GA DPS, BHGS, TxDMV, or other-state credentials.
 */

export const OH_TIER2_REG_BULLET = {
  title: 'Ohio PUCO household goods vs interstate FMCSA',
  detail:
    'Moves entirely within Ohio are generally subject to Public Utilities Commission of Ohio (PUCO) household-goods mover authority and consumer frameworks. Match the legal name on the estimate to the carrier you hired. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A USDOT alone is not Ohio intrastate permission, and PUCO authority alone does not authorize interstate delivery.',
} as const;

export const OH_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Public Utilities Commission of Ohio (PUCO)',
    href: 'https://puco.ohio.gov/',
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
    label: 'All Ohio local mover guides',
    href: '/local-movers/ohio',
  },
];

export type OhTier2PackInput = Omit<
  CountyIntelligencePack,
  | 'stateSlug'
  | 'collapsibleDeepContent'
  | 'sectionOrder'
  | 'contentTier'
  | 'lastReviewed'
> &
  Partial<
    Pick<
      CountyIntelligencePack,
      'collapsibleDeepContent' | 'sectionOrder' | 'contentTier' | 'lastReviewed'
    >
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap an Ohio Tier 2 pack with locked contract defaults. */
export function finalizeOhTier2Pack(pack: OhTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[oh-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[oh-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[oh-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[oh-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[oh-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...OH_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'ohio',
    contentTier: 'tier2',
    lastReviewed: pack.lastReviewed ?? '2026-07-24',
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
        'Official links first; directory listings are independent, not endorsements. Verify PUCO household-goods authority for in-state Ohio moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
