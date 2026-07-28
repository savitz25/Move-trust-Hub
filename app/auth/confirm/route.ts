import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';
import { isEmailOtpType } from '@/lib/auth/otp-types';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';
import {
  AUTH_CONFIRM_PATH,
  PRODUCTION_SITE_ORIGIN as INSURANCE_ORIGIN,
} from '@/lib/insurance/my-insurance/constants';
import { isInsuranceStandaloneHost } from '@/lib/hub/domains';

/**
 * Completes magic-link / email OTP sign-in for links we send via Resend
 * (token_hash flow). Supabase Auth mailer links may still use /auth/callback?code=.
 *
 * Host isolation: InsuranceTrustHub apex (or next=/my-insurance) must NEVER
 * run My Move confirm — that forces www.movetrusthub.com redirects.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    url.host;
  const nextRaw = searchParams.get('next') || '';

  if (shouldDelegateToInsuranceAuth(host, nextRaw)) {
    const insuranceConfirm = new URL(
      `${AUTH_CONFIRM_PATH}${url.search}`,
      INSURANCE_ORIGIN
    );
    return NextResponse.redirect(insuranceConfirm);
  }

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

function shouldDelegateToInsuranceAuth(
  host: string,
  nextRaw: string
): boolean {
  if (isInsuranceStandaloneHost(host)) return true;
  const next = nextRaw.trim().toLowerCase();
  if (!next) return false;
  return (
    next === '/my-insurance' ||
    next.startsWith('/my-insurance/') ||
    next.startsWith('/providers/') ||
    next === '/providers' ||
    next.startsWith('/tools/') ||
    next === '/tools' ||
    next.startsWith('/hubs/') ||
    next === '/hubs'
  );
}
