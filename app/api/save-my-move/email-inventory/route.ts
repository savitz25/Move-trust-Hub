import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { formatItemDisplayName } from '@/lib/moving-calculator/display-names';
import { estimateWeight, getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import {
  buildTransactionalEmailFooter,
  buildTransactionalTextFooter,
} from '@/lib/emails/transactional-footer';
import type { InventoryItem } from '@/store/calculator-store';

function resolveFrom(): string {
  return process.env.RESEND_FROM?.trim() || 'Move Trust Hub <notifications@movetrusthub.com>';
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
  }

  let body: { inventory?: InventoryItem[]; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const inventory = body.inventory ?? [];
  if (inventory.length === 0) {
    return NextResponse.json({ error: 'No inventory to email' }, { status: 400 });
  }

  const totalVolume = inventory.reduce((s, i) => s + i.volume * i.quantity, 0);
  const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);
  const recommendation = getMoveRecommendation(totalVolume);
  const label = body.name?.trim() || 'My Move Inventory';

  const lines = inventory.map(
    (item) =>
      `• ${formatItemDisplayName(item.name)} × ${item.quantity} (${Math.round(item.volume * item.quantity)} cu ft)`
  );

  const text = [
    label,
    '',
    `Total: ${Math.round(totalVolume)} cu ft · ${estimateWeight(totalVolume)} lbs · ${totalItems} items`,
    `Truck: ${recommendation.truck}`,
    '',
    ...lines,
    '',
    buildTransactionalTextFooter(),
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111;">
      <h2 style="color:#0077D4;">${label}</h2>
      <p><strong>${Math.round(totalVolume)} cu ft</strong> · ${estimateWeight(totalVolume)} lbs · ${totalItems} items<br />
      Truck: ${recommendation.truck}</p>
      <ul style="padding-left:20px;line-height:1.6;">${lines.map((l) => `<li>${l.replace(/^• /, '')}</li>`).join('')}</ul>
      ${buildTransactionalEmailFooter('Manage preferences at movetrusthub.com/my-move')}
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: resolveFrom(),
    to: user.email,
    subject: `Your moving inventory — ${Math.round(totalVolume)} cu ft`,
    html,
    text,
  });

  if (error) {
    console.error('[email-inventory]', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}