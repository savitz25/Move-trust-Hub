/**
 * Research coverage is evidence depth, not mover quality.
 * Florida counties stay Statewide Research until validated local contractor-level
 * (here: mover-level) evidence is loaded and reviewed.
 */

export type ResearchCoverageLevel = 'statewide' | 'enhanced';

export const COVERAGE_LABEL: Record<ResearchCoverageLevel, string> = {
  statewide: 'Statewide Research',
  enhanced: 'Enhanced Local Research',
};

export function countyResearchCoverage(_countySlug: string): ResearchCoverageLevel {
  return 'statewide';
}

export const FLORIDA_RESEARCH_COUNTIES = [
  { slug: 'broward', name: 'Broward', href: '/local-movers/florida/broward' },
  { slug: 'palm-beach', name: 'Palm Beach', href: '/local-movers/florida/palm-beach' },
  { slug: 'miami-dade', name: 'Miami-Dade', href: '/local-movers/florida/miami-dade' },
  { slug: 'pinellas', name: 'Pinellas', href: '/local-movers/florida/pinellas' },
] as const;
