/**
 * Hyper-local county intelligence packs — structured content for premium county guides.
 * Flagship packs: California counties + major NJ counties and expanding.
 */

export type CountyIntelligenceZone = {
  id: string;
  name: string;
  /** Short tag for map / chips */
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  moverTips: string;
  /** Keywords to match mover.city / description for soft filtering */
  cityKeywords: string[];
};

export type CountyIntelligenceResource = {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
};

export type CountyIntelligenceCostDriver = {
  title: string;
  detail: string;
};

export type CountyIntelligenceSeason = {
  title: string;
  detail: string;
};

export type CountyIntelligenceBullet = {
  title?: string;
  detail: string;
};

/** Specialized logistics module (shore, rural, HOA, university, etc.) */
export type CountySpecializedModule = {
  id: string;
  title: string;
  intro: string;
  bullets: string[];
};

/** Relocation research module (schools, hospitals, housing, jobs, …) */
export type CountyRelocationModule = {
  id: string;
  title: string;
  intro?: string;
  bullets: CountyIntelligenceBullet[];
};

/**
 * Editorial content tier for intelligence packs.
 * Tier 1 = flagship metro depth. Tier 2 = secondary-market contract
 * (parent compare, fewer zones, sharper constraints) — not a thinner clone.
 * Independent of SEO indexability tiers in county-tier.ts.
 */
export type CountyIntelligenceContentTier = 'tier1' | 'tier2';

/** Parent-metro comparison module required on Tier 2 packs. */
export type CountyParentCompare = {
  /** e.g. "Los Angeles County" */
  parentLabel: string;
  /** Optional internal link to parent Tier 1 guide */
  parentHref?: string;
  title: string;
  intro: string;
  bullets: Array<{ title: string; detail: string }>;
};

export type CountyIntelligenceSectionId =
  | 'parentCompare'
  | 'whatMakesDifferent'
  | 'zones'
  | 'costDrivers'
  | 'seasonal'
  | 'specialized'
  | 'relocation'
  | 'resources';

export type CountyIntelligencePack = {
  stateSlug: string;
  countySlug: string;
  /** e.g. "LA County Moving Intelligence Hub" */
  hubTitle: string;
  /** Hero eyebrow */
  eyebrow: string;
  /** Strong county-specific H1 override (optional) */
  h1?: string;
  /** Hero opener — unique local challenges */
  heroOpener: string;
  /** One-line credibility strip under hero */
  heroCredibility?: string;
  /**
   * Editorial content tier. Tier 2 packs must include parentCompare,
   * 2–4 zones, 2–3 specialized modules, and compressed relocation.
   */
  contentTier?: CountyIntelligenceContentTier;
  /**
   * Required for contentTier === 'tier2': comparison vs nearest parent Tier 1 market.
   */
  parentCompare?: CountyParentCompare;
  whatMakesDifferent: {
    title: string;
    intro: string;
    bullets: Array<{ title: string; detail: string }>;
  };
  zones: CountyIntelligenceZone[];
  /** Override default zones section title (anti-sameness) */
  zonesHeading?: string;
  /** Optional intro under zone breakdown */
  zonesIntro?: string;
  costDrivers: {
    title: string;
    intro: string;
    drivers: CountyIntelligenceCostDriver[];
    ranges: Array<{ label: string; value: string; note?: string }>;
  };
  seasonal: {
    title: string;
    intro: string;
    items: CountyIntelligenceSeason[];
  };
  /** Optional specialized logistics modules (shore, rural access, HOA, etc.) */
  specialized?: CountySpecializedModule[];
  /**
   * Relocation research — schools, hospitals, housing, towns, jobs, lifestyle, demographics.
   * Tier 2: keep compressed (schools + hospitals primary).
   */
  relocation?: {
    title: string;
    intro: string;
    modules: CountyRelocationModule[];
  };
  resources: {
    title: string;
    intro: string;
    items: CountyIntelligenceResource[];
  };
  /** Section render order for anti-sameness */
  sectionOrder?: CountyIntelligenceSectionId[];
  /**
   * When true, deep sections render as collapsed accordions so mover listings stay primary.
   */
  collapsibleDeepContent?: boolean;
  directoryHint?: string;
  /**
   * Factual major roads/routes for the County Moving Snapshot only.
   * Must be real corridors (I-4, I-95, Cross Bronx Expressway, etc.) —
   * never operational commentary (tourism calendars, HOA density, curb staging).
   */
  majorCorridors?: string;
  lastReviewed: string; // ISO date
};

export const DEFAULT_INTELLIGENCE_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];

/** Locked Tier 2 section order: parent compare first, then compressed local intel. */
export const TIER2_INTELLIGENCE_SECTION_ORDER: CountyIntelligenceSectionId[] = [
  'parentCompare',
  'whatMakesDifferent',
  'zones',
  'costDrivers',
  'seasonal',
  'specialized',
  'relocation',
  'resources',
];
