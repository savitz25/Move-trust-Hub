import type { ConfirmedPlace } from '@/components/location/location-place-input';
import type { HomeRouteMover } from '@/lib/home/resolve-route-from-zip';
import type { PlanInventoryItem } from '@/lib/my-move-plan/types';

export function inventoryTotals(inventory: PlanInventoryItem[]) {
  const totalVolume = Math.round(
    inventory.reduce((s, i) => s + i.volume * i.quantity, 0)
  );
  const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);
  return { totalVolume, totalItems };
}

export function buildOutreachEmail(opts: {
  from: ConfirmedPlace | null;
  to: ConfirmedPlace | null;
  drivingMiles: number | null;
  inventory: PlanInventoryItem[];
  estimatedWeight: number;
  mover: HomeRouteMover;
}): { subject: string; body: string; mailto: string } {
  const fromLabel = opts.from?.label ?? 'Origin';
  const toLabel = opts.to?.label ?? 'Destination';
  const { totalVolume, totalItems } = inventoryTotals(opts.inventory);

  const subject = `Estimate request: ${fromLabel} → ${toLabel}`;

  const body = [
    `Hello ${opts.mover.name},`,
    '',
    'I am requesting a binding or not-to-exceed estimate for an upcoming household goods move.',
    'Please use this documented inventory so your quote is comparable to other carriers I am evaluating.',
    '',
    '— Route —',
    `From: ${fromLabel}`,
    `To: ${toLabel}`,
    opts.drivingMiles
      ? `Approx. distance: ${opts.drivingMiles.toLocaleString()} miles`
      : null,
    '',
    '— Inventory (Move Trust Hub plan) —',
    `Total volume: ${totalVolume.toLocaleString()} cubic feet`,
    `Estimated weight: ${opts.estimatedWeight.toLocaleString()} lbs (industry rule of thumb)`,
    `Line items: ${totalItems}`,
    '',
    '— Sample items —',
    ...opts.inventory
      .slice(0, 12)
      .map((i) => `• ${i.name} × ${i.quantity} (${Math.round(i.volume * i.quantity)} cu ft)`),
    opts.inventory.length > 12
      ? `…and ${opts.inventory.length - 12} more line items on my full plan.`
      : null,
    '',
    'Please reply with your best accurate rate based on this inventory.',
    'I found you on Move Trust Hub (independent directory — not a lead broker).',
    '',
    'Thank you,',
    '[Your name]',
    '[Your phone]',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailto };
}

export function buildFullPlanClipboard(opts: {
  from: ConfirmedPlace | null;
  to: ConfirmedPlace | null;
  drivingMiles: number | null;
  inventory: PlanInventoryItem[];
  estimatedWeight: number;
  shortlist: HomeRouteMover[];
  truckLabel: string;
}): string {
  const { totalVolume, totalItems } = inventoryTotals(opts.inventory);
  const fromLabel = opts.from?.label ?? 'Origin';
  const toLabel = opts.to?.label ?? 'Destination';

  return [
    'MOVE TRUST HUB — MY MOVE PLAN',
    '================================',
    `Route: ${fromLabel} → ${toLabel}`,
    opts.drivingMiles ? `Distance: ~${opts.drivingMiles.toLocaleString()} mi` : null,
    `Volume: ${totalVolume.toLocaleString()} cu ft`,
    `Est. weight: ${opts.estimatedWeight.toLocaleString()} lbs`,
    `Items: ${totalItems}`,
    `Suggested equipment: ${opts.truckLabel}`,
    '',
    'Shortlist (request the same inventory from each):',
    ...opts.shortlist.map((m, i) => `${i + 1}. ${m.name} — ${m.headquarters}`),
    opts.shortlist.length === 0 ? '(No movers shortlisted yet)' : null,
    '',
    'Inventory summary:',
    ...opts.inventory.map(
      (i) =>
        `• ${i.name} × ${i.quantity} = ${Math.round(i.volume * i.quantity)} cu ft${
          i.room ? ` [${i.room}]` : ''
        }`
    ),
    '',
    'Generated on Move Trust Hub — independent directory, no lead fees.',
  ]
    .filter((line) => line !== null)
    .join('\n');
}