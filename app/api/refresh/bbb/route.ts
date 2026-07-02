import { NextResponse } from 'next/server';
import { verifyRefreshAuth } from '@/lib/bbb/refresh/auth';
import { runBbbRefresh } from '@/lib/bbb/refresh/runner';
import type { RefreshMode } from '@/lib/bbb/refresh/types';

export const runtime = 'nodejs';
export const maxDuration = 300;

function parseMode(request: Request): RefreshMode {
  const url = new URL(request.url);
  const queryMode = url.searchParams.get('mode');
  if (queryMode === 'full' || queryMode === 'incremental') return queryMode;
  if (new Date().getUTCDay() === 0) return 'full';
  return 'incremental';
}

function parseForce(request: Request): boolean {
  return new URL(request.url).searchParams.get('force') === 'true';
}

function parseLimit(request: Request): number | undefined {
  const raw = new URL(request.url).searchParams.get('limit');
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

async function handleRefresh(request: Request) {
  const { authorized, source } = await verifyRefreshAuth(request);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { mode?: RefreshMode; force?: boolean; limit?: number } = {};
  if (request.method === 'POST') {
    try {
      body = (await request.json()) as typeof body;
    } catch {
      body = {};
    }
  }

  const result = await runBbbRefresh({
    mode: body.mode ?? parseMode(request),
    triggeredBy: source === 'admin' ? 'admin' : request.headers.get('x-github-action') ? 'github' : 'cron',
    force: body.force ?? parseForce(request),
    limit: body.limit ?? parseLimit(request),
  });

  return NextResponse.json(result, {
    status: result.status === 'failed' ? 500 : 200,
  });
}

export async function GET(request: Request) {
  return handleRefresh(request);
}

export async function POST(request: Request) {
  return handleRefresh(request);
}