import { NextResponse } from 'next/server';
import { verifyRefreshAuth } from '@/lib/bbb/refresh/auth';
import {
  runLenderEnrichmentRefresh,
  type LenderRefreshMode,
} from '@/lib/lender/enrichment/run-refresh';
import { exportEnrichmentStoreFromDb } from '@/lib/lender/enrichment/persist';

export const runtime = 'nodejs';
export const maxDuration = 300;

function parseMode(request: Request): LenderRefreshMode {
  const url = new URL(request.url);
  const queryMode = url.searchParams.get('mode');
  if (queryMode === 'full' || queryMode === 'incremental') return queryMode;
  if (new Date().getUTCDay() === 0) return 'full';
  return 'incremental';
}

function parseLimit(request: Request): number | undefined {
  const raw = new URL(request.url).searchParams.get('limit');
  if (!raw) return 40;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 40;
}

function parseOffset(request: Request): number | undefined {
  const raw = new URL(request.url).searchParams.get('offset');
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

async function handleRefresh(request: Request) {
  const { authorized, source } = await verifyRefreshAuth(request);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { mode?: LenderRefreshMode; limit?: number; offset?: number; slug?: string } = {};
  if (request.method === 'POST') {
    try {
      body = (await request.json()) as typeof body;
    } catch {
      body = {};
    }
  }

  const url = new URL(request.url);
  const slug = body.slug ?? url.searchParams.get('slug') ?? undefined;

  const result = await runLenderEnrichmentRefresh({
    mode: body.mode ?? parseMode(request),
    limit: body.limit ?? parseLimit(request),
    offset: body.offset ?? parseOffset(request),
    slug,
    dryRun: false,
    concurrency: 2,
  });

  let exported = 0;
  if (result.enriched > 0) {
    try {
      exported = await exportEnrichmentStoreFromDb();
    } catch {
      // JSON export is best-effort for static builds
    }
  }

  return NextResponse.json(
    {
      ...result,
      triggeredBy: source === 'admin' ? 'admin' : request.headers.get('x-github-action') ? 'github' : 'cron',
      exportedToJson: exported,
    },
    { status: result.status === 'failed' ? 500 : 200 }
  );
}

export async function GET(request: Request) {
  return handleRefresh(request);
}

export async function POST(request: Request) {
  return handleRefresh(request);
}