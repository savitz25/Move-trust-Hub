import type { NextRequest } from 'next/server';

/**
 * True when the request carries Supabase session cookies worth refreshing.
 * Matches `sb-<ref>-auth-token` and chunked `.0`, `.1`, … variants.
 * Skips `auth.getUser()` on anonymous traffic (majority of HTML requests).
 */
export function hasSupabaseAuthCookies(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (cookie) => cookie.name.startsWith('sb-') && cookie.name.includes('-auth-token'),
  );
}