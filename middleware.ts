import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import {
  INSURANCE_SITE_URL,
  insuranceApexToAppPath,
  isInsuranceStandaloneHost,
  isMoveOnlyPath,
  LENDER_SITE_URL,
  moveAbsoluteUrl,
  shouldRewriteInsurancePath,
} from '@/lib/hub/domains';
import { HUB_HEADER, PATHNAME_COOKIE, PATHNAME_HEADER } from '@/lib/hub/paths';
import { needsAuthSession } from '@/lib/middleware/auth-paths';
import {
  cdnCacheControl,
  htmlCacheControl,
  htmlCacheSecondsForPath,
  PRIVATE_NO_STORE,
  shouldApplyMiddlewareHtmlCache,
} from '@/lib/cache/control';
import { DEFAULT_PERFORMANCE_FLAGS } from '@/lib/edge-config/types';
import {
  cleanCanonicalUrl,
  isCompareOrVerifyResult,
  urlHasTrackingParam,
} from '@/lib/seo/crawl-variants';
import { dispositionForDeletedSlug } from '@/lib/seo/company-slug-disposition';
import { moveLenderLegacyDecision } from '@/lib/seo/move-lender-legacy';
import { normalizedPublishedStatePath } from '@/lib/seo/published-state-path';

const IS_DEV = process.env.NODE_ENV === 'development';

function applyPublicCacheHeaders(response: NextResponse, sMaxAge: number) {
  const cache = htmlCacheControl(sMaxAge);
  response.headers.set('Cache-Control', cache);
  response.headers.set('CDN-Cache-Control', cdnCacheControl(sMaxAge));
  response.headers.set('Vary', 'Accept-Encoding');
}

function applyCrawlVariantHeaders(response: NextResponse, request: NextRequest) {
  const url = request.nextUrl;
  if (urlHasTrackingParam(url)) {
    response.headers.set('Link', `<${cleanCanonicalUrl(url)}>; rel="canonical"`);
  }
  if (isCompareOrVerifyResult(url.pathname, url.search)) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
    response.headers.set('Cache-Control', PRIVATE_NO_STORE);
    response.headers.set('CDN-Cache-Control', 'no-store');
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');
  const statePath = normalizedPublishedStatePath(pathname);
  if (statePath) {
    const url = request.nextUrl.clone();
    url.pathname = statePath;
    return NextResponse.redirect(url, 308);
  }

  try {
    // Force HTTPS when Vercel/edge reports plain HTTP (GSC: http://www.movetrusthub.com/)
    const proto = request.headers.get('x-forwarded-proto');
    const isLocalHost =
      !!host &&
      (host.startsWith('localhost') ||
        host.startsWith('127.0.0.1') ||
        host.startsWith('[::1]'));
    if (proto === 'http' && !isLocalHost) {
      const httpsUrl = request.nextUrl.clone();
      httpsUrl.protocol = 'https:';
      return NextResponse.redirect(httpsUrl, 308);
    }

    // SEO critical: insurancetrusthub.com /sitemap.xml must NOT serve MoveTrustHub URLs.
    if (
      isInsuranceStandaloneHost(host) &&
      (pathname === '/sitemap.xml' || pathname === '/sitemap')
    ) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = '/insurance/sitemap.xml';
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(PATHNAME_HEADER, pathname);
      requestHeaders.set(HUB_HEADER, 'insurance');
      const response = NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      });
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      response.headers.set('CDN-Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      response.headers.set('X-Trust-Hub', 'insurance');
      return response;
    }

    // PWA: ITH-only service worker + manifest (never Move branding)
    if (isInsuranceStandaloneHost(host)) {
      if (pathname === '/sw.js') {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = '/insurance/sw.js';
        const response = NextResponse.rewrite(rewriteUrl);
        response.headers.set('Content-Type', 'application/javascript; charset=utf-8');
        response.headers.set('Service-Worker-Allowed', '/');
        response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
        response.headers.set('X-Trust-Hub', 'insurance');
        return response;
      }
      if (
        pathname === '/manifest.webmanifest' ||
        pathname === '/site.webmanifest' ||
        pathname === '/manifest.json'
      ) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = '/insurance/manifest.webmanifest';
        const response = NextResponse.rewrite(rewriteUrl);
        response.headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
        response.headers.set('Cache-Control', 'public, max-age=3600');
        response.headers.set('X-Trust-Hub', 'insurance');
        return response;
      }
    }

    // Canonical insurance paths are apex (no /insurance prefix) on insurancetrusthub.com.
    // Keep /insurance/admin on both hosts for monorepo admin isolation.
    const isInsuranceAdmin =
      pathname === '/insurance/admin' || pathname.startsWith('/insurance/admin/');
    const isInsurancePrefixedPublic =
      !isInsuranceAdmin &&
      (pathname === '/insurance' || pathname.startsWith('/insurance/'));

    // insurancetrusthub.com: 301 /insurance/* → bare canonical paths
    if (isInsuranceStandaloneHost(host) && isInsurancePrefixedPublic) {
      const bare =
        pathname === '/insurance' || pathname === '/insurance/'
          ? '/'
          : pathname.slice('/insurance'.length) || '/';
      const dest = new URL(bare + request.nextUrl.search, request.url);
      return NextResponse.redirect(dest, 301);
    }

    // movetrusthub.com: send public insurance traffic to standalone InsuranceTrustHub
    if (!isInsuranceStandaloneHost(host) && isInsurancePrefixedPublic) {
      const bare =
        pathname === '/insurance' || pathname === '/insurance/'
          ? '/'
          : pathname.slice('/insurance'.length) || '/';
      return NextResponse.redirect(
        new URL(bare + request.nextUrl.search, INSURANCE_SITE_URL),
        301
      );
    }

    // movetrusthub.com: 308 /lender and /local-lenders when Lender has that path. Otherwise 410.
    const lenderLegacy = moveLenderLegacyDecision(pathname);
    if (!isInsuranceStandaloneHost(host) && lenderLegacy) {
      if (lenderLegacy.status === 410) {
        return new NextResponse('Gone', {
          status: 410,
          headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'public, max-age=3600' },
        });
      }
      const destination = new URL(lenderLegacy.destination);
      destination.search = request.nextUrl.search;
      return NextResponse.redirect(destination, 308);
    }

    const companySlugMatch = pathname.match(/^\/companies\/([^/]+)\/?$/);
    if (companySlugMatch) {
      const disposition = dispositionForDeletedSlug(decodeURIComponent(companySlugMatch[1] || ''));
      if (disposition?.status === 410) {
        return new NextResponse('Gone', {
          status: 410,
          headers: { 'X-Robots-Tag': 'noindex' },
        });
      }
      if (disposition?.status === 301) {
        return NextResponse.redirect(new URL(disposition.to, request.url), 301);
      }
    }

    // insurancetrusthub.com: insurance IA only — never render Move/lender verticals.
    if (isInsuranceStandaloneHost(host)) {
      // Move-only paths → permanent redirect to Move (or lender) apex.
      if (isMoveOnlyPath(pathname)) {
        if (pathname === '/lender' || pathname.startsWith('/lender/') || pathname.startsWith('/local-lenders')) {
          const legacy = moveLenderLegacyDecision(pathname);
          if (!legacy || legacy.status === 410) {
            return new NextResponse('Gone', {
              status: 410,
              headers: { 'X-Robots-Tag': 'noindex' },
            });
          }
          const destination = new URL(legacy.destination);
          destination.search = request.nextUrl.search;
          return NextResponse.redirect(destination, 308);
        }
        const target = moveAbsoluteUrl(pathname, request.nextUrl.search);
        return NextResponse.redirect(target, 301);
      }

      if (shouldRewriteInsurancePath(pathname)) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = insuranceApexToAppPath(pathname);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(PATHNAME_HEADER, pathname);
        requestHeaders.set(HUB_HEADER, 'insurance');
        const response = NextResponse.rewrite(rewriteUrl, {
          request: { headers: requestHeaders },
        });
        const baseTtl = DEFAULT_PERFORMANCE_FLAGS.htmlCacheSeconds ?? 86400;
        applyPublicCacheHeaders(
          response,
          htmlCacheSecondsForPath(rewriteUrl.pathname, baseTtl)
        );
        response.headers.set('X-Trust-Hub', 'insurance');
        return response;
      }
    }

    // Permanent cleanup: doubled hub prefixes from bad absolute links.
    // IMPORTANT: use segment boundary (`/lender/lender/` or exact match), NOT startsWith('/lender/lender')
    // — that incorrectly matched real profile routes under `/lender/lenders/:slug` and caused a
    // redirect loop with legacy `/lenders/:path*` → `/lender/lenders/:path*` rules.
    if (pathname === '/insurance/insurance' || pathname.startsWith('/insurance/insurance/')) {
      const stripped =
        pathname.replace(/^\/insurance\/insurance(?=\/|$)/, '/insurance') || '/insurance';
      return NextResponse.redirect(new URL(stripped + request.nextUrl.search, request.url), 308);
    }
    if (pathname === '/lender/lender' || pathname.startsWith('/lender/lender/')) {
      const stripped = pathname.replace(/^\/lender\/lender(?=\/|$)/, '') || '/';
      return NextResponse.redirect(
        new URL(stripped + request.nextUrl.search, LENDER_SITE_URL),
        301
      );
    }
    if (
      pathname === '/from-georgia-to-huntsville' ||
      pathname.startsWith('/from-georgia-to-huntsville/') ||
      pathname === '/from-georgia-to-huntsville-al'
    ) {
      return NextResponse.redirect(
        new URL('/moving-to/alabama/huntsville-al', request.url),
        308
      );
    }

    if (IS_DEV) {
      const { resolveHubMigrationRedirect } = await import('@/lib/migration/hub-redirects');
      const migrationDestination = resolveHubMigrationRedirect(
        pathname,
        host ?? undefined
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

    const baseTtl =
      DEFAULT_PERFORMANCE_FLAGS.htmlCacheSeconds ?? 86400;
    if (shouldApplyMiddlewareHtmlCache(pathname) && !isCompareOrVerifyResult(pathname, request.nextUrl.search)) {
      applyPublicCacheHeaders(
        response,
        htmlCacheSecondsForPath(pathname, baseTtl)
      );
    }
    applyCrawlVariantHeaders(response, request);
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

    const fallback = NextResponse.next();
    applyCrawlVariantHeaders(fallback, request);
    return fallback;
  }
}

export const config = {
  matcher: [
    // Must run on insurance apex — not covered by the catch-all (which excludes *.xml / webmanifest)
    '/sitemap.xml',
    '/sitemap',
    // Move host: middleware 301s /insurance/* → ITH; without this, *.xml exclusion served ITH URLs under Move.
    '/insurance/sitemap.xml',
    '/sw.js',
    '/manifest.webmanifest',
    '/site.webmanifest',
    '/manifest.json',
    // SSO: refresh session cookies before handoff start (otherwise /api/* is excluded)
    '/api/auth/network-handoff/:path*',
    {
      // robots.txt stays excluded — app/robots.ts is host-aware.
      // Other *.xml stay excluded; sitemap paths listed explicitly above.
      // Note: general /api/* still excluded; handoff start is matched above.
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-local|sw\\.js|manifest\\.webmanifest|site\\.webmanifest|manifest\\.json|icon|apple-icon|sentry-tunnel|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff|ttf|otf|xml|txt|webmanifest)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
