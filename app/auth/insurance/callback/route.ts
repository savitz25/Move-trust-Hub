import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/insurance/my-insurance/ensure-profile';
import {
  MY_INSURANCE_PATH,
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';
import { sendWelcomeEmail } from '@/lib/insurance/my-insurance/emails';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');

  const fail = new URL(
    `${MY_INSURANCE_PATH}?auth=error&next=${encodeURIComponent(next)}`,
    PRODUCTION_SITE_ORIGIN
  );

  if (oauthError) {
    return NextResponse.redirect(fail);
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
      return NextResponse.redirect(new URL(next, PRODUCTION_SITE_ORIGIN));
    }
  }

  return NextResponse.redirect(fail);
}
