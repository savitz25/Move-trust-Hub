import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (oauthError) {
    console.error('[auth/callback] OAuth provider error', {
      error: oauthError,
      description: errorDescription,
    });
    return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error', request));
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
      return NextResponse.redirect(productionAuthRedirect(next, request));
    }
    console.error('[auth/callback] exchangeCodeForSession failed', error.message);
  }

  return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error', request));
}