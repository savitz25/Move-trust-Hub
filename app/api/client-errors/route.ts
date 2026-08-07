import { NextResponse } from 'next/server';
import type { ClientErrorPayload } from '@/lib/reliability/client-error-types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 8_000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 40;

/** Simple in-memory rate limit (per isolate). Enough to stop noise floods. */
const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function allow(ip: string): boolean {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now > row.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (row.count >= RATE_MAX) return false;
  row.count += 1;
  return true;
}

function sanitize(raw: unknown): ClientErrorPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const kind = o.kind;
  const message = o.message;
  if (
    kind !== 'chunk_load' &&
    kind !== 'hydration' &&
    kind !== 'uncaught' &&
    kind !== 'unhandled_rejection' &&
    kind !== 'react_boundary'
  ) {
    return null;
  }
  if (typeof message !== 'string' || !message.trim()) return null;

  return {
    kind,
    message: message.slice(0, 800),
    stack: typeof o.stack === 'string' ? o.stack.slice(0, 2000) : undefined,
    source: typeof o.source === 'string' ? o.source.slice(0, 400) : undefined,
    pathname: typeof o.pathname === 'string' ? o.pathname.slice(0, 300) : undefined,
    userAgent: typeof o.userAgent === 'string' ? o.userAgent.slice(0, 400) : undefined,
    buildId: typeof o.buildId === 'string' ? o.buildId.slice(0, 80) : undefined,
    href: typeof o.href === 'string' ? o.href.slice(0, 500) : undefined,
    at: typeof o.at === 'string' ? o.at.slice(0, 40) : new Date().toISOString(),
    hub: typeof o.hub === 'string' ? o.hub.slice(0, 40) : undefined,
  };
}

/**
 * Client runtime error sink — logs structured events for Vercel / ops.
 * No auth required; rate-limited; no PII beyond UA + path.
 */
export async function POST(req: Request) {
  if (!allow(clientKey(req))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!text || text.length > MAX_BODY) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = sanitize(parsed);
  if (!payload) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Structured log — visible in Vercel Runtime Logs / log drains
  console.error(
    JSON.stringify({
      level: 'error',
      channel: 'mth.client_error',
      ...payload,
    })
  );

  return new NextResponse(null, { status: 204 });
}

/** Health probe for monitoring setup. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    channel: 'mth.client_error',
    accepts: ['chunk_load', 'hydration', 'uncaught', 'unhandled_rejection', 'react_boundary'],
  });
}
