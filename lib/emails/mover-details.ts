import { trustHubLogoUrl } from '@/lib/hub/config';
import {
  buildTransactionalEmailFooter,
  buildTransactionalTextFooter,
} from '@/lib/emails/transactional-footer';
import {
  formatAvgPricePerMove,
  formatCompanyHeadquarters,
  formatFoundedLabel,
} from '@/lib/directory/normalize-company';

export type MoverDetailsEmailData = {
  recipientName?: string | null;
  companyName: string;
  profileUrl: string;
  reputationScore: number;
  overallRating: number;
  reviewCount: number;
  headquarters: string;
  foundedLabel: string | null;
  usdotNumber: string;
  mcNumber: string;
  shortDescription: string;
  fmcsaSafetyRating: string;
  avgPriceLabel: string;
  website: string | null;
};

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function firstName(name: string | null | undefined): string {
  if (!name?.trim()) return '';
  return name.trim().split(/\s+/)[0];
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;font-weight:600;vertical-align:top;">${value}</td>
    </tr>`;
}

export function buildMoverDetailsSubject(companyName: string): string {
  return `${companyName} — mover details from Move Trust Hub`;
}

export function buildMoverDetailsEmailHtml(data: MoverDetailsEmailData): string {
  const greeting = firstName(data.recipientName);
  const intro = greeting
    ? `Hi ${escapeHtml(greeting)}, here are the details you asked for about`
    : 'Here are the details you asked for about';

  const websiteRow = data.website
    ? detailRow(
        'Website',
        `<a href="${escapeHtml(data.website)}" style="color:#0077D4;text-decoration:none;">${escapeHtml(data.website)}</a>`
      )
    : '';

  const founded = data.foundedLabel ? ` • ${escapeHtml(data.foundedLabel)}` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.08);">
          <tr>
            <td style="padding:28px 32px 20px 32px;background:linear-gradient(135deg,#003366 0%,#0077D4 55%,#00A3E0 100%);">
              <img src="${trustHubLogoUrl()}" alt="Move Trust Hub" width="180" style="display:block;border:0;max-width:180px;height:auto;background:transparent;" />
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#334155;">${intro} <strong style="color:#0f172a;">${escapeHtml(data.companyName)}</strong>.</p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#64748b;">Saved to your My Move shortlist. Review the profile, compare carriers, and verify FMCSA licensing before you book.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow('Reputation score', `${data.reputationScore}`)}
                ${detailRow('Overall rating', `${data.overallRating.toFixed(1)} / 5 (${data.reviewCount.toLocaleString()} reviews)`)}
                ${detailRow('Headquarters', `${escapeHtml(formatCompanyHeadquarters(data.headquarters))}${founded}`)}
                ${detailRow('USDOT', data.usdotNumber ? escapeHtml(data.usdotNumber) : '—')}
                ${detailRow('MC number', data.mcNumber ? escapeHtml(data.mcNumber) : '—')}
                ${detailRow('FMCSA safety', escapeHtml(data.fmcsaSafetyRating))}
                ${detailRow('Avg. move price', escapeHtml(data.avgPriceLabel))}
                ${websiteRow}
              </table>
              <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#334155;">${escapeHtml(data.shortDescription)}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px 0;">
                <tr>
                  <td style="border-radius:999px;background:#0077D4;">
                    <a href="${escapeHtml(data.profileUrl)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">View full profile</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;">
              ${buildTransactionalEmailFooter()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildMoverDetailsEmailText(data: MoverDetailsEmailData): string {
  const greeting = firstName(data.recipientName);
  const lines = [
    greeting ? `Hi ${greeting},` : 'Hello,',
    '',
    `Here are the details you asked for about ${data.companyName}.`,
    '',
    `Reputation score: ${data.reputationScore}`,
    `Overall rating: ${data.overallRating.toFixed(1)} / 5 (${data.reviewCount} reviews)`,
    `Headquarters: ${formatCompanyHeadquarters(data.headquarters)}${data.foundedLabel ? ` • ${data.foundedLabel}` : ''}`,
    `USDOT: ${data.usdotNumber || '—'}`,
    `MC number: ${data.mcNumber || '—'}`,
    `FMCSA safety: ${data.fmcsaSafetyRating}`,
    `Avg. move price: ${data.avgPriceLabel}`,
    data.website ? `Website: ${data.website}` : '',
    '',
    data.shortDescription,
    '',
    `View profile: ${data.profileUrl}`,
    '',
    buildTransactionalTextFooter(),
  ].filter((line, index, arr) => !(line === '' && arr[index - 1] === ''));

  return lines.join('\n');
}

export function companyToMoverEmailData(
  company: {
    name: string;
    slug: string;
    reputationScore: number;
    overallRating: number;
    reviewCount: number;
    headquarters: string;
    foundedYear: number;
    usdotNumber: string;
    mcNumber: string;
    shortDescription: string;
    fmcsaSafetyRating: string;
    avgPricePerMove: number;
    website: string;
  },
  recipientName?: string | null
): MoverDetailsEmailData {
  const profileUrl = `https://www.movetrusthub.com/companies/${company.slug}`;
  const website = company.website?.trim() || null;

  return {
    recipientName,
    companyName: company.name,
    profileUrl,
    reputationScore: company.reputationScore,
    overallRating: company.overallRating,
    reviewCount: company.reviewCount,
    headquarters: company.headquarters,
    foundedLabel: formatFoundedLabel(company.foundedYear),
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    shortDescription: company.shortDescription,
    fmcsaSafetyRating: company.fmcsaSafetyRating,
    avgPriceLabel: formatAvgPricePerMove(company.avgPricePerMove),
    website: website && /^https?:\/\//i.test(website) ? website : website ? `https://${website}` : null,
  };
}