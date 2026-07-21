'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { mapAdminListItem } from '@/lib/admin/map-company-row';
import type { AdminRefreshResult } from '@/lib/admin/company-dashboard-types';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { refreshSingleCompanyFmcsa } from '@/lib/fmcsa/refresh/single-company';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchBbbPublicScrape } from '@/lib/verification/bbb-public-scrape';
import type { PublicScrapeData } from '@/lib/verification/types';
import { logger } from '@/lib/logging/logger';

async function fetchCompanyRow(companyId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, fmcsa_legal_name, google_data, public_scrape_data, bbb_rating, bbb_accredited, overall_rating, review_count, authority_active, out_of_service, reputation_score, last_updated, fmcsa_last_checked, bbb_last_checked'
    )
    .eq('id', companyId)
    .maybeSingle();

  if (error || !data) return null;
  return data as Record<string, unknown>;
}

function parseHeadquarters(hq: string | null | undefined): { city?: string; state?: string } {
  if (!hq) return {};
  const parts = hq.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    return { city: parts[0], state: parts[1]?.slice(0, 2).toUpperCase() };
  }
  return { city: parts[0] };
}

export async function refreshCompanyFmcsaAction(
  companyId: string,
  options?: { force?: boolean }
): Promise<AdminRefreshResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  const result = await refreshSingleCompanyFmcsa(companyId, options);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  if (result.removed) {
    return { success: true, message: result.message, fieldsUpdated: 0 };
  }

  const row = await fetchCompanyRow(companyId);
  return {
    success: true,
    message: result.message,
    fieldsUpdated: result.fieldsUpdated,
    company: row ? mapAdminListItem(row) : undefined,
  };
}

export async function refreshCompanyGoogleAction(companyId: string): Promise<AdminRefreshResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Database not configured' };
  }

  const row = await fetchCompanyRow(companyId);
  if (!row) return { success: false, error: 'Company not found' };

  const displayName = String(row.name ?? '').trim();
  const fmcsaLegal = String(row.fmcsa_legal_name ?? '').trim();
  const legalName = fmcsaLegal || displayName;
  const dbaName =
    displayName && fmcsaLegal && displayName !== fmcsaLegal ? displayName : null;
  const google = await fetchGooglePlacesData({
    legalName,
    dbaName,
    headquarters: String(row.headquarters ?? ''),
  });

  if (google.status === 'skipped') {
    return { success: false, error: 'GOOGLE_PLACES_API_KEY not configured' };
  }

  if (google.status === 'error') {
    return { success: false, error: google.error ?? 'Google Places request failed' };
  }

  const admin = createAdminClient();
  // Always write verification_sources.google (profile read path) + google_data when present.
  const { persistGoogleSnapshot } = await import(
    '@/lib/verification/persist-google-snapshot'
  );
  const persisted = await persistGoogleSnapshot(admin, companyId, google, {
    existingRow: row,
  });

  if (!persisted.ok) {
    logger.error('admin.refresh_google_failed', { companyId, error: persisted.error });
    return { success: false, error: persisted.error ?? 'Failed to save Google data' };
  }

  const fieldsUpdated = persisted.applied ? (google.rating != null ? 3 : 1) : 0;

  revalidatePublishedCompany(String(row.slug));
  const refreshed = await fetchCompanyRow(companyId);

  return {
    success: true,
    fieldsUpdated,
    message: persisted.applied
      ? `Google data refreshed — ${google.review_count ?? 0} reviews (rating ${google.rating ?? '—'})`
      : `Kept existing Google snapshot (incoming status: ${google.status})`,
    company: refreshed ? mapAdminListItem(refreshed) : undefined,
  };
}

export async function refreshCompanyBbbAction(companyId: string): Promise<AdminRefreshResult> {
  try {
    await assertAdminSession();
  } catch {
    return { success: false, error: 'Unauthorized' };
  }

  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Database not configured' };
  }

  const row = await fetchCompanyRow(companyId);
  if (!row) return { success: false, error: 'Company not found' };

  const geo = parseHeadquarters(String(row.headquarters ?? ''));
  const bbbScrape = await fetchBbbPublicScrape({
    companyName: String(row.name),
    city: geo.city,
    state: geo.state,
    headquarters: String(row.headquarters ?? ''),
    usdotNumber: String(row.usdot_number ?? ''),
  });

  const existingScrape = (row.public_scrape_data ?? null) as PublicScrapeData | null;
  const mergedScrape: PublicScrapeData = {
    confidence: 'public',
    bbb_rating: bbbScrape.bbb_rating,
    bbb_review_count: bbbScrape.bbb_review_count,
    bbb_accredited: bbbScrape.bbb_accredited,
    bbb_accreditation_status: bbbScrape.bbb_accreditation_status,
    bbb_file_opened: bbbScrape.bbb_file_opened,
    bbb_accredited_since: bbbScrape.bbb_accredited_since,
    bbb_profile_url: bbbScrape.bbb_profile_url,
    bbb_recent_reviews: bbbScrape.bbb_recent_reviews,
    trustpilot_rating: existingScrape?.trustpilot_rating ?? null,
    trustpilot_review_count: existingScrape?.trustpilot_review_count ?? null,
    yelp_rating: existingScrape?.yelp_rating ?? null,
    yelp_review_count: existingScrape?.yelp_review_count ?? null,
    sources: {
      bbb: bbbScrape.meta,
      trustpilot: existingScrape?.sources?.trustpilot,
      yelp: existingScrape?.sources?.yelp,
    },
    last_scraped_at: new Date().toISOString(),
  };

  const updates: Record<string, unknown> = {
    public_scrape_data: mergedScrape,
    bbb_last_checked: new Date().toISOString(),
    last_updated: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
  };

  if (bbbScrape.listed && bbbScrape.bbb_rating) {
    updates.bbb_rating = bbbScrape.bbb_rating;
    updates.bbb_accredited = Boolean(bbbScrape.bbb_accredited);
  }

  const admin = createAdminClient();
  const { error } = await admin.from('companies').update(updates as never).eq('id', companyId);

  if (error) {
    logger.error('admin.refresh_bbb_failed', { companyId, error: error.message });
    return { success: false, error: error.message };
  }

  revalidatePublishedCompany(String(row.slug));
  const refreshed = await fetchCompanyRow(companyId);

  const ratingLabel = bbbScrape.bbb_rating ?? 'not found';
  return {
    success: true,
    fieldsUpdated: bbbScrape.listed ? 4 : 1,
    message: `BBB scrape complete — ${ratingLabel}`,
    company: refreshed ? mapAdminListItem(refreshed) : undefined,
  };
}

export async function refreshCompanyAllDataAction(
  companyId: string,
  options?: { forceFmcsa?: boolean }
): Promise<AdminRefreshResult> {
  const fmcsa = await refreshCompanyFmcsaAction(companyId, { force: options?.forceFmcsa });
  if (!fmcsa.success && fmcsa.error && !fmcsa.message?.includes('fresh')) {
    return fmcsa;
  }

  const google = await refreshCompanyGoogleAction(companyId);
  const bbb = await refreshCompanyBbbAction(companyId);

  const errors = [google.error, bbb.error].filter(Boolean);
  const refreshed = await fetchCompanyRow(companyId);

  return {
    success: errors.length < 2,
    message: `Refresh complete — FMCSA: ${fmcsa.message ?? 'ok'}, Google: ${google.message ?? google.error ?? 'ok'}, BBB: ${bbb.message ?? bbb.error ?? 'ok'}`,
    fieldsUpdated: (fmcsa.fieldsUpdated ?? 0) + (google.fieldsUpdated ?? 0) + (bbb.fieldsUpdated ?? 0),
    company: refreshed ? mapAdminListItem(refreshed) : undefined,
    error: errors.length ? errors.join('; ') : undefined,
  };
}