import { NextResponse } from 'next/server';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import { checkMagicLinkRateLimit } from '@/lib/save-my-move/magic-link-rate-limit';
import { requestMagicLink } from '@/lib/auth/request-magic-link';

function getClientIp(request: Request): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Sign-in is temporarily unavailable (auth not configured).' },
      { status: 503 }
    );
  }

  let body: { email?: string; next?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 }
    );
  }

  try {
    const rateCheck = await checkMagicLinkRateLimit({
      email,
      ip: getClientIp(request),
    });
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.reason }, { status: 429 });
    }
  } catch (err) {
    console.error('[magic-link] rate limit check failed', err);
    // Fail open when admin DB is unavailable so login is not hard-blocked;
    // only hard-fail if we expected admin tables to exist and something is wrong.
    if (isSupabaseAdminConfigured()) {
      console.warn('[magic-link] continuing after rate-limit error (fail-open)');
    }
  }

  const result = await requestMagicLink({ email, next: body.next });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    success: true,
    delivery: result.delivery,
  });
}
