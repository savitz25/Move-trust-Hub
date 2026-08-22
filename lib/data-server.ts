import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import {
  getCompaniesCached,
  getCompanyBySlugOrUsdotFromDb,
  getIndexableCompanySitemapEntries,
} from '@/lib/supabase/queries/companies';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { resolveCompanyBySlug } from '@/lib/directory/resolve-company';
import { getReviewsForCompany } from '@/data/seed-reviews';
import { getCompanyBySlug as getSeedCompanyBySlug } from '@/data/seed-companies';
import {
  seedAutoTransportCompanies,
  getAutoTransportBySlug,
} from '@/data/seed-auto-transport';
import { portableContainerCompanies } from '@/data/portable-container-companies';
import { mergeEnrichmentOntoProfile } from '@/lib/directory/merge-directory';
import { applyAutoTransportGoogleEnrichment } from '@/lib/auto-transport/apply-google-enrichment';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import { finalizeCompanyEnrichmentForDisplay } from '@/lib/verification/company-display-enrichment';
import type { Company, Review } from '@/types';

/** Server Component / Route Handler entry point — React cache() dedupes per request. */
export const getAllCompanies = getCompaniesCached;
export { getIndexableCompanySitemapEntries };

/**
 * Prefer richer seed/catalog copy when DB is a thin enrichment stub, while keeping
 * live Google Places / BBB from Supabase on googleData + publicScrapeData.
 * Falls back to committed auto-transport Places JSON when DB has no displayable snapshot.
 */
/** Pin route/DB identity so seed/catalog never wipe slug (alias redirect safety). */
function pinCompanyIdentity(company: Company, requestedSlug: string, db?: Company): Company {
  const requested = (requestedSlug || '').trim();
  const preferredSlug =
    (db?.slug || '').trim() ||
    (company.slug || '').trim() ||
    requested;
  return {
    ...company,
    id: (db?.id || company.id || preferredSlug).trim(),
    slug: preferredSlug,
    usdotNumber: (db?.usdotNumber || company.usdotNumber || '').trim(),
    mcNumber: (db?.mcNumber || company.mcNumber || '').trim(),
  };
}

function mergeDbWithSeedCatalog(db: Company, slug: string): Company {
  const seed =
    getSeedCompanyBySlug(slug) ||
    getAutoTransportBySlug(slug) ||
    portableContainerCompanies.find((c) => c.slug === slug);
  if (!seed) {
    return finalizeCompanyEnrichmentForDisplay(
      applyAutoTransportGoogleEnrichment(pinCompanyIdentity(db, slug, db))
    );
  }
  // Seed is the editorial base (industry ratings, long description); DB carries Places/BBB.
  const merged = mergeEnrichmentOntoProfile(seed, db);
  return finalizeCompanyEnrichmentForDisplay(
    applyAutoTransportGoogleEnrichment(pinCompanyIdentity(merged, slug, db))
  );
}

/**
 * Profile lookup: prefer single-row DB (or seed) resolution before materializing
 * the full directory — avoids loading every company on cold profile/metadata paths.
 * Always finalizes Google/BBB display enrichment so profile + compare stay consistent.
 */
export const getCompanyBySlugAsync = cache(async function getCompanyBySlugAsync(
  slug: string
): Promise<Company | undefined> {
  const requested = (slug || '').trim();
  if (!requested) return undefined;

  const fromDb = await getCompanyBySlugOrUsdotFromDb(requested);
  // Profile routes: serve any resolvable published row. Displayability is for directory chrome.
  if (fromDb) {
    const merged = mergeDbWithSeedCatalog(fromDb, requested);
    // Phase 2: if USDOT maps to a stronger canonical slug, prefer that identity for redirects.
    return preferCanonicalSlugIdentity(merged, requested);
  }

  const companies = await getUnifiedDirectoryCompanies();
  const resolved = await resolveCompanyBySlug(requested, companies);
  if (!resolved) return undefined;
  return finalizeCompanyEnrichmentForDisplay(
    preferCanonicalSlugIdentity(pinCompanyIdentity(resolved, requested), requested)
  );
});

/** Identity pin after DB/seed merge — keep resolved slug for alias redirects. */
function preferCanonicalSlugIdentity(company: Company, _requestedSlug: string): Company {
  return company;
}

export const getReviews = cache(async (companyId: string, limit = 12): Promise<Review[]> => {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .order('date', { ascending: false })
      .limit(limit);
    if (data) return data as unknown as Review[];
  }
  return getReviewsForCompany(companyId, limit);
});

export const getAllReviewsForCompany = cache(async (companyId: string): Promise<Review[]> => {
  return getReviews(companyId, 500);
});

export const getAllAutoTransportCompanies = cache(async (): Promise<Company[]> => {
  const seeds = seedAutoTransportCompanies.filter(isPubliclyDisplayableCompany);
  if (!isSupabaseConfigured()) {
    return seeds.map(applyAutoTransportGoogleEnrichment);
  }

  // Overlay live Places/BBB enrichment from Supabase when present.
  const enriched = await Promise.all(
    seeds.map(async (seed) => {
      const fromDb = await getCompanyBySlugOrUsdotFromDb(seed.slug);
      if (!fromDb) return applyAutoTransportGoogleEnrichment(seed);
      return applyAutoTransportGoogleEnrichment(mergeEnrichmentOntoProfile(seed, fromDb));
    })
  );
  return enriched;
});

export async function getAutoTransportBySlugAsync(
  slug: string
): Promise<Company | undefined> {
  const seed =
    seedAutoTransportCompanies.find((c) => c.slug === slug) || getAutoTransportBySlug(slug);
  if (!seed || !isPubliclyDisplayableCompany(seed)) return undefined;

  const fromDb = await getCompanyBySlugOrUsdotFromDb(slug);
  if (!fromDb) return applyAutoTransportGoogleEnrichment(seed);
  return applyAutoTransportGoogleEnrichment(mergeEnrichmentOntoProfile(seed, fromDb));
}