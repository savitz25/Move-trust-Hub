/**
 * Legacy / marketing slugs → canonical article slugs in lib/insurance/resources/articles.ts
 */
export const INSURANCE_RESOURCE_SLUG_ALIASES: Record<string, string> = {
  'how-to-choose-health-insurance': 'how-to-choose-health-insurance-plan',
  'health-insurance-2026-guide': 'how-to-choose-health-insurance-plan',
  'understanding-aca-subsidies': 'aca-obamacare-guide',
  'texas-auto-insurance': 'auto-insurance-costs-by-state',
  'california-home-insurance': 'homeowners-insurance-basics',
  'wildfire-insurance': 'homeowners-insurance-basics',
  'new-york-auto-insurance': 'auto-insurance-costs-by-state',
  'north-carolina-insurance': 'homeowners-insurance-basics',
  'illinois-auto-insurance': 'auto-insurance-costs-by-state',
  'obamacare-guide': 'aca-obamacare-guide',
  'medigap-guide': 'medicare-advantage-guide',
};

export function resolveInsuranceResourceSlug(slug: string): string {
  return INSURANCE_RESOURCE_SLUG_ALIASES[slug] ?? slug;
}