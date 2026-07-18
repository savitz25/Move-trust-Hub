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
  type ShortlistMoverEmailCard,
} from '@/lib/emails/inventory-report';
import { logMyMoveActivity } from '@/lib/save-my-move/activity-log';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { SITE_URL } from '@/lib/seo/site-metadata';
import type { Company } from '@/types';

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

function authorityLabel(company: Company): string | null {
  if (company.outOfService) return 'Out of service';
  if (company.authorityActive === true) return 'Active authority';
  if (company.authorityActive === false) return 'Inactive authority';
  if (company.usdotStatus) return company.usdotStatus;
  return null;
}

function companyToShortlistCard(company: Company): ShortlistMoverEmailCard {
  const google = company.googleData;
  const phoneFromGoogle =
    google && typeof (google as { phone?: string }).phone === 'string'
      ? (google as { phone?: string }).phone ?? null
      : null;

  return {
    name: company.name,
    slug: company.slug,
    profileUrl: `${SITE_URL}/companies/${company.slug}`,
    overallRating: company.overallRating || null,
    reviewCount: company.reviewCount || null,
    reputationScore: company.reputationScore || null,
    googleRating: google?.rating ?? null,
    googleReviewCount: google?.review_count ?? null,
    fmcsaSafetyRating: company.fmcsaSafetyRating || null,
    entityType: company.entityType ?? null,
    usdotNumber: company.usdotNumber || null,
    mcNumber: company.mcNumber || null,
    powerUnits: company.powerUnits ?? null,
    authorityLabel: authorityLabel(company),
    headquarters: company.headquarters || null,
    phone: phoneFromGoogle,
    email: null,
    website: company.website || google?.website_url || null,
  };
}

async function resolveShortlistMovers(
  slugs: string[],
  nameFallback: string[]
): Promise<ShortlistMoverEmailCard[]> {
  const unique = [...new Set(slugs.map((s) => s.trim()).filter(Boolean))].slice(0, 3);
  if (!unique.length && nameFallback.length) {
    return nameFallback.slice(0, 3).map((name, i) => ({
      name,
      slug: '',
      profileUrl: `${SITE_URL}/companies`,
      overallRating: null,
      reviewCount: null,
      reputationScore: null,
      googleRating: null,
      googleReviewCount: null,
      fmcsaSafetyRating: null,
      entityType: null,
      usdotNumber: null,
      mcNumber: null,
      powerUnits: null,
      authorityLabel: null,
      headquarters: null,
      phone: null,
      email: null,
      website: null,
    }));
  }

  const cards: ShortlistMoverEmailCard[] = [];
  for (let i = 0; i < unique.length; i++) {
    const slug = unique[i]!;
    try {
      const company = await getCompanyBySlugAsync(slug);
      if (company) {
        cards.push(companyToShortlistCard(company));
        continue;
      }
    } catch {
      // fall through to name fallback
    }
    cards.push({
      name: nameFallback[i] || slug.replace(/-/g, ' '),
      slug,
      profileUrl: `${SITE_URL}/companies/${slug}`,
      overallRating: null,
      reviewCount: null,
      reputationScore: null,
      googleRating: null,
      googleReviewCount: null,
      fmcsaSafetyRating: null,
      entityType: null,
      usdotNumber: null,
      mcNumber: null,
      powerUnits: null,
      authorityLabel: null,
      headquarters: null,
      phone: null,
      email: null,
      website: null,
    });
  }
  return cards;
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

    let body: {
      inventory?: unknown;
      name?: string;
      movePreset?: string | null;
      routeFrom?: string | null;
      routeTo?: string | null;
      drivingMiles?: number | null;
      shortlistNames?: string[];
      shortlistSlugs?: string[];
      isMovePlan?: boolean;
    };
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
    const inventoryName =
      body.name?.trim() ||
      (body.isMovePlan ? 'My Move Report' : 'My Move Inventory');
    const presetLabel = body.movePreset
      ? MOVE_PRESETS.find((p) => p.id === body.movePreset)?.label ?? null
      : null;
    const shortlistNames = Array.isArray(body.shortlistNames)
      ? body.shortlistNames.filter((n): n is string => typeof n === 'string' && n.trim().length > 0)
      : [];
    const shortlistSlugs = Array.isArray(body.shortlistSlugs)
      ? body.shortlistSlugs.filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
      : [];

    const shortlistMovers = await resolveShortlistMovers(shortlistSlugs, shortlistNames);

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
      routeFrom: body.routeFrom?.trim() || null,
      routeTo: body.routeTo?.trim() || null,
      drivingMiles:
        typeof body.drivingMiles === 'number' && Number.isFinite(body.drivingMiles)
          ? body.drivingMiles
          : null,
      shortlistNames,
      shortlistMovers,
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
    const isMovePlan = Boolean(
      body.isMovePlan || emailData.routeFrom || shortlistNames.length > 0
    );
    const { data, error } = await resend.emails.send({
      from: resolveFrom(),
      to: user.email,
      subject: buildInventoryReportSubject(totalVolume, { isMovePlan }),
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

    await logMyMoveActivity(user.id, 'email_inventory', {
      inventoryName,
      totalItems,
      totalVolume,
      resendId: data?.id ?? null,
    });

    return NextResponse.json({
      success: true,
      id: data?.id,
      pdfAttached: emailData.pdfAttached,
      email: user.email,
    });
  } catch (error) {
    console.error('[email-inventory] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while sending your email.' },
      { status: 500 }
    );
  }
}