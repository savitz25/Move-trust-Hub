import { isDistinctUsableDba } from '@/lib/companies/public-display-name';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import {
  isDisplayableGoogleForUi,
  sanitizeGooglePlacesForDisplay,
} from '@/lib/verification/display-enrichment';
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
  const g = sanitizeGooglePlacesForDisplay(company.googleData);
  return Boolean(
    isDisplayableGoogleForUi(g) || company.publicScrapeData || g?.last_fetched
  );
}

/**
 * Public display name for merged rows.
 * Never let a richer catalog snapshot overwrite a DB-resolved DBA with the legal name.
 */
function pickPublicDisplayName(directory: Company, catalog: Company): string {
  const legal =
    directory.fmcsaLegalName?.trim() || catalog.fmcsaLegalName?.trim() || null;
  const dirName = directory.name?.trim() || '';
  const catName = catalog.name?.trim() || '';

  // Prefer a distinct DBA from either side when we know the legal entity name.
  if (dirName && isDistinctUsableDba(dirName, legal)) return dirName;
  if (catName && isDistinctUsableDba(catName, legal)) return catName;

  // Default: DB mapRow name (already DBA-resolved) over static catalog legal name.
  return dirName || catName || 'Unnamed company';
}

/** Overlay Google/scrape enrichment from a sparse DB stub onto the richer catalog profile. */
export function mergeEnrichmentOntoProfile(base: Company, enrichment: Company): Company {
  // Prefer any usable Google snapshot from either side (DB often has it; catalog rarely).
  const baseG = sanitizeGooglePlacesForDisplay(base.googleData);
  const enrichG = sanitizeGooglePlacesForDisplay(enrichment.googleData);
  const google =
    (isDisplayableGoogleForUi(baseG) ? baseG : null) ??
    (isDisplayableGoogleForUi(enrichG) ? enrichG : null) ??
    enrichG ??
    baseG;
  const useGoogleRating =
    isDisplayableGoogleForUi(google) && google!.rating != null && google!.rating > 0;
  const baseRating = base.overallRating > 0 ? base.overallRating : 0;
  const enrichRating = enrichment.overallRating > 0 ? enrichment.overallRating : 0;
  // Keep industry-reported editorial ratings separate from the Google Places snapshot.
  // Only fall back to Places for overallRating when both sides have no editorial value
  // (local movers with empty columns). Never replace seed industry volume with Places count.
  const editorialRating = Math.max(baseRating, enrichRating);
  const editorialCount = Math.max(
    base.reviewCount > 0 ? base.reviewCount : 0,
    enrichment.reviewCount > 0 ? enrichment.reviewCount : 0
  );

  const googleAddr =
    isDisplayableGoogleForUi(google) && google?.formatted_address?.trim()
      ? google.formatted_address.trim()
      : null;
  const baseAddr = base.physicalAddress?.trim() || '';
  const enrichAddr = enrichment.physicalAddress?.trim() || '';
  // Prefer a fuller street address over thin "City, ST" headquarters-only seeds.
  const physicalAddress =
    (baseAddr.length > 12 && /\d/.test(baseAddr) ? baseAddr : null) ||
    (enrichAddr.length > 12 && /\d/.test(enrichAddr) ? enrichAddr : null) ||
    googleAddr ||
    baseAddr ||
    enrichAddr ||
    base.physicalAddress ||
    enrichment.physicalAddress;

  return normalizeCompanyForDisplay({
    ...base,
    // Live directory/DB identity must win over static catalog/seed stubs.
    id: enrichment.id || base.id,
    slug: (enrichment.slug || base.slug || '').trim() || base.slug,
    usdotNumber: enrichment.usdotNumber || base.usdotNumber,
    mcNumber: enrichment.mcNumber || base.mcNumber,
    googleData: google,
    publicScrapeData: enrichment.publicScrapeData ?? base.publicScrapeData,
    overallRating:
      editorialRating > 0
        ? editorialRating
        : useGoogleRating
          ? google.rating!
          : 0,
    reviewCount:
      editorialCount > 0
        ? editorialCount
        : useGoogleRating && google.review_count != null
          ? google.review_count
          : 0,
    physicalAddress: physicalAddress || base.physicalAddress,
    phone:
      base.phone?.trim() ||
      enrichment.phone?.trim() ||
      (google?.status === 'ok' ? google.phone : null) ||
      base.phone ||
      enrichment.phone,
    // Prefer confirmed scrape-backed BBB from either side (mapRow already gates grades).
    bbbRating:
      base.bbbRating && base.bbbRating !== 'NR'
        ? base.bbbRating
        : enrichment.bbbRating && enrichment.bbbRating !== 'NR'
          ? enrichment.bbbRating
          : base.bbbRating ?? 'NR',
    bbbAccredited: Boolean(base.bbbAccredited || enrichment.bbbAccredited),
    lastUpdated: enrichment.lastUpdated || base.lastUpdated,
  });
}

function pickMergedProfile(directory: Company, catalog: Company): Company {
  const directoryRicher = profileRichnessScore(directory) >= profileRichnessScore(catalog);
  const base = directoryRicher ? directory : catalog;
  const enrichmentSource = directoryRicher ? catalog : directory;

  let merged: Company;
  if (hasVerificationEnrichment(directory) || hasVerificationEnrichment(catalog)) {
    const enrichment =
      hasVerificationEnrichment(directory) && !hasVerificationEnrichment(catalog)
        ? directory
        : hasVerificationEnrichment(catalog) && !hasVerificationEnrichment(directory)
          ? catalog
          : enrichmentSource;
    merged = mergeEnrichmentOntoProfile(base, enrichment);
  } else {
    merged = base;
  }

  return normalizeCompanyForDisplay({
    ...merged,
    name: pickPublicDisplayName(directory, catalog),
    fmcsaLegalName:
      directory.fmcsaLegalName ?? catalog.fmcsaLegalName ?? merged.fmcsaLegalName,
    // Keep live scope/type from DB when catalog snapshot is the richer base.
    serviceScope: directory.serviceScope ?? catalog.serviceScope ?? merged.serviceScope,
    entityType: directory.entityType ?? catalog.entityType ?? merged.entityType,
  });
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