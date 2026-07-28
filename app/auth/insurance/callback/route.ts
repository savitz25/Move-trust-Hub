import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/insurance/my-insurance/ensure-profile';
import {
  MY_INSURANCE_PATH,
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';
import {
  insuranceAuthErrorUrl,
  insuranceAuthSuccessUrl,
} from '@/lib/insurance/my-insurance/oauth-redirect';
import { sendWelcomeEmail } from '@/lib/insurance/my-insurance/emails';

/**
 * OAuth + code exchange for My Insurance only.
 * Always finishes on insurancetrusthub.com — never movetrusthub.com /my-move.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

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
      // Absolute ITH URL only
      return NextResponse.redirect(insuranceAuthSuccessUrl(next));
    }
    console.error('[auth/insurance/callback] exchangeCodeForSession', error.message);
  }

  return NextResponse.redirect(insuranceAuthErrorUrl(next));
}
