import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { getHubFromPathname, HUB_HEADER } from '@/lib/hub/paths';
import { resolveHubMigrationRedirect } from '@/lib/migration/hub-redirects';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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

  const hub = getHubFromPathname(pathname);

  const sessionResponse = await updateSession(request);
  sessionResponse.headers.set(HUB_HEADER, hub);

  return sessionResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};