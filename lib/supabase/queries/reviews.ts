import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { Review } from '@/types';

/** Lean select — avoids `*` payload on review list fetches. */
const REVIEW_LIST_COLUMNS =
  'id, company_id, author, rating, date, source, title, content, verified, location';

function mapReviewRow(row: Record<string, unknown>): Review {
  return {
    id: row.id as string,
    companyId: row.company_id as string,
    author: row.author as string,
    rating: Number(row.rating) || 0,
    date: row.date as string,
    source: row.source as Review['source'],
    title: (row.title as string) || undefined,
    content: row.content as string,
    verified: Boolean(row.verified),
    location: (row.location as string) || undefined,
  };
}

export const getReviewsForCompanyCached = cache(
  async (companyId: string, limit?: number): Promise<Review[]> => {
    if (!isSupabaseConfigured()) return [];

    const supabase = await createClient();
    let query = supabase
      .from('reviews')
      .select(REVIEW_LIST_COLUMNS)
      .eq('company_id', companyId)
      .order('date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error || !data?.length) return [];

    return data.map((row) => mapReviewRow(row as Record<string, unknown>));
  },
);