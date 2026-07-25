import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Arizona Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA/NC/OH/IL Tier 2).
 *
 * Intrastate: Arizona does not run a CA BHGS– / FL FDACS–style statewide HHG certificate.
 * Diligence: Arizona Corporation Commission (ACC) business-entity status + insurance + written contracts;
 * ADOT for road/travel context. Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode ICC, NCUC, PA PUC, NJ BPU, FDACS, TxDMV, BHGS, or other-state credentials.
 */

export const AZ_TIER2_REG_BULLET = {
  title: 'Arizona ACC entity diligence vs interstate FMCSA',
  detail:
    'Arizona does not operate a separate statewide household-goods mover certificate program comparable to some other states for pure in-state jobs. For moves entirely within Arizona, verify Arizona Corporation Commission (ACC) business-entity status, insurance, and written contracts matching the legal name on the estimate before you deposit. Any out-of-state leg (California, Nevada, Utah, New Mexico, Colorado, or beyond) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. ACC entity status alone does not authorize interstate delivery, and a USDOT alone is not Arizona-specific intrastate permission language.',
} as const;

export const AZ_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'Arizona Corporation Commission (ACC)',
    href: 'https://www.azcc.gov/',
    external: true,
    note: 'Business-entity status & related consumer tools',
  },
  {
    label: 'Arizona Department of Transportation (ADOT)',
    href: 'https://azdot.gov/',
    external: true,
    note: 'Road conditions, construction, and travel alerts',
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
    label: 'All Arizona local mover guides',
    href: '/local-movers/arizona',
  },
];

/** Default ISO date when packs omit lastReviewed (prevents "Invalid Date" in UI). */
export const AZ_TIER2_DEFAULT_LAST_REVIEWED = '2026-07-25';

export type AzTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap an Arizona Tier 2 pack with locked contract defaults. */
export function finalizeAzTier2Pack(pack: AzTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[az-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[az-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[az-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[az-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[az-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...AZ_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  const lastReviewed =
    pack.lastReviewed &&
    /^\d{4}-\d{2}-\d{2}/.test(pack.lastReviewed) &&
    !Number.isNaN(Date.parse(pack.lastReviewed))
      ? pack.lastReviewed
      : AZ_TIER2_DEFAULT_LAST_REVIEWED;

  return {
    ...pack,
    stateSlug: 'arizona',
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
        'Official links first; directory listings are independent, not endorsements. Verify Arizona Corporation Commission (ACC) business-entity status for in-state Arizona movers and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
