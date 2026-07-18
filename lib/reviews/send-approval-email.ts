import 'server-only';

import { Resend } from 'resend';
import {
  buildReviewApprovedEmailHtml,
  buildReviewApprovedEmailText,
  buildReviewApprovedSubject,
} from '@/lib/emails/review-approved';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { SITE_URL } from '@/lib/seo/site-metadata';
import { logger } from '@/lib/logging/logger';
import { getAllCompanies } from '@/lib/data-server';

const VERIFIED_FROM_FALLBACK = 'Move Trust Hub <notifications@movetrusthub.com>';

function resolveFrom(): string {
  const configured = process.env.RESEND_FROM?.trim();
  if (configured && /@/.test(configured)) return configured;
  return VERIFIED_FROM_FALLBACK;
}

function normalizeDigits(value: string | null | undefined) {
  return (value || '').replace(/\D/g, '');
}

function isValidEmail(email: string | null | undefined): email is string {
  if (!email?.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Best public URL for a moderated community review:
 * prefer directory profile /companies/{slug}, else native /company/{movingSlug}.
 */
export async function resolveReviewProfileUrl(movingCompanyId: string): Promise<{
  profileUrl: string;
  companyName: string;
}> {
  const fallback = {
    profileUrl: `${SITE_URL}/review`,
    companyName: 'this mover',
  };

  if (!isSupabaseAdminConfigured()) return fallback;

  const admin = createAdminClient();
  const { data: moving } = await admin
    .from('moving_companies')
    .select('id, slug, name, legacy_company_id, dot_number, mc_number')
    .eq('id', movingCompanyId)
    .maybeSingle();

  if (!moving) return fallback;

  const companyName = moving.name?.trim() || 'this mover';
  let directorySlug: string | null = null;

  if (moving.legacy_company_id) {
    const { data: byId } = await admin
      .from('companies')
      .select('slug, name')
      .eq('id', moving.legacy_company_id)
      .maybeSingle();
    if (byId?.slug) directorySlug = byId.slug;
  }

  const dot = normalizeDigits(moving.dot_number);
  if (!directorySlug && dot) {
    const { data: byDot } = await admin
      .from('companies')
      .select('slug')
      .eq('usdot_number', dot)
      .maybeSingle();
    if (byDot?.slug) directorySlug = byDot.slug;
  }

  if (!directorySlug && (dot || moving.mc_number)) {
    try {
      const all = await getAllCompanies();
      const mc = normalizeDigits(moving.mc_number);
      for (const c of all) {
        if (dot && normalizeDigits(c.usdotNumber) === dot) {
          directorySlug = c.slug;
          break;
        }
        if (mc && normalizeDigits(c.mcNumber) === mc) {
          directorySlug = c.slug;
          break;
        }
      }
    } catch {
      // ignore
    }
  }

  if (directorySlug) {
    return {
      companyName,
      profileUrl: `${SITE_URL}/companies/${directorySlug}#customer-reviews`,
    };
  }

  if (moving.slug) {
    return {
      companyName,
      profileUrl: `${SITE_URL}/company/${moving.slug}#customer-reviews`,
    };
  }

  return { companyName, profileUrl: `${SITE_URL}/review` };
}

export type SendReviewApprovalEmailResult =
  | { sent: true; resendId: string | null }
  | { sent: false; skipped: true; reason: string }
  | { sent: false; skipped: false; error: string };

/**
 * Send post-approval confirmation to the reviewer.
 * Never throws — moderation must succeed even if email fails.
 */
export async function sendReviewApprovalEmail(params: {
  reviewId: string;
  companyId: string;
  reviewerEmail: string | null | undefined;
  reviewerName: string;
  rating: number;
  title: string | null;
  content: string;
  /** When true, caller already knows status just became approved */
  previousStatus?: string | null;
}): Promise<SendReviewApprovalEmailResult> {
  if (params.previousStatus === 'approved') {
    logger.info('review.approval_email_skipped', {
      reviewId: params.reviewId,
      reason: 'already_approved',
    });
    return { sent: false, skipped: true, reason: 'already_approved' };
  }

  if (!isValidEmail(params.reviewerEmail)) {
    logger.warn('review.approval_email_skipped', {
      reviewId: params.reviewId,
      reason: 'missing_or_invalid_email',
    });
    return { sent: false, skipped: true, reason: 'missing_or_invalid_email' };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    logger.warn('review.approval_email_skipped', {
      reviewId: params.reviewId,
      reason: 'resend_not_configured',
    });
    return { sent: false, skipped: true, reason: 'resend_not_configured' };
  }

  try {
    const { profileUrl, companyName } = await resolveReviewProfileUrl(params.companyId);
    const emailData = {
      reviewerName: params.reviewerName,
      companyName,
      rating: params.rating,
      title: params.title,
      content: params.content,
      profileUrl,
      reviewId: params.reviewId,
    };

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: resolveFrom(),
      to: params.reviewerEmail.trim(),
      subject: buildReviewApprovedSubject(companyName),
      html: buildReviewApprovedEmailHtml(emailData),
      text: buildReviewApprovedEmailText(emailData),
    });

    if (error) {
      logger.error('review.approval_email_failed', {
        reviewId: params.reviewId,
        companyId: params.companyId,
        message: error.message,
      });
      return { sent: false, skipped: false, error: error.message };
    }

    logger.info('review.approval_email_sent', {
      reviewId: params.reviewId,
      companyId: params.companyId,
      resendId: data?.id ?? null,
      toDomain: params.reviewerEmail.trim().split('@')[1] ?? null,
    });

    return { sent: true, resendId: data?.id ?? null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('review.approval_email_failed', {
      reviewId: params.reviewId,
      companyId: params.companyId,
      message,
    });
    return { sent: false, skipped: false, error: message };
  }
}
