import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (oauthError) {
    console.error('[auth/callback] OAuth provider error', {
      error: oauthError,
      description: errorDescription,
    });
    return NextResponse.redirect(`${origin}/my-move?auth=error`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[auth/callback] exchangeCodeForSession failed', error.message);
  }

  return NextResponse.redirect(`${origin}/my-move?auth=error`);
}