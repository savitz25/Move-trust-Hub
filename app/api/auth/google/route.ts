import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import {
  oauthErrorRedirect,
  startOAuthSignIn,
} from '@/lib/save-my-move/start-oauth-sign-in';

/**
 * Server-side Google OAuth kickoff — single source of truth for redirectTo.
 * Provider availability is determined by signInWithOAuth, not the settings API.
 */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      productionAuthRedirect('/my-move?auth=error&reason=not_configured', request)
    );
  }

  const result = await startOAuthSignIn({
    provider: 'google',
    scopes: 'email profile',
    queryParams: { prompt: 'select_account' },
  });

  if (!result.ok) {
    return NextResponse.redirect(oauthErrorRedirect(result.reason, request));
  }

  return NextResponse.redirect(result.redirectUrl);
}