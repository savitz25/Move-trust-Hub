import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Oklahoma county testimonials — 3 per county */
export const oklahomaCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    oklahoma: [
      {
        quote:
          'Two Men and a Truck Oklahoma City handled our Edmond relocation professionally — on time, efficient, and extremely careful throughout Oklahoma County.',
        name: 'Rachel K.',
        location: 'Edmond, OK',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons confirmed Oklahoma County coverage and delivered excellent full-service packing — professional crew with transparent pricing for our Midwest City move.',
        name: 'Derek M.',
        location: 'Midwest City, OK',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Oklahoma Capital Movers served our Oklahoma City apartment move efficiently — fast, professional, and reliable with careful handling of downtown belongings.',
        name: 'Priya S.',
        location: 'Oklahoma City, OK',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
  };

export function getOklahomaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return oklahomaCountyTestimonials[countySlug] ?? [];
}