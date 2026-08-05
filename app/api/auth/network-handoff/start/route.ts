import { NextResponse } from 'next/server';
import { runHandoffStart } from '@/lib/network/handoff-start-core';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function clientIp(request: Request): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

function bearerFrom(request: Request): string | null {
  const h = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m?.[1]?.trim() || null;
}

function applyHandoffHeaders(
  res: NextResponse,
  result: Awaited<ReturnType<typeof runHandoffStart>>
) {
  if (result.ok) {
    res.headers.set('x-network-handoff', 'ok');
    res.headers.set('x-network-handoff-to', result.toHub);
  } else {
    res.headers.set('x-network-handoff', `skip:${result.reason}`);
    res.headers.set('x-network-handoff-cookie', result.hasAuthCookie ? '1' : '0');
    res.headers.set('x-network-handoff-bearer', result.hasBearer ? '1' : '0');
  }
  return res;
}

/**
 * GET /api/auth/network-handoff/start?to=insurance|lender&next=/…
 * Guest → plain 307 without code.
 * Signed-in (cookies) → 307 to target /auth/network-handoff?code=…
 *
 * Optional: ?debug=1 returns JSON instead of redirect (no secrets).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const toRaw = searchParams.get('to') || '';
  const next = searchParams.get('next');
  const debug = searchParams.get('debug') === '1';

  const result = await runHandoffStart({
    request,
    toRaw,
    next,
    bearerToken: bearerFrom(request),
    ip: clientIp(request),
  });

  if (debug) {
    const body = result.ok
      ? {
          ok: true,
          reason: result.reason,
          toHub: result.toHub,
          // code presence only — never return the raw code in debug JSON over GET from tools
          hasCode: Boolean(result.code),
          redirectHost: (() => {
            try {
              return new URL(result.redirectUrl).host;
            } catch {
              return null;
            }
          })(),
          redirectHasCodeParam: result.redirectUrl.includes('code='),
        }
      : {
          ok: false,
          reason: result.reason,
          hasAuthCookie: result.hasAuthCookie,
          hasBearer: result.hasBearer,
          toHub: result.toHub ?? null,
          error: result.error ?? null,
          fallbackUrl: result.fallbackUrl,
        };
    const res = NextResponse.json(body);
    return applyHandoffHeaders(res, result);
  }

  if (result.ok) {
    const res = NextResponse.redirect(result.redirectUrl);
    return applyHandoffHeaders(res, result);
  }

  console.warn('[network-handoff/start] skip_code', {
    reason: result.reason,
    hasAuthCookie: result.hasAuthCookie,
    hasBearer: result.hasBearer,
    toHub: result.toHub,
    error: result.error,
  });
  const res = NextResponse.redirect(result.fallbackUrl);
  return applyHandoffHeaders(res, result);
}

/**
 * POST JSON { to, next?, access_token? }
 * Preferred for signed-in browser: pass access_token so handoff works even if
 * session cookies are missing/mis-scoped on the GET navigation.
 */
export async function POST(request: Request) {
  let body: { to?: string; next?: string; access_token?: string } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }

  const bearer = body.access_token?.trim() || bearerFrom(request);
  const result = await runHandoffStart({
    request,
    toRaw: body.to || '',
    next: body.next ?? null,
    bearerToken: bearer,
    ip: clientIp(request),
  });

  if (result.ok) {
    const res = NextResponse.json({
      ok: true,
      reason: 'minted',
      redirectUrl: result.redirectUrl,
      toHub: result.toHub,
    });
    return applyHandoffHeaders(res, result);
  }

  console.warn('[network-handoff/start] POST skip_code', {
    reason: result.reason,
    hasAuthCookie: result.hasAuthCookie,
    hasBearer: result.hasBearer,
    toHub: result.toHub,
    error: result.error,
  });

  const res = NextResponse.json(
    {
      ok: false,
      reason: result.reason,
      fallbackUrl: result.fallbackUrl,
      hasAuthCookie: result.hasAuthCookie,
      hasBearer: result.hasBearer,
      error: result.error ?? null,
    },
    { status: result.reason === 'no_session' || result.reason === 'bearer_invalid' ? 401 : 400 }
  );
  return applyHandoffHeaders(res, result);
}
