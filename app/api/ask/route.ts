import { NextResponse } from 'next/server';
import { executeMoveRequest, publicAskPayload } from '@/lib/move-ask/execute';
import { inputFromSearchParams } from '@/lib/move-ask/plan';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const result = await executeMoveRequest(inputFromSearchParams(new URL(request.url).searchParams));
  return NextResponse.json(publicAskPayload(result), {
    status: result.terminalState === 'INVALID_INPUT' ? 400 : result.terminalState === 'UNAVAILABLE' ? 503 : 200,
    headers: {
      'Cache-Control': result.terminalState === 'UNAVAILABLE' || result.terminalState === 'INVALID_INPUT' ? 'no-store' : 'public, max-age=60, stale-while-revalidate=300',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
