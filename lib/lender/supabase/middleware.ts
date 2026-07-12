import { type NextRequest, NextResponse } from 'next/server';
import type { Database } from '@/types/lender/supabase';
import { hasSupabaseAuthCookies } from '@/lib/supabase/auth-cookies';
import { getAdminSecret, getSupabaseAnonKey, getSupabaseUrl } from '@/lib/lender/supabase/config';

export const ADMIN_COOKIE = 'lth_admin_session';

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

/** Lender hub admin — same fast-path as root Supabase middleware. */
export async function updateSession(request: NextRequest) {
  const adminRedirect = guardAdminRoute(request);
  if (adminRedirect) return adminRedirect;

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey || !hasSupabaseAuthCookies(request)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const { createServerClient } = await import('@supabase/ssr');
  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}