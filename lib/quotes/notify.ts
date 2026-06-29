/**
 * Server-side quote notification pipeline (Resend + Brevo).
 * Shared by Server Action and legacy API route.
 */
import { Resend } from 'resend';
import { syncLeadToBrevo } from '@/lib/brevo/sync-lead';
import { buildQuoteConfirmationEmail } from '@/lib/emails/quote-confirmation';
import type { QuoteRequestInput } from '@/lib/quotes/schema';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';
const DEFAULT_TEAM_EMAIL = 'mhenry@amerisafemoving.com';

function isValidEmailAddress(value: string | undefined | null): boolean {
  if (!value?.trim()) return false;
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.trim());
}

function resolveTeamEmail(): string {
  const configured = process.env.QUOTE_TEAM_EMAIL?.trim();
  if (configured && isValidEmailAddress(configured)) return configured;
  return DEFAULT_TEAM_EMAIL;
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getHomeSizeLabel(size: string | number | null | undefined): string {
  if (!size) return 'Not provided';
  const s = String(size).trim().toLowerCase();
  const map: Record<string, string> = {
    studio: 'Studio / Small apartment',
    '1': '1 Bedroom',
    '2': '2 Bedrooms',
    '3': '3 Bedrooms',
    '4+': '4+ Bedrooms / Large',
    'auto-transport': 'Auto transport',
  };
  return map[s] || String(size);
}

export type QuoteNotificationResult = {
  success: boolean;
  teamEmailSent: boolean;
  confirmationSent: boolean;
  brevoSynced: boolean;
  brevoContactId?: string | null;
  brevoError?: string | null;
  messageIds: string[];
  durationMs: number;
};

export async function sendQuoteNotifications(
  payload: QuoteRequestInput & { name: string; email: string; from_zip: string; to_zip: string }
): Promise<QuoteNotificationResult> {
  const startedAt = Date.now();
  const fromAddress = resolveFromAddress();
  const teamEmail = resolveTeamEmail();
  const messageIds: string[] = [];

  const brevoSync = syncLeadToBrevo(payload);

  if (!process.env.RESEND_API_KEY?.trim()) {
    const brevoResult = await brevoSync;
    return {
      success: brevoResult.synced,
      teamEmailSent: false,
      confirmationSent: false,
      brevoSynced: brevoResult.synced,
      brevoContactId: brevoResult.contactId,
      brevoError: brevoResult.error || brevoResult.skippedReason,
      messageIds,
      durationMs: Date.now() - startedAt,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const isAutoTransport = payload.service_type === 'auto-transport';
  const homeSizeLabel = isAutoTransport
    ? 'Auto transport'
    : getHomeSizeLabel(payload.home_size);
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSource = escapeHtml(payload.source || 'quote-modal');

  const teamSend = await resend.emails.send({
    from: fromAddress,
    to: teamEmail,
    replyTo: isValidEmailAddress(payload.email) ? payload.email : undefined,
    subject: `New Quote Request from ${payload.name}`,
    html: `<h2>${isAutoTransport ? 'New Auto Transport Quote' : 'New Move Quote'}</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>From ZIP:</strong> ${escapeHtml(payload.from_zip)}</p>
      <p><strong>To ZIP:</strong> ${escapeHtml(payload.to_zip)}</p>
      <p><strong>Source:</strong> ${safeSource}</p>
      ${payload.destination_slug ? `<p><strong>Destination:</strong> ${escapeHtml(payload.destination_slug)}</p>` : ''}`,
  });

  if (teamSend.data?.id) messageIds.push(teamSend.data.id);

  let confirmationSent = false;
  if (payload.email) {
    const confirmSend = await resend.emails.send({
      from: fromAddress,
      to: payload.email,
      replyTo: teamEmail,
      subject: isAutoTransport
        ? `Your auto transport quote is confirmed — ${payload.from_zip} to ${payload.to_zip}`
        : `Your move quote is confirmed — ${payload.from_zip} to ${payload.to_zip}`,
      html: buildQuoteConfirmationEmail({
        name: payload.name,
        fromZip: payload.from_zip,
        toZip: payload.to_zip,
        moveDate: payload.move_date,
        homeSizeLabel,
        estimatedVolume: payload.estimated_volume,
      }),
    });
    if (confirmSend.data?.id) {
      messageIds.push(confirmSend.data.id);
      confirmationSent = true;
    }
  }

  const brevoResult = await brevoSync;
  const teamEmailSent = !teamSend.error;

  return {
    success: teamEmailSent || brevoResult.synced,
    teamEmailSent,
    confirmationSent,
    brevoSynced: brevoResult.synced,
    brevoContactId: brevoResult.contactId,
    brevoError: brevoResult.error || brevoResult.skippedReason,
    messageIds,
    durationMs: Date.now() - startedAt,
  };
}