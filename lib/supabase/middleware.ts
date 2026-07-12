import { type NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';
import { hasSupabaseAuthCookies } from '@/lib/supabase/auth-cookies';
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

function guardAdminRoute(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/admin')) return null;

  const isLogin = pathname === '/admin/login';
  const isApi = pathname.startsWith('/admin/api');
  if (isLogin || isApi || isAdminAuthenticated(request)) return null;

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

/**
 * Admin cookie guard + optional Supabase JWT refresh.
 * Refresh runs only when session cookies exist — avoids edge→Supabase on public HTML.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const adminRedirect = guardAdminRoute(request);
  if (adminRedirect) return adminRedirect;

  if (!isSupabaseConfigured() || !hasSupabaseAuthCookies(request)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const { createServerClient } = await import('@supabase/ssr');
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
    },
  );

  try {
    await supabase.auth.getUser();
  } catch (err) {
    console.error('[middleware] supabase.auth.getUser failed', {
      pathname: request.nextUrl.pathname,
      message: err instanceof Error ? err.message : String(err),
    });
  }

  return supabaseResponse;
}

export { ADMIN_COOKIE };