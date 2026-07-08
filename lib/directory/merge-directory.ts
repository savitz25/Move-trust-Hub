import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import type { Company } from '@/types';

function dedupeKey(company: Company): string {
  const dot = company.usdotNumber?.replace(/\D/g, '');
  if (dot && dot.length >= 5) return `dot:${dot}`;
  const slug = (company.slug || company.id || '').trim().toLowerCase();
  if (slug) return `slug:${slug}`;
  return `name:${company.name.trim().toLowerCase()}`;
}

function profileRichnessScore(company: Company): number {
  return (
    (company.services?.length ?? 0) * 10 +
    (company.description?.length ?? 0) +
    (company.shortDescription?.length ?? 0)
  );
}

function hasVerificationEnrichment(company: Company): boolean {
  return Boolean(
    company.googleData?.status === 'ok' ||
      company.publicScrapeData ||
      company.googleData?.last_fetched
  );
}

/** Overlay Google/scrape enrichment from a sparse DB stub onto the richer catalog profile. */
export function mergeEnrichmentOntoProfile(base: Company, enrichment: Company): Company {
  const google = enrichment.googleData ?? base.googleData;
  const useGoogleRating = google?.status === 'ok' && google.rating != null && google.rating > 0;

  return normalizeCompanyForDisplay({
    ...base,
    googleData: google,
    publicScrapeData: enrichment.publicScrapeData ?? base.publicScrapeData,
    overallRating: useGoogleRating ? google.rating! : base.overallRating,
    reviewCount:
      useGoogleRating && google.review_count != null ? google.review_count : base.reviewCount,
    lastUpdated: enrichment.lastUpdated || base.lastUpdated,
  });
}

function pickMergedProfile(directory: Company, catalog: Company): Company {
  const directoryRicher = profileRichnessScore(directory) >= profileRichnessScore(catalog);
  const base = directoryRicher ? directory : catalog;
  const enrichmentSource = directoryRicher ? catalog : directory;

  if (hasVerificationEnrichment(directory) || hasVerificationEnrichment(catalog)) {
    const enrichment =
      hasVerificationEnrichment(directory) && !hasVerificationEnrichment(catalog)
        ? directory
        : hasVerificationEnrichment(catalog) && !hasVerificationEnrichment(directory)
          ? catalog
          : enrichmentSource;
    return mergeEnrichmentOntoProfile(base, enrichment);
  }

  return base;
}

/**
 * Merge interstate directory companies with supplemental catalog movers.
 * On duplicate USDOT/slug, keeps the richer profile and overlays verification enrichment.
 */
export function mergeDirectoryCompanies(
  directoryCompanies: Company[],
  catalogCompanies: Company[]
): Company[] {
  const map = new Map<string, Company>();

  for (const company of directoryCompanies) {
    map.set(dedupeKey(company), company);
  }

  for (const company of catalogCompanies) {
    const key = dedupeKey(company);
    const existing = map.get(key);
    if (!existing) {
      map.set(key, company);
      continue;
    }
    map.set(key, pickMergedProfile(existing, company));
  }

  return [...map.values()];
}