import 'server-only';

import { unstable_cache } from 'next/cache';
import { activeDirectoryMovers } from '@/data/active-directory-movers';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import {
  companyCountyLookupKeys,
  enrichDirectoryWithStaticCountyCoverage,
} from '@/lib/directory/enrich-static-county-coverage';
import { localMoverToCompany } from '@/lib/directory/local-mover-to-company';
import {
  getAssignmentCountiesByCompanyKey,
  mergeCoverageWithAssignments,
} from '@/lib/directory/load-assignment-counties';
import { mergeDirectoryCompanies } from '@/lib/directory/merge-directory';
import { getCompaniesCached } from '@/lib/supabase/queries/companies';
import type { Company } from '@/types';

/**
 * Public movers directory for /companies.
 *
 * Merges live Supabase companies (interstate + local) with the active-directory
 * catalog snapshot. DB rows win on duplicate USDOT/slug so enrichment stays current.
 * Local movers appear when the user selects the "Local Mover" service filter or
 * filters by state/county coverage.
 *
 * County coverage is aligned with /local-movers/[state]/[county] pages:
 * 1) DB destination assignments
 * 2) Curated static county catalog assignments (same source as county pages)
 * 3) Inject catalog movers that appear on county pages but are not in Supabase
 */
async function buildUnifiedDirectory(): Promise<Company[]> {
  const [directoryCompanies, assignmentMap] = await Promise.all([
    getCompaniesCached(),
    getAssignmentCountiesByCompanyKey(),
  ]);

  // Snapshot is already filtered to FMCSA-active movers (see data/active-directory-movers.ts).
  const activeCatalogCompanies = Object.values(activeDirectoryMovers).map((mover) => {
    const company = localMoverToCompany(mover);
    return {
      ...company,
      authorityActive: true as const,
      outOfService: false,
      usdotStatus: 'ACTIVE' as const,
      isVerified: true,
      serviceScope: 'interstate' as const,
    };
  });

  const merged = mergeDirectoryCompanies(directoryCompanies, activeCatalogCompanies);

  const withDbAssignments = merged.map((company) => {
    let assigned = assignmentMap.get((company.slug || '').toLowerCase());
    if (!assigned?.length) {
      assigned = assignmentMap.get((company.id || '').toLowerCase());
    }
    // Also try directory- / bare aliases used in county assignment files
    if (!assigned?.length) {
      for (const key of companyCountyLookupKeys(company)) {
        const hit = assignmentMap.get(key);
        if (hit?.length) {
          assigned = hit;
          break;
        }
      }
    }
    if (!assigned?.length) return company;
    return {
      ...company,
      coverageCounties: mergeCoverageWithAssignments(company.coverageCounties, assigned),
    };
  });

  return enrichDirectoryWithStaticCountyCoverage(withDbAssignments);
}

/** Cached directory listing for /companies and slug resolution. */
export const getUnifiedDirectoryCompanies = unstable_cache(
  buildUnifiedDirectory,
  // v9: static county catalog coverage matches local-movers county pages
  ['unified-movers-directory-v9-county-catalog'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);
