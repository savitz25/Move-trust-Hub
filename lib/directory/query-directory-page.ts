import 'server-only';

import {
  isLegacyFallbackAllowed,
  recordDirectoryQueryPath,
  resolveDirectoryQueryEngine,
} from '@/lib/directory/directory-query-engine';
import { filterCompanies, type DirectoryFilterInput } from '@/lib/directory/filter-companies';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import {
  getLastDbDirectoryDiagnostics,
  queryDbDirectoryPage,
} from '@/lib/directory/query-db-directory-page';
import {
  DIRECTORY_MAX_PAGE_LIMIT,
  DIRECTORY_PAGE_SIZE,
} from '@/lib/directory/page-size';
import { logger } from '@/lib/logging/logger';
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
 * Kept for explicit rollback (DIRECTORY_QUERY_ENGINE=legacy) and rare emergency fallback.
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

function isHardDbFailure(result: DirectoryPageResult, diagPath: string | undefined): boolean {
  // Empty page with total 0 on an unfiltered default browse is suspicious when
  // Supabase is configured — treat as hard failure for fallback purposes.
  const filtersEmpty = true; // caller decides context
  void filtersEmpty;
  void diagPath;
  return result.total === 0 && result.companies.length === 0;
}

/**
 * Server-side filter → sort → offset/limit for the public directory.
 *
 * Task 009A.2: DB-backed engine is the production default.
 * Rollback: DIRECTORY_QUERY_ENGINE=legacy
 * Emergency fallback: DIRECTORY_ENGINE_LEGACY_FALLBACK=1 (logged, rare).
 */
export async function queryDirectoryPage(options: {
  offset?: number;
  limit?: number;
  filters?: DirectoryFilterInput;
  /** Explicit engine hint: 'db' | 'legacy'. Legacy hint gated by env/preview. */
  engine?: string | null;
}): Promise<DirectoryPageResult> {
  const engine = resolveDirectoryQueryEngine({ requestEngine: options.engine });
  const filters = options.filters ?? {};
  const isDefaultBrowse =
    !filters.search?.trim() &&
    !filters.state &&
    !(filters.counties && filters.counties.length) &&
    !filters.services?.length;

  if (engine === 'legacy') {
    recordDirectoryQueryPath('legacy');
    logger.warn('directory.query_engine.legacy_explicit', {
      reason: 'DIRECTORY_QUERY_ENGINE=legacy or allowed engine=legacy hint',
    });
    return queryLegacyDirectoryPage({
      offset: options.offset,
      limit: options.limit,
      filters,
    });
  }

  try {
    const page = await queryDbDirectoryPage({
      offset: options.offset,
      limit: options.limit,
      filters,
    });
    const diag = getLastDbDirectoryDiagnostics();
    const path = diag?.path === 'hybrid-local' ? 'hybrid' : 'db';
    recordDirectoryQueryPath(path);

    // Hard empty on default browse with configured DB → optional emergency fallback.
    if (
      isDefaultBrowse &&
      isHardDbFailure(page, diag?.path) &&
      isLegacyFallbackAllowed()
    ) {
      recordDirectoryQueryPath('legacy_fallback');
      logger.error('directory.query_engine.legacy_fallback', {
        reason: 'db_default_browse_empty',
        diag,
      });
      return queryLegacyDirectoryPage({
        offset: options.offset,
        limit: options.limit,
        filters,
      });
    }

    return page;
  } catch (err) {
    if (isLegacyFallbackAllowed()) {
      recordDirectoryQueryPath('legacy_fallback');
      logger.error('directory.query_engine.legacy_fallback', {
        reason: 'db_threw',
        message: err instanceof Error ? err.message : String(err),
      });
      return queryLegacyDirectoryPage({
        offset: options.offset,
        limit: options.limit,
        filters,
      });
    }
    logger.error('directory.query_engine.db_failed_no_fallback', {
      message: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
