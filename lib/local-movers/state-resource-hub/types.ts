/**
 * State Resource Hub content pack — master template for high-authority state landers.
 *
 * Template scaling rules (see also TEMPLATE_RULES.md):
 * - Regions: only when curated county count justifies grouping
 * - Regulation: must match real state framework (never invent a regulator)
 * - Costs/challenges/routes: only with real state-specific substance
 * - Small states degrade to a shorter hub, not a forced CA-length page
 */

export type StateHubIntentId = 'within' | 'to' | 'from' | 'unsure';

export type StateHubIntent = {
  id: StateHubIntentId;
  label: string;
  href: string;
  description: string;
};

export type StateHubSnapshotStat = {
  label: string;
  value: string;
  note?: string;
};

export type StateHubRegion = {
  id: string;
  name: string;
  shortName: string;
  blurb: string;
  /** 1–2 key moving challenges for this region */
  challenges: string[];
  countySlugs: string[];
  /** Optional deep-dive anchor or external path */
  ctaLabel?: string;
};

export type StateHubRegulationMode =
  | 'strong_state_regulator'
  | 'partial_state_regulation'
  | 'primarily_federal'
  | 'limited_or_none';

export type StateHubRegulationBlock = {
  /** How this state's regulation module should present */
  mode: StateHubRegulationMode;
  title: string;
  intro: string;
  interstate: { title: string; body: string };
  intrastate: { title: string; body: string };
  verifySteps: string[];
  protections: Array<{ title: string; detail: string }>;
  officialLinks: Array<{ label: string; href: string; external?: boolean }>;
  /** Always shown near official links */
  disclaimer: string;
};

export type StateHubCostRange = {
  label: string;
  value: string;
  note?: string;
};

export type StateHubRoute = {
  label: string;
  href?: string;
  note: string;
  /** Origin metros / markets */
  origins?: string;
  /** Distance / transit context */
  transit?: string;
  /** Planning / cost note */
  planningNote?: string;
};

export type StateHubChallenge = {
  title: string;
  detail: string;
};

export type StateHubFaqItem = {
  question: string;
  answer: string;
};

export type StateHubWhyDifferent = {
  title: string;
  paragraphs: string[];
};

export type StateHubCostMethodology = {
  title: string;
  body: string;
  lastReviewed: string; // ISO
};

/**
 * Display strategy for regions — derived from county count + pack configuration.
 * Implemented in `resolveRegionDisplayMode`.
 */
export type RegionDisplayMode =
  | 'flat_county_list'
  | 'regions_as_anchors'
  | 'full_regions';

export type StateResourceHubPack = {
  stateSlug: string;
  stateCode: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubhead: string;
  trustBar: string[];
  intents: StateHubIntent[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tertiaryCta: { label: string; href: string };
  whyDifferent: StateHubWhyDifferent;
  snapshot: {
    title: string;
    methodology: string;
    stats: StateHubSnapshotStat[];
  };
  regulations: StateHubRegulationBlock;
  /** Empty array → skip regions module; use flat county list only */
  regions: StateHubRegion[];
  costs: {
    title: string;
    intro: string;
    methodology: StateHubCostMethodology;
    ranges: StateHubCostRange[];
    factors: string[];
  };
  routes: {
    title: string;
    intro: string;
    /** outbound-dominant | inbound-dominant | balanced */
    migrationProfile: 'outbound_dominant' | 'inbound_dominant' | 'balanced';
    outbound: StateHubRoute[];
    inbound?: StateHubRoute[];
  };
  challenges: {
    title: string;
    intro: string;
    items: StateHubChallenge[];
  };
  tools: Array<{ label: string; href: string; description: string }>;
  faq: StateHubFaqItem[];
  trust: {
    byline: string;
    lastReviewed: string;
    methodology: string;
    independence: string;
    sources?: Array<{ label: string; href?: string }>;
  };
  stickyNav: Array<{ id: string; label: string }>;
};

/** Rough guidance for when to show regional grouping. */
export function resolveRegionDisplayMode(
  curatedCountyCount: number,
  regionCount: number
): RegionDisplayMode {
  if (regionCount === 0 || curatedCountyCount < 8) {
    return 'flat_county_list';
  }
  if (curatedCountyCount <= 25) {
    return 'regions_as_anchors';
  }
  return 'full_regions';
}

export function formatCountyCountLabel(n: number): string {
  return n === 1 ? '1 county' : `${n} counties`;
}
