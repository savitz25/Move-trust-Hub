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

export type CountyIntelligenceSectionId =
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
