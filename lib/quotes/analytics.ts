import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export type QuoteAnalytics = {
  totalQuotes: number;
  last7Days: number;
  last30Days: number;
  withPhone: number;
  bySource: { source: string; count: number }[];
  topDestinations: { destination_slug: string; count: number }[];
  byServiceType: { service_type: string; count: number }[];
  dailyVolume: { date: string; count: number }[];
};

const EMPTY: QuoteAnalytics = {
  totalQuotes: 0,
  last7Days: 0,
  last30Days: 0,
  withPhone: 0,
  bySource: [],
  topDestinations: [],
  byServiceType: [],
  dailyVolume: [],
};

export async function getQuoteAnalytics(): Promise<QuoteAnalytics> {
  if (!isSupabaseAdminConfigured()) return EMPTY;

  const supabase = createAdminClient();

  type QuoteRow = {
    id: string;
    source: string | null;
    destination_slug: string | null;
    phone: string | null;
    created_at: string;
    service_type?: string | null;
    deleted_at?: string | null;
  };

  let quotes: QuoteRow[] | null = null;

  const extended = await supabase
    .from('quote_requests')
    .select('id, source, destination_slug, phone, created_at, service_type, deleted_at')
    .order('created_at', { ascending: false })
    .limit(5000);

  if (!extended.error && extended.data) {
    quotes = extended.data as QuoteRow[];
  } else {
    const base = await supabase
      .from('quote_requests')
      .select('id, source, destination_slug, phone, created_at')
      .order('created_at', { ascending: false })
      .limit(5000);
    if (base.error || !base.data) return EMPTY;
    quotes = base.data as QuoteRow[];
  }

  const now = Date.now();
  const day = 86400000;

  const active = quotes.filter((q) => !q.deleted_at);
  const last7 = active.filter(
    (q) => now - new Date(q.created_at).getTime() <= 7 * day
  );
  const last30 = active.filter(
    (q) => now - new Date(q.created_at).getTime() <= 30 * day
  );

  const sourceMap = new Map<string, number>();
  const destMap = new Map<string, number>();
  const serviceMap = new Map<string, number>();
  const dailyMap = new Map<string, number>();

  for (const q of active) {
    const src = q.source || 'unknown';
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);

    if (q.destination_slug) {
      destMap.set(
        q.destination_slug,
        (destMap.get(q.destination_slug) || 0) + 1
      );
    }

    const svc = (q as { service_type?: string }).service_type || 'moving';
    serviceMap.set(svc, (serviceMap.get(svc) || 0) + 1);

    const dateKey = q.created_at.slice(0, 10);
    dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
  }

  const sortDesc = (a: { count: number }, b: { count: number }) =>
    b.count - a.count;

  return {
    totalQuotes: active.length,
    last7Days: last7.length,
    last30Days: last30.length,
    withPhone: active.filter((q) => q.phone?.trim()).length,
    bySource: [...sourceMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort(sortDesc)
      .slice(0, 12),
    topDestinations: [...destMap.entries()]
      .map(([destination_slug, count]) => ({ destination_slug, count }))
      .sort(sortDesc)
      .slice(0, 15),
    byServiceType: [...serviceMap.entries()].map(([service_type, count]) => ({
      service_type,
      count,
    })),
    dailyVolume: [...dailyMap.entries()]
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 14),
  };
}