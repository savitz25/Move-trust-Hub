import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { logSettingsSnapshotAsync } from '@/lib/save-my-move/auth-provider-enabled';
import { kickoffFacebookOAuth } from '@/lib/save-my-move/facebook-oauth-kickoff';
import { oauthErrorRedirect } from '@/lib/save-my-move/start-oauth-sign-in';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

/**
 * Facebook OAuth — zero settings preflight.
 * Always: signInWithOAuth (SSR) → signInWithOAuth (plain) → manual authorize URL.
 */
export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      productionAuthRedirect('/my-move?auth=error&reason=not_configured', request)
    );
  }

  // Non-blocking diagnostic log (parallel, never gates kickoff)
  logSettingsSnapshotAsync('settings_snapshot_on_request');

  const result = await kickoffFacebookOAuth();

  if (!result.ok) {
    console.error('[auth/facebook] kickoff failed', {
      reason: result.reason,
      detail: result.detail,
      diagnostics: result.diagnostics,
    });
    return NextResponse.redirect(
      oauthErrorRedirect(
        result.reason,
        request,
        result.detail ? { detail: result.detail.slice(0, 200) } : undefined
      )
    );
  }

  const response = NextResponse.redirect(result.redirectUrl);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  console.info('[auth/facebook] redirecting to OAuth', { method: result.method });
  return response;
}