import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/insurance/my-insurance/ensure-profile';
import {
  MY_INSURANCE_PATH,
  PRODUCTION_SITE_ORIGIN,
  sanitizePostLoginPath,
} from '@/lib/insurance/my-insurance/constants';
import { sendWelcomeEmail } from '@/lib/insurance/my-insurance/emails';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = (searchParams.get('type') || 'magiclink') as EmailOtpType;
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const fail = new URL(`${MY_INSURANCE_PATH}?auth=error`, PRODUCTION_SITE_ORIGIN);

  if (!token_hash) return NextResponse.redirect(fail);

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash, type });
  if (error) return NextResponse.redirect(fail);

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
