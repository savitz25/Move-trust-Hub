/** CAN-SPAM / transactional email footer — required on all Save My Move emails */
export const TRANSACTIONAL_PHYSICAL_ADDRESS =
  'Move Trust Hub · AmeriSafe Moving & Storage · Licensed interstate carrier research directory';

export function buildTransactionalEmailFooter(unsubscribeNote?: string): string {
  const unsub = unsubscribeNote ?? 'Manage email preferences in your My Move dashboard.';
  return `
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:12px;color:#6b7280;line-height:1.5;margin:0;">
      You received this because you requested it — we never sell your information.<br />
      ${TRANSACTIONAL_PHYSICAL_ADDRESS}<br />
      ${unsub}<br />
      <a href="https://www.movetrusthub.com/privacy-policy" style="color:#0077D4;">Privacy Policy</a>
    </p>
  `;
}

export function buildTransactionalTextFooter(): string {
  return [
    '---',
    'You received this because you requested it — we never sell your information.',
    TRANSACTIONAL_PHYSICAL_ADDRESS,
    'Privacy: https://www.movetrusthub.com/privacy-policy',
  ].join('\n');
}