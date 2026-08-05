import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import {
  finalizeCompanyEnrichmentForDisplay,
  getBbbDisplaySafe,
  getGoogleDisplayMeta,
} from '@/lib/verification/company-display-enrichment';
import { isGooglePlacesConfigured } from '@/lib/verification/google-places';
import { isSupabaseConfigured, isSupabaseAdminConfigured } from '@/lib/supabase/config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_SLUGS = [
  'cirta-moving-llc',
  'cass-county-moving',
  'amex-moving-and-storage-llc',
  'spyder-moving-kalamazoo',
];

/**
 * Public diagnostic (no secrets): reports whether Google/BBB enrichment is
 * attached for sample slugs after display finalization.
 *
 * GET /api/directory/enrichment-health
 * GET /api/directory/enrichment-health?slugs=a,b,c
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('slugs') || '';
  const slugs = (
    raw
      ? raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
      : DEFAULT_SLUGS
  ).slice(0, 20);

  const companies = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const c = await getCompanyBySlugAsync(slug);
        if (!c) {
          return { slug, found: false as const };
        }
        const finalized = finalizeCompanyEnrichmentForDisplay(c);
        const google = getGoogleDisplayMeta(finalized);
        const bbb = getBbbDisplaySafe(finalized);
        return {
          slug,
          found: true as const,
          name: finalized.name,
          overallRating: finalized.overallRating,
          reviewCount: finalized.reviewCount,
          reputationScore: finalized.reputationScore,
          google,
          bbb,
          fmcsaSafetyRating: finalized.fmcsaSafetyRating,
          usdotNumber: finalized.usdotNumber || null,
          hasGoogleDataObject: Boolean(finalized.googleData),
          hasPublicScrape: Boolean(finalized.publicScrapeData),
        };
      } catch (e) {
        return {
          slug,
          found: false as const,
          error: e instanceof Error ? e.message : String(e),
        };
      }
    })
  );

  const found = companies.filter((c) => c.found);
  const withGoogle = found.filter((c) => c.found && c.google?.available);
  const withBbb = found.filter((c) => c.found && c.bbb?.confirmed);

  return NextResponse.json({
    ok: true,
    env: {
      supabaseConfigured: isSupabaseConfigured(),
      serviceRoleConfigured: isSupabaseAdminConfigured(),
      googlePlacesKeyConfigured: isGooglePlacesConfigured(),
    },
    sample: {
      requested: slugs.length,
      found: found.length,
      googleAvailable: withGoogle.length,
      bbbConfirmed: withBbb.length,
      googleAvailablePct:
        found.length > 0 ? Math.round((100 * withGoogle.length) / found.length) : 0,
    },
    companies,
    hint: !isGooglePlacesConfigured()
      ? 'GOOGLE_PLACES_API_KEY is not set on this deployment — re-enrichment cannot call Places. Display synthesis still works when overall_rating+review_count are stored.'
      : withGoogle.length < found.length
        ? 'Some companies lack displayable Google data — run scripts/audit-company-enrichment.ts --reenrich for those slugs.'
        : null,
  });
}
