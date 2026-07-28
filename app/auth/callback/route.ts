import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';
import {
  AUTH_CALLBACK_PATH,
  PRODUCTION_SITE_ORIGIN as INSURANCE_ORIGIN,
} from '@/lib/insurance/my-insurance/constants';
import { isInsuranceStandaloneHost } from '@/lib/hub/domains';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    url.host;
  const nextRaw = searchParams.get('next') || '';

  // Insurance apex / Insurance post-login next → dedicated ITH callback (never My Move)
  if (shouldDelegateToInsuranceAuth(host, nextRaw)) {
    const insuranceCallback = new URL(
      `${AUTH_CALLBACK_PATH}${url.search}`,
      INSURANCE_ORIGIN
    );
    return NextResponse.redirect(insuranceCallback);
  }

  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const failPath =
    next.startsWith('/portal')
      ? `/portal/login?auth=error&next=${encodeURIComponent(next)}`
      : '/my-move?auth=error';

  if (oauthError) {
    console.error('[auth/callback] OAuth provider error', {
      error: oauthError,
      description: errorDescription,
    });
    return NextResponse.redirect(productionAuthRedirect(failPath, request));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        try {
          await ensureUserProfile(supabase, user);
        } catch (profileErr) {
          console.error('[auth/callback] ensureUserProfile failed', profileErr);
        }
      }
      // Portal: MFA / optional password. My Move: optional password after value-first save.
      const destination = await pathAfterAuth(next);
      return NextResponse.redirect(productionAuthRedirect(destination, request));
    }
    console.error('[auth/callback] exchangeCodeForSession failed', error.message);
  }

  return NextResponse.redirect(productionAuthRedirect(failPath, request));
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
