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
 * Merges live Supabase companies with the active-directory catalog snapshot
 * (~120–130 FMCSA-active movers). DB rows win on duplicate USDOT/slug so
 * enrichment (ratings, authority flags) stays current. Does NOT re-merge the
 * full local-mover catalog (that previously inflated the list to 397).
 */
function isInterstateDirectoryCompany(company: Company): boolean {
  return company.serviceScope !== 'intrastate';
}

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

  // Local/intrastate movers are county-page only — never the main /companies list.
  return mergeDirectoryCompanies(directoryCompanies, activeCatalogCompanies).filter(
    isInterstateDirectoryCompany
  );
}

/** Cached interstate directory listing for /companies and slug resolution. */
export const getUnifiedDirectoryCompanies = unstable_cache(
  buildUnifiedDirectory,
  ['unified-movers-directory-v4-scope'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 300 }
);
