/**
 * Research coverage is evidence depth, not mover quality.
 * Florida counties stay Statewide Research until validated local mover-level
 * evidence is loaded and reviewed.
 *
 * Enhanced Local Research is data-driven. Do not hard-code a county as Enhanced.
 */

export type ResearchCoverageLevel = 'statewide' | 'enhanced';

export const COVERAGE_LABEL: Record<ResearchCoverageLevel, string> = {
  statewide: 'Statewide Research',
  enhanced: 'Enhanced Local Research',
};

/**
 * Proposed Enhanced Local Research gate — DOCUMENTED, NOT ACTIVATED.
 *
 * All conjuncts must be true. Headquarters city, county seat, directory
 * `coverage_counties` (service assignments), and a county credential census
 * alone are not sufficient. operatingGeographyProven is the lock that keeps
 * every Florida county Statewide until a validated operating/activity dataset
 * exists.
 *
 * countyResearchCoverage() does not call this function. Wiring it is a
 * future evidence-gate change, not a page redesign.
 */
export type EnhancedLocalResearchGateInput = {
  countyCredentialCensusValidated: boolean;
  complaintsAttributed: boolean;
  enforcementFinalDispositionsAttributed: boolean;
  operatingGeographyProven: boolean;
  identityReviewed: boolean;
  publicEligibilityReviewed: boolean;
};

export function evaluateEnhancedLocalResearchGate(
  input: EnhancedLocalResearchGateInput
): ResearchCoverageLevel {
  const pass =
    input.countyCredentialCensusValidated &&
    input.complaintsAttributed &&
    input.enforcementFinalDispositionsAttributed &&
    input.operatingGeographyProven &&
    input.identityReviewed &&
    input.publicEligibilityReviewed;
  return pass ? 'enhanced' : 'statewide';
}

/** Public coverage for county pages. Always statewide until the gate is activated. */
export function countyResearchCoverage(_countySlug: string): ResearchCoverageLevel {
  return 'statewide';
}

export const FLORIDA_RESEARCH_COUNTIES = [
  { slug: 'broward', name: 'Broward', href: '/local-movers/florida/broward' },
  { slug: 'palm-beach', name: 'Palm Beach', href: '/local-movers/florida/palm-beach' },
  { slug: 'miami-dade', name: 'Miami-Dade', href: '/local-movers/florida/miami-dade' },
  { slug: 'pinellas', name: 'Pinellas', href: '/local-movers/florida/pinellas' },
] as const;

export type FloridaResearchCountySlug = (typeof FLORIDA_RESEARCH_COUNTIES)[number]['slug'];

export function isFloridaResearchCounty(slug: string): slug is FloridaResearchCountySlug {
  return FLORIDA_RESEARCH_COUNTIES.some((c) => c.slug === slug);
}

export function getFloridaResearchCounty(slug: string) {
  return FLORIDA_RESEARCH_COUNTIES.find((c) => c.slug === slug) ?? null;
}
