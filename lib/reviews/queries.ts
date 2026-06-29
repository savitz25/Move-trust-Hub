import 'server-only';

import { cache } from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseAdminConfigured, isSupabaseConfigured } from '@/lib/supabase/config';

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
};

export type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';

export async function getApprovedReviews(
  companyId: string,
  options: { page?: number; pageSize?: number; sort?: ReviewSort } = {}
): Promise<{ reviews: PublicReview[]; total: number }> {
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

  let query = client
    .from('company_reviews')
    .select('id, company_id, reviewer_name, rating, title, content, photo_urls, move_date, created_at', {
      count: 'exact',
    })
    .eq('company_id', companyId)
    .eq('status', 'approved');

  switch (sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'highest':
      query = query.order('rating', { ascending: false }).order('created_at', { ascending: false });
      break;
    case 'lowest':
      query = query.order('rating', { ascending: true }).order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);
  if (error || !data) return { reviews: [], total: 0 };

  return {
    reviews: data.map((r) => ({
      ...r,
      photo_urls: Array.isArray(r.photo_urls) ? (r.photo_urls as string[]) : [],
    })) as PublicReview[],
    total: count ?? 0,
  };
}

export const getApprovedReviewsCached = cache(getApprovedReviews);

export async function getPendingReviewsForModeration(): Promise<
  Array<PublicReview & { status: string; reviewer_email: string; company_name?: string }>
> {
  if (!isSupabaseAdminConfigured()) return [];
  const admin = createAdminClient();
  const { data } = await admin
    .from('company_reviews')
    .select(
      'id, company_id, reviewer_name, reviewer_email, rating, title, content, photo_urls, status, created_at, moving_companies(name)'
    )
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(100);

  return (
    data?.map((row) => {
      const companies = row.moving_companies as { name?: string } | null;
      return {
        id: row.id,
        company_id: row.company_id,
        reviewer_name: row.reviewer_name,
        reviewer_email: row.reviewer_email,
        rating: row.rating,
        title: row.title,
        content: row.content,
        photo_urls: Array.isArray(row.photo_urls) ? (row.photo_urls as string[]) : [],
        status: row.status,
        created_at: row.created_at,
        move_date: null,
        company_name: companies?.name,
      };
    }) ?? []
  );
}