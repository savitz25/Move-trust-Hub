import 'server-only';

import { resolveDirectoryQueryEngine } from '@/lib/directory/directory-query-engine';
import { filterCompanies, type DirectoryFilterInput } from '@/lib/directory/filter-companies';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import { queryDbDirectoryPage } from '@/lib/directory/query-db-directory-page';
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
 * Legacy engine: hydrate full unified directory → filter/sort in Node → slice.
 * Remains the production default until Task 009A.2 cutover.
 */
export async function queryLegacyDirectoryPage(options: {
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

/**
 * Server-side filter → sort → offset/limit for the public directory.
 *
 * Task 009A.1: DB-backed engine is available behind opt-in only
 * (`DIRECTORY_QUERY_ENGINE=db` or Preview `engine=db`). Production default = legacy.
 */
export async function queryDirectoryPage(options: {
  offset?: number;
  limit?: number;
  filters?: DirectoryFilterInput;
  /** Preview/local opt-in: 'db' | 'legacy'. Ignored on production unless env forces db. */
  engine?: string | null;
}): Promise<DirectoryPageResult> {
  const engine = resolveDirectoryQueryEngine({ requestEngine: options.engine });
  if (engine === 'db') {
    return queryDbDirectoryPage({
      offset: options.offset,
      limit: options.limit,
      filters: options.filters,
    });
  }
  return queryLegacyDirectoryPage({
    offset: options.offset,
    limit: options.limit,
    filters: options.filters,
  });
}
