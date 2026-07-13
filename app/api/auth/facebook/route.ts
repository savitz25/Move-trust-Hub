import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import {
  AUTH_CALLBACK_URL,
  ensureProductionOAuthUrl,
  productionAuthRedirect,
} from '@/lib/save-my-move/auth-redirect';
import { isOAuthProviderEnabled } from '@/lib/save-my-move/auth-provider-enabled';

/**
 * Server-side Facebook OAuth kickoff — single source of truth for redirectTo.
 * Client navigates here; Supabase returns the Facebook consent URL.
 */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error&reason=not_configured'));
  }

  if (!(await isOAuthProviderEnabled('facebook'))) {
    console.error('[auth/facebook] Facebook provider disabled on Supabase project');
    return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error&reason=facebook_not_enabled'));
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: AUTH_CALLBACK_URL,
      scopes: 'email public_profile',
    },
  });

  if (error) {
    console.error('[auth/facebook] signInWithOAuth failed', error.message);
    return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error&reason=facebook'));
  }

  if (data.url) {
    const safeUrl = ensureProductionOAuthUrl(data.url);
    return NextResponse.redirect(safeUrl);
  }

  return NextResponse.redirect(productionAuthRedirect('/my-move?auth=error&reason=facebook'));
}