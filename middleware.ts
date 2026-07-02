import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { getHubFromPathname, HUB_HEADER } from '@/lib/hub/paths';

export async function middleware(request: NextRequest) {
  const hub = getHubFromPathname(request.nextUrl.pathname);

  const sessionResponse = await updateSession(request);
  sessionResponse.headers.set(HUB_HEADER, hub);

  return sessionResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};