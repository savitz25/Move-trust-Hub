import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { PATHNAME_COOKIE, PATHNAME_HEADER } from '@/lib/hub/paths';
import { needsAuthSession } from '@/lib/middleware/auth-paths';

const IS_DEV = process.env.NODE_ENV === 'development';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // Production: vercel.json edge redirects run before middleware (no slug-alias bundle).
    // Dev: next.config omits calculator/resource rules — resolve them here for parity.
    if (IS_DEV) {
      const { resolveHubMigrationRedirect } = await import('@/lib/migration/hub-redirects');
      const migrationDestination = resolveHubMigrationRedirect(
        pathname,
        request.headers.get('host') ?? undefined
      );
      if (migrationDestination) {
        const destination = migrationDestination.startsWith('http')
          ? migrationDestination
          : new URL(migrationDestination, request.url);
        return NextResponse.redirect(destination, 308);
      }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(PATHNAME_HEADER, pathname);

    // Public HTML: header-only pathname context — no Set-Cookie so Vercel edge can cache
    // (vercel.json s-maxage=86400). HubChrome reads PATHNAME_HEADER on the same request.
    if (!needsAuthSession(pathname)) {
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }

    // Keep original request so admin/session cookies are available to updateSession.
    const response = await updateSession(request);
    // Auth/admin routes: cookie fallback for downstream RSC requests that may lack the header.
    response.cookies.set(PATHNAME_COOKIE, pathname, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60,
    });
    response.headers.set(PATHNAME_HEADER, pathname);
    return response;
  } catch (err) {
    console.error('[middleware] MIDDLEWARE_INVOCATION_FAILED', {
      pathname,
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });

    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('next', pathname);
      loginUrl.searchParams.set('error', 'middleware');
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff|xml|txt|webmanifest)$).*)',
  ],
};