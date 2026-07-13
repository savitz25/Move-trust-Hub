import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { estimateWeight, getMoveRecommendation } from '@/lib/moving-calculator/estimates';
import { groupInventoryByRoom } from '@/lib/moving-calculator/group-inventory';
import { normalizeInventoryItems } from '@/lib/moving-calculator/normalize-inventory';
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

export const runtime = 'nodejs';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';

function resolveFrom(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
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

function tryBuildPdfAttachment(
  inventory: ReturnType<typeof normalizeInventoryItems>,
  groupedByRoom: ReturnType<typeof groupInventoryByRoom>,
  totalVolume: number,
  totalItems: number,
  presetLabel: string | null
) {
  try {
    const content = generateInventoryPdfBase64({
      inventory,
      groupedByRoom,
      totalVolume,
      totalItems,
      presetLabel,
    });
    if (!content) return null;
    return {
      filename: inventoryPdfFilename(),
      content,
      content_type: 'application/pdf' as const,
    };
  } catch (error) {
    console.error('[email-inventory] PDF generation failed:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email delivery is temporarily unavailable. Try again later or download the PDF.' },
        { status: 503 }
      );
    }

    let body: { inventory?: unknown; name?: string; movePreset?: string | null };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const inventory = normalizeInventoryItems(body.inventory);
    if (inventory.length === 0) {
      return NextResponse.json({ error: 'No inventory to email' }, { status: 400 });
    }

    const groupedByRoom = groupInventoryByRoom(inventory);
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
      groupedByRoom,
      pdfAttached: false,
    };

    const pdfAttachment = tryBuildPdfAttachment(
      inventory,
      groupedByRoom,
      totalVolume,
      totalItems,
      presetLabel
    );
    emailData.pdfAttached = pdfAttachment !== null;

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: resolveFrom(),
      to: user.email,
      subject: buildInventoryReportSubject(totalVolume),
      html: buildInventoryReportEmailHtml(emailData),
      text: buildInventoryReportEmailText(emailData),
      attachments: pdfAttachment ? [pdfAttachment] : undefined,
    });

    if (error) {
      console.error('[email-inventory] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again in a few minutes.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      pdfAttached: emailData.pdfAttached,
    });
  } catch (error) {
    console.error('[email-inventory] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending your email.' },
      { status: 500 }
    );
  }
}