import 'server-only';

import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { seedCompanies } from '@/data/seed-companies';
import type { Company } from '@/types';

function mapRow(row: Record<string, unknown>): Company {
  return {
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
    fmcsaSafetyRating: row.fmcsa_safety_rating as Company['fmcsaSafetyRating'],
    fmcsaComplaints: (row.fmcsa_complaints as number) || 0,
    fmcsaShipments: (row.fmcsa_shipments as number) || 0,
    fmcsaLastChecked: (row.fmcsa_last_checked as string) || null,
    authorityActive: row.authority_active as boolean | null | undefined,
    outOfService: Boolean(row.out_of_service),
    complaintsLast12m: (row.complaints_last_12m as number) ?? (row.fmcsa_complaints as number) ?? 0,
    revocationDate: (row.revocation_date as string) || null,
    fmcsaDataHash: (row.data_hash as string) || null,
    bbbRating: (row.bbb_rating as string) || '',
    bbbAccredited: Boolean(row.bbb_accredited),
    overallRating: Number(row.overall_rating) || 0,
    reviewCount: (row.review_count as number) || 0,
    reputationScore: (row.reputation_score as number) || 0,
    yearsInBusiness: (row.years_in_business as number) || 0,
    avgPricePerMove: (row.avg_price_per_move as number) || 0,
    priceRange: (row.price_range as string) || '',
    coverage: (row.coverage as string) || '',
    services: (row.services as Company['services']) || [],
    specialties: (row.specialties as string[]) || [],
    ratingBreakdown: row.rating_breakdown as Company['ratingBreakdown'],
    isVerified: Boolean(row.is_verified),
    lastUpdated: (row.last_updated as string)?.slice?.(0, 10) || '',
  };
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