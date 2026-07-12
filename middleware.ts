import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { PATHNAME_COOKIE, PATHNAME_HEADER } from '@/lib/hub/paths';
import { needsAuthSession } from '@/lib/middleware/auth-paths';
import { getCachedPerformanceFlags } from '@/lib/performance/flags-cache';
import {
  cdnCacheControl,
  htmlCacheControl,
  PRIVATE_NO_STORE,
} from '@/lib/cache/control';
import { DEFAULT_PERFORMANCE_FLAGS } from '@/lib/edge-config/types';

const IS_DEV = process.env.NODE_ENV === 'development';

function applyPublicCacheHeaders(response: NextResponse, sMaxAge: number) {
  const cache = htmlCacheControl(sMaxAge);
  response.headers.set('Cache-Control', cache);
  response.headers.set('CDN-Cache-Control', cdnCacheControl(sMaxAge));
  response.headers.set('Vary', 'Accept-Encoding');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
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

    if (needsAuthSession(pathname)) {
      const response = await updateSession(request);
      response.cookies.set(PATHNAME_COOKIE, pathname, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60,
      });
      response.headers.set(PATHNAME_HEADER, pathname);
      response.headers.set('Cache-Control', PRIVATE_NO_STORE);
      response.headers.set('CDN-Cache-Control', 'no-store');
      return response;
    }

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    if (!process.env.EDGE_CONFIG) {
      applyPublicCacheHeaders(
        response,
        DEFAULT_PERFORMANCE_FLAGS.htmlCacheSeconds
      );
      return response;
    }

    const flags = await getCachedPerformanceFlags();
    applyPublicCacheHeaders(
      response,
      flags.htmlCacheSeconds ?? DEFAULT_PERFORMANCE_FLAGS.htmlCacheSeconds
    );
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
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-local|manifest.webmanifest|opengraph-image|twitter-image|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff|ttf|otf|xml|txt|webmanifest)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};