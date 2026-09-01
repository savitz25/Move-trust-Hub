import { NextResponse } from 'next/server';
import {
  MOVE_SPECIALIST_EXECUTION_CONTRACT,
  MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_VERSION,
  MoveSpecialistExecutionError,
  type MoveSpecialistExecutionRequest,
} from '@/lib/specialist-execution/contract';
import {
  executeMoveSpecialist,
  requestFromNaturalQuery,
} from '@/lib/specialist-execution/execute';

export const dynamic = 'force-dynamic';

function errorResponse(error: unknown) {
  const known = error instanceof MoveSpecialistExecutionError
    ? error
    : new MoveSpecialistExecutionError('BACKEND_UNAVAILABLE', 'specialist execution is temporarily unavailable', 503, true);
  return NextResponse.json(
    {
      contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
      contractVersion: MOVE_SPECIALIST_EXECUTION_VERSION,
      schemaFingerprint: MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
      contractFingerprint: MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
      resultType: known.code,
      error: { code: known.code, message: known.message, retryable: known.retryable },
    },
    { status: known.status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } },
  );
}

async function run(input: MoveSpecialistExecutionRequest) {
  try {
    const response = await executeMoveSpecialist(input);
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': response.resultType === 'SUPPORTED_RESULTS'
          ? 'public, max-age=30, stale-while-revalidate=120'
          : 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    return run(requestFromNaturalQuery(
      url.searchParams.get('q') ?? '',
      Number(url.searchParams.get('page') ?? '1'),
      Number(url.searchParams.get('limit') ?? '20'),
    ));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    return run(await request.json() as MoveSpecialistExecutionRequest);
  } catch (error) {
    return errorResponse(error instanceof SyntaxError
      ? new MoveSpecialistExecutionError('INVALID_QUERY', 'request body must be valid JSON', 400, false)
      : error);
  }
}
