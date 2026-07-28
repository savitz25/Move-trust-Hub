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

/**
 * Move + shared-host OAuth/magic-link callback.
 *
 * Insurance isolation:
 * - On insurancetrusthub.com → always hand off to /auth/insurance/callback (no code exchange here).
 * - On movetrusthub.com with next=/my-insurance (etc.) → same handoff before exchange.
 * - PKCE failure often means OAuth started on ITH; forward code to ITH without consuming it.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const host =
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
    request.headers.get('host') ||
    url.host;
  const nextRaw = searchParams.get('next') || '';
  const code = searchParams.get('code');

  // Never run My Move exchange for Insurance hosts or Insurance post-login destinations
  if (shouldDelegateToInsuranceAuth(host, nextRaw)) {
    const insuranceCallback = new URL(
      `${AUTH_CALLBACK_PATH}${url.search}`,
      INSURANCE_ORIGIN
    );
    return NextResponse.redirect(insuranceCallback);
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
      // Extra guard: never send Insurance next to Move production origin
      if (isInsuranceNextPath(destination)) {
        return NextResponse.redirect(new URL(destination, INSURANCE_ORIGIN));
      }
      return NextResponse.redirect(productionAuthRedirect(destination, request));
    }

    console.error('[auth/callback] exchangeCodeForSession failed', error.message);

    // OAuth was likely started on ITH (PKCE verifier cookie only lives there).
    // Forward the unused code to Insurance callback instead of dumping into My Move.
    if (isPkceCrossHostFailure(error.message)) {
      const insuranceCallback = new URL(
        `${AUTH_CALLBACK_PATH}${url.search}`,
        INSURANCE_ORIGIN
      );
      if (!insuranceCallback.searchParams.get('next')) {
        insuranceCallback.searchParams.set('next', '/my-insurance');
      }
      console.warn(
        '[auth/callback] forwarding OAuth code to Insurance callback (cross-host recovery)'
      );
      return NextResponse.redirect(insuranceCallback);
    }
  }

  return NextResponse.redirect(productionAuthRedirect(failPath, request));
}

function shouldDelegateToInsuranceAuth(host: string, nextRaw: string): boolean {
  if (isInsuranceStandaloneHost(host)) return true;
  return isInsuranceNextPath(nextRaw);
}

function isInsuranceNextPath(nextRaw: string): boolean {
  const next = nextRaw.trim().toLowerCase();
  if (!next) return false;
  return (
    next === '/my-insurance' ||
    next.startsWith('/my-insurance/') ||
    next.startsWith('/providers/') ||
    next === '/providers' ||
    next.startsWith('/tools/') ||
    next === '/tools' ||
    next.startsWith('/hubs/') ||
    next === '/hubs' ||
    next.startsWith('/calculators/') ||
    next === '/calculators' ||
    next.startsWith('/directory')
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
