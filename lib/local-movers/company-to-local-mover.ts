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
};

function mapServices(services: unknown): string[] {
  if (!Array.isArray(services) || services.length === 0) return ['Long Distance'];
  return services.map((service) => {
    const value = String(service);
    if (value === 'Full Service' || value === 'Carrier') return 'Long Distance';
    return value;
  });
}

/** Convert a published directory company row into a local-movers catalog entry. */
export function companyToLocalMover(company: CompanyMoverSource): LocalMover {
  const city = company.headquarters?.split(',')[0]?.trim() ?? company.headquarters ?? '';
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
  };
}