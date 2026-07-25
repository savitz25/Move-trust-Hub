import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';
import {
  MI_COMMON_RESOURCES,
  MI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

/**
 * Michigan Tier 2 content contract (LOCKED — same shell as CA/TX/FL/NJ/NY/PA/GA/OH/VA).
 *
 * Intrastate: Michigan motor carrier / household goods authority (Motor Carrier Act)
 * administered through MSP CVED (existing MI page language).
 * Interstate: FMCSA USDOT/MC.
 * Do NOT hardcode FDACS, NJ BPU, NYSDOT, PUCO, VA DMV, GA DPS, BHGS, TxDMV bleed.
 */

export const MI_TIER2_REG_BULLET = MI_REG_BULLET;

export const MI_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = MI_COMMON_RESOURCES;

export type MiTier2PackInput = Omit<
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

/** Wrap a Michigan Tier 2 pack with locked contract defaults. */
export function finalizeMiTier2Pack(pack: MiTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[mi-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[mi-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length || pack.parentCompare.bullets.length < 3) {
    console.warn(
      `[mi-tier2] ${pack.countySlug}: parentCompare needs ≥3 concrete bullets`
    );
  }
  if (pack.h1 && !/^Moving in /i.test(pack.h1)) {
    console.warn(
      `[mi-tier2] ${pack.countySlug}: H1 should be role-forward “Moving in …” (got: ${pack.h1})`
    );
  }
  if (pack.h1 && /Movers Serving/i.test(pack.h1)) {
    console.warn(
      `[mi-tier2] ${pack.countySlug}: H1 must not use “Movers Serving…”`
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
    ...MI_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'michigan',
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
        'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
