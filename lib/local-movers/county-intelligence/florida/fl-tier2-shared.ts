import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Florida Tier 2 content contract (LOCKED — same shell as CA/TX Tier 2).
 *
 * Intrastate: Florida Department of Agriculture and Consumer Services (FDACS)
 * household mover registration under Chapter 507, Florida Statutes.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ, TxDMV, CA BHGS, or other-state credentials.
 */

export const FL_TIER2_REG_BULLET = {
  title: 'Florida FDACS household mover registration vs interstate FMCSA',
  detail:
    'Moves entirely within Florida by household goods movers and moving brokers generally require registration with the Florida Department of Agriculture and Consumer Services (FDACS) under Chapter 507, Florida Statutes. Match the legal name on the estimate to FDACS business/license lookup resources when applicable, and insist on a written estimate before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. FDACS registration alone does not authorize interstate delivery, and a USDOT alone is not Florida intrastate permission.',
} as const;

export const FL_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'FDACS — Moving companies',
    href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
    external: true,
    note: 'Florida household mover registration and consumer resources',
  },
  {
    label: 'FDACS — Moving within Florida',
    href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
    external: true,
    note: 'Consumer rights for in-state moves',
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
    label: 'All Florida local mover guides',
    href: '/local-movers/florida',
  },
];

export type FlTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a Florida Tier 2 pack with locked contract defaults. */
export function finalizeFlTier2Pack(pack: FlTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[fl-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[fl-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length) {
    console.warn(`[fl-tier2] ${pack.countySlug}: parentCompare is required`);
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
    ...FL_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'florida',
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
        'Official links first; directory listings are independent, not endorsements. Verify FDACS household mover registration for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
