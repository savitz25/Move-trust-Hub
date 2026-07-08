import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { predictCompanyProfileSlug } from '@/lib/directory/slug-resolution';
import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import type { LocalMover } from '@/lib/local-movers/types';
import {
  parseVerificationSources,
  type MoverCompanyRow,
} from '@/lib/verification/backfill-helpers';

export type BackfillTargetSource = 'supabase' | 'catalog';

export type BackfillTarget = MoverCompanyRow & {
  source: BackfillTargetSource;
  /** Set when a row exists in public.companies (update by id). */
  supabaseId: string | null;
  usdotNumber: string | null;
  mcNumber: string | null;
};

export function backfillDedupeKey(input: {
  slug: string;
  usdotNumber?: string | null;
}): string {
  const dot = input.usdotNumber?.replace(/\D/g, '');
  if (dot && dot.length >= 5) return `dot:${dot}`;
  const slug = input.slug.trim().toLowerCase();
  return slug ? `slug:${slug}` : 'unknown';
}

function headquartersFromMover(mover: LocalMover): string {
  const city = mover.city?.trim();
  return city || 'United States';
}

function catalogTargetFromMover(mover: LocalMover): BackfillTarget {
  const slug =
    mover.profileSlug ||
    predictCompanyProfileSlug({ name: mover.name, usdot: mover.usdotNumber });
  return {
    id: mover.id,
    slug,
    name: mover.name,
    headquarters: headquartersFromMover(mover),
    verification_sources: {},
    verification_last_synced_at: null,
    overall_rating: mover.rating > 0 ? mover.rating : null,
    review_count: mover.reviewCount > 0 ? mover.reviewCount : null,
    source: 'catalog',
    supabaseId: null,
    usdotNumber: mover.usdotNumber?.trim() || null,
    mcNumber: mover.mcNumber?.trim() || null,
  };
}

function supabaseTargetFromRow(row: Record<string, unknown>): BackfillTarget {
  const slug = String(row.slug);
  return {
    id: String(row.id),
    slug,
    name: String(row.name),
    headquarters: (row.headquarters as string | null) ?? null,
    verification_sources: parseVerificationSources(row.verification_sources),
    verification_last_synced_at:
      (row.verification_last_synced_at as string | null) ?? null,
    overall_rating: (row.overall_rating as number | null) ?? null,
    review_count: (row.review_count as number | null) ?? null,
    source: 'supabase',
    supabaseId: String(row.id),
    usdotNumber: (row.usdot_number as string | null) ?? null,
    mcNumber: (row.mc_number as string | null) ?? null,
  };
}

/**
 * Unified backfill list: Supabase directory rows + curated static catalog movers.
 * Supabase wins on duplicate USDOT/slug; catalog-only movers are included for enrichment upsert.
 */
export function buildBackfillTargetList(
  supabaseRows: Record<string, unknown>[]
): BackfillTarget[] {
  const byKey = new Map<string, BackfillTarget>();

  for (const row of supabaseRows) {
    const target = supabaseTargetFromRow(row);
    byKey.set(
      backfillDedupeKey({ slug: target.slug, usdotNumber: target.usdotNumber }),
      target
    );
  }

  const curated = Object.values(fullMoversCatalog).filter(isCuratedMover);
  for (const mover of curated) {
    const target = catalogTargetFromMover(mover);
    const key = backfillDedupeKey({
      slug: target.slug,
      usdotNumber: target.usdotNumber,
    });
    if (!byKey.has(key)) {
      byKey.set(key, target);
    }
  }

  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function countBackfillTargetsBySource(targets: BackfillTarget[]): {
  total: number;
  supabase: number;
  catalogOnly: number;
} {
  let supabase = 0;
  let catalogOnly = 0;
  for (const t of targets) {
    if (t.source === 'supabase') supabase++;
    else catalogOnly++;
  }
  return { total: targets.length, supabase, catalogOnly };
}