import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';
import {
  getAdminSecret,
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from '@/lib/supabase/config';

const ADMIN_COOKIE = 'mth_admin_session';

export function isAdminAuthenticated(request: NextRequest): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;
  return request.cookies.get(ADMIN_COOKIE)?.value === secret;
}

/**
 * Refreshes Supabase auth session cookies and guards /admin routes.
 * Extend `matcher` in root middleware.ts when user accounts ship.
 */
function guardMoveAdminRoute(request: NextRequest, pathname: string): NextResponse | null {
  if (!pathname.startsWith('/admin')) return null;

  const isLogin = pathname === '/admin/login';
  const isApi = pathname.startsWith('/admin/api');

  if (!isLogin && !isApi && !isAdminAuthenticated(request)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return null;
}

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!isSupabaseConfigured()) {
    const redirect = guardMoveAdminRoute(request, pathname);
    if (redirect) return redirect;
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    getSupabaseUrl() ?? 'https://placeholder.supabase.co',
    getSupabaseAnonKey() ?? 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Next.js 15+: request.cookies is read-only in middleware — only mutate the response.
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    await supabase.auth.getUser();
  } catch (err) {
    console.error('[middleware] supabase.auth.getUser failed', {
      pathname,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  const redirect = guardMoveAdminRoute(request, pathname);
  if (redirect) return redirect;

  return supabaseResponse;
}

export { ADMIN_COOKIE };