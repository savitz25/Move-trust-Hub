import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';

function postLoginRedirectUrl(request: Request, nextPath: string): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';

  if (process.env.NODE_ENV === 'development') {
    return `${origin}${nextPath}`;
  }
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}${nextPath}`;
  }
  return `${origin}${nextPath}`;
}

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
    return NextResponse.redirect(postLoginRedirectUrl(request, '/my-move?auth=error'));
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
      return NextResponse.redirect(postLoginRedirectUrl(request, next));
    }
    console.error('[auth/callback] exchangeCodeForSession failed', error.message);
  }

  return NextResponse.redirect(postLoginRedirectUrl(request, '/my-move?auth=error'));
}