import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import {
  oauthErrorRedirect,
  startFacebookOAuthSignIn,
} from '@/lib/save-my-move/start-oauth-sign-in';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Facebook OAuth kickoff — never blocks on settings API.
 * Uses signInWithOAuth first, then manual authorize URL fallback.
 */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      productionAuthRedirect('/my-move?auth=error&reason=not_configured', request)
    );
  }

  const result = await startFacebookOAuthSignIn();

  if (!result.ok) {
    console.error('[auth/facebook] kickoff failed', {
      reason: result.reason,
      detail: result.detail,
      diagnostics: result.diagnostics,
    });
    return NextResponse.redirect(
      oauthErrorRedirect(result.reason, request, result.detail ? { detail: result.detail } : undefined)
    );
  }

  console.info('[auth/facebook] redirecting to OAuth', { method: result.method });
  return NextResponse.redirect(result.redirectUrl);
}