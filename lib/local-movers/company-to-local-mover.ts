import type { LocalMover } from '@/lib/local-movers/types';

type CompanyMoverSource = {
  slug: string;
  name: string;
  short_description?: string | null;
  headquarters?: string | null;
  usdot_number?: string | null;
  mc_number?: string | null;
  fmcsa_safety_rating?: string | null;
  bbb_rating?: string | null;
  overall_rating?: number | null;
  review_count?: number | null;
  services?: unknown;
  specialties?: unknown;
  service_scope?: string | null;
  entity_type?: string | null;
  last_updated?: string | null;
  updated_at?: string | null;
};

const RECENT_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function mapServices(services: unknown): string[] {
  if (!Array.isArray(services) || services.length === 0) return ['Long Distance'];
  return services.map((service) => {
    const value = String(service);
    // Keep Carrier/Broker labels for type badges; only rewrite generic full-service.
    if (value === 'Full Service') return 'Long Distance';
    return value;
  });
}

function isRecentlyAdded(iso: string | null | undefined): boolean {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return false;
  return Date.now() - t < RECENT_MS;
}

/** Convert a published directory company row into a local-movers catalog entry. */
export function companyToLocalMover(company: CompanyMoverSource): LocalMover {
  const city = company.headquarters?.split(',')[0]?.trim() ?? company.headquarters ?? '';
  const lastUpdated = company.last_updated || company.updated_at || undefined;
  const usdot = (company.usdot_number || '').replace(/\D/g, '');
  const isLocalOnly =
    company.service_scope === 'intrastate' ||
    (!usdot && company.service_scope !== 'interstate');
  return {
    id: `directory-${company.slug}`,
    name: company.name,
    profileSlug: company.slug,
    rating: Number(company.overall_rating) || 0,
    reviewCount: company.review_count || 0,
    shortDescription: company.short_description || '',
    services: mapServices(company.services),
    specialties: Array.isArray(company.specialties) ? (company.specialties as string[]) : [],
    usdotNumber: company.usdot_number || undefined,
    mcNumber: company.mc_number || undefined,
    fmcsaSafetyRating:
      (company.fmcsa_safety_rating as LocalMover['fmcsaSafetyRating']) || 'Not Rated',
    bbbRating: company.bbb_rating || undefined,
    city,
    listingSource: 'directory',
    isLocalOnly,
    entityType: company.entity_type ?? null,
    lastUpdated: lastUpdated || undefined,
    recentlyAdded: isRecentlyAdded(lastUpdated),
  };
}