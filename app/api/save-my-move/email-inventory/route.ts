import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { estimateWeight, getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import { groupInventoryByRoom } from '@/lib/moving-calculator/group-inventory';
import {
  generateInventoryPdfBase64,
  inventoryPdfFilename,
} from '@/lib/moving-calculator/pdf-export';
import { MOVE_PRESETS } from '@/lib/moving-calculator/move-presets';
import {
  buildInventoryReportEmailHtml,
  buildInventoryReportEmailText,
  buildInventoryReportSubject,
} from '@/lib/emails/inventory-report';
import type { InventoryItem } from '@/store/calculator-store';

function resolveFrom(): string {
  return process.env.RESEND_FROM?.trim() || 'Move Trust Hub <notifications@movetrusthub.com>';
}

function resolveRecipientName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}): string | null {
  const meta = user.user_metadata ?? {};
  const fromMeta =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    null;
  if (fromMeta) return fromMeta;
  const email = user.email?.trim();
  if (!email) return null;
  return email.split('@')[0] ?? null;
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

  let body: { inventory?: InventoryItem[]; name?: string; movePreset?: string | null };
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
  const inventoryName = body.name?.trim() || 'My Move Inventory';
  const presetLabel = body.movePreset
    ? MOVE_PRESETS.find((p) => p.id === body.movePreset)?.label ?? null
    : null;

  const emailData = {
    recipientName: resolveRecipientName(user),
    inventoryName,
    totalVolume,
    totalWeight: estimateWeight(totalVolume),
    totalItems,
    truckSize: recommendation.truck,
    moveSizeLabel: recommendation.label,
    movers: recommendation.movers,
    duration: recommendation.duration,
  };

  const pdfBase64 = generateInventoryPdfBase64({
    inventory,
    groupedByRoom: groupInventoryByRoom(inventory),
    totalVolume,
    totalItems,
    presetLabel,
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: resolveFrom(),
    to: user.email,
    subject: buildInventoryReportSubject(totalVolume),
    html: buildInventoryReportEmailHtml(emailData),
    text: buildInventoryReportEmailText(emailData),
    attachments: [
      {
        filename: inventoryPdfFilename(),
        content: pdfBase64,
      },
    ],
  });

  if (error) {
    console.error('[email-inventory]', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}