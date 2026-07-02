import 'server-only';

import { Resend } from 'resend';
import type { FieldChange } from '@/lib/fmcsa/refresh/types';
import type { RefreshRunResult } from '@/lib/fmcsa/refresh/types';

const DEFAULT_ALERT_EMAIL = 'savitz25@gmail.com';

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveAlertEmail(): string {
  return process.env.FMCSA_ALERT_EMAIL?.trim() || DEFAULT_ALERT_EMAIL;
}

function resolveFromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    'Move Trust Hub <notifications@movetrusthub.com>'
  );
}

async function sendSms(message: string): Promise<boolean> {
  const to = process.env.FMCSA_ALERT_SMS_TO?.trim();
  const clientId = process.env.RINGCENTRAL_CLIENT_ID?.trim();
  const clientSecret = process.env.RINGCENTRAL_CLIENT_SECRET?.trim();
  const jwt = process.env.RINGCENTRAL_JWT?.trim();
  const from = process.env.RINGCENTRAL_FROM_NUMBER?.trim();
  const server = process.env.RINGCENTRAL_SERVER?.trim() || 'https://platform.ringcentral.com';

  if (!to || !clientId || !clientSecret || !jwt || !from) {
    return false;
  }

  try {
    const tokenRes = await fetch(`${server}/restapi/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    if (!tokenRes.ok) return false;
    const { access_token: accessToken } = (await tokenRes.json()) as { access_token?: string };
    if (!accessToken) return false;

    const smsRes = await fetch(
      `${server}/restapi/v1.0/account/~/extension/~/sms`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: { phoneNumber: from },
          to: [{ phoneNumber: to }],
          text: message.slice(0, 500),
        }),
      }
    );
    return smsRes.ok;
  } catch {
    return false;
  }
}

export async function sendRefreshSummaryAlert(
  result: RefreshRunResult,
  criticalChanges: { companyName: string; slug: string; changes: FieldChange[] }[]
): Promise<{ emailSent: boolean; smsSent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  let emailSent = false;
  let smsSent = false;

  const shouldAlert =
    result.status === 'failed' ||
    result.companiesFailed > 0 ||
    criticalChanges.length > 0;

  if (!shouldAlert) {
    return { emailSent, smsSent };
  }

  const subject =
    result.status === 'failed'
      ? `[Move Trust Hub] FMCSA refresh FAILED (${result.mode})`
      : `[Move Trust Hub] FMCSA refresh: ${criticalChanges.length} critical change(s)`;

  const changeRows = criticalChanges
    .slice(0, 20)
    .map(
      (row) =>
        `<li><strong>${escapeHtml(row.companyName)}</strong> (${escapeHtml(row.slug)}): ${row.changes
          .map((c) => `${escapeHtml(c.field)} ${escapeHtml(c.oldValue ?? '—')} → ${escapeHtml(c.newValue ?? '—')}`)
          .join('; ')}</li>`
    )
    .join('');

  const html = `
    <h2>FMCSA Refresh Summary</h2>
    <p><strong>Mode:</strong> ${escapeHtml(result.mode)}</p>
    <p><strong>Status:</strong> ${escapeHtml(result.status)}</p>
    <p><strong>Processed:</strong> ${result.companiesProcessed} / ${result.companiesTotal}</p>
    <p><strong>Updated:</strong> ${result.companiesUpdated} · <strong>Failed:</strong> ${result.companiesFailed}</p>
    <p><strong>Changes:</strong> ${result.changesDetected}</p>
    <p><strong>Duration:</strong> ${Math.round(result.durationMs / 1000)}s</p>
    ${result.errors.length ? `<pre>${escapeHtml(result.errors.slice(0, 5).join('\n'))}</pre>` : ''}
    ${changeRows ? `<h3>Critical / warning changes</h3><ul>${changeRows}</ul>` : ''}
    <p><a href="https://www.movetrusthub.com/admin/fmcsa">View admin dashboard</a></p>
  `;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: resolveFromAddress(),
        to: resolveAlertEmail(),
        subject,
        html,
      });
      emailSent = !error;
    } catch {
      emailSent = false;
    }
  }

  if (criticalChanges.length > 0 || result.status === 'failed') {
    const smsBody = `${subject}. Processed ${result.companiesProcessed}/${result.companiesTotal}. Failures: ${result.companiesFailed}.`;
    smsSent = await sendSms(smsBody);
  }

  return { emailSent, smsSent };
}