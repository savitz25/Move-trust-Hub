import 'server-only';
import { cookies, headers } from 'next/headers';
import {
  getHubFromPathname,
  HUB_COOKIE,
  HUB_HEADER,
  PATHNAME_COOKIE,
  PATHNAME_HEADER,
} from '@/lib/hub/paths';
import type { HubId } from '@/lib/hub/types';

function parseHubId(value: string | null | undefined): HubId | null {
  if (value === 'move' || value === 'lender' || value === 'insurance') return value;
  return null;
}

/** Active hub — middleware cookie first, then request headers, then pathname fallback. */
export async function getRequestHub(): Promise<HubId> {
  const cookieStore = await cookies();
  const fromCookie = parseHubId(cookieStore.get(HUB_COOKIE)?.value);
  if (fromCookie) return fromCookie;

  const headerStore = await headers();
  const fromHeader = parseHubId(headerStore.get(HUB_HEADER));
  if (fromHeader) return fromHeader;

  const pathname = headerStore.get(PATHNAME_HEADER) ?? '/';
  return getHubFromPathname(pathname);
}

/** Request pathname for cross-link visibility and hub fallbacks. */
export async function getRequestPathname(): Promise<string> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(PATHNAME_COOKIE)?.value;
  if (fromCookie) return fromCookie;

  const headerStore = await headers();
  return headerStore.get(PATHNAME_HEADER) ?? '/';
}