import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';
import {
  ensureInsuranceOAuthUrl,
  insuranceAuthErrorUrl,
} from '@/lib/insurance/my-insurance/oauth-redirect';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Google OAuth for My Insurance only.
 * Always returns users to insurancetrusthub.com/auth/insurance/callback — never Move Site URL.
 */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL('/my-insurance?auth=error', PRODUCTION_SITE_ORIGIN));
  }

  const { searchParams } = new URL(request.url);
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const supabase = await createClient();
  const redirectTo = `${PRODUCTION_SITE_ORIGIN}/auth/insurance/callback?next=${encodeURIComponent(next)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: { access_type: 'offline', prompt: 'select_account' },
      skipBrowserRedirect: false,
    },
  });

  if (error || !data.url) {
    console.error('[insurance-auth/google]', error?.message);
    return NextResponse.redirect(insuranceAuthErrorUrl(next));
  }

  // Overwrite redirect_to so a shared Supabase Site URL (Move) cannot win.
  const oauthUrl = ensureInsuranceOAuthUrl(data.url, next);
  return NextResponse.redirect(oauthUrl);
}
