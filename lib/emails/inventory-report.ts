import { trustHubLogoUrl } from '@/lib/hub/config';
import {
  formatItemDisplayName,
  formatQuantityFirstItem,
} from '@/lib/moving-calculator/display-names';
import { LBS_PER_CU_FT } from '@/lib/moving-calculator/estimates';
import {
  buildTransactionalEmailFooter,
  buildTransactionalTextFooter,
} from '@/lib/emails/transactional-footer';
import {
  normalizeWebsiteHref,
  telHref,
  type ShortlistMoverCard,
} from '@/lib/my-move-plan/shortlist-mover-card';
import type { InventoryItem } from '@/store/calculator-store';

/** @deprecated Prefer ShortlistMoverCard — kept as alias for call sites. */
export type ShortlistMoverEmailCard = ShortlistMoverCard;
export type { ShortlistMoverCard };

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
  groupedByRoom: [string, InventoryItem[]][];
  pdfAttached: boolean;
  /** Optional My Move Plan context */
  routeFrom?: string | null;
  routeTo?: string | null;
  drivingMiles?: number | null;
  shortlistNames?: string[];
  shortlistMovers?: ShortlistMoverCard[];
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

function statCard(label: string, value: string): string {
  return `
    <td width="50%" style="padding:0 6px 12px 6px;vertical-align:top;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
        <tr>
          <td style="padding:16px 18px;">
            <p style="margin:0 0 4px;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">${label}</p>
            <p style="margin:0;font-size:16px;line-height:1.35;color:#0f172a;font-weight:700;">${escapeHtml(value)}</p>
          </td>
        </tr>
      </table>
    </td>`;
}

/**
 * Quantity-first inventory rows (professional moving-software style).
 * Single-column table for reliable desktop + mobile email clients.
 * Format: "10 × Medium Moving Box" … line cu ft right-aligned.
 */
function buildQuantityFirstItemRowsHtml(items: InventoryItem[]): string {
  return items
    .map((item, index) => {
      const qty =
        Number.isFinite(item.quantity) && item.quantity > 0
          ? Math.round(item.quantity)
          : 1;
      const name = escapeHtml(formatItemDisplayName(item.name));
      const lineVol = Math.round(
        (Number.isFinite(item.volume) ? item.volume : 0) * qty
      );
      const border =
        index < items.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : '';
      return `
        <tr>
          <td width="44" valign="top" style="padding:7px 8px 7px 0;${border}vertical-align:top;white-space:nowrap;">
            <span style="font-size:13px;line-height:1.4;font-weight:700;color:#0f172a;font-variant-numeric:tabular-nums;">${qty}&nbsp;×</span>
          </td>
          <td valign="top" style="padding:7px 8px 7px 0;${border}vertical-align:top;">
            <span style="font-size:13px;line-height:1.4;color:#0f172a;">${name}</span>
          </td>
          <td width="72" align="right" valign="top" style="padding:7px 0;${border}vertical-align:top;white-space:nowrap;">
            <span style="font-size:12px;line-height:1.4;color:#64748b;font-variant-numeric:tabular-nums;">${lineVol.toLocaleString()}&nbsp;cu&nbsp;ft</span>
          </td>
        </tr>`;
    })
    .join('');
}

function buildInventoryListHtml(groupedByRoom: [string, InventoryItem[]][]): string {
  if (groupedByRoom.length === 0) return '';

  const grandVolume = groupedByRoom.reduce(
    (sum, [, items]) =>
      sum + items.reduce((s, i) => s + i.volume * i.quantity, 0),
    0
  );
  const grandLines = groupedByRoom.reduce((sum, [, items]) => sum + items.length, 0);
  const grandPieces = groupedByRoom.reduce(
    (sum, [, items]) =>
      sum + items.reduce((s, i) => s + (Number.isFinite(i.quantity) ? i.quantity : 0), 0),
    0
  );

  const rooms = groupedByRoom
    .map(([room, items]) => {
      const roomTotal = items.reduce((s, i) => s + i.volume * i.quantity, 0);
      const pieceCount = items.reduce(
        (s, i) => s + (Number.isFinite(i.quantity) ? i.quantity : 0),
        0
      );
      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px 0;">
          <tr>
            <td style="padding:0 0 6px 0;border-bottom:2px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="bottom" style="vertical-align:bottom;">
                    <p style="margin:0;font-size:12px;font-weight:700;color:#0077D4;text-transform:uppercase;letter-spacing:0.06em;">
                      ${escapeHtml(room)}
                    </p>
                  </td>
                  <td align="right" valign="bottom" style="vertical-align:bottom;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#64748b;font-variant-numeric:tabular-nums;">
                      ${Math.round(roomTotal).toLocaleString()} cu ft
                      <span style="font-weight:500;color:#94a3b8;"> · ${Math.round(pieceCount)} pcs</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:2px 0 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${buildQuantityFirstItemRowsHtml(items)}
              </table>
            </td>
          </tr>
        </table>`;
    })
    .join('');

  return `
    <tr>
      <td style="padding:8px 32px 16px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 10px 0;">
          <tr>
            <td valign="bottom" style="vertical-align:bottom;">
              <h2 style="margin:0;font-size:13px;line-height:1.4;color:#64748b;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
                Inventory
              </h2>
            </td>
            <td align="right" valign="bottom" style="vertical-align:bottom;">
              <p style="margin:0;font-size:12px;line-height:1.4;color:#64748b;font-variant-numeric:tabular-nums;">
                <strong style="color:#0f172a;">${Math.round(grandVolume).toLocaleString()} cu ft</strong>
                · ${Math.round(grandPieces).toLocaleString()} pcs
                · ${grandLines} lines
              </p>
            </td>
          </tr>
        </table>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:14px 16px 4px 16px;">
          ${rooms}
        </div>
      </td>
    </tr>`;
}

function moverDetailRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td width="92" valign="top" style="padding:4px 10px 4px 0;vertical-align:top;font-size:11px;line-height:1.4;color:#64748b;font-weight:600;white-space:nowrap;">
        ${escapeHtml(label)}
      </td>
      <td valign="top" style="padding:4px 0;vertical-align:top;font-size:13px;line-height:1.45;color:#0f172a;">
        ${valueHtml}
      </td>
    </tr>`;
}

function buildShortlistMoverCardsHtml(movers: ShortlistMoverCard[]): string {
  if (!movers.length) return '';

  const cards = movers
    .map((m, idx) => {
      const detailRows: string[] = [];

      // Contact — clickable phone / email first
      if (m.phone != null && String(m.phone).trim()) {
        const phone = String(m.phone).trim();
        detailRows.push(
          moverDetailRow(
            'Phone',
            `<a href="tel:${escapeHtml(telHref(phone))}" style="color:#0077D4;text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a>`
          )
        );
      }
      if (m.email != null && String(m.email).trim()) {
        const email = String(m.email).trim();
        detailRows.push(
          moverDetailRow(
            'Email',
            `<a href="mailto:${escapeHtml(email)}" style="color:#0077D4;text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>`
          )
        );
      }
      if (m.website != null && String(m.website).trim()) {
        const website = String(m.website).trim();
        const href = normalizeWebsiteHref(website);
        detailRows.push(
          moverDetailRow(
            'Website',
            `<a href="${escapeHtml(href)}" style="color:#0077D4;text-decoration:none;font-weight:600;">${escapeHtml(website.replace(/^https?:\/\//i, ''))}</a>`
          )
        );
      }
      if (m.address != null && String(m.address).trim()) {
        detailRows.push(
          moverDetailRow('Address', escapeHtml(String(m.address).trim()))
        );
      }

      // Licensing snapshot
      if (m.entityType) {
        detailRows.push(moverDetailRow('Type', escapeHtml(m.entityType)));
      }
      if (m.usdotNumber) {
        detailRows.push(
          moverDetailRow('USDOT', `<strong>${escapeHtml(m.usdotNumber)}</strong>`)
        );
      }
      if (m.mcNumber) {
        detailRows.push(moverDetailRow('MC', escapeHtml(m.mcNumber)));
      }
      if (m.powerUnits != null && m.powerUnits > 0) {
        detailRows.push(
          moverDetailRow(
            'Power units',
            `${m.powerUnits.toLocaleString()}`
          )
        );
      }
      if (m.authorityLabel) {
        detailRows.push(moverDetailRow('Authority', escapeHtml(m.authorityLabel)));
      }

      // Trust signals
      const trustParts: string[] = [];
      if (m.googleRating != null && m.googleRating > 0) {
        trustParts.push(
          `Google ${m.googleRating.toFixed(1)}★${
            m.googleReviewCount ? ` (${m.googleReviewCount.toLocaleString()})` : ''
          }`
        );
      }
      if (m.overallRating != null && m.overallRating > 0) {
        trustParts.push(
          `Hub ${m.overallRating.toFixed(1)}★${
            m.reviewCount ? ` (${m.reviewCount.toLocaleString()})` : ''
          }`
        );
      }
      if (m.reputationScore != null && m.reputationScore > 0) {
        trustParts.push(`Reputation ${m.reputationScore}/100`);
      }
      if (m.fmcsaSafetyRating) {
        trustParts.push(`FMCSA ${m.fmcsaSafetyRating}`);
      }
      if (trustParts.length) {
        detailRows.push(moverDetailRow('Trust', escapeHtml(trustParts.join(' · '))));
      }

      const missingContact =
        !m.phone && !m.email
          ? `<p style="margin:8px 0 0;font-size:12px;line-height:1.45;color:#64748b;">Phone/email not on file — open the profile or website to contact this mover.</p>`
          : '';

      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px 0;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;">
          <tr>
            <td style="padding:16px 18px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#0077D4;letter-spacing:0.06em;text-transform:uppercase;">
                Shortlisted mover ${idx + 1} of ${movers.length}
              </p>
              <p style="margin:0 0 10px;font-size:17px;font-weight:800;color:#0f172a;line-height:1.3;">
                ${escapeHtml(m.name)}
              </p>
              ${
                detailRows.length
                  ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px 0;">
                      ${detailRows.join('')}
                    </table>`
                  : ''
              }
              ${missingContact}
              <a href="${escapeHtml(m.profileUrl)}" style="display:inline-block;background:#f8fafc;border:1px solid #e2e8f0;color:#0369a1;font-size:12px;font-weight:600;text-decoration:none;padding:8px 12px;border-radius:8px;">
                View full profile →
              </a>
            </td>
          </tr>
        </table>`;
    })
    .join('');

  return `
    <tr>
      <td style="padding:4px 32px 8px 32px;">
        <h2 style="margin:0 0 6px;font-size:13px;line-height:1.4;color:#64748b;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
          Your shortlisted movers
        </h2>
        <p style="margin:0 0 14px;font-size:13px;line-height:1.5;color:#64748b;">
          Contact details and licensing for each mover — call or email from this report. Share the same inventory for comparable estimates.
        </p>
        ${cards}
      </td>
    </tr>`;
}

function buildInventoryListText(groupedByRoom: [string, InventoryItem[]][]): string[] {
  if (groupedByRoom.length === 0) return [];

  const grandVolume = groupedByRoom.reduce(
    (sum, [, items]) =>
      sum + items.reduce((s, i) => s + i.volume * i.quantity, 0),
    0
  );
  const lines = [
    'INVENTORY',
    `Total: ${Math.round(grandVolume).toLocaleString()} cu ft`,
  ];
  for (const [room, items] of groupedByRoom) {
    const roomTotal = items.reduce((s, i) => s + i.volume * i.quantity, 0);
    const pieceCount = items.reduce(
      (s, i) => s + (Number.isFinite(i.quantity) ? i.quantity : 0),
      0
    );
    lines.push(
      '',
      `${room} — ${Math.round(roomTotal).toLocaleString()} cu ft · ${Math.round(pieceCount)} pcs`
    );
    for (const item of items) {
      const qty =
        Number.isFinite(item.quantity) && item.quantity > 0
          ? Math.round(item.quantity)
          : 1;
      const lineVol = Math.round(
        (Number.isFinite(item.volume) ? item.volume : 0) * qty
      );
      lines.push(
        `  ${formatQuantityFirstItem(item.name, qty)}  (${lineVol.toLocaleString()} cu ft)`
      );
    }
  }
  return lines;
}

export function buildInventoryReportSubject(
  totalVolume: number,
  opts?: { isMovePlan?: boolean }
): string {
  if (opts?.isMovePlan) {
    return `Your Move Report – ${Math.round(totalVolume).toLocaleString()} cu ft`;
  }
  return `Your Moving Inventory – ${Math.round(totalVolume).toLocaleString()} cu ft`;
}

export function buildInventoryReportEmailHtml(data: InventoryReportEmailData): string {
  const greetingName = firstName(data.recipientName);
  const greeting = greetingName ? `Hi ${greetingName},` : 'Hi there,';
  const totalVolume = Number.isFinite(data.totalVolume) ? data.totalVolume : 0;
  const totalWeight = Number.isFinite(data.totalWeight) ? data.totalWeight : 0;
  const totalItems = Number.isFinite(data.totalItems) ? data.totalItems : 0;
  const volume = `${Math.round(totalVolume).toLocaleString()} cu ft`;
  const weight = `${totalWeight.toLocaleString()} lbs`;
  const items = `${totalItems.toLocaleString()} items`;
  const attachmentNote = data.pdfAttached
    ? 'A printable PDF report is attached to this email.'
    : 'View or download a PDF anytime from your My Move dashboard.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(buildInventoryReportSubject(totalVolume))}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Your moving inventory summary — ${volume}, ${items}. Share with movers for accurate quotes.
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
                          <img src="${trustHubLogoUrl()}" alt="Move Trust Hub" width="200" style="display:block;border:0;max-width:200px;height:auto;background:transparent;" />
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
                      ${escapeHtml(greeting)}
                    </h1>
                    <p style="margin:0;font-size:16px;line-height:1.6;color:#64748b;">
                      Your move report <strong style="color:#0f172a;">${escapeHtml(data.inventoryName)}</strong> is ready.
                      ${escapeHtml(attachmentNote)}
                    </p>
                  </td>
                </tr>

                ${
                  data.routeFrom || (data.shortlistNames && data.shortlistNames.length > 0)
                    ? `<tr>
                  <td style="padding:8px 32px 4px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:14px;">
                      <tr>
                        <td style="padding:16px 18px;">
                          <p style="margin:0 0 6px;font-size:11px;line-height:1.4;color:#047857;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Your plan</p>
                          ${
                            data.routeFrom
                              ? `<p style="margin:0 0 6px;font-size:14px;line-height:1.5;color:#0f172a;"><strong>Route:</strong> ${escapeHtml(data.routeFrom)}${data.routeTo ? ` → ${escapeHtml(data.routeTo)}` : ''}${data.drivingMiles ? ` · ~${data.drivingMiles.toLocaleString()} mi` : ''}</p>`
                              : ''
                          }
                          ${
                            data.shortlistNames && data.shortlistNames.length > 0
                              ? `<p style="margin:0;font-size:14px;line-height:1.5;color:#0f172a;"><strong>Shortlist:</strong> ${escapeHtml(data.shortlistNames.join(', '))}</p>
                          <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#64748b;">Send this same inventory to each mover for fair, comparable estimates.</p>`
                              : ''
                          }
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
                    : ''
                }

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
                            <strong>${escapeHtml(data.moveSizeLabel)}</strong> · ${escapeHtml(data.movers)} · ${escapeHtml(data.duration)}
                          </p>
                          <p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#64748b;">
                            Weight estimated at ${LBS_PER_CU_FT} lbs per cu ft — industry average for household goods.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${buildShortlistMoverCardsHtml(data.shortlistMovers ?? [])}

                ${buildInventoryListHtml(data.groupedByRoom)}

                <tr>
                  <td style="padding:16px 32px 8px 32px;">
                    <h2 style="margin:0 0 14px;font-size:13px;line-height:1.4;color:#64748b;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">
                      Recommended next steps
                    </h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">1.</strong> ${data.pdfAttached ? 'Open the attached PDF for a printable copy.' : 'Download the PDF from My Move for a printable copy.'}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">2.</strong> Share this same inventory with every mover for comparable quotes.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 4px 0;">
                          <p style="margin:0;font-size:15px;line-height:1.55;color:#334155;">
                            <strong style="color:#0f172a;">3.</strong> Manage saved inventories, movers, and comparisons in My Move.
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

function buildShortlistMoverCardsText(movers: ShortlistMoverCard[]): string[] {
  if (!movers.length) return [];
  const lines = ['SHORTLISTED MOVERS'];
  movers.forEach((m, i) => {
    lines.push('');
    lines.push(`${i + 1}. ${m.name}`);
    if (m.phone) lines.push(`   Phone: ${m.phone}`);
    if (m.email) lines.push(`   Email: ${m.email}`);
    if (m.website) lines.push(`   Website: ${m.website}`);
    if (m.address) lines.push(`   Address: ${m.address}`);
    if (m.entityType) lines.push(`   Type: ${m.entityType}`);
    if (m.usdotNumber) lines.push(`   USDOT: ${m.usdotNumber}`);
    if (m.mcNumber) lines.push(`   MC: ${m.mcNumber}`);
    if (m.powerUnits) lines.push(`   Power units: ${m.powerUnits}`);
    if (m.authorityLabel) lines.push(`   Authority: ${m.authorityLabel}`);
    if (m.googleRating)
      lines.push(
        `   Google: ${m.googleRating.toFixed(1)}★${m.googleReviewCount ? ` (${m.googleReviewCount})` : ''}`
      );
    if (m.overallRating)
      lines.push(
        `   Hub rating: ${m.overallRating.toFixed(1)}★${m.reviewCount ? ` (${m.reviewCount})` : ''}`
      );
    if (m.reputationScore) lines.push(`   Reputation score: ${m.reputationScore}/100`);
    if (m.fmcsaSafetyRating) lines.push(`   FMCSA safety: ${m.fmcsaSafetyRating}`);
    lines.push(`   Profile: ${m.profileUrl}`);
  });
  return lines;
}

export function buildInventoryReportEmailText(data: InventoryReportEmailData): string {
  const greetingName = firstName(data.recipientName);
  const greeting = greetingName ? `Hi ${greetingName},` : 'Hi there,';
  const attachmentNote = data.pdfAttached
    ? 'A printable PDF report is attached.'
    : 'Download a PDF anytime from My Move: https://www.movetrusthub.com/my-move';

  return [
    greeting,
    '',
    `Your move report "${data.inventoryName}" is ready.`,
    attachmentNote,
    '',
    'SUMMARY',
    data.routeFrom
      ? `Route: ${data.routeFrom}${data.routeTo ? ` → ${data.routeTo}` : ''}${data.drivingMiles ? ` · ~${data.drivingMiles} mi` : ''}`
      : null,
    `Total volume: ${Math.round(data.totalVolume).toLocaleString()} cu ft`,
    `Est. weight: ${data.totalWeight.toLocaleString()} lbs`,
    `Items: ${data.totalItems.toLocaleString()}`,
    `Truck size: ${data.truckSize}`,
    `Move size: ${data.moveSizeLabel} · ${data.movers} · ${data.duration}`,
    '',
    ...buildShortlistMoverCardsText(data.shortlistMovers ?? []),
    '',
    ...buildInventoryListText(data.groupedByRoom),
    '',
    'NEXT STEPS',
    data.pdfAttached
      ? '1. Open the attached PDF for a printable copy.'
      : '1. Download the PDF from My Move.',
    '2. Contact each shortlisted mover with this same report for comparable quotes.',
    '3. Manage plans in My Move Reports: https://www.movetrusthub.com/my-move/reports',
    '',
    'Compare licensed movers: https://www.movetrusthub.com/companies',
    '',
    'Disclaimer: This inventory is an estimate for planning and quoting only. Move Trust Hub is an independent directory — we never sell your information.',
    '',
    buildTransactionalTextFooter(),
  ]
    .filter((line) => line !== null)
    .join('\n');
}