import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import {
  oauthErrorRedirect,
  startOAuthSignIn,
} from '@/lib/save-my-move/start-oauth-sign-in';

/**
 * Server-side Google OAuth kickoff — single source of truth for redirectTo.
 * Optional `?next=` controls post-login destination (portal vs Save My Move).
 * Provider availability is determined by signInWithOAuth, not the settings API.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = sanitizePostLoginPath(url.searchParams.get('next'));

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      oauthErrorRedirect('not_configured', request, { next })
    );
  }

  const result = await startOAuthSignIn({
    provider: 'google',
    scopes: 'email profile',
    queryParams: { prompt: 'select_account' },
    nextPath: next,
  });

  if (!result.ok) {
    return NextResponse.redirect(
      oauthErrorRedirect(result.reason, request, { next })
    );
  }

  return NextResponse.redirect(result.redirectUrl);
}
