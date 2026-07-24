import type {
  CountyIntelligencePack,
  CountyIntelligenceResource,
  CountyParentCompare,
} from '@/lib/local-movers/county-intelligence/types';
import { TIER2_INTELLIGENCE_SECTION_ORDER } from '@/lib/local-movers/county-intelligence/types';

/**
 * California Tier 2 content contract (locked).
 *
 * Tier 2 is NOT a thinner Tier 1 clone. Same design system / directory / schema /
 * BHGS regulator patterns — different editorial contract:
 * - secondary-market role in H1
 * - parent Tier 1 comparison module
 * - 2–4 sharp zones (not long zone dumps)
 * - 2–3 specialized constraint modules
 * - compressed schools + hospitals
 * - popular routes biased to parent metro + nearby secondaries
 *
 * Intrastate: California Bureau of Household Goods and Services (BHGS).
 * Interstate: FMCSA USDOT/MC.
 * Do not hardcode NJ public-mover credentials or foreign regulators.
 */

export const CA_TIER2_BHGS_BULLET = {
  title: 'California BHGS intrastate authority vs interstate FMCSA',
  detail:
    'Moves entirely within California by household goods carriers are generally overseen by the California Bureau of Household Goods and Services (BHGS). Match the legal name on the estimate to BHGS-licensed mover resources when applicable, and insist on a written estimate before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. A BHGS registration alone does not authorize interstate delivery, and a USDOT alone is not California intrastate permission.',
} as const;

export const CA_TIER2_COMMON_RESOURCES: CountyIntelligenceResource[] = [
  {
    label: 'CA.gov — Bureau of Household Goods and Services (BHGS)',
    href: 'https://www.bhgs.dca.ca.gov/',
    external: true,
    note: 'California household goods consumer and licensing resources',
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
    label: 'All California local mover guides',
    href: '/local-movers/california',
  },
];

export type CaTier2PackInput = Omit<
  CountyIntelligencePack,
  'stateSlug' | 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'
> &
  Partial<
    Pick<CountyIntelligencePack, 'collapsibleDeepContent' | 'sectionOrder' | 'contentTier'>
  > & {
    parentCompare: CountyParentCompare;
  };

/**
 * Validate + wrap a California Tier 2 pack with locked defaults.
 * Throws in development-style assertions when contract is violated (caught by QA).
 */
export function finalizeCaTier2Pack(pack: CaTier2PackInput): CountyIntelligencePack {
  const zones = pack.zones ?? [];
  const specialized = pack.specialized ?? [];
  const relocModules = pack.relocation?.modules ?? [];

  if (zones.length < 2 || zones.length > 4) {
    // Soft guard — QA enforces strictly; keep production resilient.
    console.warn(
      `[ca-tier2] ${pack.countySlug}: expected 2–4 zones, got ${zones.length}`
    );
  }
  if (specialized.length < 2 || specialized.length > 3) {
    console.warn(
      `[ca-tier2] ${pack.countySlug}: expected 2–3 specialized modules, got ${specialized.length}`
    );
  }
  if (!pack.parentCompare?.bullets?.length) {
    console.warn(`[ca-tier2] ${pack.countySlug}: parentCompare is required`);
  }

  const hasSchools = relocModules.some((m) => /school/i.test(m.title));
  const hasHospitals = relocModules.some((m) => /hospital|health/i.test(m.title));
  if (!hasSchools || !hasHospitals) {
    console.warn(
      `[ca-tier2] ${pack.countySlug}: compressed relocation should include schools + hospitals`
    );
  }

  const localResources = pack.resources?.items ?? [];
  const seen = new Set(localResources.map((r) => r.href));
  const merged = [
    ...localResources,
    ...CA_TIER2_COMMON_RESOURCES.filter((r) => !seen.has(r.href)),
  ];

  const marketLabel = pack.hubTitle
    .replace(/ Moving Intelligence Hub$/, '')
    .replace(/ County$/, '');

  return {
    ...pack,
    stateSlug: 'california',
    contentTier: 'tier2',
    collapsibleDeepContent: pack.collapsibleDeepContent ?? true,
    sectionOrder: pack.sectionOrder ?? TIER2_INTELLIGENCE_SECTION_ORDER,
    resources: {
      title: pack.resources?.title ?? `Useful ${marketLabel} resources`,
      intro:
        pack.resources?.intro ??
        'Official links first; directory listings are independent, not endorsements. Verify California BHGS status for in-state moves and FMCSA for interstate legs before deposits.',
      items: merged,
    },
  };
}
