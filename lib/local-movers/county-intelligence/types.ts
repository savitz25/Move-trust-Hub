/**
 * Hyper-local county intelligence packs — structured content for premium county guides.
 * Flagship packs: California counties + Bergen, Essex, Middlesex, Monmouth, Morris & Ocean County, NJ (and expanding).
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
  /** Optional intro under “Hyper-local zone breakdown” (defaults to a generic line). */
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
  resources: {
    title: string;
    intro: string;
    items: CountyIntelligenceResource[];
  };
  directoryHint?: string;
  lastReviewed: string; // ISO date
};
