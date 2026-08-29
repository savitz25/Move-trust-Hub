import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { logger } from '@/lib/logging/logger';
import { searchMovers } from '@/lib/search/query';
import { SEARCH_QUERY_MAX_LENGTH, SEARCH_SUGGESTION_COMPANY_LIMIT } from '@/lib/search/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') ?? '').slice(0, SEARCH_QUERY_MAX_LENGTH);
  const limit = Math.min(
    Math.max(Number.parseInt(searchParams.get('limit') || '', 10) || SEARCH_SUGGESTION_COMPANY_LIMIT, 1),
    SEARCH_SUGGESTION_COMPANY_LIMIT
  );

  const result = await searchMovers(query, { limit });

  loggerSafe(result);

  return NextResponse.json(
    {
      query: result.query,
      intent: result.intent,
      results: result.results,
      place_results: result.placeResults,
      verification_action: result.verificationAction,
      exact_name_group_size: result.exactNameGroupSize,
      direct_jump_slug: result.directJumpSlug,
      ambiguity: result.ambiguity,
      result_count: result.resultCount,
      latency_ms: result.latencyMs,
      search_path: result.searchPath,
    },
    {
      headers: {
        'Cache-Control': apiCacheControl(30),
      },
    }
  );
}

function loggerSafe(result: Awaited<ReturnType<typeof searchMovers>>) {
  logger.info('search.movers', {
    intent: result.intent,
    matchTier: result.results[0]?.matchTier ?? null,
    resultCount: result.resultCount,
    searchPath: result.searchPath,
    latencyMs: result.latencyMs,
    dbMs: result.dbMs,
    candidateCount: result.candidateCount,
    queryLength: result.query.length,
    ambiguity: result.ambiguity,
  });
}
