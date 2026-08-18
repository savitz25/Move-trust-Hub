import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@/lib/supabase/server';
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import {
  createNetworkHandoff,
  CURRENT_HUB,
  HUB_DEFAULT_PATH,
  HUB_ORIGINS,
  isNetworkHubId,
  type NetworkHubId,
} from '@/lib/network/sso-handoff';

export type HandoffStartResult =
  | {
      ok: true;
      redirectUrl: string;
      code: string;
      toHub: NetworkHubId;
      reason: 'minted';
    }
  | {
      ok: false;
      fallbackUrl: string;
      reason: string;
      hasAuthCookie: boolean;
      hasBearer: boolean;
      toHub?: NetworkHubId;
      error?: string;
    };

function parseCookieHeader(cookieHeader: string): { name: string; value: string }[] {
  if (!cookieHeader) return [];
  return cookieHeader.split(';').flatMap((part) => {
    const idx = part.indexOf('=');
    if (idx <= 0) return [];
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!name) return [];
    return [{ name, value }];
  });
}

export function hasAuthCookieHeader(cookieHeader: string | null): boolean {
  return /sb-[^=;\s]+-auth-token/.test(cookieHeader || '');
}

async function resolveUser(opts: {
  request: Request;
  bearerToken: string | null;
}): Promise<{ userId: string | null; via: 'cookie' | 'bearer' | 'none'; error?: string }> {
  const url = getSupabaseUrl();
  const anon = getSupabaseAnonKey();
  if (!url || !anon) return { userId: null, via: 'none', error: 'no_supabase' };

  // 1) Bearer access_token from signed-in browser (most reliable)
  if (opts.bearerToken && opts.bearerToken.length > 20) {
    try {
      const supabase = createServerClient(url, anon, {
        cookies: {
          getAll: () => [],
          setAll: () => {},
        },
        global: {
          headers: { Authorization: `Bearer ${opts.bearerToken}` },
        },
      });
      const { data, error } = await supabase.auth.getUser(opts.bearerToken);
      if (!error && data.user) {
        return { userId: data.user.id, via: 'bearer' };
      }
      return {
        userId: null,
        via: 'none',
        error: error?.message || 'bearer_invalid',
      };
    } catch (e) {
      return {
        userId: null,
        via: 'none',
        error: e instanceof Error ? e.message : 'bearer_exception',
      };
    }
  }

  // 2) Cookie session (standard SSR path)
  try {
    const cookieHeader = opts.request.headers.get('cookie') || '';
    const parsed = parseCookieHeader(cookieHeader);
    if (parsed.some((c) => c.name.includes('auth-token'))) {
      const supabase = createServerClient(url, anon, {
        cookies: {
          getAll: () => parsed,
          setAll: () => {},
        },
      });
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        return { userId: data.user.id, via: 'cookie' };
      }
    }

    // 3) next/headers cookie store (fallback)
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user) {
      return { userId: data.user.id, via: 'cookie' };
    }
    return {
      userId: null,
      via: 'none',
      error: error?.message || 'no_session',
    };
  } catch (e) {
    return {
      userId: null,
      via: 'none',
      error: e instanceof Error ? e.message : 'cookie_exception',
    };
  }
}

export async function runHandoffStart(opts: {
  request: Request;
  toRaw: string;
  next: string | null;
  bearerToken?: string | null;
  ip?: string | null;
}): Promise<HandoffStartResult> {
  const hasAuthCookie = hasAuthCookieHeader(opts.request.headers.get('cookie'));
  const hasBearer = Boolean(opts.bearerToken && opts.bearerToken.length > 20);
  const toRaw = (opts.toRaw || '').toLowerCase();

  if (!isNetworkHubId(toRaw) || toRaw === CURRENT_HUB) {
    return {
      ok: false,
      fallbackUrl: HUB_ORIGINS.move,
      reason: 'bad_target',
      hasAuthCookie,
      hasBearer,
    };
  }

  const toHub = toRaw as NetworkHubId;
  if (toHub === 'senior' || toHub === 'investor' || toHub === 'ask') {
    const direct = new URL(
      opts.next?.startsWith('/') ? opts.next : HUB_DEFAULT_PATH[toHub],
      HUB_ORIGINS[toHub]
    ).toString();
    return {
      ok: false,
      fallbackUrl: direct,
      reason: 'direct_navigation',
      hasAuthCookie,
      hasBearer,
    };
  }
  const fallbackUrl = new URL(
    opts.next?.startsWith('/') ? opts.next : HUB_DEFAULT_PATH[toHub],
    HUB_ORIGINS[toHub]
  ).toString();

  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured()) {
    return {
      ok: false,
      fallbackUrl,
      reason: 'no_service_role',
      hasAuthCookie,
      hasBearer,
      toHub,
    };
  }

  const resolved = await resolveUser({
    request: opts.request,
    bearerToken: opts.bearerToken ?? null,
  });

  if (!resolved.userId) {
    return {
      ok: false,
      fallbackUrl,
      reason: resolved.error === 'bearer_invalid' ? 'bearer_invalid' : 'no_session',
      hasAuthCookie,
      hasBearer,
      toHub,
      error: resolved.error,
    };
  }

  const result = await createNetworkHandoff({
    userId: resolved.userId,
    fromHub: CURRENT_HUB,
    toHub,
    destinationPath: opts.next,
    ip: opts.ip ?? null,
  });

  if (!result.ok) {
    return {
      ok: false,
      fallbackUrl,
      reason: `create_${result.status}`,
      hasAuthCookie,
      hasBearer,
      toHub,
      error: result.error,
    };
  }

  console.info('[network-handoff/start] minted', {
    toHub,
    userId: resolved.userId,
    via: resolved.via,
    hasCode: Boolean(result.code),
  });

  return {
    ok: true,
    redirectUrl: result.redirectUrl,
    code: result.code,
    toHub,
    reason: 'minted',
  };
}
