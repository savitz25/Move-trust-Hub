import { isDistinctUsableDba } from '@/lib/companies/public-display-name';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import {
  isDisplayableGoogleForUi,
  sanitizeGooglePlacesForDisplay,
} from '@/lib/verification/display-enrichment';
import {
  applyRatingProvenance,
  nameIdentityScore,
  hasSharedLocationEvidence,
} from '@/lib/verification/rating-provenance';
import { GOOGLE_PLACES_MIN_ACCEPT_SCORE } from '@/lib/verification/google-places-name-queries';
import type { GooglePlacesData } from '@/lib/verification/types';
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
  const provider = {
    id: enrichment.id || base.id,
    name: enrichment.name || base.name,
    legalName: enrichment.fmcsaLegalName || base.fmcsaLegalName,
    usdotNumber: enrichment.usdotNumber || base.usdotNumber,
    website: enrichment.website || base.website,
    phone: enrichment.phone || base.phone,
    headquarters: enrichment.headquarters || base.headquarters,
  };
  const applicableGoogle = (candidate: GooglePlacesData | null) => {
    if (!candidate?.name?.trim()) return false;
    return (
      hasSharedLocationEvidence(candidate) ||
      nameIdentityScore(candidate.name, candidate.formatted_address, provider) >=
        GOOGLE_PLACES_MIN_ACCEPT_SCORE
    );
  };
  const namelessLegacy = (candidate: GooglePlacesData | null) =>
    Boolean(
      candidate &&
        !candidate.name?.trim() &&
        (candidate.rating ?? 0) > 0 &&
        (candidate.review_count ?? 0) > 0
    );
  const google =
    (applicableGoogle(enrichG) ? enrichG : null) ??
    (applicableGoogle(baseG) ? baseG : null) ??
    (namelessLegacy(enrichG) ? enrichG : null) ??
    (namelessLegacy(baseG) ? baseG : null) ??
    (!applicableGoogle(enrichG) && enrichG?.name?.trim() ? enrichG : null) ??
    (!applicableGoogle(baseG) && baseG?.name?.trim() ? baseG : null);

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

  const mergedWithoutRating = normalizeCompanyForDisplay({
    ...base,
    // Live directory/DB identity must win over static catalog/seed stubs.
    id: enrichment.id || base.id,
    slug: (enrichment.slug || base.slug || '').trim() || base.slug,
    usdotNumber: enrichment.usdotNumber || base.usdotNumber,
    mcNumber: enrichment.mcNumber || base.mcNumber,
    googleData: google,
    publicScrapeData: enrichment.publicScrapeData ?? base.publicScrapeData,
    overallRating: 0,
    reviewCount: 0,
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
    publicationState: enrichment.publicationState ?? base.publicationState,
    indexable: enrichment.indexable ?? base.indexable,
    serviceScope: enrichment.serviceScope ?? base.serviceScope,
    entityType: enrichment.entityType ?? base.entityType,
    services: (enrichment.services && enrichment.services.length > 0)
      ? enrichment.services
      : base.services,
  });
  // Second argument is the live company. Catalog/seed ratings stay on `base`
  // and are not eligible when this business has its own row.
  return applyRatingProvenance(mergedWithoutRating, {
    storedRating: enrichment.overallRating,
    storedReviewCount: enrichment.reviewCount,
    seedRating: base.overallRating,
    seedReviewCount: base.reviewCount,
    realBusiness: Boolean(enrichment.id),
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

  const identity = normalizeCompanyForDisplay({
    ...merged,
    // Live DB identity always wins. Catalog snapshots may still carry Task 002-era
    // copied USDOTs or names; never let those overwrite a canonical company.
    id: directory.id || merged.id,
    slug: (directory.slug || merged.slug || '').trim() || merged.slug,
    usdotNumber: directory.usdotNumber || merged.usdotNumber,
    mcNumber: directory.mcNumber || merged.mcNumber,
    name: directory.name?.trim() || pickPublicDisplayName(directory, catalog),
    fmcsaLegalName:
      directory.fmcsaLegalName ?? catalog.fmcsaLegalName ?? merged.fmcsaLegalName,
    // Keep live scope/type from DB when catalog snapshot is the richer base.
    serviceScope: directory.serviceScope ?? catalog.serviceScope ?? merged.serviceScope,
    entityType: directory.entityType ?? catalog.entityType ?? merged.entityType,
    publicationState:
      directory.publicationState ?? catalog.publicationState ?? merged.publicationState,
    indexable: directory.indexable ?? catalog.indexable ?? merged.indexable,
    googleData: merged.ratingProvenance
      ? merged.googleData ?? null
      : directory.googleData ?? catalog.googleData ?? merged.googleData,
  });
  if (merged.ratingProvenance?.withheldReason) {
    return identity;
  }
  return applyRatingProvenance(identity, {
    storedRating: directory.overallRating,
    storedReviewCount: directory.reviewCount,
    seedRating: catalog.overallRating,
    seedReviewCount: catalog.reviewCount,
    realBusiness: true,
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