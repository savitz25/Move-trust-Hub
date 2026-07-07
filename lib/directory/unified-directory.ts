import 'server-only';

import { unstable_cache } from 'next/cache';
import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { localMoverToCompany } from '@/lib/directory/local-mover-to-company';
import { mergeDirectoryCompanies } from '@/lib/directory/merge-directory';
import { getCompaniesCached } from '@/lib/supabase/queries/companies';
import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import type { Company } from '@/types';

async function buildUnifiedDirectory(): Promise<Company[]> {
  const directoryCompanies = await getCompaniesCached();

  const catalogCompanies = Object.values(fullMoversCatalog)
    .filter(isCuratedMover)
    .map(localMoverToCompany);

  return mergeDirectoryCompanies(directoryCompanies, catalogCompanies);
}

/** Full movers directory: Supabase companies + curated local catalog (cached). */
export const getUnifiedDirectoryCompanies = unstable_cache(
  buildUnifiedDirectory,
  ['unified-movers-directory-v1'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 60 }
);