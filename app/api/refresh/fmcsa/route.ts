import { NextResponse } from 'next/server';
import { verifyRefreshAuth } from '@/lib/fmcsa/refresh/auth';
import { evaluateCanaryRequest } from '@/lib/fmcsa/refresh/canary';
import { fmcsaRefreshPause } from '@/lib/fmcsa/refresh/pause';
import { runFmcsaRefresh } from '@/lib/fmcsa/refresh/runner';
import type { RefreshMode } from '@/lib/fmcsa/refresh/types';

/**
 * Bounded incremental canary (admin session or cron auth).
 *
 * Step A pauses both modes (`FMCSA_REFRESH_PAUSED = true` in
 * `lib/fmcsa/refresh/pause.ts`). `canary=true` does not bypass that pause.
 * To run one canary: set `PAUSED_BY_MODE.incremental` to false, deploy, call
 * the URL below, then set incremental back to true if cron should stay paused.
 *
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *     "https://www.movetrusthub.com/api/refresh/fmcsa?canary=true&limit=5&mode=incremental"
 *
 * POST JSON `{ "canary": true, "limit": 5, "mode": "incremental" }` is the same
 * call. `limit` must be an integer from 1 to 10. Companies this canary does
 * not reach stay stale for the next incremental run. Do not add `canary=true`
 * to cron.
 */

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

function parseCanary(request: Request, body: { canary?: boolean }): boolean {
  if (body.canary === true) return true;
  const url = new URL(request.url);
  return url.searchParams.get('canary') === 'true';
}

async function handleRefresh(request: Request) {
  const { authorized, source } = await verifyRefreshAuth(request);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { mode?: RefreshMode; force?: boolean; limit?: number; canary?: boolean } = {};
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
  const canary = parseCanary(request, body);
  const triggeredBy = source === 'admin' ? 'admin' : request.headers.get('x-github-action') ? 'github' : 'cron';

  // TH-DPR-001 R2 step A: pause before any run row read or insert. `force` and canary do not bypass.
  const pause = fmcsaRefreshPause(mode);
  if (pause.paused) {
    return NextResponse.json(
      {
        skipped: true,
        paused: true,
        mode,
        status: 'paused',
        skipReason: pause.reason,
      },
      { status: 200 }
    );
  }

  if (canary) {
    const decision = evaluateCanaryRequest({ canary: true, limit, mode });
    if (!decision?.ok) {
      return NextResponse.json(
        { error: decision?.error ?? 'Canary request rejected', skipped: true },
        { status: decision?.status ?? 400 }
      );
    }

    const result = await runFmcsaRefresh({
      mode: decision.mode,
      triggeredBy,
      force,
      limit: decision.limit,
      canary: true,
    });

    return NextResponse.json(result, {
      status: result.status === 'failed' ? 500 : 200,
    });
  }

  const result = await runFmcsaRefresh({
    mode,
    triggeredBy,
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
