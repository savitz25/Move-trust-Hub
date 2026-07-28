import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sanitizePostLoginPath } from '@/lib/save-my-move/redirect';
import { productionAuthRedirect } from '@/lib/save-my-move/auth-redirect';
import { ensureUserProfile } from '@/lib/save-my-move/ensure-user-profile';
import { pathAfterAuth } from '@/lib/auth/path-after-auth';
import {
  AUTH_CALLBACK_PATH,
  PRODUCTION_SITE_ORIGIN as INSURANCE_ORIGIN,
} from '@/lib/insurance/my-insurance/constants';
import { isInsuranceStandaloneHost } from '@/lib/hub/domains';
import { insuranceCallbackHandoffUrl } from '@/lib/insurance/my-insurance/oauth-redirect';

/**
 * Move + shared-host OAuth callback.
 *
 * Insurance OAuth uses hub=insurance + next=/my-insurance (Move bridge).
 * We MUST hand off to ITH before exchangeCodeForSession so:
 * - PKCE verifier cookie (set on ITH at kickoff) is available
 * - Session cookies are written for insurancetrusthub.com, not Move
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

  // --- Insurance isolation: never exchange OAuth codes for ITH on Move host ---
  if (shouldHandoffToInsurance(host, nextRaw, hub, Boolean(code))) {
    const handoff = insuranceCallbackHandoffUrl(url.search);
    console.info('[auth/callback] insurance handoff', {
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
      if (isInsuranceNextPath(destination)) {
        return NextResponse.redirect(new URL(destination, INSURANCE_ORIGIN));
      }
      return NextResponse.redirect(productionAuthRedirect(destination, request));
    }

    console.error('[auth/callback] exchangeCodeForSession failed', error.message);

    // Last resort: OAuth likely started on ITH — forward unused code
    if (isPkceCrossHostFailure(error.message)) {
      return NextResponse.redirect(insuranceCallbackHandoffUrl(url.search));
    }
  }

  return NextResponse.redirect(productionAuthRedirect(failPath, request));
}

function shouldHandoffToInsurance(
  host: string,
  nextRaw: string,
  hub: string,
  hasCode: boolean
): boolean {
  // Always hand off when request is already on the Insurance apex
  if (isInsuranceStandaloneHost(host)) return true;

  // Explicit Insurance OAuth bridge marker
  if (hub === 'insurance') return true;

  // Insurance post-login destination
  if (isInsuranceNextPath(nextRaw)) return true;

  // OAuth code on Move with no next → almost always Insurance flow that lost query
  // (Move OAuth always sets next=/my-move or /portal via sanitizePostLoginPath)
  if (hasCode && !nextRaw.trim()) return true;

  return false;
}

function isInsuranceNextPath(nextRaw: string): boolean {
  const next = nextRaw.trim().toLowerCase();
  if (!next) return false;
  // Strip query for path checks
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
