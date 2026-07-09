import 'server-only';

import { unstable_cache } from 'next/cache';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { getCompaniesCached } from '@/lib/supabase/queries/companies';
import type { Company } from '@/types';

/**
 * Public movers directory — Supabase companies only (FMCSA-refreshed, authority-filtered).
 * Local catalog scaffolds are excluded; they remain on county local-mover guides only.
 */
async function buildUnifiedDirectory(): Promise<Company[]> {
  return getCompaniesCached();
}

/** Cached interstate directory listing for /companies and slug resolution. */
export const getUnifiedDirectoryCompanies = unstable_cache(
  buildUnifiedDirectory,
  ['unified-movers-directory-v2-db-only'],
  { tags: [COMPANIES_DIRECTORY_TAG], revalidate: 60 }
);