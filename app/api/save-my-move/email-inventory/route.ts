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
import { logMyMoveActivity } from '@/lib/save-my-move/activity-log';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import {
  emptyShortlistMoverCard,
  type ShortlistMoverCard,
} from '@/lib/my-move-plan/shortlist-mover-card';
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

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  return t.length > 0 ? t : null;
}

/** Pull phone from Google enrichment (typed or legacy/raw shapes). */
function phoneFromGoogleData(google: Company['googleData']): string | null {
  if (!google) return null;
  const g = google as Record<string, unknown>;
  const direct = nonEmptyString(g.phone);
  if (direct) return direct;
  const raw = g.raw_response;
  if (raw && typeof raw === 'object') {
    const r = raw as Record<string, unknown>;
    return (
      nonEmptyString(r.nationalPhoneNumber) ||
      nonEmptyString(r.internationalPhoneNumber) ||
      nonEmptyString(r.formattedPhoneNumber) ||
      nonEmptyString(r.phone) ||
      null
    );
  }
  return null;
}

function telephoneFromFmcsaRaw(raw: unknown): string | null {
  if (!raw || typeof raw !== 'object') return null;
  const carrier = raw as Record<string, unknown>;
  return nonEmptyString(carrier.telephone) || nonEmptyString(carrier.phone);
}

function emailFromUnknown(value: unknown): string | null {
  const s = nonEmptyString(value);
  if (!s || !s.includes('@')) return null;
  return s;
}

function companyToShortlistCard(
  company: Company,
  fmcsaExtras?: { phone?: string | null }
): ShortlistMoverCard {
  const google = company.googleData;
  // Prefer persisted company columns (filled by onboarding cascade), then enrichment.
  const phone =
    nonEmptyString(company.phone) ||
    phoneFromGoogleData(google) ||
    nonEmptyString(fmcsaExtras?.phone) ||
    null;
  const address =
    nonEmptyString(company.physicalAddress) ||
    nonEmptyString(google?.formatted_address) ||
    nonEmptyString(company.headquarters) ||
    null;
  const website =
    nonEmptyString(company.website) || nonEmptyString(google?.website_url) || null;

  const googleRec = google as Record<string, unknown> | null | undefined;
  const email =
    emailFromUnknown(company.email) ||
    emailFromUnknown(googleRec?.email) ||
    emailFromUnknown(
      googleRec?.raw_response && typeof googleRec.raw_response === 'object'
        ? (googleRec.raw_response as Record<string, unknown>).email
        : null
    );

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
    address,
    phone,
    email,
    website,
  };
}

/** Batch-load FMCSA telephone from fmcsa_raw for shortlisted slugs. */
async function loadFmcsaPhoneBySlug(
  slugs: string[]
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!slugs.length) return map;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('companies')
      .select('slug, fmcsa_raw')
      .in('slug', slugs);
    if (error || !data) return map;
    for (const row of data) {
      const slug = typeof row.slug === 'string' ? row.slug : '';
      const phone = telephoneFromFmcsaRaw(row.fmcsa_raw);
      if (slug && phone) map.set(slug, phone);
    }
  } catch {
    // best-effort enrichment
  }
  return map;
}

async function resolveShortlistMovers(
  slugs: string[],
  nameFallback: string[]
): Promise<ShortlistMoverCard[]> {
  const unique = [...new Set(slugs.map((s) => s.trim()).filter(Boolean))].slice(0, 3);
  if (!unique.length && nameFallback.length) {
    return nameFallback.slice(0, 3).map((name) =>
      emptyShortlistMoverCard({
        name,
        slug: '',
        profileUrl: `${SITE_URL}/companies`,
      })
    );
  }

  const fmcsaPhones = await loadFmcsaPhoneBySlug(unique);
  const cards: ShortlistMoverCard[] = [];
  for (let i = 0; i < unique.length; i++) {
    const slug = unique[i]!;
    try {
      const company = await getCompanyBySlugAsync(slug);
      if (company) {
        cards.push(
          companyToShortlistCard(company, {
            phone: fmcsaPhones.get(slug) ?? null,
          })
        );
        continue;
      }
    } catch {
      // fall through to name fallback
    }
    cards.push(
      emptyShortlistMoverCard({
        name: nameFallback[i] || slug.replace(/-/g, ' '),
        slug,
        profileUrl: `${SITE_URL}/companies/${slug}`,
      })
    );
  }
  return cards;
}

function tryBuildPdfAttachment(
  inventory: ReturnType<typeof normalizeInventoryItems>,
  groupedByRoom: ReturnType<typeof groupInventoryByRoom>,
  totalVolume: number,
  totalItems: number,
  presetLabel: string | null,
  shortlistMovers: ShortlistMoverCard[],
  route?: {
    routeFrom?: string | null;
    routeTo?: string | null;
    drivingMiles?: number | null;
    inventoryName?: string | null;
  }
) {
  try {
    const content = generateInventoryPdfBase64({
      inventory,
      groupedByRoom,
      totalVolume,
      totalItems,
      presetLabel,
      shortlistMovers,
      routeFrom: route?.routeFrom ?? null,
      routeTo: route?.routeTo ?? null,
      drivingMiles: route?.drivingMiles ?? null,
      inventoryName: route?.inventoryName ?? null,
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
      presetLabel,
      shortlistMovers,
      {
        routeFrom: emailData.routeFrom,
        routeTo: emailData.routeTo,
        drivingMiles: emailData.drivingMiles,
        inventoryName,
      }
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