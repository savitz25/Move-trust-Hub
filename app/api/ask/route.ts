import { NextResponse } from 'next/server';
import { MOVE_ASK_CAPABILITY, MOVE_ASK_CONTRACT, MOVE_ASK_PAGE_SIZE } from '@/lib/move-ask/contract';
import { executeMoveAsk, publicAskPayload } from '@/lib/move-ask/execute';
import { parseDirectoryResearchQuery } from '@/lib/directory/parse-directory-research-query';
import { executeMoveSpecialist, requestFromNaturalQuery } from '@/lib/specialist-execution/execute';
import { publicAskPayloadFromSpecialist } from '@/lib/move-ask/specialist-adapter';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 400);
  const page = Number(url.searchParams.get('page') ?? '1') || 1;
  if (!q) {
    return NextResponse.json(
      { contract: MOVE_ASK_CONTRACT, capability: MOVE_ASK_CAPABILITY, error: 'Missing q' },
      { status: 400, headers: { 'X-Robots-Tag': 'noindex, follow' } },
    );
  }
  const directoryPlan = parseDirectoryResearchQuery(q);
  if (directoryPlan.researchMode) {
    const result = await executeMoveSpecialist(requestFromNaturalQuery(q, page, MOVE_ASK_PAGE_SIZE));
    return NextResponse.json(publicAskPayloadFromSpecialist(result), {
      headers: {
        'Cache-Control': result.resultType === 'SUPPORTED_RESULTS'
          ? 'public, max-age=60, stale-while-revalidate=300'
          : 'no-store',
        'X-Robots-Tag': 'noindex, follow',
      },
    });
  }
  const result = await executeMoveAsk(q, page);
  return NextResponse.json(publicAskPayload(result), {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
