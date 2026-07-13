import { LBS_PER_CU_FT } from '@/lib/moving-calculator/estimates';
import {
  buildTransactionalEmailFooter,
  buildTransactionalTextFooter,
} from '@/lib/emails/transactional-footer';

export type InventoryReportEmailData = {
  recipientName?: string | null;
  inventoryName: string;
  totalVolume: number;
  totalWeight: number;
  totalItems: number;
  truckSize: string;
  moveSizeLabel: string;
  movers: string;
  duration: string;
};

function firstName(name: string | null | undefined): string {
  if (!name?.trim()) return '';
  return name.trim().split(/\s+/)[0];
}

function statCard(label: string, value: string): string {
  return `
    <td width="50%" style="padding:0 6px 12px 6px;vertical-align:top;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
        <tr>
          <td style="padding:16px 18px;">
            <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">${label}</p>
            <p style="margin:0;font-size:16px;line-height:1.35;color:#0f172a;font-weight:700;">${value}</p>
          </td>
        </tr>
      </table>
    </td>`;
}

export function buildInventoryReportSubject(totalVolume: number): string {
  return `Your Moving Inventory – ${Math.round(totalVolume).toLocaleString()} cu ft`;
}

export function buildInventoryReportEmailHtml(data: InventoryReportEmailData): string {
  const greetingName = firstName(data.recipientName);
  const greeting = greetingName ? `Hi ${greetingName},` : 'Hi there,';
  const volume = `${Math.round(data.totalVolume).toLocaleString()} cu ft`;
  const weight = `${data.totalWeight.toLocaleString()} lbs`;
  const items = `${data.totalItems.toLocaleString()} items`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${buildInventoryReportSubject(data.totalVolume)}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your moving inventory summary is attached as a PDF. Share it with movers for accurate, comparable quotes.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

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
                            My Move
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
                  <td style="padding:36px 32px 12px 32px;">
                    <h1 style="margin:0 0 10px;font-size:26px;line-height:1.25;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">
                      ${greeting}
                    </h1>
                    <p style="margin:0;font-size:16px;line-height:1.6;color:#64748b;">
                      Your moving inventory <strong style="color:#0f172a;">${data.inventoryName}</strong> is ready.
                      A full itemized report is attached as a PDF.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 26px 8px 26px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${statCard('Total volume', volume)}
                        ${statCard('Est. weight', weight)}
                      </tr>
                      <tr>
                        ${statCard('Items', items)}
                        ${statCard('Truck size', data.truckSize)}
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:4px 32px 8px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#0369a1;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Move profile</p>
                          <p style="margin:0;font-size:14px;line-height:1.5;color:#0f172a;">
                            <strong>${data.moveSizeLabel}</strong> · ${data.movers} · ${data.duration}
                          </p>
                          <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#64748b;">
                            Weight estimated at ${LBS_PER_CU_FT} lbs per cu ft — industry average for household goods.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 32px 8px 32px;">
                    <h2 style="margin:0 0 14px;font-size:13px;line-height:1.4;color:#64748b;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
                      Recommended next steps
                    </h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">1.</strong> Open the attached PDF for your full room-by-room inventory.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">2.</strong> Share the same list with every mover so quotes are based on equal cubic footage.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 4px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">3.</strong> Manage saved inventories, movers, and comparisons anytime in My Move.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:12px 32px 28px 32px;">
                    <a href="https://www.movetrusthub.com/my-move" style="display:inline-block;background:#0077D4;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:12px;min-width:200px;text-align:center;">
                      Open My Move
                    </a>
                    <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:#64748b;">
                      Compare licensed movers at
                      <a href="https://www.movetrusthub.com/companies" style="color:#0077D4;text-decoration:none;font-weight:600;">movetrusthub.com/companies</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 28px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">
                            Disclaimer
                          </p>
                          <p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">
                            This inventory is an estimate for planning and quoting purposes only. Actual space and weight may vary based on packing style and item sizes. Move Trust Hub is an independent directory — we never sell your information and are not a lead broker.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 32px 32px;">
                    ${buildTransactionalEmailFooter('Manage email preferences in your <a href="https://www.movetrusthub.com/my-move" style="color:#0077D4;">My Move</a> dashboard.')}
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

export function buildInventoryReportEmailText(data: InventoryReportEmailData): string {
  const greetingName = firstName(data.recipientName);
  const greeting = greetingName ? `Hi ${greetingName},` : 'Hi there,';

  return [
    greeting,
    '',
    `Your moving inventory "${data.inventoryName}" is attached as a PDF.`,
    '',
    'SUMMARY',
    `Total volume: ${Math.round(data.totalVolume).toLocaleString()} cu ft`,
    `Est. weight: ${data.totalWeight.toLocaleString()} lbs`,
    `Items: ${data.totalItems.toLocaleString()}`,
    `Truck size: ${data.truckSize}`,
    `Move size: ${data.moveSizeLabel} · ${data.movers} · ${data.duration}`,
    '',
    'NEXT STEPS',
    '1. Open the attached PDF for your full room-by-room inventory.',
    '2. Share the same list with every mover for comparable quotes.',
    '3. Manage saved inventories in My Move: https://www.movetrusthub.com/my-move',
    '',
    'Compare licensed movers: https://www.movetrusthub.com/companies',
    '',
    'Disclaimer: This inventory is an estimate for planning and quoting only. Move Trust Hub is an independent directory — we never sell your information.',
    '',
    buildTransactionalTextFooter(),
  ].join('\n');
}