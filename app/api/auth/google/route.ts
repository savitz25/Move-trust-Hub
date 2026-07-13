import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { AUTH_CALLBACK_URL } from '@/lib/save-my-move/redirect';
import { isGoogleProviderEnabled } from '@/lib/save-my-move/google-provider-enabled';

/**
 * Server-side Google OAuth kickoff — single source of truth for redirectTo.
 * Client navigates here; Supabase returns the Google consent URL.
 */
export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/my-move?auth=error&reason=not_configured`);
  }

  if (!(await isGoogleProviderEnabled())) {
    console.error('[auth/google] Google provider disabled on Supabase project');
    return NextResponse.redirect(`${origin}/my-move?auth=error&reason=google_not_enabled`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: AUTH_CALLBACK_URL,
      queryParams: { prompt: 'select_account' },
      scopes: 'email profile',
    },
  });

  if (error) {
    console.error('[auth/google] signInWithOAuth failed', error.message);
    return NextResponse.redirect(`${origin}/my-move?auth=error&reason=google`);
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(`${origin}/my-move?auth=error&reason=google`);
}