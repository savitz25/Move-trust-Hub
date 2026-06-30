import 'server-only';

import { Resend } from 'resend';
import { SITE_EMAIL } from '@/lib/contact';
import type { ContactFormInput } from '@/lib/contact/schema';
import { CONTACT_SUBJECT_LABELS } from '@/lib/contact/schema';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
}

function resolveContactInbox(): string {
  return (
    process.env.CONTACT_TEAM_EMAIL?.trim() ||
    process.env.QUOTE_TEAM_EMAIL?.trim() ||
    SITE_EMAIL
  );
}

export type SendContactResult = {
  success: boolean;
  error?: string;
  emailSent?: boolean;
};

export async function sendContactMessage(
  input: ContactFormInput
): Promise<SendContactResult> {
  const inbox = resolveContactInbox();
  const subjectLabel = CONTACT_SUBJECT_LABELS[input.subject];
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, '<br />');

  if (!process.env.RESEND_API_KEY?.trim()) {
    return {
      success: false,
      error:
        'Email delivery is temporarily unavailable. Please email us directly at hello@movetrusthub.com.',
      emailSent: false,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: resolveFromAddress(),
    to: inbox,
    replyTo: input.email,
    subject: `[Move Trust Hub] ${subjectLabel} — ${input.name}`,
    html: `
      <h2>New contact form message</h2>
      <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
      <hr />
      <p>${safeMessage}</p>
      <hr />
      <p style="font-size:12px;color:#666">Submitted via movetrusthub.com/contact</p>
    `,
  });

  if (result.error) {
    return {
      success: false,
      error: 'We could not send your message. Please try again or email hello@movetrusthub.com.',
      emailSent: false,
    };
  }

  await resend.emails.send({
    from: resolveFromAddress(),
    to: input.email,
    replyTo: inbox,
    subject: 'We received your message — Move Trust Hub',
    html: `
      <p>Hi ${safeName},</p>
      <p>Thank you for contacting Move Trust Hub. We received your message regarding <strong>${escapeHtml(subjectLabel)}</strong> and typically respond within 2–5 business days.</p>
      <p>If your request is urgent (for example, a privacy or data deletion request), reply to this email and we will prioritize it.</p>
      <p>— Move Trust Hub<br /><a href="https://www.movetrusthub.com">movetrusthub.com</a></p>
    `,
  }).catch(() => undefined);

  return { success: true, emailSent: true };
}