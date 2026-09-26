import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  isIsolatedMoveBrowserAuthAdmitted,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';
import {
  authCallbackUrl,
  productionAuthRedirect,
  sanitizePostLoginPath,
} from '@/lib/save-my-move/redirect';
import {
  isResendConfigured,
  sendMagicLinkEmail,
} from '@/lib/auth/magic-link-email';
import { isEmailOtpType } from '@/lib/auth/otp-types';

export type RequestMagicLinkResult =
  | { ok: true; delivery: 'resend' | 'supabase' }
  | { ok: false; status: number; error: string };

type OtpArgs = {
  email: string;
  options: { emailRedirectTo: string; shouldCreateUser: boolean };
};

export type MagicLinkPorts = {
  session: () => Promise<{
    auth: {
      signInWithOtp: (args: OtpArgs) => Promise<{ error: { message: string; code?: string } | null }>;
    };
  }>;
  admin: () => {
    auth: {
      admin: {
        generateLink: (args: {
          type: 'magiclink';
          email: string;
          options: { redirectTo: string };
        }) => Promise<{
          data?: { properties?: { hashed_token?: string; verification_type?: string } };
          error: { message: string } | null;
        }>;
      };
    };
  };
  adminConfigured: () => boolean;
  resendReady: () => boolean;
  sendResend: (input: { to: string; confirmUrl: string }) => Promise<
    { ok: true } | { ok: false; code?: string; error: string }
  >;
};

function defaultMagicLinkPorts(): MagicLinkPorts {
  return {
    session: () => createClient() as ReturnType<MagicLinkPorts['session']>,
    admin: () => createAdminClient() as ReturnType<MagicLinkPorts['admin']>,
    adminConfigured: isSupabaseAdminConfigured,
    resendReady: isResendConfigured,
    sendResend: sendMagicLinkEmail,
  };
}

function mapSupabaseOtpError(message: string): { status: number; error: string } {
  const lower = message.toLowerCase();

  if (
    lower.includes('rate limit') ||
    lower.includes('over_email_send_rate_limit') ||
    lower.includes('email rate limit')
  ) {
    return {
      status: 429,
      error:
        'Too many sign-in emails were sent recently (provider limit). Wait about an hour, or try again later. If this keeps happening, contact info@movetrusthub.com.',
    };
  }

  if (lower.includes('redirect') || lower.includes('url not allowed')) {
    return {
      status: 500,
      error:
        'Sign-in redirect is misconfigured. Please contact info@movetrusthub.com so we can fix Auth URL settings.',
    };
  }

  if (lower.includes('signups not allowed') || lower.includes('signup is disabled')) {
    return {
      status: 403,
      error: 'New sign-ups are currently disabled. Contact info@movetrusthub.com for help.',
    };
  }

  return {
    status: 500,
    error:
      'Could not send the sign-in link. Please try again in a few minutes. If it continues, contact info@movetrusthub.com.',
  };
}

function buildConfirmUrl(params: {
  tokenHash: string;
  type: string;
  nextPath: string;
}): string {
  const url = new URL(productionAuthRedirect('/auth/confirm'));
  url.searchParams.set('token_hash', params.tokenHash);
  url.searchParams.set('type', params.type);
  url.searchParams.set('next', params.nextPath);
  return url.toString();
}

/**
 * Preferred path: admin.generateLink + Resend branded email.
 * Avoids Supabase built-in mailer rate limits (common cause of “Could not send sign-in link”).
 */
async function sendViaResend(
  email: string,
  nextPath: string,
  ports: MagicLinkPorts
): Promise<RequestMagicLinkResult> {
  const admin = ports.admin();
  const redirectTo = `${authCallbackUrl()}?next=${encodeURIComponent(nextPath)}`;

  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error('[magic-link] generateLink failed', error.message);
    return { ok: false, ...mapSupabaseOtpError(error.message) };
  }

  const props = data?.properties;
  const tokenHash = props?.hashed_token;
  const verificationType = props?.verification_type ?? 'magiclink';

  if (!tokenHash) {
    console.error('[magic-link] generateLink missing hashed_token');
    return {
      ok: false,
      status: 500,
      error:
        'Could not create a sign-in link. Please try again. If it continues, contact info@movetrusthub.com.',
    };
  }

  const type = isEmailOtpType(verificationType) ? verificationType : 'magiclink';
  const confirmUrl = buildConfirmUrl({
    tokenHash,
    type,
    nextPath,
  });

  const sent = await ports.sendResend({ to: email, confirmUrl });
  if (!sent.ok) {
    return {
      ok: false,
      status: sent.code === 'resend_not_configured' ? 503 : 502,
      error: sent.error,
    };
  }

  return { ok: true, delivery: 'resend' };
}

/**
 * Fallback: Supabase Auth sends the email (subject to Supabase mailer rate limits).
 */
async function sendViaSupabaseOtp(
  email: string,
  nextPath: string,
  ports: MagicLinkPorts
): Promise<RequestMagicLinkResult> {
  const redirectTo = `${authCallbackUrl()}?next=${encodeURIComponent(nextPath)}`;
  const supabase = await ports.session();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: !isIsolatedMoveBrowserAuthAdmitted(),
    },
  });

  if (error) {
    console.error('[magic-link] signInWithOtp failed', error.message, error.code);
    return { ok: false, ...mapSupabaseOtpError(error.message) };
  }

  return { ok: true, delivery: 'supabase' };
}

/**
 * Request a magic-link email for portal / Save My Move sign-in.
 */
export async function requestMagicLink(
  params: {
    email: string;
    next?: string | null;
  },
  ports: MagicLinkPorts = defaultMagicLinkPorts()
): Promise<RequestMagicLinkResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      status: 503,
      error: 'Sign-in is temporarily unavailable (auth not configured).',
    };
  }

  const email = params.email.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Enter a valid email address.' };
  }

  const nextPath = sanitizePostLoginPath(params.next);

  // Production path: generate link + Resend (reliable, branded, no Supabase mailer limit).
  // Isolated preview auth stays on the browser anon client and must not call production service role.
  if (
    !isIsolatedMoveBrowserAuthAdmitted() &&
    ports.adminConfigured() &&
    ports.resendReady()
  ) {
    return sendViaResend(email, nextPath, ports);
  }

  // Local/dev or missing Resend: use Supabase mailer (may hit rate limits).
  if (!ports.resendReady()) {
    console.warn(
      '[magic-link] RESEND_API_KEY missing — falling back to Supabase Auth mailer'
    );
  }

  return sendViaSupabaseOtp(email, nextPath, ports);
}
