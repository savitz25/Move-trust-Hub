import 'server-only';

import { filterCompanies, type DirectoryFilterInput } from '@/lib/directory/filter-companies';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import {
  DIRECTORY_MAX_PAGE_LIMIT,
  DIRECTORY_PAGE_SIZE,
} from '@/lib/directory/page-size';
import type { Company } from '@/types';

export type DirectoryPageResult = {
  companies: Company[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

/**
 * Server-side filter → sort → offset/limit for the public directory.
 * Uses the same filterCompanies logic as the client for consistent results.
 * No total browse cap — callers may page through the entire filtered set.
 */
export async function queryDirectoryPage(options: {
  offset?: number;
  limit?: number;
  filters?: DirectoryFilterInput;
}): Promise<DirectoryPageResult> {
  const limit = Math.min(
    Math.max(options.limit ?? DIRECTORY_PAGE_SIZE, 1),
    DIRECTORY_MAX_PAGE_LIMIT
  );
  const offset = Math.max(options.offset ?? 0, 0);

  const all = prepareCompaniesForDirectoryClient(await getUnifiedDirectoryCompanies());
  const filtered = filterCompanies(all, options.filters ?? {});
  const companies = filtered.slice(offset, offset + limit);

  return {
    companies,
    total: filtered.length,
    offset,
    limit,
    hasMore: offset + companies.length < filtered.length,
  };
}
