export type QuoteConfirmationData = {
  name?: string | null;
  fromZip?: string | null;
  toZip?: string | null;
  moveDate?: string | null;
  homeSizeLabel: string;
  estimatedVolume?: number | null;
};

function formatMoveDate(date: string | null | undefined): string {
  if (!date?.trim()) return 'Flexible';
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function firstName(name: string | null | undefined): string {
  if (!name?.trim()) return '';
  return name.trim().split(/\s+/)[0];
}

export function buildQuoteConfirmationEmail(
  data: QuoteConfirmationData
): string {
  const greetingName = firstName(data.name);
  const greeting = greetingName
    ? `You're all set, ${greetingName}`
    : "You're all set";
  const fromZip = data.fromZip || '—';
  const toZip = data.toZip || '—';
  const moveDate = formatMoveDate(data.moveDate);
  const homeSize = data.homeSizeLabel;
  const volumeRow = data.estimatedVolume
    ? `
        <tr>
          <td style="padding:0 6px 12px 6px;width:50%;vertical-align:top;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Est. Volume</p>
                  <p style="margin:0;font-size:16px;line-height:1.4;color:#0f172a;font-weight:700;">${data.estimatedVolume.toLocaleString()} cu ft</p>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding:0 6px 12px 6px;width:50%;vertical-align:top;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Home Size</p>
                  <p style="margin:0;font-size:16px;line-height:1.4;color:#0f172a;font-weight:700;">${homeSize}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    : `
        <tr>
          <td colspan="2" style="padding:0 6px 12px 6px;vertical-align:top;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Home Size</p>
                  <p style="margin:0;font-size:16px;line-height:1.4;color:#0f172a;font-weight:700;">${homeSize}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Quote request received — Move Trust Hub</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your move quote request is confirmed. We're matching you with licensed movers within 24 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#003366 0%,#0077D4 55%,#00A3E0 100%);border-radius:20px 20px 0 0;">
                <tr>
                  <td style="padding:28px 32px 24px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img src="https://www.movetrusthub.com/logo.png" alt="Move Trust Hub" width="140" style="display:block;border:0;max-width:140px;height:auto;" />
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <span style="display:inline-block;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.24);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:8px 12px;border-radius:999px;">
                            Request Confirmed
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:0 0 20px 20px;box-shadow:0 18px 50px rgba(15,23,42,0.08);">
                <tr>
                  <td style="padding:36px 32px 12px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom:18px;">
                          <div style="width:56px;height:56px;line-height:56px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:50%;text-align:center;font-size:26px;color:#ffffff;">
                            &#10003;
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <h1 style="margin:0 0 10px;font-size:28px;line-height:1.2;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">
                            ${greeting}
                          </h1>
                          <p style="margin:0;font-size:16px;line-height:1.6;color:#64748b;max-width:440px;">
                            Thanks for choosing Move Trust Hub. Your request is in — we're already working on matching you with top-rated, licensed interstate movers.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Route card -->
                <tr>
                  <td style="padding:8px 32px 24px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#f8fbff 0%,#f1f5f9 100%);border:1px solid #dbeafe;border-radius:18px;">
                      <tr>
                        <td style="padding:22px 24px;">
                          <p style="margin:0 0 14px;font-size:11px;line-height:1.4;color:#0077D4;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-align:center;">
                            Your Move
                          </p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="42%" align="center" style="vertical-align:middle;">
                                <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">From</p>
                                <p style="margin:0;font-size:30px;line-height:1.1;font-weight:800;color:#003366;letter-spacing:-0.03em;">${fromZip}</p>
                              </td>
                              <td width="16%" align="center" style="vertical-align:middle;">
                                <div style="width:42px;height:42px;line-height:42px;margin:0 auto;background:#0077D4;border-radius:50%;color:#ffffff;font-size:18px;font-weight:700;text-align:center;">
                                  &rarr;
                                </div>
                              </td>
                              <td width="42%" align="center" style="vertical-align:middle;">
                                <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">To</p>
                                <p style="margin:0;font-size:30px;line-height:1.1;font-weight:800;color:#003366;letter-spacing:-0.03em;">${toZip}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Details grid -->
                <tr>
                  <td style="padding:0 26px 8px 26px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td colspan="2" style="padding:0 6px 12px 6px;vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                            <tr>
                              <td style="padding:16px 18px;">
                                <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Preferred Date</p>
                                <p style="margin:0;font-size:16px;line-height:1.4;color:#0f172a;font-weight:700;">${moveDate}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${volumeRow}
                    </table>
                  </td>
                </tr>

                <!-- What happens next -->
                <tr>
                  <td style="padding:12px 32px 8px 32px;">
                    <h2 style="margin:0 0 16px;font-size:13px;line-height:1.4;color:#64748b;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
                      What happens next
                    </h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 14px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="36" style="vertical-align:top;">
                                <div style="width:28px;height:28px;line-height:28px;background:#e0f2fe;color:#0077D4;border-radius:50%;text-align:center;font-size:13px;font-weight:800;">1</div>
                              </td>
                              <td style="vertical-align:top;padding-left:10px;">
                                <p style="margin:0 0 2px;font-size:15px;line-height:1.4;color:#0f172a;font-weight:700;">We review your move details</p>
                                <p style="margin:0;font-size:14px;line-height:1.5;color:#64748b;">Our team vets your request against licensed, interstate carriers.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 14px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="36" style="vertical-align:top;">
                                <div style="width:28px;height:28px;line-height:28px;background:#e0f2fe;color:#0077D4;border-radius:50%;text-align:center;font-size:13px;font-weight:800;">2</div>
                              </td>
                              <td style="vertical-align:top;padding-left:10px;">
                                <p style="margin:0 0 2px;font-size:15px;line-height:1.4;color:#0f172a;font-weight:700;">2–3 movers reach out within 24 hours</p>
                                <p style="margin:0;font-size:14px;line-height:1.5;color:#64748b;">Highly-rated companies contact you directly with custom quotes.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 6px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="36" style="vertical-align:top;">
                                <div style="width:28px;height:28px;line-height:28px;background:#e0f2fe;color:#0077D4;border-radius:50%;text-align:center;font-size:13px;font-weight:800;">3</div>
                              </td>
                              <td style="vertical-align:top;padding-left:10px;">
                                <p style="margin:0 0 2px;font-size:15px;line-height:1.4;color:#0f172a;font-weight:700;">You compare and choose with confidence</p>
                                <p style="margin:0;font-size:14px;line-height:1.5;color:#64748b;">No obligation — pick the mover that fits your timeline and budget.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Trust strip -->
                <tr>
                  <td style="padding:8px 32px 24px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;text-align:center;">
                          <p style="margin:0 0 10px;font-size:12px;line-height:1.5;color:#64748b;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">
                            Why customers trust us
                          </p>
                          <p style="margin:0;font-size:13px;line-height:1.8;color:#334155;">
                            <span style="display:inline-block;margin:0 8px;">&#10003; FMCSA Verified</span>
                            <span style="display:inline-block;margin:0 8px;">&#10003; Licensed Interstate Movers</span>
                            <span style="display:inline-block;margin:0 8px;">&#10003; 52k+ Verified Reviews</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding:4px 32px 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-radius:12px;background:linear-gradient(135deg,#0077D4 0%,#003366 100%);">
                          <a href="https://www.movetrusthub.com" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">
                            Explore Move Trust Hub
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:#64748b;">
                      Questions? Just <strong style="color:#0f172a;">reply to this email</strong> — we're here to help.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 12px 8px 12px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#94a3b8;font-weight:600;">
                Move Trust Hub
              </p>
              <p style="margin:0 0 10px;font-size:12px;line-height:1.6;color:#94a3b8;">
                Connecting you with trusted, licensed interstate movers.
              </p>
              <p style="margin:0;font-size:11px;line-height:1.6;color:#cbd5e1;">
                This is an automated confirmation of your quote request.<br>
                <a href="https://www.movetrusthub.com" style="color:#0077D4;text-decoration:none;">movetrusthub.com</a>
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