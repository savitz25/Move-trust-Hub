'use server';

import { filterCompanies } from '@/lib/directory/filter-companies';
import type { DirectorySearchScope } from '@/lib/directory/search-scope';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import type { Company } from '@/types';

export type SearchMoversDirectoryResult = {
  success: boolean;
  results: Company[];
  totalMatches: number;
  query: string;
};

export async function searchMoversDirectory(input: {
  query: string;
  scope?: DirectorySearchScope;
  limit?: number;
}): Promise<SearchMoversDirectoryResult> {
  const query = input.query.trim();
  const limit = Math.min(Math.max(input.limit ?? 8, 1), 24);

  if (!query) {
    return { success: true, results: [], totalMatches: 0, query };
  }

  const all = await getUnifiedDirectoryCompanies();
  const matched = filterCompanies(all, {
    search: query,
    scope: input.scope,
    sort: 'reputation',
  });

  return {
    success: true,
    results: matched.slice(0, limit),
    totalMatches: matched.length,
    query,
  };
}