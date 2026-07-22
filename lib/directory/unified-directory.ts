import 'server-only';

import { unstable_cache } from 'next/cache';
import { activeDirectoryMovers } from '@/data/active-directory-movers';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { localMoverToCompany } from '@/lib/directory/local-mover-to-company';
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
 */
async function buildUnifiedDirectory(): Promise<Company[]> {
  const directoryCompanies = await getCompaniesCached();

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

  return mergeDirectoryCompanies(directoryCompanies, activeCatalogCompanies);
}

/** Cached directory listing for /companies and slug resolution. */
export const getUnifiedDirectoryCompanies = unstable_cache(
  buildUnifiedDirectory,
  ['unified-movers-directory-v5-local-filter'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);
