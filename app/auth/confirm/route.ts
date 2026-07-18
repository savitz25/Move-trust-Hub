import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';
import { isEmailOtpType } from '@/lib/auth/otp-types';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';

/**
 * Completes magic-link / email OTP sign-in for links we send via Resend
 * (token_hash flow). Supabase Auth mailer links may still use /auth/callback?code=.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const typeParam = searchParams.get('type');
  const next = sanitizePostLoginPath(searchParams.get('next'));

  const failPath =
    next.startsWith('/portal') || next.includes('portal')
      ? `/portal/login?auth=error&next=${encodeURIComponent(next)}`
      : '/my-move?auth=error';

  if (!tokenHash || !typeParam || !isEmailOtpType(typeParam)) {
    console.error('[auth/confirm] missing or invalid token_hash/type');
    return NextResponse.redirect(productionAuthRedirect(failPath, request));
  }

  const type = typeParam as EmailOtpType;
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) {
    console.error('[auth/confirm] verifyOtp failed', error.message);
    return NextResponse.redirect(productionAuthRedirect(failPath, request));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    try {
      await ensureUserProfile(supabase, user);
    } catch (profileErr) {
      console.error('[auth/confirm] ensureUserProfile failed', profileErr);
    }
  }

  const destination = await pathAfterAuth(next);
  return NextResponse.redirect(productionAuthRedirect(destination, request));
}
