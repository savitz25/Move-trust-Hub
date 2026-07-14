'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { mapAdminListItem } from '@/lib/admin/map-company-row';
import type {
  AdminCompanyDetail,
  AdminCompanyListItem,
  AdminCompanyUpdateInput,
  AdminRefreshAuditEntry,
} from '@/lib/admin/company-dashboard-types';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import {
  resolveGoogleDataFromRow,
  resolvePublicScrapeFromRow,
} from '@/lib/verification/resolve-company-row';
import { loadAdminCompaniesForDashboard } from '@/lib/admin/load-companies-dashboard';

const DETAIL_SELECT = '*';

function buildAuditLog(row: Record<string, unknown>): AdminRefreshAuditEntry[] {
  const google = resolveGoogleDataFromRow(row);
  const scrape = resolvePublicScrapeFromRow(row);

  return [
    {
      source: 'fmcsa',
      label: 'FMCSA / DOT',
      timestamp: (row.fmcsa_last_checked as string | null) ?? null,
      detail: row.fmcsa_safety_rating ? `Safety: ${row.fmcsa_safety_rating}` : undefined,
    },
    {
      source: 'google',
      label: 'Google Places',
      timestamp: google?.last_fetched ?? null,
      detail:
        google?.rating != null
          ? `${google.rating}★ · ${google.review_count ?? 0} reviews`
          : google?.status,
    },
    {
      source: 'bbb',
      label: 'BBB',
      timestamp:
        (row.bbb_last_checked as string | null) ?? scrape?.last_scraped_at ?? null,
      detail: row.bbb_rating ? `Rating: ${row.bbb_rating}` : scrape?.bbb_rating ?? undefined,
    },
    {
      source: 'manual',
      label: 'Profile last updated',
      timestamp: (row.updated_at as string | null) ?? (row.last_updated as string | null) ?? null,
    },
  ];
}

export async function listAdminCompanies(): Promise<AdminCompanyListItem[]> {
  await assertAdminSession();
  const result = await loadAdminCompaniesForDashboard();
  return result.companies;
}

export async function getAdminCompanyDetail(companyId: string): Promise<AdminCompanyDetail | null> {
  await assertAdminSession();

  if (!isSupabaseAdminConfigured()) return null;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('companies')
    .select(DETAIL_SELECT)
    .eq('id', companyId)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const listItem = mapAdminListItem(row);

  return {
    id: listItem.id,
    slug: listItem.slug,
    name: listItem.name,
    shortDescription: String(row.short_description ?? ''),
    description: String(row.description ?? ''),
    foundedYear: Number(row.founded_year) || 0,
    headquarters: listItem.headquarters,
    website: String(row.website ?? ''),
    usdotNumber: listItem.usdotNumber,
    mcNumber: listItem.mcNumber,
    fmcsaSafetyRating: (row.fmcsa_safety_rating as AdminCompanyDetail['fmcsaSafetyRating']) || 'Not Rated',
    fmcsaComplaints: Number(row.fmcsa_complaints) || 0,
    fmcsaShipments: Number(row.fmcsa_shipments) || 0,
    bbbRating: (row.bbb_rating as AdminCompanyDetail['bbbRating']) || 'NR',
    bbbAccredited: Boolean(row.bbb_accredited),
    overallRating: listItem.googleRating ?? (Number(row.overall_rating) || 0),
    reviewCount: listItem.googleReviewCount,
    reputationScore: listItem.reputationScore,
    yearsInBusiness: Number(row.years_in_business) || 0,
    avgPricePerMove: Number(row.avg_price_per_move) || 0,
    priceRange: String(row.price_range ?? ''),
    coverage: (row.coverage as AdminCompanyDetail['coverage']) || 'Continental US',
    services: (row.services as AdminCompanyDetail['services']) || [],
    specialties: (row.specialties as string[]) || [],
    ratingBreakdown: (row.rating_breakdown as AdminCompanyDetail['ratingBreakdown']) ?? {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: Boolean(row.is_verified),
    lastUpdated: listItem.lastUpdated ?? '',
    fmcsaLastChecked: listItem.fmcsaLastChecked,
    bbbLastChecked: listItem.bbbLastChecked,
    authorityActive: row.authority_active as boolean | null | undefined,
    outOfService: Boolean(row.out_of_service),
    googleData: resolveGoogleDataFromRow(row),
    publicScrapeData: resolvePublicScrapeFromRow(row),
    auditLog: buildAuditLog(row),
  };
}

export async function updateAdminCompany(
  input: AdminCompanyUpdateInput
): Promise<{ success: boolean; error?: string }> {
  await assertAdminSession();

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Database not configured' };
  }

  if (!input.name?.trim() || !input.slug?.trim()) {
    return { success: false, error: 'Name and slug are required' };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from('companies')
    .update({
      name: input.name.trim(),
      slug: input.slug.trim(),
      short_description: input.shortDescription.trim(),
      description: input.description.trim(),
      headquarters: input.headquarters.trim(),
      website: input.website.trim(),
      usdot_number: input.usdotNumber.replace(/\D/g, '') || null,
      mc_number: input.mcNumber.trim() || null,
      is_verified: input.isVerified,
      last_updated: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.id);

  if (error) return { success: false, error: error.message };

  revalidatePublishedCompany(input.slug.trim());
  return { success: true };
}

export async function exportAdminCompaniesCsv(): Promise<string> {
  const companies = await listAdminCompanies();
  const headers = [
    'Name',
    'Slug',
    'USDOT',
    'MC',
    'Status',
    'Reputation',
    'Google Rating',
    'Google Reviews',
    'BBB Rating',
    'Last Updated',
    'FMCSA Checked',
    'Headquarters',
  ];

  const rows = companies.map((c) =>
    [
      c.name,
      c.slug,
      c.usdotNumber,
      c.mcNumber,
      c.status,
      c.reputationScore,
      c.googleRating ?? '',
      c.googleReviewCount,
      c.bbbRating,
      c.lastUpdated ?? '',
      c.fmcsaLastChecked ?? '',
      c.headquarters,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}