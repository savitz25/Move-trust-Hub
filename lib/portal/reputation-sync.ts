import 'server-only';

import {
  REPUTATION_SYNC_COOLDOWN_DAYS,
  REPUTATION_AUTO_QUARTERLY_DAYS,
} from '@/lib/portal/messaging';
import { ensurePortalProfile } from '@/lib/portal/ownership';
import { portalAdmin } from '@/lib/portal/db';
import type { ReputationSyncSummary } from '@/lib/portal/types';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { refreshSingleCompanyFmcsa } from '@/lib/fmcsa/refresh/single-company';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchBbbPublicScrape } from '@/lib/verification/bbb-public-scrape';
import type { PublicScrapeData } from '@/lib/verification/types';

function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return (Date.now() - t) / (1000 * 60 * 60 * 24);
}

export function getSyncCooldownState(lastSyncAt: string | null | undefined): {
  canSync: boolean;
  daysRemaining: number;
  lastSyncAt: string | null;
  nextSyncAt: string | null;
} {
  const days = daysSince(lastSyncAt);
  if (days == null) {
    return { canSync: true, daysRemaining: 0, lastSyncAt: null, nextSyncAt: null };
  }
  if (days >= REPUTATION_SYNC_COOLDOWN_DAYS) {
    return {
      canSync: true,
      daysRemaining: 0,
      lastSyncAt: lastSyncAt ?? null,
      nextSyncAt: null,
    };
  }
  const remaining = Math.ceil(REPUTATION_SYNC_COOLDOWN_DAYS - days);
  const next = new Date(
    new Date(lastSyncAt!).getTime() + REPUTATION_SYNC_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  );
  return {
    canSync: false,
    daysRemaining: remaining,
    lastSyncAt: lastSyncAt ?? null,
    nextSyncAt: next.toISOString(),
  };
}

export function needsQuarterlyAutoRefresh(lastSyncAt: string | null | undefined): boolean {
  const days = daysSince(lastSyncAt);
  if (days == null) return true;
  return days >= REPUTATION_AUTO_QUARTERLY_DAYS;
}

function parseHeadquarters(hq: string | null | undefined): { city?: string; state?: string } {
  if (!hq) return {};
  const parts = hq.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    return { city: parts[0], state: parts[1]?.slice(0, 2).toUpperCase() };
  }
  return { city: parts[0] };
}

export type ReputationSyncResult =
  | { success: true; summary: ReputationSyncSummary; message: string }
  | { success: false; error: string; daysRemaining?: number };

/**
 * Owner-initiated reputation sync (Google + BBB + FMCSA).
 * Does not change ranking algorithm or allow score edits — only refreshes public source data.
 */
export async function syncCompanyReputation(params: {
  companyId: string;
  companySlug: string;
  force?: boolean;
}): Promise<ReputationSyncResult> {
  const profile = await ensurePortalProfile(params.companyId, params.companySlug);
  const cooldown = getSyncCooldownState(profile.last_reputation_sync_at);

  if (!params.force && !cooldown.canSync) {
    return {
      success: false,
      error: `Reputation data can be refreshed once every ${REPUTATION_SYNC_COOLDOWN_DAYS} days.`,
      daysRemaining: cooldown.daysRemaining,
    };
  }

  const admin = portalAdmin();
  const { data: row, error: fetchErr } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, google_data, public_scrape_data, overall_rating, review_count'
    )
    .eq('id', params.companyId)
    .maybeSingle();

  if (fetchErr || !row) {
    return { success: false, error: 'Company not found' };
  }

  const summary: ReputationSyncSummary = {
    syncedAt: new Date().toISOString(),
  };

  // FMCSA
  try {
    const fmcsa = await refreshSingleCompanyFmcsa(params.companyId, { force: true });
    summary.fmcsa = {
      ok: fmcsa.success,
      message: fmcsa.message ?? fmcsa.error,
      fieldsUpdated: fmcsa.fieldsUpdated,
    };
  } catch (err) {
    summary.fmcsa = {
      ok: false,
      message: err instanceof Error ? err.message : 'FMCSA refresh failed',
    };
  }

  // Google
  try {
    const google = await fetchGooglePlacesData({
      legalName: String(row.name),
      headquarters: String(row.headquarters ?? ''),
    });
    if (google.status === 'ok') {
      const updates: Record<string, unknown> = {
        google_data: google,
        last_updated: new Date().toISOString().slice(0, 10),
        updated_at: new Date().toISOString(),
      };
      let fieldsUpdated = 1;
      if (google.rating != null && google.rating > 0) {
        updates.overall_rating = google.rating;
        if (google.review_count != null) updates.review_count = google.review_count;
        fieldsUpdated = 3;
      }
      await admin.from('companies').update(updates).eq('id', params.companyId);
      summary.google = {
        ok: true,
        message: `${google.review_count ?? 0} Google reviews`,
        fieldsUpdated,
      };
    } else {
      summary.google = {
        ok: false,
        message:
          google.status === 'skipped'
            ? 'Google Places not configured'
            : google.error ?? 'Google refresh failed',
      };
    }
  } catch (err) {
    summary.google = {
      ok: false,
      message: err instanceof Error ? err.message : 'Google refresh failed',
    };
  }

  // BBB public scrape
  try {
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

    const bbbUpdates: Record<string, unknown> = {
      public_scrape_data: mergedScrape,
      bbb_last_checked: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (bbbScrape.listed && bbbScrape.bbb_rating) {
      bbbUpdates.bbb_rating = bbbScrape.bbb_rating;
      bbbUpdates.bbb_accredited = Boolean(bbbScrape.bbb_accredited);
    }

    await admin.from('companies').update(bbbUpdates).eq('id', params.companyId);

    summary.bbb = {
      ok: true,
      message: bbbScrape.bbb_rating
        ? `BBB ${bbbScrape.bbb_rating}`
        : 'BBB public data refreshed',
      fieldsUpdated: bbbScrape.listed ? 4 : 1,
    };
  } catch (err) {
    summary.bbb = {
      ok: false,
      message: err instanceof Error ? err.message : 'BBB refresh failed',
    };
  }

  await admin
    .from('company_portal_profiles')
    .update({
      last_reputation_sync_at: summary.syncedAt,
      last_reputation_sync_summary: summary,
    })
    .eq('company_id', params.companyId);

  revalidatePublishedCompany(String(row.slug));

  const parts = [
    summary.fmcsa?.ok ? 'FMCSA' : null,
    summary.google?.ok ? 'Google' : null,
    summary.bbb?.ok ? 'BBB' : null,
  ].filter(Boolean);

  return {
    success: true,
    summary,
    message:
      parts.length > 0
        ? `Synced ${parts.join(', ')}. Rankings are never for sale — only public data was refreshed.`
        : 'Sync finished. Some sources may be temporarily unavailable.',
  };
}
