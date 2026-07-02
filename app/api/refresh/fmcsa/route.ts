import { NextResponse } from 'next/server';
import { verifyRefreshAuth } from '@/lib/fmcsa/refresh/auth';
import { runFmcsaRefresh } from '@/lib/fmcsa/refresh/runner';
import type { RefreshMode } from '@/lib/fmcsa/refresh/types';

export const runtime = 'nodejs';
export const maxDuration = 300;

function parseMode(request: Request): RefreshMode {
  const url = new URL(request.url);
  const queryMode = url.searchParams.get('mode');
  if (queryMode === 'full' || queryMode === 'incremental') return queryMode;

  // Sunday (0) = weekly full refresh; other days incremental
  if (new Date().getUTCDay() === 0) return 'full';
  return 'incremental';
}

function parseForce(request: Request): boolean {
  const url = new URL(request.url);
  return url.searchParams.get('force') === 'true';
}

function parseLimit(request: Request): number | undefined {
  const url = new URL(request.url);
  const raw = url.searchParams.get('limit');
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

  const mode = body.mode ?? parseMode(request);
  const force = body.force ?? parseForce(request);
  const limit = body.limit ?? parseLimit(request);

  const result = await runFmcsaRefresh({
    mode,
    triggeredBy: source === 'admin' ? 'admin' : request.headers.get('x-github-action') ? 'github' : 'cron',
    force,
    limit,
  });

  return NextResponse.json(result, {
    status: result.status === 'failed' ? 500 : 200,
  });
}

/** Vercel Cron invokes GET; GitHub Actions / admin can use POST. */
export async function GET(request: Request) {
  return handleRefresh(request);
}

export async function POST(request: Request) {
  return handleRefresh(request);
}