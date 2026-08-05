import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  createNetworkHandoff,
  CURRENT_HUB,
  HUB_DEFAULT_PATH,
  HUB_ORIGINS,
  isNetworkHubId,
  type NetworkHubId,
} from '@/lib/network/sso-handoff';
import { isSupabaseConfigured } from '@/lib/supabase/config';

function clientIp(request: Request): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

/** GET /api/auth/network-handoff/start?to=insurance|lender&next=/… */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const toRaw = (searchParams.get('to') || '').toLowerCase();
  const next = searchParams.get('next');

  if (!isNetworkHubId(toRaw) || toRaw === CURRENT_HUB) {
    return NextResponse.redirect(HUB_ORIGINS.move);
  }
  const toHub = toRaw as NetworkHubId;
  const fallback = new URL(
    next?.startsWith('/') ? next : HUB_DEFAULT_PATH[toHub],
    HUB_ORIGINS[toHub]
  ).toString();

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(fallback);
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(fallback);

    const result = await createNetworkHandoff({
      userId: user.id,
      fromHub: CURRENT_HUB,
      toHub,
      destinationPath: next,
      ip: clientIp(request),
    });

    if (!result.ok) {
      console.warn('[network-handoff/start]', result.status, result.error);
      return NextResponse.redirect(fallback);
    }

    return NextResponse.redirect(result.redirectUrl);
  } catch (err) {
    console.error('[network-handoff/start]', err);
    return NextResponse.redirect(fallback);
  }
}
