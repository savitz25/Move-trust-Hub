import { trustHubLogoUrl } from '@/lib/hub/config';
import {
  buildTransactionalEmailFooter,
  buildTransactionalTextFooter,
} from '@/lib/emails/transactional-footer';
import { SITE_URL } from '@/lib/seo/site-metadata';

export type ReviewApprovedEmailData = {
  reviewerName: string;
  companyName: string;
  rating: number;
  title: string | null;
  content: string;
  /** Public URL where the review is live */
  profileUrl: string;
  reviewId?: string;
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

/** ★★★★☆ style string for 1–5 ratings */
export function starRatingText(rating: number): string {
  const n = Math.min(5, Math.max(0, Math.round(rating)));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

export function buildReviewApprovedSubject(companyName: string): string {
  return `Your review of ${companyName} is live on Move Trust Hub`;
}

export function buildReviewApprovedEmailHtml(data: ReviewApprovedEmailData): string {
  const greeting = firstName(data.reviewerName);
  const hi = greeting ? `Hi ${escapeHtml(greeting)},` : 'Hi there,';
  const stars = starRatingText(data.rating);
  const title = data.title?.trim()
    ? `<p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0f172a;line-height:1.35;">${escapeHtml(data.title.trim())}</p>`
    : '';
  const contentHtml = escapeHtml(data.content)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#334155;">${p}</p>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(buildReviewApprovedSubject(data.companyName))}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your review of ${escapeHtml(data.companyName)} was approved and is now live on Move Trust Hub.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#003366 0%,#0077D4 55%,#00A3E0 100%);border-radius:20px 20px 0 0;">
                <tr>
                  <td style="padding:28px 32px 24px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img src="${trustHubLogoUrl(SITE_URL)}" alt="Move Trust Hub" width="200" style="display:block;border:0;max-width:200px;height:auto;background:transparent;" />
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <span style="display:inline-block;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.24);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:8px 12px;border-radius:999px;">
                            Review approved
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:0 0 20px 20px;box-shadow:0 18px 50px rgba(15,23,42,0.08);">
                <tr>
                  <td style="padding:32px 32px 8px 32px;">
                    <h1 style="margin:0 0 10px;font-size:24px;line-height:1.25;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">
                      ${hi}
                    </h1>
                    <p style="margin:0;font-size:16px;line-height:1.6;color:#64748b;">
                      Great news — your review of
                      <strong style="color:#0f172a;">${escapeHtml(data.companyName)}</strong>
                      has been approved and is now live on Move Trust Hub.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 32px 8px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#047857;letter-spacing:0.08em;text-transform:uppercase;">
                            Why this matters
                          </p>
                          <p style="margin:0;font-size:13px;line-height:1.55;color:#065f46;">
                            Every community review is moderated by our team. Move Trust Hub is an
                            <strong>independent directory</strong> — no paid placements, no lead resellers,
                            and we never sell your information.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 32px 8px 32px;">
                    <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#64748b;letter-spacing:0.08em;text-transform:uppercase;">
                      Your review
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                      <tr>
                        <td style="padding:18px 20px;">
                          <p style="margin:0 0 4px;font-size:12px;color:#64748b;">
                            About <strong style="color:#0f172a;">${escapeHtml(data.companyName)}</strong>
                          </p>
                          <p style="margin:0 0 12px;font-size:18px;line-height:1.2;color:#f59e0b;letter-spacing:0.04em;" aria-label="${data.rating} out of 5 stars">
                            ${stars}
                            <span style="font-size:13px;font-weight:600;color:#0f172a;letter-spacing:0;margin-left:6px;">${data.rating}/5</span>
                          </p>
                          ${title}
                          ${contentHtml || `<p style="margin:0;font-size:14px;color:#64748b;">(No written comments)</p>`}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:20px 32px 12px 32px;">
                    <a href="${escapeHtml(data.profileUrl)}" style="display:inline-block;background:#0077D4;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:12px;min-width:200px;text-align:center;">
                      View your review live
                    </a>
                    <p style="margin:12px 0 0;font-size:12px;line-height:1.5;color:#94a3b8;word-break:break-all;">
                      ${escapeHtml(data.profileUrl)}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 32px 8px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;">
                            Planning a move?
                          </p>
                          <p style="margin:0 0 12px;font-size:13px;line-height:1.55;color:#334155;">
                            Create a free My Move account to save inventories, shortlist movers, and email yourself a move report — still no lead fees.
                          </p>
                          <a href="${SITE_URL}/my-move" style="color:#0077D4;font-size:13px;font-weight:700;text-decoration:none;">
                            Open My Move →
                          </a>
                          <span style="color:#94a3b8;font-size:13px;"> · </span>
                          <a href="${SITE_URL}/companies" style="color:#0077D4;font-size:13px;font-weight:700;text-decoration:none;">
                            Browse movers
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 32px 28px 32px;">
                    ${buildTransactionalEmailFooter(
                      'You received this because you submitted a review on Move Trust Hub. We only email about your review status.'
                    )}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildReviewApprovedEmailText(data: ReviewApprovedEmailData): string {
  const greeting = firstName(data.reviewerName);
  const hi = greeting ? `Hi ${greeting},` : 'Hi there,';
  const lines = [
    hi,
    '',
    `Great news — your review of ${data.companyName} has been approved and is now live on Move Trust Hub.`,
    '',
    'WHY THIS MATTERS',
    'Every community review is moderated by our team. Move Trust Hub is an independent directory — no paid placements, no lead resellers, and we never sell your information.',
    '',
    'YOUR REVIEW',
    `Company: ${data.companyName}`,
    `Rating: ${starRatingText(data.rating)} (${data.rating}/5)`,
    data.title?.trim() ? `Headline: ${data.title.trim()}` : null,
    '',
    data.content.trim(),
    '',
    `View your review: ${data.profileUrl}`,
    '',
    'PLANNING A MOVE?',
    `Create a free My Move account: ${SITE_URL}/my-move`,
    `Browse movers: ${SITE_URL}/companies`,
    '',
    buildTransactionalTextFooter(),
  ];
  return lines.filter((l) => l !== null).join('\n');
}
