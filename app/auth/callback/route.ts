import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';
import {
  INSURANCE_SITE_URL,
  LENDER_SITE_URL,
  isInsuranceStandaloneHost,
} from '@/lib/hub/domains';

/**
 * Move + network auth bridge callback.
 *
 * Insurance and Lender OAuth/magic links often set redirect_to to this URL
 * (Supabase Site URL is Move). We MUST hand off the code to the originating
 * hub WITHOUT exchangeCodeForSession so session cookies are set on the correct domain.
 *
 * Markers:
 * - hub=insurance | hub=lending
 * - next=/my-insurance… | next=/my-lending…
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    url.host;
  const nextRaw = searchParams.get('next') || '';
  const hub = (searchParams.get('hub') || '').toLowerCase();
  const code = searchParams.get('code');

  // --- Network isolation: never exchange OAuth codes for other hubs on Move ---
  const handoffTarget = resolveNetworkHandoff({ host, nextRaw, hub, hasCode: Boolean(code) });
  if (handoffTarget) {
    const handoff = buildHandoffUrl(handoffTarget, url.search);
    console.info('[auth/callback] network handoff (no exchange on Move)', {
      host,
      next: nextRaw,
      hub,
      hasCode: Boolean(code),
      handoff,
    });
    return NextResponse.redirect(handoff);
  }

  const next = sanitizePostLoginPath(searchParams.get('next'));
  const oauthError = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const failPath =
    next.startsWith('/portal')
      ? `/portal/login?auth=error&next=${encodeURIComponent(next)}`
      : '/my-move?auth=error';

  if (oauthError) {
    console.error('[auth/callback] OAuth provider error', {
      error: oauthError,
      description: errorDescription,
    });
    return NextResponse.redirect(productionAuthRedirect(failPath, request));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        try {
          await ensureUserProfile(supabase, user);
        } catch (profileErr) {
          console.error('[auth/callback] ensureUserProfile failed', profileErr);
        }
      }
      const destination = await pathAfterAuth(next);
      // Safety: never keep other-hub paths on Move after exchange
      if (isInsuranceNextPath(destination)) {
        return NextResponse.redirect(new URL(destination, INSURANCE_SITE_URL));
      }
      if (isLendingNextPath(destination)) {
        return NextResponse.redirect(new URL(destination, LENDER_SITE_URL));
      }
      return NextResponse.redirect(productionAuthRedirect(destination, request));
    }

    console.error('[auth/callback] exchangeCodeForSession failed', error.message);

    // PKCE started on another hub — forward unused code
    if (isPkceCrossHostFailure(error.message)) {
      if (isLendingNextPath(nextRaw) || hub === 'lending' || hub === 'lender') {
        return NextResponse.redirect(buildHandoffUrl(LENDER_SITE_URL, url.search));
      }
      return NextResponse.redirect(buildHandoffUrl(INSURANCE_SITE_URL, url.search));
    }
  }

  return NextResponse.redirect(productionAuthRedirect(failPath, request));
}

function resolveNetworkHandoff(opts: {
  host: string;
  nextRaw: string;
  hub: string;
  hasCode: boolean;
}): string | null {
  const { host, nextRaw, hub, hasCode } = opts;

  // Already on Insurance apex (monorepo edge cases)
  if (isInsuranceStandaloneHost(host)) {
    return INSURANCE_SITE_URL;
  }

  const h = hub.trim();
  if (h === 'insurance' || h === 'ith') return INSURANCE_SITE_URL;
  if (h === 'lending' || h === 'lender' || h === 'lth') return LENDER_SITE_URL;

  if (isInsuranceNextPath(nextRaw)) return INSURANCE_SITE_URL;
  if (isLendingNextPath(nextRaw)) return LENDER_SITE_URL;

  // Do NOT assume empty-next codes are Insurance — could be Lender Site URL fallback.
  // Only hand off empty-next when explicitly marked; otherwise stay on Move.
  void hasCode;
  return null;
}

function buildHandoffUrl(siteOrigin: string, search: string): string {
  const q = search.startsWith('?') ? search : search ? `?${search}` : '';
  const dest = new URL(`/auth/callback${q}`, siteOrigin);
  if (!dest.searchParams.get('next')) {
    if (siteOrigin.includes('lender')) {
      dest.searchParams.set('next', '/my-lending');
      dest.searchParams.set('hub', 'lending');
    } else if (siteOrigin.includes('insurance')) {
      dest.searchParams.set('next', '/my-insurance');
      dest.searchParams.set('hub', 'insurance');
    } else {
      dest.searchParams.set('next', '/my-move');
    }
  }
  return dest.toString();
}

function isInsuranceNextPath(nextRaw: string): boolean {
  const next = nextRaw.trim().toLowerCase();
  if (!next) return false;
  const path = next.split('?')[0] || next;
  return (
    path === '/my-insurance' ||
    path.startsWith('/my-insurance/') ||
    path.startsWith('/providers/') ||
    path === '/providers' ||
    path.startsWith('/tools/') ||
    path === '/tools' ||
    path.startsWith('/hubs/') ||
    path === '/hubs' ||
    path.startsWith('/calculators/') ||
    path === '/calculators' ||
    path.startsWith('/directory')
  );
}

function isLendingNextPath(nextRaw: string): boolean {
  const next = nextRaw.trim().toLowerCase();
  if (!next) return false;
  const path = next.split('?')[0] || next;
  return (
    path === '/my-lending' ||
    path.startsWith('/my-lending/') ||
    path.startsWith('/local-lenders') ||
    path.startsWith('/fdic-insured-banks') ||
    path.startsWith('/lenders/')
  );
}

function isPkceCrossHostFailure(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('pkce') ||
    m.includes('code verifier') ||
    m.includes('code_verifier') ||
    m.includes('both auth code and') ||
    m.includes('invalid flow state') ||
    m.includes('flow state')
  );
}
