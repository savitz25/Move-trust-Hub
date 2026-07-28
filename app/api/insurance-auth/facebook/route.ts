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

/** Facebook OAuth for My Insurance — same bridge isolation as Google. */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL('/my-insurance?auth=error', PRODUCTION_SITE_ORIGIN));
  }

  const { searchParams } = new URL(request.url);
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const supabase = await createClient();
  const redirectTo = buildInsuranceOAuthRedirectTo(next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: { redirectTo },
  });

  if (error || !data.url) {
    console.error('[insurance-auth/facebook]', error?.message);
    return NextResponse.redirect(insuranceAuthErrorUrl(next));
  }

  return NextResponse.redirect(ensureInsuranceOAuthUrl(data.url, next));
}
