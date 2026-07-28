import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';
import {
  buildInsuranceOAuthRedirectTo,
  ensureInsuranceOAuthUrl,
  insuranceAuthErrorUrl,
} from '@/lib/insurance/my-insurance/oauth-redirect';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Google OAuth for My Insurance.
 *
 * redirect_to uses the Move-host bridge (allowlisted Site URL) with next=/my-insurance
 * so Supabase cannot dump users into My Move. Move /auth/callback hands off to ITH
 * before code exchange so the session cookie is set on insurancetrusthub.com.
 */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL('/my-insurance?auth=error', PRODUCTION_SITE_ORIGIN));
  }

  const { searchParams } = new URL(request.url);
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const supabase = await createClient();
  const redirectTo = buildInsuranceOAuthRedirectTo(next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: { access_type: 'offline', prompt: 'select_account' },
    },
  });

  if (error || !data.url) {
    console.error('[insurance-auth/google]', error?.message);
    return NextResponse.redirect(insuranceAuthErrorUrl(next));
  }

  const oauthUrl = ensureInsuranceOAuthUrl(data.url, next);
  console.info('[insurance-auth/google] kickoff', {
    redirectTo,
    authorizeRedirectTo: new URL(oauthUrl).searchParams.get('redirect_to'),
  });
  return NextResponse.redirect(oauthUrl);
}
