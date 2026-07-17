/**
 * Shared Move Trust Hub branding for Supabase Auth email HTML.
 * Go-template variables (e.g. {{ .ConfirmationURL }}) must stay unescaped for Supabase.
 */

export const BRAND = {
  name: 'Move Trust Hub',
  supportName: 'MoveTrustHub Support',
  siteUrl: 'https://www.movetrusthub.com',
  logoUrl: 'https://www.movetrusthub.com/logo.png?v=20260713',
  supportEmail: 'info@movetrusthub.com',
  primary: '#0A2540',
  accent: '#00BFA5',
  muted: '#64748b',
  border: '#e2e8f0',
  bg: '#f4f8fb',
} as const;

type LayoutOptions = {
  /** Main heading inside the card */
  title: string;
  /** HTML body (may include {{ .ConfirmationURL }} etc.) */
  bodyHtml: string;
  /** Primary CTA label; omit for code-only emails */
  ctaLabel?: string;
  /** Href for CTA — usually {{ .ConfirmationURL }} */
  ctaHref?: string;
  /** Extra note under the CTA */
  footerNote?: string;
};

/**
 * Build a single-column transactional email shell.
 * Keep styles inline for Gmail/Outlook compatibility.
 */
export function buildAuthEmailHtml(options: LayoutOptions): string {
  const { title, bodyHtml, ctaLabel, ctaHref, footerNote } = options;

  const ctaBlock =
    ctaLabel && ctaHref
      ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
        <tr>
          <td style="border-radius:8px;background:${BRAND.primary};">
            <a href="${ctaHref}" target="_blank" rel="noopener noreferrer"
              style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
              ${ctaLabel}
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:12px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};">
        If the button doesn’t work, copy and paste this link into your browser:<br />
        <a href="${ctaHref}" style="color:${BRAND.primary};word-break:break-all;">${ctaHref}</a>
      </p>`
      : '';

  const note = footerNote
    ? `<p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.55;color:${BRAND.muted};">${footerNote}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — ${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:0 0 20px;">
              <a href="${BRAND.siteUrl}" target="_blank" rel="noopener noreferrer">
                <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="192" height="52"
                  style="display:block;width:192px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid ${BRAND.border};border-radius:12px;padding:32px 28px;">
              <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.accent};">
                ${BRAND.name}
              </p>
              <h1 style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:22px;line-height:1.25;font-weight:600;color:${BRAND.primary};">
                ${title}
              </h1>
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#334155;">
                ${bodyHtml}
              </div>
              ${ctaBlock}
              ${note}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 8px 0;text-align:center;">
              <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};">
                Independent directory for researching trusted interstate movers.<br />
                No lead fees. No paid placements.
              </p>
              <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;color:${BRAND.muted};">
                <a href="${BRAND.siteUrl}" style="color:${BRAND.primary};text-decoration:none;">movetrusthub.com</a>
                ·
                <a href="${BRAND.siteUrl}/for-movers" style="color:${BRAND.primary};text-decoration:none;">For movers</a>
                ·
                <a href="${BRAND.siteUrl}/my-move" style="color:${BRAND.primary};text-decoration:none;">My Move</a>
                ·
                <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.supportEmail}</a>
              </p>
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;color:#94a3b8;">
                You’re receiving this because of an account action on ${BRAND.name}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
