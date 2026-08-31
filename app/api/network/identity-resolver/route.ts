import { NextResponse } from 'next/server';
import { MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, MOVE_NETWORK_RESOLVER_VERSION, MoveNetworkResolverError, resolveMoveNetworkIdentity, type MoveNetworkResolverRequest } from '@/lib/search/network-resolver';

export const dynamic = 'force-dynamic';

function errorResponse(error: unknown) {
  const known = error instanceof MoveNetworkResolverError ? error : new MoveNetworkResolverError('BACKEND_UNAVAILABLE', 'canonical resolver is unavailable', 503, true);
  return NextResponse.json({ contractVersion: MOVE_NETWORK_RESOLVER_VERSION, contractFingerprint: MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, error: { code: known.code, message: known.message, retryable: known.retryable } }, { status: known.status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

async function run(input: MoveNetworkResolverRequest) {
  try {
    const response = await resolveMoveNetworkIdentity(input);
    return NextResponse.json(response, { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=120', 'X-Robots-Tag': 'noindex, nofollow' } });
  } catch (error) { return errorResponse(error); }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  return run({ query: url.searchParams.get('q') ?? '', contractVersion: url.searchParams.get('contract_version') ?? undefined, intentHint: (url.searchParams.get('intent') ?? undefined) as MoveNetworkResolverRequest['intentHint'], limit: Number(url.searchParams.get('limit') || 0) || undefined, requestId: url.searchParams.get('request_id') ?? undefined });
}

export async function POST(request: Request) {
  try { return run(await request.json() as MoveNetworkResolverRequest); }
  catch { return errorResponse(new MoveNetworkResolverError('INVALID_QUERY', 'request body must be valid JSON', 400, false)); }
}
