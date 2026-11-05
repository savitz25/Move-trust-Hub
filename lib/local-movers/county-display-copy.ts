import type { LocalCounty } from '@/lib/local-movers/types';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';

/** Honest page title — movers serving an area, not falsely headquartered locally. */
export function buildCountyPageTitle(county: LocalCounty, seoYear: string): string {
  const seat = county.seat ? ` (${county.seat})` : '';
  return `Movers Serving ${buildCountyLabel(county)}${seat}, ${county.stateCode} | ${seoYear} Guide`;
}

export function buildCountyPageH1(county: LocalCounty): string {
  const seat = county.seat ? ` (${county.seat})` : '';
  return `Movers Serving ${buildCountyLabel(county)}${seat}, ${county.stateCode}`;
}

export function buildCountyHeroIntro(
  countyLabel: string,
  moverCount: number,
  isRegionalFallback: boolean,
  /** When set (hyper-local pack), prepends county-specific intelligence opener */
  intelligenceOpener?: string | null
): string {
  if (intelligenceOpener?.trim()) {
    const base =
      moverCount > 0
        ? ` Below: ${moverCount} verified listing${moverCount === 1 ? '' : 's'} serving ${countyLabel}, plus zone tips, cost drivers, and practical resources.`
        : ` No movers are listed for ${countyLabel}. The sections below cover zone tips, cost drivers, and practical resources.`;
    return `${intelligenceOpener.trim()}${base}`;
  }
  if (moverCount === 0) {
    return `No movers are listed for ${countyLabel}. Search the mover directory or use the moving calculator on this page.`;
  }
  if (isRegionalFallback) {
    return `Compare ${moverCount} FMCSA-licensed movers serving ${countyLabel}. These regional providers are verified in our independent directory — headquarters may be outside the county.`;
  }
  return `Compare ${moverCount} FMCSA-licensed movers serving ${countyLabel}. Ratings, services, and licensing — with links to full profiles in our interstate directory.`;
}

export function buildMoversSectionHeading(countyLabel: string, moverCount: number): string {
  if (moverCount === 0) {
    return `No movers listed for ${countyLabel}`;
  }
  return `Movers serving ${countyLabel}`;
}