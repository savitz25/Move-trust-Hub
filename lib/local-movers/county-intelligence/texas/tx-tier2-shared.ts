import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * Texas Tier 2 content contract (LOCKED — same shell as CA Tier 2).
 *
 * Same design system / directory / schema as Tier 1 — different editorial middle:
 * - role-forward H1
 * - visible “Compared with [Parent]” (≥3 concrete bullets)
 * - 2–4 zones only
 * - 2–3 specialized modules
 * - schools + hospitals only
 * - parent-biased popular routes
 * - medium length — not a Tier 1 clone
 *
 * Intrastate: Texas Department of Motor Vehicles (TxDMV) household goods authority.
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ, CA BHGS, or other-state credentials.
 */

export const TX_TIER2_REG_BULLET = {
  title: 'Texas TxDMV household goods authority vs interstate FMCSA',
  detail:
    'Moves entirely within Texas by household goods carriers generally require active Texas Department of Motor Vehicles (TxDMV) household goods operating authority. Match the legal name on the estimate to TxDMV household goods resources when applicable, and insist on a written estimate before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A TxDMV household goods certificate alone does not authorize interstate delivery, and a USDOT alone is not Texas intrastate permission.',
} as const;

export const TX_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'TxDMV — Household goods movers',
    href: 'https://www.txdmv.gov/motor-carriers/household-goods-movers',
    external: true,
    note: 'Texas household goods consumer and authority resources',
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
    label: 'All Texas local mover guides',
    href: '/local-movers/texas',
  },
];

export type TxTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/** Wrap a Texas Tier 2 pack with locked contract defaults. */
export function finalizeTxTier2Pack(pack: TxTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  let relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    console.warn(
      `[tx-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[tx-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length) {
    console.warn(`[tx-tier2] ${pack.countySlug}: parentCompare is required`);
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
    ...TX_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'texas',
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
        'Official links first; directory listings are independent, not endorsements. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
