import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { seedCompanies } from '@/data/seed-companies';
import { normalizeCompanyForDisplay } from '@/lib/directory/normalize-company';
import type { Company } from '@/types';

const EMPTY_RATING_BREAKDOWN: Company['ratingBreakdown'] = {
  fiveStar: 0,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

function mapRow(row: Record<string, unknown>): Company {
  return normalizeCompanyForDisplay({
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    logo: (row.logo as string) || undefined,
    shortDescription: (row.short_description as string) || '',
    description: (row.description as string) || '',
    foundedYear: (row.founded_year as number) || 0,
    headquarters: (row.headquarters as string) || '',
    website: (row.website as string) || '',
    usdotNumber: (row.usdot_number as string) || '',
    mcNumber: (row.mc_number as string) || '',
    fmcsaSafetyRating:
      (row.fmcsa_safety_rating as Company['fmcsaSafetyRating']) || 'Not Rated',
    fmcsaComplaints: (row.fmcsa_complaints as number) || 0,
    fmcsaShipments: (row.fmcsa_shipments as number) || 0,
    fmcsaLastChecked: (row.fmcsa_last_checked as string) || null,
    authorityActive: row.authority_active as boolean | null | undefined,
    outOfService: Boolean(row.out_of_service),
    complaintsLast12m: (row.complaints_last_12m as number) ?? (row.fmcsa_complaints as number) ?? 0,
    revocationDate: (row.revocation_date as string) || null,
    fmcsaDataHash: (row.data_hash as string) || null,
    bbbRating: (row.bbb_rating as Company['bbbRating']) || 'NR',
    bbbAccredited: Boolean(row.bbb_accredited),
    bbbLastChecked: (row.bbb_last_checked as string) || null,
    complaintsLast36m: (row.complaints_last_36m as number) ?? 0,
    bbbCustomerReviews: (row.bbb_customer_reviews as number) ?? 0,
    bbbDataHash: (row.bbb_data_hash as string) || null,
    bbbBusinessId: (row.bbb_business_id as string) || null,
    bbbAlertCount: (row.bbb_alert_count as number) ?? 0,
    overallRating: Number(row.overall_rating) || 0,
    reviewCount: (row.review_count as number) || 0,
    reputationScore: (row.reputation_score as number) || 0,
    yearsInBusiness: (row.years_in_business as number) || 0,
    avgPricePerMove: (row.avg_price_per_move as number) || 0,
    priceRange: (row.price_range as string) || '',
    coverage: (row.coverage as Company['coverage']) || 'Continental US',
    services: (row.services as Company['services']) || [],
    specialties: (row.specialties as string[]) || [],
    ratingBreakdown:
      (row.rating_breakdown as Company['ratingBreakdown']) ?? EMPTY_RATING_BREAKDOWN,
    isVerified: Boolean(row.is_verified),
    lastUpdated: (row.last_updated as string)?.slice?.(0, 10) || '',
    googleData: (row.google_data as Company['googleData']) ?? null,
    publicScrapeData: (row.public_scrape_data as Company['publicScrapeData']) ?? null,
  });
}

/** Cached server-side company fetch — use in Server Components and generateMetadata. */
export const getCompaniesCached = cache(async (): Promise<Company[]> => {
  if (!isSupabaseConfigured()) {
    return [...seedCompanies];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('reputation_score', { ascending: false });

  if (error || !data?.length) {
    return [...seedCompanies];
  }

  return data.map((row) => mapRow(row as Record<string, unknown>));
});