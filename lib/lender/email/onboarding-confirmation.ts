import 'server-only';

import { Resend } from 'resend';

function resolveFromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    process.env.LENDER_RESEND_FROM?.trim() ||
    'Lender Trust Hub <notifications@lendertrusthub.com>'
  );
}

export async function sendLenderOnboardingConfirmation(params: {
  to: string;
  submitterName: string;
  lenderName: string;
  nmlsId: string;
  profileSlug: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY?.trim()) {
    return { sent: false, error: 'RESEND_API_KEY not configured' };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_LENDER_SITE_URL?.trim() || 'https://www.lendertrusthub.com';
  const profileUrl = `${siteUrl}/lender/lenders/${params.profileSlug}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: resolveFromAddress(),
    to: params.to,
    subject: `Your Lender Trust Hub profile is live — ${params.lenderName}`,
    html: `
      <p>Hi ${params.submitterName},</p>
      <p>Your lender onboarding submission for <strong>${params.lenderName}</strong> (NMLS #${params.nmlsId}) has been approved and published.</p>
      <p><a href="${profileUrl}">View your profile</a></p>
      <p style="font-size:12px;color:#666;">
        NMLS-verified via Consumer Access. Independent directory — not affiliated with NMLS or any lender.
        Data is for research only; always verify directly at nmlsconsumeraccess.org.
      </p>
    `,
  });

  if (result.error) {
    return { sent: false, error: result.error.message };
  }

  return { sent: true };
}