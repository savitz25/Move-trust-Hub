import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { syncLeadToBrevo } from '@/lib/brevo/sync-lead';
import { buildQuoteConfirmationEmail } from '@/lib/emails/quote-confirmation';

const VERIFIED_FROM_FALLBACK =
  'Move Trust Hub <notifications@movetrusthub.com>';
const DEFAULT_TEAM_EMAIL = 'mhenry@amerisafemoving.com';

function isValidEmailAddress(value: string | undefined | null): boolean {
  if (!value?.trim()) return false;
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.trim());
}

function resolveTeamEmail(): string {
  const configured = process.env.QUOTE_TEAM_EMAIL?.trim();
  if (configured && isValidEmailAddress(configured)) {
    return configured;
  }
  if (configured) {
    console.warn(
      `[send-quote-email] Invalid QUOTE_TEAM_EMAIL "${configured}" — using ${DEFAULT_TEAM_EMAIL}`
    );
  }
  return DEFAULT_TEAM_EMAIL;
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) {
    return configured;
  }
  return VERIFIED_FROM_FALLBACK;
}

type InventoryItem = {
  name: string;
  quantity: number;
  volume: number;
  room?: string;
};

function logRoute(message: string, data?: Record<string, unknown>) {
  if (data) {
    console.log(`[send-quote-email] ${message}`, data);
  } else {
    console.log(`[send-quote-email] ${message}`);
  }
}

function getEnvDiagnostics() {
  const configuredTeamEmail = process.env.QUOTE_TEAM_EMAIL?.trim() || null;
  return {
    resendApiKeyConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    resendFrom: resolveFromAddress(),
    teamEmail: resolveTeamEmail(),
    teamEmailEnvValid: isValidEmailAddress(configuredTeamEmail),
    configuredTeamEmail,
    brevoApiKeyConfigured: Boolean(process.env.BREVO_API_KEY?.trim()),
    brevoListId: process.env.BREVO_LIST_ID?.trim() || '7',
  };
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
  };
  return map[s] || String(size);
}

function formatInventoryHtml(inventory: InventoryItem[]): string {
  if (!inventory?.length) return '';

  const rows = inventory
    .map((item) => {
      const lineVolume = item.volume * item.quantity;
      const room = item.room ? escapeHtml(item.room) : '—';
      return `<tr>
      <td style="padding:6px 10px;border:1px solid #ddd;">${escapeHtml(item.name)}</td>
      <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">${room}</td>
      <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:6px 10px;border:1px solid #ddd;text-align:right;">${item.volume} cf</td>
      <td style="padding:6px 10px;border:1px solid #ddd;text-align:right;">${lineVolume} cf</td>
    </tr>`;
    })
    .join('');

  const totalCf = inventory.reduce(
    (sum, item) => sum + item.volume * item.quantity,
    0
  );
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);

  return `
      <h3>Inventory (${totalItems} items, ${totalCf.toLocaleString()} cu ft total)</h3>
      <table style="border-collapse:collapse;width:100%;max-width:640px;font-size:13px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">Item</th>
            <th style="padding:6px 10px;border:1px solid #ddd;">Room</th>
            <th style="padding:6px 10px;border:1px solid #ddd;">Qty</th>
            <th style="padding:6px 10px;border:1px solid #ddd;text-align:right;">Unit Vol</th>
            <th style="padding:6px 10px;border:1px solid #ddd;text-align:right;">Line Vol</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  const env = getEnvDiagnostics();
  const fromAddress = env.resendFrom;
  const teamEmail = env.teamEmail;

  try {
    const payload = await req.json();

    logRoute('Received quote submission', {
      env,
      payload: {
        name: payload.name || null,
        email: payload.email || null,
        phone: payload.phone || null,
        from_zip: payload.from_zip || null,
        to_zip: payload.to_zip || null,
        move_date: payload.move_date || null,
        home_size: payload.home_size || null,
        estimated_volume: payload.estimated_volume ?? null,
        estimated_weight: payload.estimated_weight ?? null,
        inventoryCount: Array.isArray(payload.inventory)
          ? payload.inventory.length
          : 0,
        notes: payload.notes ? '[provided]' : null,
        source: payload.source || 'quote-modal',
      },
    });

    const brevoSync = syncLeadToBrevo(payload);

    if (!env.resendApiKeyConfigured) {
      logRoute('RESEND_API_KEY missing — skipping email delivery');
      const brevoResult = await brevoSync;
      return NextResponse.json({
        success: false,
        reason: 'email not configured',
        env,
        brevoSynced: brevoResult.synced,
        brevoContactId: brevoResult.contactId,
        brevoListId: brevoResult.listId,
        brevoError: brevoResult.error || brevoResult.skippedReason,
        brevoAttempts: brevoResult.attempts,
        durationMs: Date.now() - startedAt,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `New Quote Request from ${payload.name || 'Unknown'}`;

    const homeSizeLabel = getHomeSizeLabel(payload.home_size);
    const inventory = Array.isArray(payload.inventory)
      ? (payload.inventory as InventoryItem[])
      : [];
    const inventoryHtml = formatInventoryHtml(inventory);
    const safeName = escapeHtml(payload.name || 'N/A');
    const safeEmail = escapeHtml(payload.email || '');
    const safePhone = escapeHtml(payload.phone || 'Not provided');
    const safeNotes = payload.notes ? escapeHtml(payload.notes) : '';
    const safeSource = escapeHtml(payload.source || 'quote-modal');

    const leadHtml = `
      <h2>New Move Quote Request</h2>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      
      <h3>Move Details</h3>
      <p><strong>From ZIP:</strong> ${escapeHtml(payload.from_zip || '')}</p>
      <p><strong>To ZIP:</strong> ${escapeHtml(payload.to_zip || '')}</p>
      <p><strong>Preferred Date:</strong> ${payload.move_date ? escapeHtml(payload.move_date) : 'Flexible'}</p>
      <p><strong>Home Size:</strong> ${escapeHtml(homeSizeLabel)}</p>
      <p><strong>Estimated Volume:</strong> ${payload.estimated_volume ? `${payload.estimated_volume} cu ft` : 'Not provided'}</p>
      <p><strong>Estimated Weight:</strong> ${payload.estimated_weight ? `${payload.estimated_weight} lbs` : 'Not provided'}</p>
      
      ${inventoryHtml}
      ${safeNotes ? `<h3>Additional Notes</h3><p>${safeNotes}</p>` : ''}
      
      <p style="margin-top: 30px; font-size: 12px; color: #666;">
        This lead was captured via the Move Trust Hub quote form.<br>
        Source: ${safeSource}
      </p>
    `;

    logRoute('Sending team notification email', {
      from: fromAddress,
      to: teamEmail,
      subject,
    });

    const teamSend = await resend.emails.send({
      from: fromAddress,
      to: teamEmail,
      replyTo: isValidEmailAddress(payload.email) ? payload.email : undefined,
      subject,
      html: leadHtml,
    });

    if (teamSend.error) {
      logRoute('Team email failed', {
        error: teamSend.error,
        from: fromAddress,
        to: teamEmail,
      });
    } else {
      logRoute('Team email sent', {
        messageId: teamSend.data?.id,
        to: teamEmail,
      });
    }

    let confirmationSent = false;
    let confirmationId: string | null = null;
    let confirmationError: unknown = null;

    if (payload.email) {
      const confirmationSubject = `Your move quote is confirmed — ${payload.from_zip} to ${payload.to_zip}`;
      const confirmationHtml = buildQuoteConfirmationEmail({
        name: payload.name,
        fromZip: payload.from_zip,
        toZip: payload.to_zip,
        moveDate: payload.move_date,
        homeSizeLabel,
        estimatedVolume: payload.estimated_volume,
      });

      logRoute('Sending lead confirmation email', {
        from: fromAddress,
        to: payload.email,
      });

      const confirmSend = await resend.emails.send({
        from: fromAddress,
        to: payload.email,
        replyTo: teamEmail,
        subject: confirmationSubject,
        html: confirmationHtml,
      });

      if (confirmSend.error) {
        confirmationError = confirmSend.error;
        logRoute('Confirmation email failed', {
          error: confirmSend.error,
          to: payload.email,
        });
      } else {
        confirmationId = confirmSend.data?.id ?? null;
        confirmationSent = true;
        logRoute('Confirmation email sent', {
          messageId: confirmationId,
          to: payload.email,
        });
      }
    }

    const brevoResult = await brevoSync;
    const messageIds = [teamSend.data?.id, confirmationId].filter(Boolean);
    const teamEmailSent = !teamSend.error;
    const overallSuccess = teamEmailSent || brevoResult.synced;

    logRoute('Quote submission processed', {
      overallSuccess,
      teamEmailSent,
      confirmationSent,
      brevoSynced: brevoResult.synced,
      brevoContactId: brevoResult.contactId,
      brevoListId: brevoResult.listId,
      brevoError: brevoResult.error || brevoResult.skippedReason,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({
      success: overallSuccess,
      messageIds,
      teamEmailSent,
      teamEmailError: teamSend.error ?? null,
      confirmationSent,
      confirmationError,
      brevoSynced: brevoResult.synced,
      brevoContactId: brevoResult.contactId,
      brevoListId: brevoResult.listId,
      brevoError: brevoResult.error || brevoResult.skippedReason,
      brevoAttempts: brevoResult.attempts,
      env,
      durationMs: Date.now() - startedAt,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logRoute('Unhandled route error', { message, env });
    return NextResponse.json(
      {
        success: false,
        error: message,
        env,
        durationMs: Date.now() - startedAt,
      },
      { status: 500 }
    );
  }
}