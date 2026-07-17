import 'server-only';

import { Resend } from 'resend';
import { BRAND, buildAuthEmailHtml } from '../../supabase/auth-emails/layout';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
}

export function buildMagicLinkEmailHtml(confirmUrl: string): {
  subject: string;
  html: string;
} {
  const subject = `Your Move Trust Hub sign-in link`;
  const html = buildAuthEmailHtml({
    title: 'Sign in to Move Trust Hub',
    bodyHtml: `
      <p style="margin:0 0 12px;">Hi,</p>
      <p style="margin:0 0 12px;">
        Use the secure button below to sign in to your <strong>${BRAND.name}</strong> account
        (Save My Move, Verified Mover Portal, or other signed-in tools). This link expires shortly
        and can only be used once.
      </p>
      <p style="margin:0;">No password needed — this is your magic link.</p>
    `,
    ctaLabel: 'Sign in to Move Trust Hub',
    ctaHref: confirmUrl,
    footerNote:
      'If you didn’t request this, you can safely ignore this email. Your account stays secure.',
  });
  return { subject, html };
}

export type SendMagicLinkEmailResult =
  | { ok: true; resendId: string | null }
  | { ok: false; error: string; code: 'resend_not_configured' | 'resend_failed' };

/**
 * Deliver a branded magic-link email via Resend (bypasses Supabase Auth mailer rate limits).
 */
export async function sendMagicLinkEmail(params: {
  to: string;
  confirmUrl: string;
}): Promise<SendMagicLinkEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      code: 'resend_not_configured',
      error:
        'Email delivery is not configured. Please try again later or contact info@movetrusthub.com.',
    };
  }

  const { subject, html } = buildMagicLinkEmailHtml(params.confirmUrl);
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: resolveFromAddress(),
    to: params.to,
    subject,
    html,
  });

  if (error) {
    console.error('[magic-link] Resend send failed', error.message);
    return {
      ok: false,
      code: 'resend_failed',
      error:
        'We could not deliver the sign-in email. Check the address and try again, or contact info@movetrusthub.com.',
    };
  }

  return { ok: true, resendId: data?.id ?? null };
}
