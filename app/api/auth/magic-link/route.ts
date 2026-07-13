import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import { checkMagicLinkRateLimit } from '@/lib/save-my-move/magic-link-rate-limit';
import { AUTH_CALLBACK_URL } from '@/lib/save-my-move/auth-redirect';

function getClientIp(request: Request): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }

  let body: { email?: string; next?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
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
    if (isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: 'Sign-in temporarily unavailable. Try again shortly.' },
        { status: 503 }
      );
    }
  }

  const redirectTo = AUTH_CALLBACK_URL;

  // Google OAuth and magic link with the same email address resolve to one
  // auth.users row automatically (Supabase Auth identity linking).
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error('[magic-link] signInWithOtp failed', error.message);
    return NextResponse.json({ error: 'Could not send sign-in link' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}