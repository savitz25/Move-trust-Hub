import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * New Jersey Tier 2 content contract (LOCKED — same shell as CA/TX/FL Tier 2).
 *
 * Intrastate: New Jersey Board of Public Utilities (BPU) / household-goods
 * public-mover frameworks for pure in-state moves.
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode FDACS, BHGS, TxDMV, or other-state credentials into NJ packs.
 */

export const NJ_TIER2_REG_BULLET = {
  title: 'New Jersey public-mover rules vs interstate FMCSA',
  detail:
    'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / public-mover frameworks (Board of Public Utilities consumer and licensing resources). Match the legal name on the estimate to the carrier you hired. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A USDOT alone is not New Jersey intrastate permission, and NJ registration alone does not authorize interstate delivery.',
} as const;

export const NJ_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'New Jersey Board of Public Utilities',
    href: 'https://www.nj.gov/bpu/',
    external: true,
    note: 'NJ household-goods / public-mover consumer frameworks',
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
    label: 'All New Jersey local mover guides',
    href: '/local-movers/new-jersey',
  },
];

export type NjTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a New Jersey Tier 2 pack with locked contract defaults. */
export function finalizeNjTier2Pack(pack: NjTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[nj-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[nj-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length) {
    console.warn(`[nj-tier2] ${pack.countySlug}: parentCompare is required`);
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
    ...NJ_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ Moving Guide$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'new-jersey',
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
        'Official links first; directory listings are independent, not endorsements. Verify New Jersey household-goods / public-mover frameworks for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
