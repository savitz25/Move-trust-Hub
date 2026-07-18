import 'server-only';

import { cache } from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';

export type PublicReview = {
  id: string;
  company_id: string;
  reviewer_name: string;
  rating: number;
  title: string | null;
  content: string;
  photo_urls: string[];
  move_date: string | null;
  created_at: string;
  owner_response?: string | null;
  owner_response_at?: string | null;
  dispute_status?: string | null;
};

export type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';

export type AdminReviewStatus = 'pending' | 'approved' | 'rejected' | 'all';

export type AdminReviewRow = PublicReview & {
  status: string;
  reviewer_email: string;
  company_name?: string;
  company_slug?: string;
  company_dot?: string | null;
  moderated_at?: string | null;
  moderation_note?: string | null;
  verification_tier?: string | null;
};

export type AdminReviewFilters = {
  status?: AdminReviewStatus;
  q?: string;
  rating?: number | null;
  fromDate?: string | null;
  toDate?: string | null;
  page?: number;
  pageSize?: number;
};

export type AdminReviewsResult = {
  reviews: AdminReviewRow[];
  total: number;
  /** When set, the queue failed to load (never treat as empty). */
  error?: string;
};

/**
 * Core company_reviews columns that exist after the public review system migration.
 * Do NOT include portal owner/dispute columns here — production may not have them yet,
 * and selecting missing columns empties the entire admin queue (silent PGRST/42703).
 */
const REVIEW_CORE_COLUMNS =
  'id, company_id, reviewer_name, reviewer_email, rating, title, content, photo_urls, status, created_at, move_date, moderated_at, moderation_note, verification_tier';

const REVIEW_PUBLIC_CORE_COLUMNS =
  'id, company_id, reviewer_name, rating, title, content, photo_urls, move_date, created_at';

/** Optional portal columns (mover portal migration). */
const REVIEW_PORTAL_COLUMNS =
  'owner_response, owner_response_at, dispute_status';

function getReviewsClient() {
  if (isSupabaseAdminConfigured()) return createAdminClient();
  return null;
}

function mapPublicReview(r: Record<string, unknown>): PublicReview {
  return {
    id: String(r.id),
    company_id: String(r.company_id),
    reviewer_name: String(r.reviewer_name ?? ''),
    rating: Number(r.rating ?? 0),
    title: (r.title as string | null) ?? null,
    content: String(r.content ?? ''),
    photo_urls: Array.isArray(r.photo_urls) ? (r.photo_urls as string[]) : [],
    move_date: (r.move_date as string | null) ?? null,
    created_at: String(r.created_at ?? ''),
    owner_response: (r.owner_response as string | null) ?? null,
    owner_response_at: (r.owner_response_at as string | null) ?? null,
    dispute_status: (r.dispute_status as string | null) ?? null,
  };
}

function applySort<T extends { order: (col: string, opts?: { ascending?: boolean }) => T }>(
  query: T,
  sort: ReviewSort
): T {
  switch (sort) {
    case 'oldest':
      return query.order('created_at', { ascending: true });
    case 'highest':
      return query
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false });
    case 'lowest':
      return query
        .order('rating', { ascending: true })
        .order('created_at', { ascending: false });
    default:
      return query.order('created_at', { ascending: false });
  }
}

function isMissingColumnError(message?: string | null): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return (
    m.includes('does not exist') ||
    m.includes('column') && m.includes('schema cache') ||
    m.includes('could not find')
  );
}

/** Approved reviews for one or more moving_companies ids (DOT/MC duplicate rows). */
export async function getApprovedReviews(
  companyIdOrIds: string | string[],
  options: { page?: number; pageSize?: number; sort?: ReviewSort } = {}
): Promise<{ reviews: PublicReview[]; total: number }> {
  const companyIds = (Array.isArray(companyIdOrIds) ? companyIdOrIds : [companyIdOrIds]).filter(
    Boolean
  );
  if (companyIds.length === 0) return { reviews: [], total: 0 };

  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 10;
  const sort = options.sort ?? 'newest';
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let client;
  if (isSupabaseAdminConfigured()) {
    client = createAdminClient();
  } else if (isSupabaseConfigured()) {
    client = await createClient();
  } else {
    return { reviews: [], total: 0 };
  }

  const run = async (selectCols: string) => {
    let query = client
      .from('company_reviews')
      .select(selectCols, { count: 'exact' })
      .in('company_id', companyIds)
      .eq('status', 'approved');
    query = applySort(query, sort);
    return query.range(from, to);
  };

  // Prefer portal columns when present; fall back if migration lag
  let result = await run(`${REVIEW_PUBLIC_CORE_COLUMNS}, ${REVIEW_PORTAL_COLUMNS}`);
  if (result.error && isMissingColumnError(result.error.message)) {
    logger.warn('review.approved_query_portal_columns_missing', {
      message: result.error.message,
    });
    result = await run(REVIEW_PUBLIC_CORE_COLUMNS);
  }

  if (result.error || !result.data) {
    logger.error('review.approved_query_failed', {
      message: result.error?.message,
      companyIds,
    });
    return { reviews: [], total: 0 };
  }

  return {
    reviews: result.data.map((r) => mapPublicReview(r as Record<string, unknown>)),
    total: result.count ?? 0,
  };
}

export const getApprovedReviewsCached = cache(getApprovedReviews);

export async function getPendingReviewsForModeration(): Promise<AdminReviewRow[]> {
  return searchAdminReviews({ status: 'pending', page: 1, pageSize: 100 }).then((r) => r.reviews);
}

/**
 * Admin history + queue with filters (status, text, rating, dates).
 *
 * CRITICAL: Never select portal-only columns without a fallback. A missing column
 * causes PostgREST to error and previously returned an empty queue while inserts
 * still succeeded — users saw “success” but Pending stayed at 0.
 */
export async function searchAdminReviews(
  filters: AdminReviewFilters = {}
): Promise<AdminReviewsResult> {
  const admin = getReviewsClient();
  if (!admin) {
    return {
      reviews: [],
      total: 0,
      error: 'Supabase admin is not configured (SUPABASE_SERVICE_ROLE_KEY).',
    };
  }

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 25));
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const status = filters.status ?? 'pending';

  // Core + company join only. Portal owner/dispute fields are not required for moderation.
  const selectCols = `${REVIEW_CORE_COLUMNS}, moving_companies(name, slug, dot_number)`;

  let query = admin.from('company_reviews').select(selectCols, { count: 'exact' });

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  if (filters.rating && filters.rating >= 1 && filters.rating <= 5) {
    query = query.eq('rating', filters.rating);
  }

  if (filters.fromDate) {
    query = query.gte('created_at', `${filters.fromDate}T00:00:00.000Z`);
  }
  if (filters.toDate) {
    query = query.lte('created_at', `${filters.toDate}T23:59:59.999Z`);
  }

  const q = filters.q?.trim();
  if (q) {
    const safe = q.replace(/[%_]/g, '').slice(0, 80);
    if (safe) {
      query = query.or(
        `reviewer_name.ilike.%${safe}%,reviewer_email.ilike.%${safe}%,title.ilike.%${safe}%,content.ilike.%${safe}%`
      );
    }
  }

  query =
    status === 'pending'
      ? query.order('created_at', { ascending: true })
      : query.order('created_at', { ascending: false });

  const { data, count, error } = await query.range(from, to);

  if (error) {
    logger.error('review.admin_search_failed', {
      message: error.message,
      code: error.code,
      details: error.details,
      status,
    });
    return {
      reviews: [],
      total: 0,
      error: `Failed to load moderation queue: ${error.message}`,
    };
  }

  if (!data) {
    return { reviews: [], total: 0, error: 'Failed to load moderation queue (no data).' };
  }

  let rows: AdminReviewRow[] = data.map((row) => {
    const companies = row.moving_companies as
      | { name?: string; slug?: string; dot_number?: string | null }
      | null;
    const publicPart = mapPublicReview(row as Record<string, unknown>);
    return {
      ...publicPart,
      status: String(row.status),
      reviewer_email: String(row.reviewer_email ?? ''),
      company_name: companies?.name,
      company_slug: companies?.slug,
      company_dot: companies?.dot_number ?? null,
      moderated_at: (row.moderated_at as string | null) ?? null,
      moderation_note: (row.moderation_note as string | null) ?? null,
      verification_tier: (row.verification_tier as string | null) ?? null,
    };
  });

  if (q) {
    const lower = q.toLowerCase();
    const digits = lower.replace(/\D/g, '');
    const textMatched = rows.filter(
      (r) =>
        r.company_name?.toLowerCase().includes(lower) ||
        r.company_slug?.toLowerCase().includes(lower) ||
        (digits && r.company_dot?.includes(digits)) ||
        r.reviewer_name.toLowerCase().includes(lower) ||
        r.reviewer_email.toLowerCase().includes(lower) ||
        r.title?.toLowerCase().includes(lower) ||
        r.content.toLowerCase().includes(lower)
    );
    if (textMatched.length > 0) {
      rows = textMatched;
    }
  }

  return { reviews: rows, total: count ?? rows.length };
}
