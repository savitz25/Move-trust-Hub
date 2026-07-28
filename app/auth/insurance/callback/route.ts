import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/insurance/my-insurance/ensure-profile';
import { sanitizePostLoginPath } from '@/lib/insurance/my-insurance/constants';
import {
  insuranceAuthErrorUrl,
  insuranceAuthSuccessUrl,
} from '@/lib/insurance/my-insurance/oauth-redirect';
import { sendWelcomeEmail } from '@/lib/insurance/my-insurance/emails';

/**
 * Final OAuth code exchange for My Insurance — always on insurancetrusthub.com
 * so session cookies belong to Insurance, not Move.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // If this route was hit on the wrong host (Move), bounce to ITH with full query
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    url.host;
  const hostNorm = host.toLowerCase().replace(/:\d+$/, '').replace(/^www\./, '');
  if (hostNorm === 'movetrusthub.com' || hostNorm.endsWith('.movetrusthub.com')) {
    const ith = new URL(url.pathname + url.search, 'https://www.insurancetrusthub.com');
    return NextResponse.redirect(ith);
  }

  if (oauthError) {
    console.error('[auth/insurance/callback] OAuth error', oauthError, errorDescription);
    return NextResponse.redirect(insuranceAuthErrorUrl(next));
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
          if (user.email) {
            void sendWelcomeEmail({ to: user.email }).catch(() => undefined);
          }
        } catch {
          /* non-fatal */
        }
      }
      const dest = insuranceAuthSuccessUrl(next);
      console.info('[auth/insurance/callback] success', { next, dest });
      return NextResponse.redirect(dest);
    }
    console.error('[auth/insurance/callback] exchangeCodeForSession', error.message);
  }

  return NextResponse.redirect(insuranceAuthErrorUrl(next));
}
